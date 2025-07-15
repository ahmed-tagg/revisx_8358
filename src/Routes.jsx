import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import ManuscriptLibrary from "pages/manuscript-library";
import ManuscriptSubmission from "pages/manuscript-submission";
import ManuscriptStatusTracking from "pages/manuscript-status-tracking";
import ProfileManagement from "pages/profile-management";
import AdminPanel from "pages/admin-panel";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manuscript-library" element={<ManuscriptLibrary />} />
        <Route path="/manuscript-submission" element={<ManuscriptSubmission />} />
        <Route path="/manuscript-status-tracking" element={<ManuscriptStatusTracking />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;