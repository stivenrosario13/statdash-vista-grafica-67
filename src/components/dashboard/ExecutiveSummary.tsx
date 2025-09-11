
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle } from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';

export function ExecutiveSummary() {
  const { state } = useGlobalData();
  const { metrics, cobros, clients } = state;

  const totalRevenue = cobros.reduce((sum, cobro) => sum + (cobro.amount || cobro.monto || 0), 0);
  const avgDailyRevenue = totalRevenue / 30; // Promedio últimos 30 días
  const growthRate = 12.5; // Ejemplo de crecimiento
  const riskClients = clients.filter(c => c.riskLevel === 'high').length;

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-gray-900 border-2 border-slate-600 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Target className="h-8 w-8" />
          Resumen Ejecutivo - Panel de Control Corporativo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue KPI */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{growthRate}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-green-100 text-sm font-medium">Ingresos Totales</p>
              <p className="text-3xl font-bold">RD$ {totalRevenue.toLocaleString()}</p>
              <p className="text-green-200 text-xs">Promedio diario: RD$ {avgDailyRevenue.toFixed(0)}</p>
            </div>
          </div>

          {/* Clients KPI */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">
                {clients.length > 100 ? 'Alto' : 'Medio'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-blue-100 text-sm font-medium">Cartera de Clientes</p>
              <p className="text-3xl font-bold">{clients.length}</p>
              <p className="text-blue-200 text-xs">Activos: {clients.filter(c => c.status === 'Activo').length}</p>
            </div>
          </div>

          {/* Efficiency KPI */}
          <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">
                Excelente
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-purple-100 text-sm font-medium">Eficiencia Global</p>
              <p className="text-3xl font-bold">{metrics.efficiency.toFixed(1)}%</p>
              <p className="text-purple-200 text-xs">Meta: 85% (Superada)</p>
            </div>
          </div>

          {/* Risk KPI */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">
                {riskClients > 10 ? 'Alto' : 'Bajo'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-orange-100 text-sm font-medium">Clientes de Riesgo</p>
              <p className="text-3xl font-bold">{riskClients}</p>
              <p className="text-orange-200 text-xs">Requieren atención inmediata</p>
            </div>
          </div>
        </div>

        {/* Indicadores Adicionales */}
        <div className="mt-8 pt-8 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Tasa de Recuperación</p>
              <p className="text-2xl font-bold text-white">{metrics.collectionRate?.toFixed(1) || '0.0'}%</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+2.3% vs mes anterior</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Tiempo Promedio de Cobro</p>
              <p className="text-2xl font-bold text-white">18 días</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">-5 días mejora</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Satisfacción del Cliente</p>
              <p className="text-2xl font-bold text-white">94.2%</p>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+1.8% este mes</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
