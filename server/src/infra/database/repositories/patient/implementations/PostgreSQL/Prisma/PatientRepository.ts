import { BaseRepository } from "src/infra/database/repositories/BaseRepository";

import { AddressModel } from "@models/AddressModel";
import { PatientModel } from "@models/PatientModel";
import { PrismaPromise } from "@prisma/client";

import { IPatientRepository } from "../../../models/IPatientRepository";
import { patientRepositoryGetInput } from "../../../models/mappers/patientRepositoryGetInput";
import { clause2searchPatients } from "./clause2searchPatients";

class PatientRepository extends BaseRepository implements IPatientRepository {
  get = (
    { filters }: patientRepositoryGetInput,
    [take, skip]: [number, number]
  ): PrismaPromise<(PatientModel & { address: AddressModel | null })[]> =>
    this.prisma.patient.findMany({
      where: {
        AND: clause2searchPatients(filters),
      },
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

  count = ({ filters }: patientRepositoryGetInput): PrismaPromise<number> =>
    this.prisma.patient.count({
      where: {
        AND: clause2searchPatients(filters),
      },
    });
}

export { PatientRepository };
