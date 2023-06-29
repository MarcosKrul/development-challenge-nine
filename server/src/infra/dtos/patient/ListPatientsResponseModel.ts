import { AddressModel } from "@models/AddressModel";

type ListPatientsResponseModel = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  age: number;
  address: AddressModel | undefined;
};

export { ListPatientsResponseModel };
