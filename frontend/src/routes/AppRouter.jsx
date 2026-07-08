import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import BuildingPage from "../pages/BuildingPage.jsx";
import CallbackPage from "../pages/CallbackPage.jsx";
import CompleteProfilePage from "../pages/CompleteProfilePage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import FeasibilityAnalysisPage from "../pages/FeasibilityAnalysisPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/complete-profile" element={<CompleteProfilePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <BuildingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feasibility"
        element={
          <ProtectedRoute>
            <FeasibilityAnalysisPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}