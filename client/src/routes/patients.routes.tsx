import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PatientControl } from '@pages/PatientControl';
import { PatientPersistence } from '@pages/PatientPersistence';
import { NotFound } from '@pages/NotFound';

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientControl />}></Route>
      <Route path="/save" element={<PatientPersistence />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { PatientRoutes };
