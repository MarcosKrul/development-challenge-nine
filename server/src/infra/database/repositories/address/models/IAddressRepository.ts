import { AddressModel } from "@models/AddressModel";
import { PrismaPromise } from "@prisma/client";

import { addressRepositoryDeleteInput } from "./mappers/addressRepositoryDeleteInput";
import { addressRepositoryGetByPatientIdInput } from "./mappers/addressRepositoryGetByPatientIdInput";

interface IAddressRepository {
  delete(_: addressRepositoryDeleteInput): PrismaPromise<AddressModel>;

  getByPatientId(
    _: addressRepositoryGetByPatientIdInput
  ): PrismaPromise<AddressModel | null>;

  save(_: AddressModel & { patientId: string }): PrismaPromise<AddressModel>;
}

export { IAddressRepository };
