
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

const Index = () => {
  return (
    <GlobalDataProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
        {/* Patrones de fondo empresariales */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
        
        <div className="relative z-10 space-y-12 p-8 animate-fade-in">
          {/* Hero Section Ultra Empresarial Oscuro */}
          <EnterpriseHero />

          {/* Executive Summary Oscuro */}
          <ExecutiveSummary />

          {/* Dashboard Principal con Diseño Oscuro */}
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                <EnhancedDashboard />
              </div>
            </div>
          </div>

          {/* Performance Indicators Oscuro */}
          <div className="bg-gradient-to-br from-blue-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-blue-300/20 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <PerformanceIndicators />
            </div>
          </div>

          {/* Acciones Rápidas y Notificaciones Mejoradas - Diseño Oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-slide-in-right">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-gradient-to-br from-blue-800/30 to-slate-800/30 backdrop-blur-xl rounded-3xl border border-blue-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <QuickActions />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-cyan-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <SmartNotifications />
                </div>
              </div>
            </div>
          </div>

          {/* Meta Avanzada con diseño oscuro */}
          <div className="animate-scale-in">
            <div className="bg-gradient-to-br from-emerald-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-emerald-300/20 shadow-2xl p-1">
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                <AdvancedGoalTracker />
              </div>
            </div>
          </div>

          {/* Filtros y Notificaciones con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-slide-in-right">
            <div className="col-span-12 lg:col-span-9">
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-purple-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <AdvancedDashboardFilters />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-gradient-to-br from-orange-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-orange-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <RealtimeNotifications />
                </div>
              </div>
            </div>
          </div>

          {/* Métricas Ejecutivas con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-scale-in">
            <div className="col-span-12">
              <div className="bg-gradient-to-br from-indigo-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-indigo-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <ExecutiveMetrics />
                </div>
              </div>
            </div>
          </div>

          {/* Equipos por turnos con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-fade-in-up">
            <div className="col-span-12">
              <div className="bg-gradient-to-br from-teal-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-teal-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <TeamStats />
                </div>
              </div>
            </div>
          </div>

          {/* Métricas en tiempo real y Análisis Predictivo - Diseño Oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-slide-in-right">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-gradient-to-br from-emerald-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-emerald-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <EnhancedRealTimeMetrics />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gradient-to-br from-violet-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-violet-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <PredictiveAnalytics />
                </div>
              </div>
            </div>
          </div>

          {/* Comparación Temporal con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-scale-in">
            <div className="col-span-12">
              <div className="bg-gradient-to-br from-rose-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-rose-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <TemporalComparison />
                </div>
              </div>
            </div>
          </div>

          {/* Análisis de tendencias con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-fade-in-up">
            <div className="col-span-12">
              <div className="bg-gradient-to-br from-amber-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-amber-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <TrendsAnalysis />
                </div>
              </div>
            </div>
          </div>

          {/* Alertas inteligentes con diseño oscuro */}
          <div className="grid grid-cols-12 gap-8 animate-slide-in-right">
            <div className="col-span-12">
              <div className="bg-gradient-to-br from-red-800/30 to-blue-800/30 backdrop-blur-xl rounded-3xl border border-red-300/20 shadow-2xl p-1">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                  <SmartAlerts />
                </div>
              </div>
            </div>
          </div>

          {/* Footer ultra empresarial oscuro */}
          <footer className="mt-20 relative">
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-3xl border border-blue-300/20 shadow-2xl p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-xl">SR</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Steven Rosario Estadísticas
                    </h3>
                    <p className="text-blue-300 font-medium">Soluciones Empresariales Avanzadas</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Tecnología</h4>
                    <p className="text-blue-200 text-sm">Inteligencia Artificial • Machine Learning • Big Data</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Seguridad</h4>
                    <p className="text-blue-200 text-sm">Encriptación End-to-End • ISO 27001 • SOC 2</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Soporte</h4>
                    <p className="text-blue-200 text-sm">24/7 • Tiempo Real • Multicanal</p>
                  </div>
                </div>

                <div className="border-t border-blue-300/20 pt-6">
                  <p className="text-blue-200 text-sm">
                    © 2025 Steven Rosario Estadísticas. Todos los derechos reservados.
                  </p>
                  <div className="flex justify-center gap-6 text-xs text-blue-300 mt-2">
                    <span>Enterprise v4.0.0</span>
                    <span>•</span>
                    <span>Sistema de Gestión Inteligente</span>
                    <span>•</span>
                    <span>Actualización: {new Date().toLocaleDateString('es-DO')}</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </GlobalDataProvider>
  );
};

export default Index;
