type CreatePatientApiResponseModel = {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  address: {
    city: string;
    district: string;
    publicArea: string;
    state: string;
    zipCode: string;
    complement?: string;
  };
};

export type { CreatePatientApiResponseModel };
