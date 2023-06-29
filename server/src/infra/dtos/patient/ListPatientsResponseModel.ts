import { AddressModel } from "@models/AddressModel";

type ListPatientsResponseModel = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  address: AddressModel | undefined;
};

export { ListPatientsResponseModel };
