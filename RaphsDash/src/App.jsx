import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import MainLayout from "./components/mainlayout/MainLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Register from "./components/pages/Register";
import { Navigate } from "react-router-dom";
import LoginRegister from "./components/pages/LoginRegister";

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("accessToken");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn() ? <Navigate to="/main/home" /> : <LoginRegister />}
            />
            <Route
              path="login"
              element={isLoggedIn() ? <Navigate to="/main/home" /> : <LoginRegister />}
            />
            <Route path="register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="main/*" element={<MainLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
