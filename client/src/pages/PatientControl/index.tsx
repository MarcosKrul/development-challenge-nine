import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BoxHeader,
  ButtonsContainer,
  Container,
  CustomBox,
  InputsForm,
  NoRowsContainer,
  NoRowsText,
  PageTitle,
  StyledButton,
  TitleAndInputs,
} from './styles';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { CustomInput } from '@components/CustomInput';
import { customAlert } from '@helpers/customAlert';
import colors from '@global/colors';
import { PatientsTable } from './PatientsTable';
import { TablePagination } from '@mui/material';
import constants from '@global/constants';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '@context/Patients';
import { customToast } from '@helpers/customToast';

const PatientControl = () => {
  const {
    remove,
    count,
    patients,
    setSearchPatientsFilters,
    filters,
    fetchingPatients,
    errorAtPatientsFetching,
    invalidateCache,
  } = usePatients();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formMethods = useForm();
  const { handleSubmit, setValue, getValues } = formMethods;

  useEffect(() => {
    setValue('search_filter_name', filters.search?.name || '');
    setValue('search_filter_email', filters.search?.email || '');

    onSubmit({
      search_filter_email: filters.search?.email || '',
      search_filter_name: filters.search?.name || '',
    });
  }, [filters.page]);

  const onSubmit = (data: FieldValues): void => {
    setSearchPatientsFilters({
      page: filters.page,
      search: {
        email: data.search_filter_email || '',
        name: data.search_filter_name || '',
      },
    });

    if (errorAtPatientsFetching) setValue('search_filter_name', '');
  };

  const confirmDeletePopUp = (id: string): void => {
    customAlert({
      title: t('TITLE_POPUP_DELETE'),
      text: t('TEXT_POPUP_DELETE'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.DANGER,
      cancelButtonColor: colors.GREY,
      confirmButtonText: t('BUTTON_DELETAR'),
      cancelButtonText: `<span style="color: #000;"> ${t(
        'BUTTON_CANCEL'
      )}</span>`,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const { message } = await remove(id);
      customToast({
        text: t(message),
      });
      await invalidateCache(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      customAlert({
        title: t('ERROR_GENERIC_TITLE'),
        text: e.response?.data?.message || t('ERROR_GENERIC_API_RESPONSE'),
        icon: 'error',
      });
    }
  };

  const handleEdit = (id: string): void => {
    navigate('/patients/save', { state: { id } });
  };

  return (
    <Container>
      <CustomBox>
        <BoxHeader>
          <TitleAndInputs>
            <PageTitle>{t('TITLE_PATIENTS_CONTROL')}</PageTitle>
            <FormProvider {...formMethods}>
              <InputsForm id="search" onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  name="search_filter_name"
                  label={t('LABEL_NAME')}
                  size="medium"
                  endFunction="clear"
                />
                <CustomInput
                  name="search_filter_email"
                  label={t('LABEL_EMAIL')}
                  size="medium"
                  endFunction="clear"
                />
              </InputsForm>
            </FormProvider>
          </TitleAndInputs>
          <ButtonsContainer>
            <StyledButton
              disabled={fetchingPatients}
              onClick={() => navigate('/patients/save')}
            >
              {t('BUTTON_ADD')}
            </StyledButton>
            <StyledButton
              disabled={fetchingPatients}
              form="search"
              type="submit"
            >
              {t('BUTTON_SEARCH')}
            </StyledButton>
          </ButtonsContainer>
        </BoxHeader>

        {count > 0 ? (
          <PatientsTable
            rows={patients}
            editFn={handleEdit}
            deleteFn={confirmDeletePopUp}
          />
        ) : (
          <NoRowsContainer>
            <NoRowsText>{t('TEXT_PATIENT_EMPTY_LIST')}</NoRowsText>
          </NoRowsContainer>
        )}

        {count > 0 ? (
          <TablePagination
            sx={{ overflow: 'hidden', minHeight: 60 }}
            rowsPerPageOptions={[]}
            component="div"
            count={count}
            nextIconButtonProps={{ title: t('TOOLTIP_NEXT') }}
            backIconButtonProps={{ title: t('TOOLTIP_BACK') }}
            rowsPerPage={constants.PAGE_SIZE}
            page={filters.page}
            onPageChange={(e, page) => {
              const values = getValues();

              setSearchPatientsFilters({
                page,
                search: {
                  email: values.search_filter_email,
                  name: values.search_filter_name,
                },
              });
            }}
          />
        ) : null}
      </CustomBox>
    </Container>
  );
};

export { PatientControl };
