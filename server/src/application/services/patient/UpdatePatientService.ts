import { inject, injectable } from "inversify";

import { IAddressRepository } from "@database/repositories/address";
import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { SavePatientResponseModel } from "@dtos/patient/SavePatientResponseModel";
import { UpdatePatientRequestModel } from "@dtos/patient/UpdatePatientRequestModel";
import { AppError } from "@handlers/error/AppError";
import { stringIsNullOrEmpty } from "@helpers/stringIsNullOrEmpty";
import { getMessage } from "@helpers/translatedMessagesControl";
import { IDateProvider } from "@providers/date";
import { IMaskProvider } from "@providers/mask";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";
import { IValidatorsProvider } from "@providers/validators";

import { SavePatientService } from "./SavePatientService";

@injectable()
class UpdatePatientService extends SavePatientService<UpdatePatientRequestModel> {
  constructor(
    @inject("ValidatorsProvider")
    validatorsProvider: IValidatorsProvider,
    @inject("DateProvider")
    dateProvider: IDateProvider,
    @inject("MaskProvider")
    maskProvider: IMaskProvider,
    @inject("PatientRepository")
    patientRepository: IPatientRepository,
    @inject("AddressRepository")
    addressRepository: IAddressRepository,
    @inject("UniqueIdentifierProvider")
    uniqueIdentifierProvider: IUniqueIdentifierProvider
  ) {
    super(
      validatorsProvider,
      dateProvider,
      maskProvider,
      patientRepository,
      addressRepository,
      uniqueIdentifierProvider
    );
  }

  protected getId = ({ id }: UpdatePatientRequestModel): string => id;

  public async execute({
    birthDate,
    email,
    name,
    address,
    id,
  }: UpdatePatientRequestModel): Promise<SavePatientResponseModel> {
    const [hasPatient, hasAddress] = await transaction([
      this.patientRepository.getById({ patientId: id }),
      this.addressRepository.getByPatientId({ patientId: id }),
    ]);

    if (!hasPatient || !hasAddress)
      throw new AppError("NOT_FOUND", getMessage("ErrorPatientNotFound"));

    const result = await super.execute({
      id,
      name: name || hasPatient?.name,
      email: email || hasPatient?.email,
      birthDate: birthDate || hasPatient.birthDate.toISOString(),
      address: {
        city: address.city || hasAddress.city,
        complement: stringIsNullOrEmpty(address.complement)
          ? null
          : address.complement,
        district: address.district || hasAddress.district,
        publicArea: address.publicArea || hasAddress.publicArea,
        state: address.state || hasAddress.state,
        zipCode:
          address.zipCode || this.maskProvider.zipCode(hasAddress.zipCode),
      },
    });

    return result;
  }
}

export { UpdatePatientService };
