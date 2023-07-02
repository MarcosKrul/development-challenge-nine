import React, { useState } from 'react';
import { isAfter, isEqual, isValid } from 'date-fns';
import {
  AuxDataFirst,
  AuxDataSecond,
  BoxHeader,
  ButtonsContainer,
  CustomBox,
  Container,
  PageTitle,
  PersonalDataFirst,
  PersonalDataSecond,
  RequiredFieldsHelp,
  StyledButton,
  StyledButtonInverted,
  StyledForm,
} from './styles';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import SectionDivider from '@components/SectionDivider';
import { CustomInput } from '@components/CustomInput';
import { ZipCodeResponseModel } from '@models/ZipCodeResponseModel';
import { useNavigate } from 'react-router-dom';
import { CustomDatePicker } from '@components/CustomDatePicker';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import AsyncInput from '@components/CustomAsyncInput';
import { customAlert } from '@helpers/customAlert';
import { getZipCodeInfos } from '@services/zipCode';
import { CustomSimpleInput } from '@components/CustomSimpleInput';
import { CreatePatientRequestBodyModel } from '@models/patients/CreatePatientRequestBodyModel';

const PatientPersistence = () => {
  const { t } = useTranslation();
  const formMethods = useForm();
  const navigate = useNavigate();
  const { handleSubmit } = formMethods;
  const [loading] = useState<boolean>(false);
  const [inputLoading, setInputLoading] = useState<boolean>(false);
  const [zipCodeInfos, setZipCodeInfos] = useState<ZipCodeResponseModel | null>(
    null
  );

  const onSubmit = async (rawData: FieldValues): Promise<void> => {
    const data: CreatePatientRequestBodyModel = {
      name: rawData.name,
      email: rawData.email,
      birthDate: new Date(rawData.birthDate).toISOString(),
      address: {
        ...zipCodeInfos,
        complement: rawData.address.complement,
      },
    };

    console.log(data);
  };

  const handleZipCodeComplete = async (value: string): Promise<void> => {
    if (value.length < 9) {
      zipCodeInfos && setZipCodeInfos(null);
      return;
    }

    try {
      setInputLoading(true);
      const infos = await getZipCodeInfos(value);
      setZipCodeInfos(infos);
    } catch (err) {
      customAlert({
        icon: 'error',
        title: t('ERROR_GENERIC_TITLE'),
        text: t('ERROR_GET_ZIPCODE_INFOS'),
      });
    } finally {
      setInputLoading(false);
    }
  };

  return (
    <Container>
      <CustomBox>
        <div>
          <BoxHeader>
            <PageTitle>
              {true ? t('LABEL_EDIT_PATIENT') : t('LABEL_CREATE_PAIENT')}
            </PageTitle>
          </BoxHeader>
          <FormProvider {...formMethods}>
            <StyledForm id="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <SectionDivider>{t('LABEL_PERSONAL_DATA')}</SectionDivider>

              <PersonalDataFirst>
                <CustomInput
                  rules={{
                    required: {
                      value: true,
                      message: t('ERROR_NAME_REQUIRED'),
                    },
                  }}
                  name="name"
                  label={t('LABEL_NAME')}
                  required
                />
                <CustomInput
                  required
                  name="email"
                  label={t('LABEL_EMAIL')}
                  rules={{
                    required: {
                      value: true,
                      message: t('ERROR_EMAIL_REQUIRED'),
                    },
                  }}
                />
              </PersonalDataFirst>

              <PersonalDataSecond>
                <CustomDatePicker
                  name="birthDate"
                  required
                  rules={{
                    required: {
                      value: true,
                      message: t('ERROR_BIRTH_DATE_REQUIRED'),
                    },
                    validate: (date) => {
                      if (!isValid(date)) return t('ERROR_BIRTH_DATE_INVALID');

                      date.setHours(0, 0, 0, 0);
                      const currenDate = new Date();
                      currenDate.setHours(0, 0, 0, 0);

                      return (
                        (!isAfter(date, currenDate) &&
                          !isEqual(date, currenDate)) ||
                        t('ERROR_BIRTH_DATE_FUTURE')
                      );
                    },
                  }}
                  label={t('LABEL_BIRTH_DATE')}
                  defaultValue={new Date()}
                />
              </PersonalDataSecond>

              <SectionDivider>{t('LABEL_ADDRESS_DATA')}</SectionDivider>
              <AuxDataFirst>
                <AsyncInput
                  required
                  name="address.zipCode"
                  label={t('LABEL_ZIP_CODE')}
                  onCompleteZipCode={handleZipCodeComplete}
                  inputLoading={inputLoading}
                  defaultValue={''}
                  maxLength={9}
                  mask={(s: string): string =>
                    `${s
                      .replace(/\D/g, '')
                      .replace(/(\d{5})(\d)/, '$1-$2')
                      .replace(/(-\d{3})\d+?$/, '$1')}`
                  }
                />
                <CustomSimpleInput
                  required
                  name="address.city"
                  label={t('LABEL_CITY')}
                  contentEditable={false}
                  value={zipCodeInfos?.city || ''}
                />
                {zipCodeInfos?.zipCode && !zipCodeInfos?.publicArea ? (
                  <CustomInput
                    required
                    name="address.publicArea"
                    label={t('LABEL_PUBLIC_AREA')}
                    rules={{
                      required: {
                        value: true,
                        message: t('ERROR_PUBLIC_AREA_REQUIRED'),
                      },
                      validate: (value) =>
                        (zipCodeInfos?.zipCode && value !== '') ||
                        t('ERROR_PUBLIC_AREA_REQUIRED'),
                    }}
                  />
                ) : (
                  <CustomSimpleInput
                    required
                    name="address.publicArea"
                    label={t('LABEL_PUBLIC_AREA')}
                    contentEditable={false}
                    value={zipCodeInfos?.publicArea}
                  />
                )}
              </AuxDataFirst>
              <AuxDataSecond>
                <CustomSimpleInput
                  required
                  name="address.state"
                  label={t('LABEL_STATE')}
                  contentEditable={false}
                  value={zipCodeInfos?.state}
                />
                {zipCodeInfos?.zipCode && !zipCodeInfos?.district ? (
                  <CustomInput
                    required
                    name="address.district"
                    label={t('LABEL_DISTRICT')}
                    contentEditable={false}
                    rules={{
                      required: {
                        value: true,
                        message: t('ERROR_DISTRICT_REQUIRED'),
                      },
                      validate: (value) =>
                        (zipCodeInfos?.zipCode && value !== '') ||
                        t('ERROR_DISTRICT_REQUIRED'),
                    }}
                    value={zipCodeInfos?.district}
                  />
                ) : (
                  <CustomSimpleInput
                    required
                    name="address.district"
                    label={t('LABEL_DISTRICT')}
                    contentEditable={false}
                    value={zipCodeInfos?.district}
                  />
                )}
                <CustomInput
                  name="address.complement"
                  label={t('LABEL_COMPLEMENT')}
                />
              </AuxDataSecond>
            </StyledForm>
          </FormProvider>
        </div>

        <ButtonsContainer>
          <RequiredFieldsHelp>{t('TEXT_REQUIRED_FIELDS')}</RequiredFieldsHelp>
          <StyledButton
            type="submit"
            form="form"
            style={{ gridColumnStart: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: '#FFF' }} />
            ) : (
              t('BUTTON_SAVE')
            )}
          </StyledButton>
          <StyledButtonInverted
            disabled={loading}
            onClick={() => navigate('/patients', { replace: true })}
            style={{ gridColumnStart: 3 }}
          >
            {t('BUTTON_CANCEL')}
          </StyledButtonInverted>
        </ButtonsContainer>
      </CustomBox>
    </Container>
  );
};

export { PatientPersistence };
