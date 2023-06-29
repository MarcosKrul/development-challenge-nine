import { inject, injectable } from "inversify";

import { IPatientRepository } from "@database/repositories/patient";
import { transaction } from "@database/transaction";
import { ListPatientsRequestModel } from "@dtos/patient/ListPatientsRequestModel";
import { ListPatientsResponseModel } from "@dtos/patient/ListPatientsResponseModel";
import { AppError } from "@handlers/error/AppError";
import { capitalize } from "@helpers/capitalize";
import { pagination } from "@helpers/pagination";
import { getMessage } from "@helpers/translatedMessagesControl";
import { IPaginationResponse } from "@http/models/IPaginationResponse";
import { IDateProvider } from "@providers/date";
import { IMaskProvider } from "@providers/mask";
import { IValidatorsProvider } from "@providers/validators";

@injectable()
class ListPatientsService {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository,
    @inject("MaskProvider")
    private maskProvider: IMaskProvider,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("ValidatorsProvider")
    private validatorsProvider: IValidatorsProvider
  ) {}

  public async execute({
    page,
    size,
    filters: rawFilters,
  }: ListPatientsRequestModel): Promise<
    IPaginationResponse<ListPatientsResponseModel>
  > {
    if (rawFilters?.email && !this.validatorsProvider.email(rawFilters.email))
      throw new AppError("BAD_REQUEST", getMessage("ErrorEmailInvalid"));

    const filters = {
      name: rawFilters?.name || null,
      email: rawFilters?.email || null,
    };

    const [totalItems, items] = await transaction([
      this.patientRepository.count({ filters }),
      this.patientRepository.get({ filters }, pagination({ page, size })),
    ]);

    return {
      totalItems,
      items: items.map(
        ({ id, name, email, birthDate, address, createdAt, updatedAt }) => ({
          id,
          name,
          email,
          birthDate: this.maskProvider.date(birthDate),
          age: this.dateProvider.differenceInYears(
            this.dateProvider.now(),
            birthDate
          ),
          createdAt: capitalize(this.dateProvider.readableDate(createdAt)),
          updatedAt: capitalize(this.dateProvider.readableDate(updatedAt)),
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
        })
      ),
    };
  }
}

export { ListPatientsService };
