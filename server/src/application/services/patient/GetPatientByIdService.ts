import { injectable } from "inversify";

import { GetPatientByIdRequestModel } from "@dtos/patient/GetPatientByIdRequestModel";
import { GetPatientByIdResponseModel } from "@dtos/patient/GetPatientByIdResponseModel";

@injectable()
class GetPatientByIdService {
  public async execute(
    obj: GetPatientByIdRequestModel
  ): Promise<GetPatientByIdResponseModel> {
    console.log(obj);

    return {} as any;
  }
}

export { GetPatientByIdService };
