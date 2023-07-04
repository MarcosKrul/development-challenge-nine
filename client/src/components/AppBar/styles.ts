import styled from '@emotion/styled';
import colors from '@global/colors';
import { Typography } from '@mui/material';

export const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CustomText = styled(Typography)({
  color: colors.WHITE,
});
