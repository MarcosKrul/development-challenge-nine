import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import constants from '@global/constants';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SideBarHeader } from '@components/SideBarHeader';
import { routes } from '@global/routes';
import { NavItem } from './styles';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const openedMixin = (theme: Theme): CSSObject => ({
  width: constants.SIDE_BAR_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: constants.SIDE_BAR_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface ISideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const SideBar = ({ open, handleDrawerClose }: ISideBarProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <SideBarHeader handleDrawerClose={handleDrawerClose} />
      <Divider />
      <List>
        {routes.map(({ labelKey, path, icon }) => (
          <NavItem to={path} key={labelKey}>
            <ListItem key={labelKey} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon()}
                </ListItemIcon>
                <ListItemText
                  primary={t(labelKey)}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </NavItem>
        ))}
      </List>
    </Drawer>
  );
};

export { SideBar };
