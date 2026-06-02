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

import { Receipt } from "lucide-react";

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="enterprise-card enterprise-card-hover overflow-hidden">
    {children}
  </div>
);

const Index = () => {
  return (
    <GlobalDataProvider>
      <div className="space-y-6">
        {/* Header empresarial unificado */}
        <div className="enterprise-card relative overflow-hidden p-6">
          <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Receipt className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  Gestión Comercial · StatDash
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Facturación
                </h1>
                <p className="text-sm text-muted-foreground">
                  Métricas, KPIs y análisis ejecutivo en tiempo real
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
              Conectado con <span className="font-semibold text-primary">Tesorería · CxC · Contabilidad · Reportes</span>
            </div>
          </div>
        </div>

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

        <footer className="enterprise-card p-6 text-center text-sm text-muted-foreground">
          © 2025 ERP Pro · Sistema integrado de gestión empresarial
        </footer>
      </div>
    </GlobalDataProvider>
  );
};

export default Index;

