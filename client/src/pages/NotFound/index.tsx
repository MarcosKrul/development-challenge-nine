import React from 'react';
import {
  Container,
  LogoAndMain,
  LogoContainer,
  MainText,
  MainTextContainer,
  MainTitle,
  SecondarySection,
  SecondaryText,
  StyledButton,
} from './styles';
import logo from '@assets/logo-medcloud.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <LogoAndMain>
        <LogoContainer src={logo} />
        <MainTextContainer>
          <MainTitle>404</MainTitle>
          <MainText>{t('TEXT_NOT_FOUND_PAGE_TITLE')}</MainText>
        </MainTextContainer>
      </LogoAndMain>

      <SecondarySection>
        <SecondaryText>{t('TEXT_GO_HOME')}</SecondaryText>
        <StyledButton onClick={() => navigate('/')}>
          {t('BUTTON_GO_HOME')}
        </StyledButton>
      </SecondarySection>
    </Container>
  );
};

export { NotFound };
