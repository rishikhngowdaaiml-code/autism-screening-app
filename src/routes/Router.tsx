import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Login from "../pages/Login";
import ParentDashboard from "../pages/ParentDashboard";
import Assessment from "../pages/Assessment";
import Results from "../pages/Results";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ParentDashboard />} />
      <Route path="/assessment/:childId" element={<Assessment />} />
      <Route path="/results/:reportId" element={<Results />} />
    </Routes>
  );
}
