import { AddressModel } from "@models/AddressModel";
import { PrismaPromise } from "@prisma/client";

import { addressRepositoryDeleteInput } from "./mappers/addressRepositoryDeleteInput";
import { addressRepositoryGetByPatientIdInput } from "./mappers/addressRepositoryGetByPatientIdInput";

interface IAddressRepository {
  delete(_: addressRepositoryDeleteInput): PrismaPromise<AddressModel>;

  getByPatienId(
    _: addressRepositoryGetByPatientIdInput
  ): PrismaPromise<AddressModel | null>;
}

export { IAddressRepository };
