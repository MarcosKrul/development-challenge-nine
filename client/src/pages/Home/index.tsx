import React from 'react';
import { Container, CustomBox, CustomText } from './styles';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <CustomBox>
        <CustomText>{t('TEXT_HOME_DESCRIPTION')}</CustomText>
        <CustomText>{t('TEXT_HOME_DEV_BY')}</CustomText>
      </CustomBox>
    </Container>
  );
};

export { Home };
