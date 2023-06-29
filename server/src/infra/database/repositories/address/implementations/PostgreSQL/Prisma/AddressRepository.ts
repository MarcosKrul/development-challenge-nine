import { IAddressRepository } from "@database/repositories/address/models/IAddressRepository";
import { addressRepositoryDeleteInput } from "@database/repositories/address/models/mappers/addressRepositoryDeleteInput";
import { addressRepositoryGetByPatientIdInput } from "@database/repositories/address/models/mappers/addressRepositoryGetByPatientIdInput";
import { BaseRepository } from "@database/repositories/BaseRepository";
import { AddressModel } from "@models/AddressModel";
import { PrismaPromise } from "@prisma/client";

class AddressRepository extends BaseRepository implements IAddressRepository {
  delete = ({
    patientId,
  }: addressRepositoryDeleteInput): PrismaPromise<AddressModel> =>
    this.prisma.address.delete({
      where: {
        patientId,
      },
    });

  getByPatienId = ({
    patientId,
  }: addressRepositoryGetByPatientIdInput): PrismaPromise<AddressModel | null> =>
    this.prisma.address.findFirst({
      where: {
        patientId,
      },
    });

  save = ({
    city,
    complement,
    district,
    publicArea,
    state,
    zipCode,
    patientId,
  }: AddressModel & { patientId: string }): PrismaPromise<AddressModel> =>
    this.prisma.address.upsert({
      where: { patientId },
      create: {
        city,
        district,
        publicArea,
        state,
        zipCode,
        complement,
        patientId,
      },
      update: {
        city,
        district,
        publicArea,
        state,
        zipCode,
        complement,
      },
    });
}

export { AddressRepository };
