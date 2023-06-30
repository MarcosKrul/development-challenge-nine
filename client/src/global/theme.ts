import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';
import colors from './colors';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.PRIMARY,
      },
      secondary: {
        main: colors.SECONDARY,
      },
      error: {
        main: colors.DANGER,
      },
      warning: {
        main: colors.WARNING,
      },
    },
    typography: {
      fontFamily: 'Rubik',
      fontWeightBold: '700',
      fontWeightLight: '300',
      fontWeightMedium: '500',
      fontWeightRegular: '400',
      htmlFontSize: 16,
      allVariants: {
        color: colors.TEXT,
      },
    },
  },
  ptBR
);
