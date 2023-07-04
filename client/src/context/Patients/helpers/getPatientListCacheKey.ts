import { ListPatientsRequestParamsModel } from '../models/ListPatientsRequestParamsModel';

const getPatientListCacheKey = ({
  page,
  search,
}: ListPatientsRequestParamsModel): string =>
  `patient-list/${page}/${search?.name || 'empty'}/${search?.email || 'empty'}`;

export { getPatientListCacheKey };
