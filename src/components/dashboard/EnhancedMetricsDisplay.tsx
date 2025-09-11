
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Activity,
  Clock,
  BarChart3
} from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';

export function EnhancedMetricsDisplay() {
  const { state } = useGlobalData();
  const { metrics, settings } = state;

  const metricsCards = [
    {
      title: 'Ingresos Totales',
      value: `${settings.currency} ${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
      trend: metrics.growthRate,
      description: 'Total acumulado del período'
    },
    {
      title: 'Total de Cobros',
      value: metrics.totalCobros,
      icon: BarChart3,
      color: 'blue',
      trend: 15.3,
      description: 'Transacciones procesadas'
    },
    {
      title: 'Promedio por Cobro',
      value: `${settings.currency} ${metrics.avgAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: 'purple',
      trend: 8.7,
      description: 'Valor promedio de transacciones'
    },
    {
      title: 'Clientes Activos',
      value: metrics.activeClients,
      icon: Users,
      color: 'orange',
      trend: 12.1,
      description: 'Cartera de clientes activa'
    },
    {
      title: 'Eficiencia',
      value: `${metrics.efficiency.toFixed(1)}%`,
      icon: Target,
      color: 'teal',
      trend: 5.4,
      description: 'Eficiencia operativa del sistema'
    },
    {
      title: 'Actividad Reciente',
      value: state.cobros.filter(c => {
        const cobroDate = new Date(c.date || c.fecha);
        const today = new Date();
        return cobroDate.toDateString() === today.toDateString();
      }).length,
      icon: Activity,
      color: 'indigo',
      trend: 0,
      description: 'Cobros registrados hoy'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-50 to-green-100 border-green-200 text-green-600',
      blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
      purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
      orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
      teal: 'from-teal-50 to-teal-100 border-teal-200 text-teal-600',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const monthlyProgress = (metrics.totalRevenue / settings.goals.monthly) * 100;
  const dailyProgress = (state.cobros.filter(c => {
    const cobroDate = new Date(c.date || c.fecha);
    const today = new Date();
    return cobroDate.toDateString() === today.toDateString();
  }).reduce((sum, c) => sum + (c.amount || c.monto || 0), 0) / settings.goals.daily) * 100;

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsCards.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = getColorClasses(metric.color);
          
          return (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${colorClasses} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mb-2">
                      {metric.value}
                    </p>
                    
                    {metric.trend !== 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        {metric.trend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <Badge 
                          className={`${
                            metric.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          } font-bold`}
                        >
                          {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-sm">{metric.description}</p>
                  </div>
                  
                  <div className={`bg-${metric.color}-500 p-4 rounded-full shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Goals Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Progreso Meta Mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {settings.currency} {metrics.totalRevenue.toLocaleString()}
              </span>
              <Badge className={`${
                monthlyProgress >= 100 ? 'bg-green-500' : 
                monthlyProgress >= 75 ? 'bg-blue-500' : 
                monthlyProgress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              } text-white`}>
                {monthlyProgress.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={Math.min(monthlyProgress, 100)} className="h-3" />
            <p className="text-sm text-gray-600">
              Meta: {settings.currency} {settings.goals.monthly.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Progreso Meta Diaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {settings.currency} {state.cobros.filter(c => {
                  const cobroDate = new Date(c.date || c.fecha);
                  const today = new Date();
                  return cobroDate.toDateString() === today.toDateString();
                }).reduce((sum, c) => sum + (c.amount || c.monto || 0), 0).toLocaleString()}
              </span>
              <Badge className={`${
                dailyProgress >= 100 ? 'bg-green-500' : 
                dailyProgress >= 75 ? 'bg-blue-500' : 
                dailyProgress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              } text-white`}>
                {dailyProgress.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={Math.min(dailyProgress, 100)} className="h-3" />
            <p className="text-sm text-gray-600">
              Meta: {settings.currency} {settings.goals.daily.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
