type GetPatientByIdResponseModel = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  address: {
    city: string;
    district: string;
    publicArea: string;
    state: string;
    zipCode: string;
    complement: string | null;
  };
};

export { GetPatientByIdResponseModel };
