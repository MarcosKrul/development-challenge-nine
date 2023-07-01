import styled from '@emotion/styled';
import colors from '@global/colors';
import { Button, Typography } from '@mui/material';

export const Container = styled('div')({
  marginTop: '50px',
});

export const PatientsTableCollapseDataSection = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 0;
`;

export const PatientsTableCollapseText = styled(Typography)`
  font-size: 1rem;

  span {
    font-weight: 600;
  }
`;

export const BoxHeader = styled('div')`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 0 0 2rem 0;
`;

export const TitleAndInputs = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledButton = styled(Button)`
  background-color: ${colors.PRIMARY};
  color: #fff;
  transition: 300ms;
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  height: 56px;

  :hover {
    background-color: ${colors.SECONDARY};
  }
`;

export const PageTitle = styled(Typography)`
  font-size: 2rem;
  color: ${colors.TEXT};
  font-weight: 600;
`;

export const InputsForm = styled('form')`
  display: grid;
  grid-template-columns: 12fr 12fr 1fr;
  gap: 1rem;
`;

export const NoRowsContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const NoRowsText = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
`;
