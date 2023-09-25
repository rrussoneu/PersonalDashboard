import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Login from "./components/pages/Login"
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import MainLayout from "./components/mainlayout/MainLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="login" element={<Login />} />
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
