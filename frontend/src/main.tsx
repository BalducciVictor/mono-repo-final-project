import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { UserProvider, useUser } from './userContext';
import { UserState } from './type/usertype';

interface ProtectedRouteProps {
  children: React.ReactNode | any;
  redirectPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps>  = ({
  redirectPath = '/',
  children,
}) => {
  const { user } = useUser();
  if (user.token == null) {
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
            path="dashboard"
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
