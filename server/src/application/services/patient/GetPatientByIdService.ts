import { inject, injectable } from "inversify";

import { IAddressRepository } from "@database/repositories/address";
import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { GetPatientByIdRequestModel } from "@dtos/patient/GetPatientByIdRequestModel";
import { GetPatientByIdResponseModel } from "@dtos/patient/GetPatientByIdResponseModel";
import { AppError } from "@handlers/error/AppError";
import { stringIsNullOrEmpty } from "@helpers/stringIsNullOrEmpty";
import { getMessage } from "@helpers/translatedMessagesControl";
import { IMaskProvider } from "@providers/mask";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";

@injectable()
class GetPatientByIdService {
  constructor(
    @inject("UniqueIdentifierProvider")
    private uniqueIdentifierProvider: IUniqueIdentifierProvider,
    @inject("PatientRepository")
    private patientRepository: IPatientRepository,
    @inject("MaskProvider")
    private maskProvider: IMaskProvider,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  public async execute({
    patientId,
  }: GetPatientByIdRequestModel): Promise<GetPatientByIdResponseModel> {
    if (stringIsNullOrEmpty(patientId))
      throw new AppError("BAD_REQUEST", getMessage("ErrorPatientIdRequired"));

    if (!this.uniqueIdentifierProvider.isValid(patientId))
      throw new AppError("BAD_REQUEST", getMessage("ErrorPatientIdInvalid"));

    const [hasPatient, hasAddress] = await transaction([
      this.patientRepository.getById({ patientId }),
      this.addressRepository.getByPatientId({ patientId }),
    ]);

    if (!hasPatient || !hasAddress)
      throw new AppError("NOT_FOUND", getMessage("ErrorPatientNotFound"));

    return {
      id: hasPatient.id,
      email: hasPatient.email,
      name: hasPatient.name,
      birthDate: this.maskProvider.date(hasPatient.birthDate),
      address: {
        city: hasAddress.city,
        complement: hasAddress.complement,
        district: hasAddress.district,
        publicArea: hasAddress.publicArea,
        state: hasAddress.state,
        zipCode: this.maskProvider.zipCode(hasAddress.zipCode),
      },
    };
  }
}

export { GetPatientByIdService };
