import { SavePatientRequestModel } from "./SavePatientRequestModel";

type UpdatePatientRequestModel = SavePatientRequestModel & {
  id: string;
};

export { UpdatePatientRequestModel };
