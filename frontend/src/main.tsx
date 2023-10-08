import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { UserProvider } from './userContext';

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
