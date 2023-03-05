import "./App.css";
import Home from "./pages/homePage/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profilepage/Profile";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Conversation from "./pages/Message/Conversation";
function App() {
  const { mode } = useSelector((store) => store.info);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((store) => store.info.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={isAuth && <Home />} />
            <Route path='/messages' element={<Conversation />} />
            <Route path="/profile/:userId" element={isAuth && <Profile />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
