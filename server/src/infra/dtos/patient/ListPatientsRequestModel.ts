import { IPaginationOptions } from "@http/models/IPaginationOptions";

type ListPatientsRequestModel = IPaginationOptions<{
  name: string | null;
  email: string | null;
}>;

export { ListPatientsRequestModel };
