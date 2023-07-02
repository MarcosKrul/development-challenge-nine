type CreatePatientRequestBodyModel = {
  name?: string;
  email?: string;
  birthDate?: string;
  address?: {
    city?: string;
    district?: string;
    publicArea?: string;
    state?: string;
    zipCode?: string;
    complement?: string;
  };
};

export type { CreatePatientRequestBodyModel };
