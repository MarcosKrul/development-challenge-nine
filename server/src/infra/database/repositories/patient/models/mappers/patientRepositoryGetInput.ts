type patientRepositorysearchFilters = {
  name: string | null;
  email: string | null;
} | null;

type patientRepositoryGetInput = {
  filters: patientRepositorysearchFilters;
};

export { patientRepositoryGetInput, patientRepositorysearchFilters };
