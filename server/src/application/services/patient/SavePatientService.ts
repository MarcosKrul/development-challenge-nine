import { inject, injectable } from "inversify";

import { VarcharMaxLength } from "@commons/VarcharMaxLength";
import { IAddressRepository } from "@database/repositories/address";
import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { SavePatientRequestModel } from "@dtos/patient/SavePatientRequestModel";
import { SavePatientResponseModel } from "@dtos/patient/SavePatientResponseModel";
import { AppError } from "@handlers/error/AppError";
import { capitalize } from "@helpers/capitalize";
import { stringIsNullOrEmpty } from "@helpers/stringIsNullOrEmpty";
import {
  getMessage,
  getVariableMessage,
} from "@helpers/translatedMessagesControl";
import { IDateProvider } from "@providers/date";
import { IMaskProvider } from "@providers/mask";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";
import { IValidatorsProvider } from "@providers/validators";

interface IValidateAttrInput {
  att: string;
  requiredErrorMessage: string;
  length: number;
  lengthMessage: string;
}

@injectable()
class SavePatientService<
  T extends SavePatientRequestModel = SavePatientRequestModel
> {
  constructor(
    @inject("ValidatorsProvider")
    protected validatorsProvider: IValidatorsProvider,
    @inject("DateProvider")
    protected dateProvider: IDateProvider,
    @inject("MaskProvider")
    protected maskProvider: IMaskProvider,
    @inject("PatientRepository")
    protected patientRepository: IPatientRepository,
    @inject("AddressRepository")
    protected addressRepository: IAddressRepository,
    @inject("UniqueIdentifierProvider")
    protected uniqueIdentifierProvider: IUniqueIdentifierProvider
  ) {}

  private checkAttributeLengthAndMandatory = ({
    att,
    length,
    lengthMessage,
    requiredErrorMessage,
  }: IValidateAttrInput) => {
    if (stringIsNullOrEmpty(att))
      throw new AppError("BAD_REQUEST", getMessage(requiredErrorMessage));

    if (!this.validatorsProvider.length(att, length))
      throw new AppError(
        "BAD_REQUEST",
        getVariableMessage("ErrorVarCharMaxLengthExceeded", [
          getMessage(lengthMessage),
          length,
        ])
      );
  };

  private convertDate = (rawDate: string): Date => {
    if (!this.dateProvider.isValidISOString(rawDate))
      throw new AppError(
        "BAD_REQUEST",
        getVariableMessage("ErrorBirthDateInvalid", [
          getMessage("RandomWord_BirthDate"),
        ])
      );

    const [date, time] = rawDate.split("T");

    return this.dateProvider.getUTCDate(date, time || "00:00");
  };

  protected getId = (_: T): string => this.uniqueIdentifierProvider.generate();

  public async execute(input: T): Promise<SavePatientResponseModel> {
    const { birthDate, email, name, address } = input;

    this.checkAttributeLengthAndMandatory({
      att: name,
      requiredErrorMessage: "ErrorNameRequired",
      length: VarcharMaxLength.PATIENT_NAME,
      lengthMessage: "RandomWord_Name",
    });

    this.checkAttributeLengthAndMandatory({
      att: email,
      requiredErrorMessage: "ErrorEmailRequired",
      length: VarcharMaxLength.PATIENT_EMAIL,
      lengthMessage: "RandomWord_Email",
    });

    if (!this.validatorsProvider.email(email))
      throw new AppError("BAD_REQUEST", getMessage("ErrorEmailInvalid"));

    if (stringIsNullOrEmpty(birthDate))
      throw new AppError("BAD_REQUEST", getMessage("ErrorBirthDateRequired"));

    const birthDateConverted = this.convertDate(birthDate);

    if (this.dateProvider.isBefore(this.dateProvider.now(), birthDateConverted))
      throw new AppError("BAD_REQUEST", getMessage("ErrorBirthDateFuture"));

    this.checkAttributeLengthAndMandatory({
      att: address.city,
      requiredErrorMessage: "ErrorAddressCityRequired",
      length: VarcharMaxLength.ADDRESS_CITY,
      lengthMessage: "RandomWord_City",
    });

    this.checkAttributeLengthAndMandatory({
      att: address.district,
      requiredErrorMessage: "ErrorAddressDistrictRequired",
      length: VarcharMaxLength.ADDRESS_DISTRICT,
      lengthMessage: "RandomWord_District",
    });

    this.checkAttributeLengthAndMandatory({
      att: address.publicArea,
      requiredErrorMessage: "ErrorAddressPublicAreaRequired",
      length: VarcharMaxLength.ADDRESS_PUBLIC_AREA,
      lengthMessage: "RandomWord_PublicArea",
    });

    this.checkAttributeLengthAndMandatory({
      att: address.state,
      requiredErrorMessage: "ErrorAddressStateRequired",
      length: VarcharMaxLength.ADDRESS_STATE,
      lengthMessage: "RandomWord_State",
    });

    if (!this.validatorsProvider.zipCode(address.zipCode))
      throw new AppError(
        "BAD_REQUEST",
        getMessage("ErrorAddressZipCodeInvalid")
      );

    const zipCodeConverted = this.maskProvider.remove(address.zipCode);

    this.checkAttributeLengthAndMandatory({
      att: zipCodeConverted,
      requiredErrorMessage: "ErrorAddressZipCodeRequired",
      length: VarcharMaxLength.ADDRESS_ZIP_CODE,
      lengthMessage: "RandomWord_ZipCode",
    });

    if (
      address.complement &&
      !this.validatorsProvider.length(
        address.complement,
        VarcharMaxLength.ADDRESS_COMPLEMENT
      )
    )
      throw new AppError(
        "BAD_REQUEST",
        getVariableMessage("ErrorVarCharMaxLengthExceeded", [
          getMessage("RandomWord_Complement"),
          VarcharMaxLength.ADDRESS_COMPLEMENT,
        ])
      );

    const patientId = this.getId(input);

    const [hasEmail] = await transaction([
      this.patientRepository.findByEmail({ email, patientId }),
    ]);

    if (hasEmail)
      throw new AppError("BAD_REQUEST", getMessage("ErrorEmailAlreadyExists"));

    const [patientSaved, addressSaved] = await transaction([
      this.patientRepository.save({
        email,
        birthDate: birthDateConverted,
        name,
        id: patientId,
        createdAt: this.dateProvider.now(),
        updatedAt: this.dateProvider.now(),
      }),
      this.addressRepository.save({
        city: address.city,
        complement: address.complement,
        district: address.district,
        publicArea: address.publicArea,
        state: address.state,
        zipCode: zipCodeConverted,
        patientId,
      }),
    ]);

    return {
      id: patientSaved.id,
      email: patientSaved.email,
      name: patientSaved.name,
      birthDate: this.maskProvider.date(patientSaved.birthDate),
      age: this.dateProvider.differenceInYears(
        this.dateProvider.now(),
        patientSaved.birthDate
      ),
      createdAt: {
        readableDate: capitalize(
          this.dateProvider.readableDate(patientSaved.createdAt)
        ),
        date: this.maskProvider.timestamp(patientSaved.createdAt),
      },
      updatedAt: {
        readableDate: capitalize(
          this.dateProvider.readableDate(patientSaved.updatedAt)
        ),
        date: this.maskProvider.timestamp(patientSaved.updatedAt),
      },
      address: {
        city: addressSaved.city,
        complement: addressSaved.complement || undefined,
        district: addressSaved.district,
        publicArea: addressSaved.publicArea,
        state: addressSaved.state,
        zipCode: this.maskProvider.zipCode(addressSaved.zipCode),
      },
    };
  }
}

export { SavePatientService };
