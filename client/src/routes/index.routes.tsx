import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '@pages/NotFound';
import { Main } from '@pages/Main';
import { HomeRoutes } from './home.routes';
import { PatientRoutes } from './patients.routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/home/*" element={<HomeRoutes />} />
          <Route path="/patients/*" element={<PatientRoutes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
