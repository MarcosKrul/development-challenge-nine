import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import constants from '@global/constants';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { LanguageSelector } from '@components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Container, CustomText } from './styles';
import colors from '@global/colors';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: constants.SIDE_BAR_WIDTH,
    width: `calc(100% - ${constants.SIDE_BAR_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface IAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = ({ handleDrawerOpen, open }: IAppBarProps) => {
  const { t } = useTranslation();

  return (
    <DrawerHeader position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon style={{ color: colors.WHITE }} />
        </IconButton>
        <Container>
          <CustomText variant="h6">{t('LABEL_HEADER')}</CustomText>
          <LanguageSelector />
        </Container>
      </Toolbar>
    </DrawerHeader>
  );
};

export { AppBar };
