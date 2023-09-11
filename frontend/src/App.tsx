import { Routes, Route, BrowserRouter, } from "react-router-dom";
import { Auth } from './pages/auth';
import { Home } from "./pages/homepage";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}
