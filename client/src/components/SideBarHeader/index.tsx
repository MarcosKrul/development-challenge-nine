import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import colors from '@global/colors';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        <Tooltip title={t('TOOLTIP_TO_RECALL')}>
          <ChevronLeftIcon style={{ color: colors.WHITE }} />
        </Tooltip>
      </IconButton>
    </DrawerHeader>
  );
};

export { SideBarHeader };
