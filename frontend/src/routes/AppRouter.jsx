import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import SignInPage from "../pages/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import BuildingPage from "../pages/BuildingPage.jsx";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="/project/:id"
        element={<BuildingPage />}
      />
    </Routes>
  );
}