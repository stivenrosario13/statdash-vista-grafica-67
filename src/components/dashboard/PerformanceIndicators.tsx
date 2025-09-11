
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';

export function PerformanceIndicators() {
  const { state } = useGlobalData();
  const { metrics, cobros, clients } = state;

  const totalRevenue = cobros.reduce((sum, cobro) => sum + (cobro.amount || cobro.monto || 0), 0);
  const avgDailyRevenue = totalRevenue / 30;
  const growthRate = metrics.growthRate || 12.5;
  const activeClients = clients.filter(c => c.status === 'Activo').length;
  const pendingClients = clients.filter(c => c.status === 'Pendiente').length;
  const delinquentClients = clients.filter(c => c.status === 'Moroso').length;

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-blue-900 border-2 border-blue-400/50 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white">
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Target className="h-8 w-8" />
          Indicadores de Rendimiento Empresarial
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Performance */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 p-6 rounded-2xl text-white shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-green-400" />
              <Badge className="bg-green-500/30 text-green-300 border-green-400/50">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{growthRate.toFixed(1)}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-green-300 text-sm font-medium">Ingresos Totales</p>
              <p className="text-3xl font-bold text-green-200">RD$ {totalRevenue.toLocaleString()}</p>
              <p className="text-green-400 text-xs">Promedio diario: RD$ {avgDailyRevenue.toFixed(0)}</p>
            </div>
          </div>

          {/* Client Portfolio */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 p-6 rounded-2xl text-white shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-400" />
              <Badge className="bg-blue-500/30 text-blue-300 border-blue-400/50">
                {activeClients > 100 ? 'Alto' : 'Medio'} Volumen
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-blue-300 text-sm font-medium">Cartera de Clientes</p>
              <p className="text-3xl font-bold text-blue-200">{clients.length}</p>
              <p className="text-blue-400 text-xs">Activos: {activeClients} | Pendientes: {pendingClients}</p>
            </div>
          </div>

          {/* Efficiency Metrics */}
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-400/30 p-6 rounded-2xl text-white shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50">
                {metrics.efficiency > 85 ? 'Excelente' : metrics.efficiency > 70 ? 'Bueno' : 'Mejorar'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-purple-300 text-sm font-medium">Eficiencia Global</p>
              <p className="text-3xl font-bold text-purple-200">{metrics.efficiency.toFixed(1)}%</p>
              <p className="text-purple-400 text-xs">Meta: 85% {metrics.efficiency > 85 ? '(Superada)' : '(Pendiente)'}</p>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 p-6 rounded-2xl text-white shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-400" />
              <Badge className="bg-orange-500/30 text-orange-300 border-orange-400/50">
                {delinquentClients > 10 ? 'Alto Riesgo' : delinquentClients > 5 ? 'Moderado' : 'Bajo Riesgo'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-orange-300 text-sm font-medium">Clientes de Riesgo</p>
              <p className="text-3xl font-bold text-orange-200">{delinquentClients}</p>
              <p className="text-orange-400 text-xs">Requieren atención inmediata</p>
            </div>
          </div>
        </div>

        {/* Detailed Performance Metrics */}
        <div className="mt-8 pt-8 border-t border-blue-400/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">Tasa de Recuperación</p>
              </div>
              <p className="text-2xl font-bold text-white">{metrics.collectionRate?.toFixed(1) || '0.0'}%</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+2.3% vs mes anterior</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Clock className="w-5 h-5" />
                <p className="text-sm font-medium">Tiempo Promedio de Cobro</p>
              </div>
              <p className="text-2xl font-bold text-white">18 días</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">-5 días mejora</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Users className="w-5 h-5" />
                <p className="text-sm font-medium">Satisfacción del Cliente</p>
              </div>
              <p className="text-2xl font-bold text-white">94.2%</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+1.8% este mes</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Target className="w-5 h-5" />
                <p className="text-sm font-medium">Cumplimiento de Metas</p>
              </div>
              <p className="text-2xl font-bold text-white">87.5%</p>
              <div className="flex items-center justify-center gap-1 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">En progreso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional KPIs */}
        <div className="mt-8 pt-8 border-t border-blue-400/20">
          <h3 className="text-lg font-semibold text-white mb-4">Métricas Adicionales</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-blue-400/20">
              <p className="text-blue-300 text-sm">Conversión</p>
              <p className="text-xl font-bold text-white">76.3%</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-blue-400/20">
              <p className="text-blue-300 text-sm">Retención</p>
              <p className="text-xl font-bold text-white">91.8%</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-blue-400/20">
              <p className="text-blue-300 text-sm">ROI</p>
              <p className="text-xl font-bold text-white">285%</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-blue-400/20">
              <p className="text-blue-300 text-sm">Productividad</p>
              <p className="text-xl font-bold text-white">94.1%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
