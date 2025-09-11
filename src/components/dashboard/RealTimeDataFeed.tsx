
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Bell, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';
import { useNumberFormat } from '@/hooks/useNumberFormat';

export function RealTimeDataFeed() {
  const { state } = useGlobalData();
  const { formatCurrency, formatNumber } = useNumberFormat();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Generate recent activity from cobros and notifications
    const activity = [
      ...state.cobros.slice(-10).map(cobro => ({
        id: cobro.id,
        type: 'cobro',
        title: 'Nuevo Cobro Registrado',
        description: `${cobro.employeeName} - ${formatCurrency(cobro.amount || cobro.monto || 0)}`,
        timestamp: new Date(cobro.date || cobro.fecha),
        icon: DollarSign,
        color: 'green'
      })),
      ...state.notifications.slice(-5).map(notif => ({
        id: notif.id,
        type: 'notification',
        title: notif.title,
        description: notif.message,
        timestamp: notif.timestamp,
        icon: Bell,
        color: notif.type === 'success' ? 'green' : notif.type === 'warning' ? 'yellow' : 'blue'
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 15);

    setRecentActivity(activity);
  }, [state.cobros, state.notifications, formatCurrency]);

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-500/20 text-green-300 border-green-400/30',
      blue: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      red: 'bg-red-500/20 text-red-300 border-red-400/30'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendingStats = () => {
    const today = new Date();
    const todayCobros = state.cobros.filter(c => {
      const cobroDate = new Date(c.date || c.fecha);
      return cobroDate.toDateString() === today.toDateString();
    });

    const todayRevenue = todayCobros.reduce((sum, c) => sum + (c.amount || c.monto || 0), 0);
    const avgPerHour = todayRevenue / Math.max(1, today.getHours() || 1);

    return {
      todayCount: todayCobros.length,
      todayRevenue,
      avgPerHour,
      efficiency: state.metrics.efficiency
    };
  };

  const stats = getTrendingStats();

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-400/30 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Cobros Hoy</p>
                <p className="text-2xl font-bold">{formatNumber(stats.todayCount)}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border border-green-400/30 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Ingresos Hoy</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border border-purple-400/30 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Promedio/Hora</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.avgPerHour)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white border border-orange-400/30 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Eficiencia</p>
                <p className="text-2xl font-bold">{stats.efficiency.toFixed(1)}%</p>
              </div>
              <Zap className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="shadow-2xl bg-gradient-to-br from-slate-800 to-blue-900 border border-blue-400/30">
        <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white border-b border-blue-400/30">
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5" />
            Actividad en Tiempo Real
            <Badge className="bg-green-500/20 text-green-300 animate-pulse border-green-400/30">
              EN VIVO
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-slate-800/50">
          <div className="max-h-96 overflow-y-auto">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-blue-300">
                <Activity className="h-12 w-12 mx-auto mb-3 text-blue-400" />
                <p>No hay actividad reciente</p>
              </div>
            ) : (
              <div className="divide-y divide-blue-400/20">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  const colorClasses = getColorClasses(activity.color);
                  
                  return (
                    <div key={index} className="p-4 hover:bg-blue-800/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${colorClasses}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-white truncate">
                              {activity.title}
                            </p>
                            <span className="text-xs text-blue-300 ml-2">
                              {new Date(activity.timestamp).toLocaleTimeString('es-DO')}
                            </span>
                          </div>
                          <p className="text-sm text-blue-200 truncate">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
