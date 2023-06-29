import { patientRepositorysearchFilters } from "@database/repositories/patient/models/mappers/patientRepositoryGetInput";

const clause2searchPatients = (
  filters: patientRepositorysearchFilters
): any => [
  filters && filters.email !== null
    ? {
        email: filters.email,
      }
    : undefined,
  filters && filters.name !== null
    ? {
        name: {
          contains: filters.name,
          mode: "insensitive",
        },
      }
    : undefined,
];

export { clause2searchPatients };
