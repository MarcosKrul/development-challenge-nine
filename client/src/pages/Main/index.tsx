import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { AppBar } from '@components/AppBar';
import { SideBarHeader } from '@components/SideBarHeader';
import { SideBar } from '@components/SideBar';

const Main = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        open={open}
        theme={theme}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SideBarHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export { Main };
