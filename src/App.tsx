
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "./components/auth/AuthGuard";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import BarCharts from "./pages/BarCharts";
import LineCharts from "./pages/LineCharts";
import PieCharts from "./pages/PieCharts";
import EmployeesPage from "./pages/EmployeesPage";
import CobrosPage from "./pages/CobrosPage";
import HistoryPage from "./pages/HistoryPage";
import ClientsPage from "./pages/ClientsPage";
import ClientAssignmentPage from "./pages/ClientAssignmentPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import EmailPage from "./pages/EmailPage";
import ReportsPage from "./pages/ReportsPage";
import PaymentsPage from "./pages/PaymentsPage";
import InvoiceTemplatesPage from "./pages/InvoiceTemplatesPage";
import ClientSupportPage from "./pages/ClientSupportPage";
import NotFound from "./pages/NotFound";
import AnalyticsPage from "./pages/AnalyticsPage";
import OperationsPage from "./pages/OperationsPage";
import PortfolioPage from "./pages/PortfolioPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <AuthGuard>
                <DashboardLayout />
              </AuthGuard>
            }>
              <Route index element={<Index />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="operations" element={<OperationsPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="bar-charts" element={<BarCharts />} />
              <Route path="line-charts" element={<LineCharts />} />
              <Route path="pie-charts" element={<PieCharts />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="cobros" element={<CobrosPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="client-assignment" element={<ClientAssignmentPage />} />
              <Route path="whatsapp" element={<WhatsAppPage />} />
              <Route path="email" element={<EmailPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="invoice-templates" element={<InvoiceTemplatesPage />} />
              <Route path="client-support" element={<ClientSupportPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
