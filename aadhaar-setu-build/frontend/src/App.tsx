import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Public Dashboards
import PublicInsights from "./pages/dashboards/PublicDashboard";
import PublicAppointments from "./pages/dashboards/PublicAppointments";
import PublicMyAppointments from "./pages/dashboards/PublicMyAppointments";
import PublicGrievance from "./pages/dashboards/PublicGrievance";
import PublicBusinessAI from "./pages/dashboards/PublicBusinessAI";
import PublicHelp from "./pages/dashboards/PublicHelp";

// Officer Dashboards
import BlockDashboard from "./pages/dashboards/BlockDashboard";
import BlockCenterOperations from "./pages/dashboards/BlockCenterOperations";
import BlockAppointments from "./pages/dashboards/BlockAppointments";
import BlockBiometricIssues from "./pages/dashboards/BlockBiometricIssues";
import BlockGrievance from "./pages/dashboards/BlockGrievance";
import BlockAI from "./pages/dashboards/BlockAI";

import DistrictDashboard from "./pages/dashboards/DistrictDashboard";
import DistrictBlockPerformance from "./pages/dashboards/DistrictBlockPerformance";
import DistrictServiceDelivery from "./pages/dashboards/DistrictServiceDelivery";
import DistrictDemandAnalysis from "./pages/dashboards/DistrictDemandAnalysis";
import DistrictGrievanceTrends from "./pages/dashboards/DistrictGrievanceTrends";
import DistrictAI from "./pages/dashboards/DistrictAI";

import StateDashboard from "./pages/dashboards/StateDashboard";
import StateDistrictHeatmap from "./pages/dashboards/StateDistrictHeatmap";
import StateDemographics from "./pages/dashboards/StateDemographics";
import StateInfrastructure from "./pages/dashboards/StateInfrastructure";
import StateCompliance from "./pages/dashboards/StateCompliance";
import StateAI from "./pages/dashboards/StateAI";

import NationalDashboard from "./pages/dashboards/NationalDashboard";
import NationalDemographics from "./pages/dashboards/NationalDemographics";
import NationalDisparity from "./pages/dashboards/NationalDisparity";
import NationalPerformance from "./pages/dashboards/NationalPerformance";
import NationalSimulator from "./pages/dashboards/NationalSimulator";
import NationalAlerts from "./pages/dashboards/NationalAlerts";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

// Utility to clean up potential runtime branding injection
const BrandingCleanup = () => {
  React.useEffect(() => {
    // 1. Title Safety Check
    if (document.title.includes("Lovable")) {
      document.title = "Aadhaar Setu";
    }

    // 2. DOM Cleanup Observer
    const cleanup = () => {
      // Remove specific known Lovable elements if they get injected
      const selector = "[data-lovable-branding], .lovable-badge, a[href*='lovable.dev']";
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());

      // Safety check for meta tags
      const authorMeta = document.querySelector('meta[name="author"][content*="Lovable"]');
      if (authorMeta) authorMeta.remove();
    };

    // Initial run
    cleanup();

    // Observe for dynamic injection
    const observer = new MutationObserver(cleanup);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <BrandingCleanup />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<UserProfile />} />

              {/* Public Dashboard Routes */}
              <Route path="/dashboard/public/insights" element={<PublicInsights />} />
              <Route path="/dashboard/public/appointments" element={<PublicAppointments />} />
              <Route path="/dashboard/public/my-appointments" element={<PublicMyAppointments />} />
              <Route path="/dashboard/public/grievance" element={<PublicGrievance />} />
              <Route path="/dashboard/public/business-ai" element={<PublicBusinessAI />} />
              <Route path="/dashboard/public/help" element={<PublicHelp />} />

              {/* Officer Dashboard Routes */}
              <Route path="/dashboard/block" element={<BlockDashboard />} />
              <Route path="/dashboard/block/operations" element={<BlockCenterOperations />} />
              <Route path="/dashboard/block/appointments" element={<BlockAppointments />} />
              <Route path="/dashboard/block/issues" element={<BlockBiometricIssues />} />
              <Route path="/dashboard/block/grievance" element={<BlockGrievance />} />
              <Route path="/dashboard/block/ai" element={<BlockAI />} />
              <Route path="/dashboard/block/*" element={<BlockDashboard />} />

              <Route path="/dashboard/district" element={<DistrictDashboard />} />
              <Route path="/dashboard/district/performance" element={<DistrictBlockPerformance />} />
              <Route path="/dashboard/district/delivery" element={<DistrictServiceDelivery />} />
              <Route path="/dashboard/district/demand" element={<DistrictDemandAnalysis />} />
              <Route path="/dashboard/district/grievance" element={<DistrictGrievanceTrends />} />
              <Route path="/dashboard/district/ai" element={<DistrictAI />} />
              <Route path="/dashboard/district/*" element={<DistrictDashboard />} />

              <Route path="/dashboard/state" element={<StateDashboard />} />
              <Route path="/dashboard/state/heatmap" element={<StateDistrictHeatmap />} />
              <Route path="/dashboard/state/demographics" element={<StateDemographics />} />
              <Route path="/dashboard/state/infrastructure" element={<StateInfrastructure />} />
              <Route path="/dashboard/state/compliance" element={<StateCompliance />} />
              <Route path="/dashboard/state/ai" element={<StateAI />} />
              <Route path="/dashboard/state/*" element={<StateDashboard />} />

              <Route path="/dashboard/national" element={<NationalDashboard />} />
              <Route path="/dashboard/national/demographics" element={<NationalDemographics />} />
              <Route path="/dashboard/national/disparity" element={<NationalDisparity />} />
              <Route path="/dashboard/national/performance" element={<NationalPerformance />} />
              <Route path="/dashboard/national/simulator" element={<NationalSimulator />} />
              <Route path="/dashboard/national/alerts" element={<NationalAlerts />} />
              <Route path="/dashboard/national/*" element={<NationalDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
