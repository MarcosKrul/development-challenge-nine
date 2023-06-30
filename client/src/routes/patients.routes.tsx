import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PatientControl } from '@pages/PatientControl';
import { PatientPersistence } from '@pages/PatientPersistence';

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientControl />}></Route>
      <Route path="/save" element={<PatientPersistence />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { PatientRoutes };
