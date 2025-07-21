import React from "react";
import { healthCheck } from "../api/api_calls";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layout/MainLayout";
import AdminPage from "./pages/AdminPage";
import { JournalEntriesContextProvider } from "../context/JournalEntriesContext";
import ProtectedRoute from "./componenets/ProtectedRoute";

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
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <JournalEntriesContextProvider>
                    <DashboardPage />
                  </JournalEntriesContextProvider>
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
              path="/admin"
              element={
                <MainLayout>
                  <AdminPage />
                </MainLayout>
              }
            />
          </Route>
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
