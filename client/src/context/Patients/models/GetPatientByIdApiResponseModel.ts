type GetPatientByIdApiResponseModel = {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  address: {
    city: string;
    complement: string | null;
    district: string;
    publicArea: string;
    state: string;
    zipCode: string;
  };
};

export type { GetPatientByIdApiResponseModel };
