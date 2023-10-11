import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { UserProvider } from './userContext';
import sessionAPI from './services/sessionStorageAPI';

interface ProtectedRouteProps {
  children: React.ReactNode | any;
  redirectPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps>  = ({
  redirectPath = '/',
  children,
}) => {
  if (!sessionAPI.getToken()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const App = () => {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="dashboard/*"
            element={
              <ProtectedRoute redirectPath={'/'}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
