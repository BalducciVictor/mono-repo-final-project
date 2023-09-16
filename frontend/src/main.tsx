import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
