import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import colors from '@global/colors';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface ISideBarHeaderProps {
  handleDrawerClose: () => void;
}

const SideBarHeader = ({ handleDrawerClose }: ISideBarHeaderProps) => {
  return (
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon style={{ color: colors.WHITE }} />
      </IconButton>
    </DrawerHeader>
  );
};

export { SideBarHeader };
