import React from 'react';
import { Home } from '@pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@pages/NotFound';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { HomeRoutes };
