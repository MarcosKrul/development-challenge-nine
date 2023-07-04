import React, { useEffect, useState } from 'react';

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
  const { remove, count, patients, getPatients } = usePatients();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    (async () => {
      await onSubmit({
        search_filter_email: '',
        search_filter_name: '',
      });
    })();
  }, [page]);

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      setLoading(true);
      await getPatients({
        page,
        size: constants.PAGE_SIZE,
        filters: {
          email: data.search_filter_email,
          name: data.search_filter_name,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setValue('search_filter_email', '');

      customAlert({
        title: t('ERROR_GENERIC_TITLE'),
        text: e.response?.data?.message || t('ERROR_GENERIC_API_RESPONSE'),
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              onClick={() => navigate('/patients/save')}
            >
              {t('BUTTON_ADD')}
            </StyledButton>
            <StyledButton disabled={loading} form="search" type="submit">
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

        <TablePagination
          sx={{ overflow: 'hidden', minHeight: 60 }}
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={constants.PAGE_SIZE}
          page={page}
          onPageChange={(e, page) => setPage(page)}
        />
      </CustomBox>
    </Container>
  );
};

export { PatientControl };
