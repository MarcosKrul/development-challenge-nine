import { injectable } from "inversify";

import { SavePatientRequestModel } from "@dtos/patient/SavePatientRequestModel";
import { SavePatientResponseModel } from "@dtos/patient/SavePatientResponseModel";

@injectable()
class SavePatientService {
  public async execute(
    obj: SavePatientRequestModel
  ): Promise<SavePatientResponseModel> {
    console.log(obj);

    return {} as any;
  }
}

export { SavePatientService };
