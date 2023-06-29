import { inject, injectable } from "inversify";

import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { ListPatientsRequestModel } from "@dtos/patient/ListPatientsRequestModel";
import { ListPatientsResponseModel } from "@dtos/patient/ListPatientsResponseModel";
import { pagination } from "@helpers/pagination";
import { IPaginationResponse } from "@http/models/IPaginationResponse";
import { IDateProvider } from "@providers/date";
import { IMaskProvider } from "@providers/mask";

@injectable()
class ListPatientsService {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository,
    @inject("MaskProvider")
    private maskProvider: IMaskProvider,
    @inject("DateProvider")
    private dateProvider: IDateProvider
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
        birthDate: this.maskProvider.date(birthDate),
        age: this.dateProvider.differenceInYears(
          this.dateProvider.now(),
          birthDate
        ),
        address: address
          ? {
              city: address.city,
              complement: address.complement,
              district: address.district,
              publicArea: address.publicArea,
              state: address.state,
              zipCode: this.maskProvider.zipCode(address.zipCode),
            }
          : undefined,
      })),
    };
  }
}

export { ListPatientsService };
