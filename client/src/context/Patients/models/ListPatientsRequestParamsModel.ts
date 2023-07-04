type ListPatientsRequestParamsModel = {
  page: number;
  search?: {
    name: string;
    email: string;
  };
};

export type { ListPatientsRequestParamsModel };
