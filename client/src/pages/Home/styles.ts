import styled from '@emotion/styled';
import colors from '@global/colors';
import { Typography } from '@mui/material';

export const Container = styled('div')({
  marginTop: '50px',
});

export const CustomBox = styled('div')`
  background-color: #fff;
  height: 90%;
  border-radius: 5px;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`;

export const CustomText = styled(Typography)`
  font-size: 2rem;
  color: ${colors.TEXT};
  font-weight: 400;
`;
