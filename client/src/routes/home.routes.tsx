import React from 'react';
import { Home } from '@pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { HomeRoutes };
