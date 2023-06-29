import { AddressModel } from "@models/AddressModel";
import { PatientModel } from "@models/PatientModel";
import { PrismaPromise } from "@prisma/client";

import { patientRepositoryDeleteInput } from "./mappers/patientRepositoryDeleteInput";
import { patientRepositoryFindByEmailInput } from "./mappers/patientRepositoryFindByEmailInput";
import { patientRepositoryGetByIdInput } from "./mappers/patientRepositoryGetByIdInput";
import { patientRepositoryGetInput } from "./mappers/patientRepositoryGetInput";

interface IPatientRepository {
  get(
    _: patientRepositoryGetInput,
    __: [number, number]
  ): PrismaPromise<(PatientModel & { address: AddressModel | null })[]>;

  count(_: patientRepositoryGetInput): PrismaPromise<number>;

  delete(_: patientRepositoryDeleteInput): PrismaPromise<PatientModel>;

  getById(_: patientRepositoryGetByIdInput): PrismaPromise<PatientModel | null>;

  findByEmail(
    _: patientRepositoryFindByEmailInput
  ): PrismaPromise<PatientModel | null>;

  save(_: PatientModel): PrismaPromise<PatientModel>;
}

export { IPatientRepository };
