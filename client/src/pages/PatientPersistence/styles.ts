import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import colors from '../../global/colors';

export const Container = styled('div')`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

export const CustomBox = styled('div')`
  background-color: #fff;
  min-height: 90%;
  height: auto;
  border-radius: 5px;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  justify-content: space-between;
`;

export const BoxHeader = styled('div')`
  display: flex;
  padding: 0 0 1rem 0;
`;

export const PageTitle = styled(Typography)`
  font-size: 2rem;
  color: ${colors.TEXT};
  font-weight: 600;
`;

export const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PersonalDataFirst = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;

export const PersonalDataSecond = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
`;

export const AuxDataFirst = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  column-gap: 1rem;
`;

export const AuxDataSecond = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  column-gap: 1rem;
`;

export const StyledButton = styled(Button)`
  background-color: ${colors.PRIMARY};
  color: #fff;
  transition: 300ms;
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  height: 50px;

  :hover {
    background-color: ${colors.SECONDARY};
  }
`;

export const StyledButtonInverted = styled(Button)`
  background-color: #fff;
  color: ${colors.PRIMARY};
  transition: 300ms;
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  height: 50px;
  border: 1px solid ${colors.PRIMARY};

  :hover {
    background-color: ${colors.GREY};
  }
`;

export const ButtonsContainer = styled('div')`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 1rem;
  padding: 2rem 0 0 0;
`;

export const RequiredFieldsHelp = styled(Typography)`
  font-size: 1rem;
  color: ${colors.TEXT};
  font-weight: 500;
  align-self: flex-end;
`;

export const ContainerCircularProgress = styled('div')`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
