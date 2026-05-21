import { EnhancedDashboard } from "@/components/dashboard/EnhancedDashboard";
import { TeamStats } from "@/components/dashboard/TeamStats";
import { EnhancedRealTimeMetrics } from "@/components/dashboard/EnhancedRealTimeMetrics";
import { TrendsAnalysis } from "@/components/dashboard/TrendsAnalysis";
import { SmartAlerts } from "@/components/dashboard/SmartAlerts";
import { PredictiveAnalytics } from "@/components/dashboard/PredictiveAnalytics";
import { AdvancedDashboardFilters } from "@/components/dashboard/AdvancedDashboardFilters";
import { TemporalComparison } from "@/components/dashboard/TemporalComparison";
import { ExecutiveMetrics } from "@/components/dashboard/ExecutiveMetrics";
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications";
import { SmartNotifications } from "@/components/dashboard/SmartNotifications";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AdvancedGoalTracker } from "@/components/dashboard/AdvancedGoalTracker";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";
import { EnterpriseHero } from "@/components/dashboard/EnterpriseHero";
import { ExecutiveSummary } from "@/components/dashboard/ExecutiveSummary";
import { PerformanceIndicators } from "@/components/dashboard/PerformanceIndicators";

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl shadow-sm">
    {children}
  </div>
);

const Index = () => {
  return (
    <GlobalDataProvider>
      <div className="min-h-screen bg-background">
        <div className="space-y-6 p-6">
          <Section><EnterpriseHero /></Section>
          <Section><ExecutiveSummary /></Section>
          <Section><EnhancedDashboard /></Section>
          <Section><PerformanceIndicators /></Section>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8"><Section><QuickActions /></Section></div>
            <div className="col-span-12 lg:col-span-4"><Section><SmartNotifications /></Section></div>
          </div>

          <Section><AdvancedGoalTracker /></Section>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9"><Section><AdvancedDashboardFilters /></Section></div>
            <div className="col-span-12 lg:col-span-3"><Section><RealtimeNotifications /></Section></div>
          </div>

          <Section><ExecutiveMetrics /></Section>
          <Section><TeamStats /></Section>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8"><Section><EnhancedRealTimeMetrics /></Section></div>
            <div className="col-span-12 lg:col-span-4"><Section><PredictiveAnalytics /></Section></div>
          </div>

          <Section><TemporalComparison /></Section>
          <Section><TrendsAnalysis /></Section>
          <Section><SmartAlerts /></Section>

          <footer className="bg-card border border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
            © 2025 Steven Rosario Estadísticas · ERP Pro v4.0.0
          </footer>
        </div>
      </div>
    </GlobalDataProvider>
  );
};

export default Index;
