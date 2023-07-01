type ListPatientsResponseModel = {
  id: string;
  name: string;
  email: string;
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
  address:
    | {
        city: string;
        district: string;
        publicArea: string;
        state: string;
        zipCode: string;
        complement: string | undefined;
      }
    | undefined;
};

export { ListPatientsResponseModel };
