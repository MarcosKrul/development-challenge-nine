import { AddressModel } from "@models/AddressModel";
import { PatientModel } from "@models/PatientModel";
import { PrismaPromise } from "@prisma/client";

import { patientRepositoryGetInput } from "./mappers/patientRepositoryGetInput";

interface IPatientRepository {
  get(
    _: patientRepositoryGetInput,
    __: [number, number]
  ): PrismaPromise<(PatientModel & { address: AddressModel | null })[]>;

  count(_: patientRepositoryGetInput): PrismaPromise<number>;
}

export { IPatientRepository };
