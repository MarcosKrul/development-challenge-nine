import { BaseRepository } from "src/infra/database/repositories/BaseRepository";

import { AddressModel } from "@models/AddressModel";
import { PatientModel } from "@models/PatientModel";
import { PrismaPromise } from "@prisma/client";

import { IPatientRepository } from "../../../models/IPatientRepository";
import { patientRepositoryGetInput } from "../../../models/mappers/patientRepositoryGetInput";

class PatientRepository extends BaseRepository implements IPatientRepository {
  get = (
    _: patientRepositoryGetInput,
    [take, skip]: [number, number]
  ): PrismaPromise<(PatientModel & { address: AddressModel | null })[]> =>
    this.prisma.patient.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        address: {
          select: {
            city: true,
            complement: true,
            district: true,
            publicArea: true,
            state: true,
            zipCode: true,
          },
        },
      },
      orderBy: { name: "asc" },
      take,
      skip,
    });

  count = (_: patientRepositoryGetInput): PrismaPromise<number> =>
    this.prisma.patient.count();
}

export { PatientRepository };
