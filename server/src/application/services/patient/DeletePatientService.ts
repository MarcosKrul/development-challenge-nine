import { injectable } from "inversify";

import { DeletePatientRequestModel } from "@dtos/patient/DeletePatientRequestModel";

@injectable()
class DeletePatientService {
  public async execute(obj: DeletePatientRequestModel): Promise<boolean> {
    console.log(obj);
    return true;
  }
}

export { DeletePatientService };
