import { AddressModel } from "@models/AddressModel";

type SavePatientResponseModel = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  address: AddressModel;
};

export { SavePatientResponseModel };
