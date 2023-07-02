import React, { createContext, useContext } from 'react';
import { CreatePatientRequestBodyModel } from './models/CreatePatientRequestBodyModel';
import { ApiResponseModel } from '@models/ApiResponseModel';
import { CreatePatientApiResponseModel } from './models/CreatePatientApiResponseModel';
import { api } from '@services/api';
import constants from '@global/constants';
import { useTranslation } from 'react-i18next';

interface PatientsContextData {
  create: (
    data: CreatePatientRequestBodyModel
  ) => Promise<ApiResponseModel<CreatePatientApiResponseModel>>;
  remove: (id: string) => Promise<ApiResponseModel<boolean>>;
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

  const remove = async (id: string): Promise<ApiResponseModel<boolean>> => {
    const { data: response }: { data: ApiResponseModel<boolean> } =
      await api.delete(`/patient/${id}`);

    return response;
  };

  return (
    <PatientsContext.Provider
      value={{
        create,
        remove,
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
