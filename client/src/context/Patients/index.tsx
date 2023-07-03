import React, { useState, createContext, useContext } from 'react';
import { CreatePatientRequestBodyModel } from './models/CreatePatientRequestBodyModel';
import { ApiResponseModel } from '@models/ApiResponseModel';
import { CreatePatientApiResponseModel } from './models/CreatePatientApiResponseModel';
import { api } from '@services/api';
import constants from '@global/constants';
import { useTranslation } from 'react-i18next';
import { GetPatientByIdApiResponseModel } from './models/GetPatientByIdApiResponseModel';
import { ListPatientsApiResponseModel } from './models/ListPatientsApiResponseModel';
import { ListPatientsRequestParamsModel } from './models/ListPatientsRequestParamsModel';
import { PaginatedResponseModel } from '@models/PaginatedResponseModel';

interface PatientsContextData {
  patients: ListPatientsApiResponseModel[];
  count: number;

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
  getPatients(data: ListPatientsRequestParamsModel): Promise<void>;
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
  const [patients, setPatients] = useState<ListPatientsApiResponseModel[]>([]);
  const [count, setCount] = useState<number>(0);

  const create = async (
    data: CreatePatientRequestBodyModel
  ): Promise<ApiResponseModel<CreatePatientApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<CreatePatientApiResponseModel> } =
      await api.post(
        `/patient?lang=${localStorage.getItem(
          constants.LOCALSTORAGE_LANGUAGE
        )}`,
        {
          ...data,
        }
      );

    return response;
  };

  const update = async (
    id: string,
    data: CreatePatientRequestBodyModel
  ): Promise<ApiResponseModel<CreatePatientApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<CreatePatientApiResponseModel> } =
      await api.put(
        `/patient/${id}?lang=${localStorage.getItem(
          constants.LOCALSTORAGE_LANGUAGE
        )}`,
        {
          ...data,
        }
      );

    return response;
  };

  const remove = async (id: string): Promise<ApiResponseModel<boolean>> => {
    const { data: response }: { data: ApiResponseModel<boolean> } =
      await api.delete(
        `/patient/${id}?lang=${localStorage.getItem(
          constants.LOCALSTORAGE_LANGUAGE
        )}`
      );

    return response;
  };

  const getById = async (
    id: string
  ): Promise<ApiResponseModel<GetPatientByIdApiResponseModel>> => {
    const {
      data: response,
    }: { data: ApiResponseModel<GetPatientByIdApiResponseModel> } =
      await api.get(
        `/patient/${id}?lang=${localStorage.getItem(
          constants.LOCALSTORAGE_LANGUAGE
        )}`
      );

    return response;
  };

  const getPatients = async ({
    page,
    size,
    filters,
  }: ListPatientsRequestParamsModel): Promise<void> => {
    const {
      data: response,
    }: {
      data: ApiResponseModel<
        PaginatedResponseModel<ListPatientsApiResponseModel>
      >;
    } = await api.post(
      `/patient/search?page=${page}&size=${size}&lang=${localStorage.getItem(
        constants.LOCALSTORAGE_LANGUAGE
      )}`,
      {
        name: filters?.name || '',
        email: filters?.email || '',
      }
    );

    setPatients(response.content?.items || []);
    setCount(response.content?.totalItems || 0);
  };

  return (
    <PatientsContext.Provider
      value={{
        count,
        patients,
        create,
        update,
        remove,
        getById,
        getPatients,
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

export { usePatients, PatientProvider };
