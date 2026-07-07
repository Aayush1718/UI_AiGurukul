import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import BuildingPage from "../pages/BuildingPage";
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