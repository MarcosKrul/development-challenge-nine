import { BaseRepository } from "src/infra/database/repositories/BaseRepository";

import { patientRepositoryDeleteInput } from "@database/repositories/patient/models/mappers/patientRepositoryDeleteInput";
import { patientRepositoryFindByEmailInput } from "@database/repositories/patient/models/mappers/patientRepositoryFindByEmailInput";
import { patientRepositoryGetByIdInput } from "@database/repositories/patient/models/mappers/patientRepositoryGetByIdInput";
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
        createdAt: true,
        updatedAt: true,
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

  delete = ({
    patientId,
  }: patientRepositoryDeleteInput): PrismaPromise<PatientModel> =>
    this.prisma.patient.delete({
      where: { id: patientId },
    });

  getById = ({
    patientId,
  }: patientRepositoryGetByIdInput): PrismaPromise<PatientModel | null> =>
    this.prisma.patient.findFirst({
      where: { id: patientId },
    });

  findByEmail = ({
    email,
  }: patientRepositoryFindByEmailInput): PrismaPromise<PatientModel | null> =>
    this.prisma.patient.findFirst({
      where: {
        email,
      },
    });

  save = ({
    birthDate,
    email,
    id,
    name,
    createdAt,
    updatedAt,
  }: PatientModel): PrismaPromise<PatientModel> =>
    this.prisma.patient.upsert({
      where: { id },
      create: {
        id,
        name,
        email,
        birthDate,
        createdAt,
        updatedAt,
      },
      update: {
        name,
        birthDate,
        email,
      },
    });
}

export { PatientRepository };
