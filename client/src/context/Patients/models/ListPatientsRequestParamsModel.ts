type ListPatientsRequestParamsModel = {
  page: number;
  size: number;
  filters?: {
    name?: string;
    email?: string;
  };
};

export type { ListPatientsRequestParamsModel };
