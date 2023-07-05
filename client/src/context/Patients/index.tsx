import React, { useState, createContext, useContext } from 'react';
import { CreatePatientRequestBodyModel } from './models/CreatePatientRequestBodyModel';
import { ApiResponseModel } from '@models/ApiResponseModel';
import { CreatePatientApiResponseModel } from './models/CreatePatientApiResponseModel';
import { api } from '@services/api';
import { useTranslation } from 'react-i18next';
import { GetPatientByIdApiResponseModel } from './models/GetPatientByIdApiResponseModel';
import { ListPatientsApiResponseModel } from './models/ListPatientsApiResponseModel';
import { ListPatientsRequestParamsModel } from './models/ListPatientsRequestParamsModel';
import { PaginatedResponseModel } from '@models/PaginatedResponseModel';
import { useQuery, useQueryClient } from 'react-query';
import { getLangHttpQuery } from '@helpers/getLangHttpQuery';
import constants from '@global/constants';
import { customAlert } from '@helpers/customAlert';
import { getPatientListCacheKey } from './helpers/getPatientListCacheKey';

interface PatientsContextData {
  patients: ListPatientsApiResponseModel[];
  count: number;
  filters: ListPatientsRequestParamsModel;
  fetchingPatients: boolean;
  errorAtPatientsFetching: boolean;

  invalidateCache: () => Promise<void>;
  updateCache: (
    getNewListFn: (
      list: ListPatientsApiResponseModel[]
    ) => ListPatientsApiResponseModel[]
  ) => void;

  create: (
    data: CreatePatientRequestBodyModel
  ) => Promise<ApiResponseModel<CreatePatientApiResponseModel>>;
  update: (
    id: string,
    data: CreatePatientRequestBodyModel
  ) => Promise<ApiResponseModel<CreatePatientApiResponseModel>>;
  remove: (id: string) => Promise<ApiResponseModel<boolean>>;
  getById: (
    id: string
  ) => Promise<ApiResponseModel<GetPatientByIdApiResponseModel>>;
  setSearchPatientsFilters(data: ListPatientsRequestParamsModel): void;
}

interface PatientProviderProps {
  children: React.ReactElement;
}

const PatientsContext = createContext<PatientsContextData>(
  {} as PatientsContextData
);

const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}: PatientProviderProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [count, setCount] = useState<number>(0);
  const [filters, setFilters] = useState<ListPatientsRequestParamsModel>({
    page: 0,
    search: undefined,
  });

  const {
    data: patients,
    isFetching,
    error: errorAtPatientsFetching,
  } = useQuery<ListPatientsApiResponseModel[]>(
    getPatientListCacheKey(filters),
    async () => {
      try {
        const {
          data: response,
        }: {
          data: ApiResponseModel<
            PaginatedResponseModel<ListPatientsApiResponseModel>
          >;
        } = await api.post(
          `/patient/search?page=${filters.page}&size=${
            constants.PAGE_SIZE
          }&${getLangHttpQuery()}`,
          {
            name: filters.search?.name || '',
            email: filters.search?.email || '',
          }
        );
        setCount(response.content?.totalItems || 0);
        return response.content?.items || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        customAlert({
          title: t('ERROR_GENERIC_TITLE'),
          text: e.response?.data?.message || t('ERROR_GENERIC_API_RESPONSE'),
          icon: 'error',
        });

        setCount(0);
        return [];
      }
    },
    {
      refetchOnWindowFocus: true,
      staleTime: constants.MILLIS_TO_SWR_PATIENTS_DATA,
    }
  );

  const create = async (
    data: CreatePatientRequestBodyModel
  ): Promise<ApiResponseModel<CreatePatientApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<CreatePatientApiResponseModel> } =
      await api.post(`/patient?${getLangHttpQuery()}`, {
        ...data,
      });

    return response;
  };

  const update = async (
    id: string,
    data: CreatePatientRequestBodyModel
  ): Promise<ApiResponseModel<CreatePatientApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<CreatePatientApiResponseModel> } =
      await api.put(`/patient/${id}?${getLangHttpQuery()}`, {
        ...data,
      });

    return response;
  };

  const remove = async (id: string): Promise<ApiResponseModel<boolean>> => {
    const { data: response }: { data: ApiResponseModel<boolean> } =
      await api.delete(`/patient/${id}?${getLangHttpQuery()}`);

    return response;
  };

  const getById = async (
    id: string
  ): Promise<ApiResponseModel<GetPatientByIdApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<GetPatientByIdApiResponseModel> } =
      await api.get(`/patient/${id}?${getLangHttpQuery()}`);

    return response;
  };

  const invalidateCache = async (): Promise<void> => {
    await queryClient.invalidateQueries([getPatientListCacheKey(filters)]);
  };

  const updateCache = (
    getNewListFn: (
      list: ListPatientsApiResponseModel[]
    ) => ListPatientsApiResponseModel[]
  ): void => {
    const previousPage = queryClient.getQueryData<
      ListPatientsApiResponseModel[]
    >(getPatientListCacheKey(filters));

    if (!previousPage) return;

    queryClient.setQueryData(
      getPatientListCacheKey(filters),
      getNewListFn(previousPage)
    );
  };

  return (
    <PatientsContext.Provider
      value={{
        count,
        invalidateCache,
        updateCache,
        errorAtPatientsFetching: !!errorAtPatientsFetching,
        fetchingPatients: isFetching,
        filters,
        patients: patients || [],
        create,
        update,
        remove,
        getById,
        setSearchPatientsFilters: setFilters,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

const usePatients = (): PatientsContextData => {
  const { t } = useTranslation();
  const context = useContext(PatientsContext);

  if (!context) throw new Error(t('ERROR_HOOK_INVALID_USE'));

  return context;
};

export { usePatients, PatientProvider, getPatientListCacheKey };
