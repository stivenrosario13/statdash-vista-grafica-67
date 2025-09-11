
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  RefreshCw,
  Activity
} from "lucide-react";
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { InteractiveMetricCard } from './InteractiveMetricCard';
import { useGlobalData } from '@/contexts/GlobalDataContext';
import { EnhancedMetricsDisplay } from './EnhancedMetricsDisplay';
import { RealTimeDataFeed } from './RealTimeDataFeed';

export function EnhancedDashboard() {
  const { state, calculateMetrics } = useGlobalData();
  const { metrics, settings, cobros, clients } = state;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    calculateMetrics();
    setIsRefreshing(false);
  };

  const pieData = [
    { name: 'Efectivo', value: 35, color: '#10B981' },
    { name: 'Transferencia', value: 45, color: '#3B82F6' },
    { name: 'Cheque', value: 15, color: '#F59E0B' },
    { name: 'Tarjeta', value: 5, color: '#EF4444' }
  ];

  const pieColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8 animate-fade-in p-8">
      {/* Enhanced Header Oscuro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold flex items-center gap-3 text-white">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            Dashboard Ejecutivo en Tiempo Real
          </h1>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Sistema Activo
            </Badge>
            <p className="text-blue-200">
              Última actualización: {new Date(state.lastUpdate).toLocaleTimeString('es-DO')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isRefreshing && (
            <Badge className="bg-blue-500/20 text-blue-300 animate-pulse border-blue-400/30">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Actualizando datos...
            </Badge>
          )}
          <Button onClick={handleRefresh} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Enhanced Metrics Display */}
      <EnhancedMetricsDisplay />

      {/* Real-time Data Feed */}
      <RealTimeDataFeed />

      {/* Enhanced Charts Section Oscuro */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="shadow-2xl border-blue-400/30 hover:shadow-3xl transition-shadow duration-300 bg-gradient-to-br from-slate-800 to-blue-900">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white border-b border-blue-400/30">
            <CardTitle className="text-xl font-bold text-white">
              📈 Tendencia de Cobros (14 días)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-slate-800/50">
            <LineChart
              title="Tendencia de Cobros"
              data={metrics.trends.slice(-14)}
              lines={[
                { dataKey: "revenue", stroke: "#3B82F6", name: "Ingresos" },
                { dataKey: "cobros", stroke: "#10B981", name: "Cantidad" }
              ]}
              xAxisDataKey="date"
            />
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-blue-400/30 hover:shadow-3xl transition-shadow duration-300 bg-gradient-to-br from-slate-800 to-blue-900">
          <CardHeader className="bg-gradient-to-r from-green-700 to-emerald-700 text-white border-b border-green-400/30">
            <CardTitle className="text-xl font-bold text-white">
              💳 Métodos de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-slate-800/50">
            <PieChart
              title="Distribución de Métodos de Pago"
              data={pieData}
              colors={pieColors}
            />
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators Oscuro */}
      <Card className="shadow-2xl border-blue-400/30 bg-gradient-to-br from-slate-800 to-blue-900">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-blue-700 text-white">
          <CardTitle className="text-2xl font-bold">
            🎯 Indicadores de Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 bg-gradient-to-br from-slate-800/90 to-blue-900/90">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-700/50 rounded-xl shadow-lg border-l-4 border-blue-500 hover:scale-105 transition-transform backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {cobros.filter(c => {
                  const cobroDate = new Date(c.date || c.fecha);
                  const today = new Date();
                  return cobroDate.toDateString() === today.toDateString();
                }).length}
              </div>
              <div className="font-medium text-white">Cobros Hoy</div>
              <div className="text-xs text-blue-300 mt-1">Registrados</div>
            </div>
            <div className="text-center p-6 bg-slate-700/50 rounded-xl shadow-lg border-l-4 border-green-500 hover:scale-105 transition-transform backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {settings.currency} {cobros.filter(c => {
                  const cobroDate = new Date(c.date || c.fecha);
                  const today = new Date();
                  return cobroDate.toDateString() === today.toDateString();
                }).reduce((sum, c) => sum + (c.amount || c.monto || 0), 0).toLocaleString()}
              </div>
              <div className="font-medium text-white">Recaudado Hoy</div>
              <div className="text-xs text-green-300 mt-1">Hasta el momento</div>
            </div>
            <div className="text-center p-6 bg-slate-700/50 rounded-xl shadow-lg border-l-4 border-purple-500 hover:scale-105 transition-transform backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {metrics.efficiency.toFixed(1)}%
              </div>
              <div className="font-medium text-white">Eficiencia</div>
              <div className="text-xs text-purple-300 mt-1">Del sistema</div>
            </div>
            <div className="text-center p-6 bg-slate-700/50 rounded-xl shadow-lg border-l-4 border-orange-500 hover:scale-105 transition-transform backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {clients.filter(c => c.status === 'Moroso').length}
              </div>
              <div className="font-medium text-white">Clientes Morosos</div>
              <div className="text-xs text-orange-300 mt-1">Requieren atención</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
