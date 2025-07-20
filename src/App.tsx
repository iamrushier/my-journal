import React from "react";
import { healthCheck } from "../api/api_calls";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./componenets/Header";
import MainLayout from "./layout/MainLayout";
function App() {
  healthCheck()
    .then((val) => console.log(val))
    .catch((err) => console.log(err));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout>
                <SignupPage />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            }
          />
          <Route
            path="/user"
            element={
              <MainLayout>
                <UserPage />
              </MainLayout>
            }
          />

          <Route
            path="*"
            element={
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
