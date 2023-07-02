import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import {
  BoxHeader,
  ButtonsContainer,
  Container,
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

const rows = [
  {
    id: '26919bdf-f85f-4184-96e6-ef0604ce8814',
    name: 'Marcos Krul',
    email: 'marcos@email.com',
    birthDate: '03/06/2000',
    age: 23,
    createdAt: { readableDate: 'Há 4 horas', date: '01/01/2002' },
    updatedAt: { readableDate: 'Este minuto', date: '01/01/2002' },
    address: {
      city: 'Ponta Grossa',
      district: 'Uvaranas',
      publicArea: 'Avenida General Cavalcanti',
      state: 'Paraná',
      zipCode: '84030-000',
    },
  },
];

const PatientControl = () => {
  const { remove } = usePatients();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formMethods = useForm();
  const { handleSubmit } = formMethods;
  const [loading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const onSubmit = async (data: FieldValues): Promise<void> => {
    console.log('trigger search with: ');
    console.log(data);
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

      {rows.length > 0 ? (
        <PatientsTable
          rows={rows}
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
        count={rows.length}
        rowsPerPage={constants.PAGE_SIZE}
        page={page}
        onPageChange={(e, page) => setPage(page)}
      />
    </Container>
  );
};

export { PatientControl };
