
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Target, RefreshCw, Zap } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { teams, calculateTeamTotal } from '@/data/employeesData';

interface Metric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { lastUpdate } = useRealtimeUpdates();

  const updateMetrics = async () => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const totalToday = teams.reduce((sum, team) => sum + calculateTeamTotal(team.id, 'daily'), 0);
    const totalEmployees = teams.reduce((sum, team) => sum + 12, 0);
    const avgTime = Math.floor(Math.random() * 10) + 15;
    const monthlyProgress = Math.floor(Math.random() * 30) + 60;
    const satisfaction = 85 + Math.random() * 15;
    const efficiency = 75 + Math.random() * 20;

    setMetrics([
      {
        title: "Cobros Hoy",
        value: `RD$ ${totalToday.toLocaleString('es-DO', { maximumFractionDigits: 0 })}`,
        change: Math.random() * 20 - 5,
        trend: totalToday > 10000 ? 'up' : 'down',
        icon: DollarSign,
        color: "emerald",
        priority: "high",
        description: "Ingresos generados hoy"
      },
      {
        title: "Gestores Activos",
        value: `${totalEmployees}/48`,
        change: Math.random() * 5,
        trend: 'up',
        icon: Users,
        color: "blue",
        priority: "high",
        description: "Personal en servicio activo"
      },
      {
        title: "Tiempo Promedio",
        value: `${avgTime} min`,
        change: Math.random() * 10 - 5,
        trend: avgTime < 20 ? 'up' : 'down',
        icon: Clock,
        color: "orange",
        priority: "medium",
        description: "Tiempo promedio por gestión"
      },
      {
        title: "Meta Mensual",
        value: `${monthlyProgress}%`,
        change: Math.random() * 15,
        trend: 'up',
        icon: Target,
        color: "purple",
        priority: "high",
        description: "Progreso hacia objetivo mensual"
      },
      {
        title: "Satisfacción Cliente",
        value: `${satisfaction.toFixed(1)}%`,
        change: Math.random() * 8 - 2,
        trend: satisfaction > 90 ? 'up' : 'neutral',
        icon: TrendingUp,
        color: "teal",
        priority: "medium",
        description: "Índice de satisfacción actual"
      },
      {
        title: "Eficiencia Operativa",
        value: `${efficiency.toFixed(1)}%`,
        change: Math.random() * 12 - 3,
        trend: efficiency > 85 ? 'up' : 'down',
        icon: Zap,
        color: "indigo",
        priority: "high",
        description: "Eficiencia del sistema"
      }
    ]);
    
    setIsUpdating(false);
  };

  useEffect(() => {
    updateMetrics();
  }, [lastUpdate]);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/50',
      blue: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50',
      orange: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200/50',
      purple: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50',
      teal: 'text-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200/50',
      indigo: 'text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return { variant: 'destructive' as const, text: 'CRÍTICO' };
      case 'medium': return { variant: 'secondary' as const, text: 'MEDIO' };
      case 'low': return { variant: 'outline' as const, text: 'BAJO' };
      default: return { variant: 'outline' as const, text: 'NORMAL' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Métricas en Tiempo Real</h2>
          <p className="text-gray-600">Actualización automática cada 30 segundos</p>
        </div>
        <Button 
          onClick={updateMetrics} 
          disabled={isUpdating}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
          {isUpdating ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = getColorClasses(metric.color);
          const badge = getPriorityBadge(metric.priority);
          
          return (
            <Card 
              key={index} 
              className={`${colorClasses} hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 relative overflow-hidden`}
            >
              {/* Priority indicator */}
              <div className="absolute top-0 right-0">
                <Badge variant={badge.variant} className="text-xs rounded-none rounded-bl-lg">
                  {badge.text}
                </Badge>
              </div>
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
                <CardTitle className="text-sm font-semibold leading-tight pr-8">
                  {metric.title}
                </CardTitle>
                <Icon className="h-5 w-5 opacity-80" />
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold leading-none">{metric.value}</div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    ) : null}
                    <span className={
                      metric.trend === 'up' ? 'text-green-600 font-semibold' : 
                      metric.trend === 'down' ? 'text-red-600 font-semibold' : 
                      'text-gray-500'
                    }>
                      {metric.change > 0 ? '+' : ''}{Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-gray-500">vs ayer</span>
                </div>
                
                <p className="text-xs opacity-75 leading-tight">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Last update indicator */}
      <div className="flex items-center justify-center text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        Última actualización: {new Date(lastUpdate).toLocaleTimeString('es-DO')}
      </div>
    </div>
  );
}
