import React from "react";
import { healthCheck } from "../api/api_calls";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
function App() {
  healthCheck()
    .then((val) => console.log(val))
    .catch((err) => console.log(err));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
