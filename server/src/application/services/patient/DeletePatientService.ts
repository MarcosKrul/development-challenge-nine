import { inject, injectable } from "inversify";

import { IAddressRepository } from "@database/repositories/address";
import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { DeletePatientRequestModel } from "@dtos/patient/DeletePatientRequestModel";
import { AppError } from "@handlers/error/AppError";
import { stringIsNullOrEmpty } from "@helpers/stringIsNullOrEmpty";
import { getMessage } from "@helpers/translatedMessagesControl";
import { PrismaPromise } from "@prisma/client";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";

@injectable()
class DeletePatientService {
  constructor(
    @inject("UniqueIdentifierProvider")
    private uniqueIdentifierProvider: IUniqueIdentifierProvider,
    @inject("PatientRepository")
    private patientRepository: IPatientRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  public async execute({
    patientId,
  }: DeletePatientRequestModel): Promise<void> {
    if (stringIsNullOrEmpty(patientId))
      throw new AppError("BAD_REQUEST", getMessage("ErrorPatientIdRequired"));

    if (!this.uniqueIdentifierProvider.isValid(patientId))
      throw new AppError("BAD_REQUEST", getMessage("ErrorPatientIdInvalid"));

    const [hasPatient, hasAddress] = await transaction([
      this.patientRepository.getById({ patientId }),
      this.addressRepository.getByPatienId({ patientId }),
    ]);

    if (!hasPatient)
      throw new AppError("NOT_FOUND", getMessage("ErrorPatientNotFound"));

    await transaction(
      ((): PrismaPromise<any>[] => {
        const list = [];
        if (hasAddress) list.push(this.addressRepository.delete({ patientId }));
        list.push(this.patientRepository.delete({ patientId }));
        return list;
      })()
    );
  }
}

export { DeletePatientService };
