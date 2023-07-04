import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { AppBar } from '@components/AppBar';
import { SideBar } from '@components/SideBar';
import colors from '@global/colors';

const Main = () => {
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
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 8,
          backgroundColor: colors.GREY,
          height: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export { Main };
