import { injectable } from "inversify";

import { ListPatientsRequestModel } from "@dtos/patient/ListPatientsRequestModel";
import { ListPatientsResponseModel } from "@dtos/patient/ListPatientsResponseModel";
import { IPaginationResponse } from "@http/models/IPaginationResponse";

@injectable()
class ListPatientsService {
  public async execute(
    obj: ListPatientsRequestModel
  ): Promise<IPaginationResponse<ListPatientsResponseModel>> {
    console.log(obj);

    return {
      totalItems: 0,
      items: [],
    };
  }
}

export { ListPatientsService };
