import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { Chapter } from './chapter';
import { Profile } from './profile';

export const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chapters" element={<Chapter />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
