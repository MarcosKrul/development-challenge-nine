type CreatePatientApiResponseModel = {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  age: number;
  createdAt: {
    date: string;
    readableDate: string;
  };
  updatedAt: {
    date: string;
    readableDate: string;
  };
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
