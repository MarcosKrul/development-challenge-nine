import { inject, injectable } from "inversify";
import { IPatientRepository } from "src/infra/database/repositories/patient";
import { transaction } from "src/infra/database/transaction";

import { ListPatientsRequestModel } from "@dtos/patient/ListPatientsRequestModel";
import { ListPatientsResponseModel } from "@dtos/patient/ListPatientsResponseModel";
import { pagination } from "@helpers/pagination";
import { IPaginationResponse } from "@http/models/IPaginationResponse";

@injectable()
class ListPatientsService {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ) {}

  public async execute({
    page,
    size,
  }: ListPatientsRequestModel): Promise<
    IPaginationResponse<ListPatientsResponseModel>
  > {
    const [totalItems, items] = await transaction([
      this.patientRepository.count({ filters: null }),
      this.patientRepository.get({ filters: null }, pagination({ page, size })),
    ]);

    return {
      totalItems,
      items: items.map(({ id, name, email, birthDate, address }) => ({
        id,
        name,
        email,
        birthDate: birthDate.toISOString(),
        age: 11,
        address: address
          ? {
              city: address?.city,
              complement: address?.complement,
              district: address?.district,
              publicArea: address?.publicArea,
              state: address?.state,
              zipCode: address?.zipCode,
            }
          : undefined,
      })),
    };
  }
}

export { ListPatientsService };
