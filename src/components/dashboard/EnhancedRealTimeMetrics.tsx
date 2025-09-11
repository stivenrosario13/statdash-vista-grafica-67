
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Target, RefreshCw, Zap, Activity, AlertTriangle } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { teams, calculateTeamTotal } from '@/data/employeesData';

interface EnhancedMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  target?: number;
  current?: number;
  unit?: string;
  alerts?: string[];
}

export function EnhancedRealTimeMetrics() {
  const [metrics, setMetrics] = useState<EnhancedMetric[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [systemHealth, setSystemHealth] = useState<'excellent' | 'good' | 'warning' | 'critical'>('good');
  const { lastUpdate } = useRealtimeUpdates();

  const updateMetrics = async () => {
    setIsUpdating(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const totalToday = teams.reduce((sum, team) => sum + calculateTeamTotal(team.id, 'daily'), 0);
    const totalEmployees = teams.reduce((sum, team) => sum + 12, 0);
    const avgTime = Math.floor(Math.random() * 10) + 15;
    const monthlyProgress = Math.floor(Math.random() * 30) + 60;
    const satisfaction = 85 + Math.random() * 15;
    const efficiency = 75 + Math.random() * 20;
    const networkLatency = Math.floor(Math.random() * 50) + 20;
    const serverLoad = Math.floor(Math.random() * 40) + 30;

    // Determinar estado del sistema
    const healthScore = (satisfaction + efficiency) / 2;
    setSystemHealth(
      healthScore > 95 ? 'excellent' :
      healthScore > 85 ? 'good' :
      healthScore > 70 ? 'warning' : 'critical'
    );

    setMetrics([
      {
        title: "Ingresos Diarios",
        value: `RD$ ${totalToday.toLocaleString('es-DO', { maximumFractionDigits: 0 })}`,
        change: Math.random() * 20 - 5,
        trend: totalToday > 10000 ? 'up' : 'down',
        icon: DollarSign,
        color: "emerald",
        priority: "critical",
        description: "Total de cobros generados hoy",
        target: 150000,
        current: totalToday,
        unit: "RD$",
        alerts: totalToday < 50000 ? ["Meta diaria en riesgo"] : []
      },
      {
        title: "Personal Activo",
        value: `${totalEmployees}/48`,
        change: Math.random() * 5,
        trend: 'up',
        icon: Users,
        color: "blue",
        priority: "high",
        description: "Gestores en servicio activo",
        target: 48,
        current: totalEmployees,
        unit: "personas"
      },
      {
        title: "Tiempo Promedio",
        value: `${avgTime} min`,
        change: Math.random() * 10 - 5,
        trend: avgTime < 20 ? 'up' : 'down',
        icon: Clock,
        color: "orange",
        priority: "medium",
        description: "Tiempo promedio por gestión",
        target: 15,
        current: avgTime,
        unit: "minutos",
        alerts: avgTime > 25 ? ["Tiempo excesivo detectado"] : []
      },
      {
        title: "Meta Mensual",
        value: `${monthlyProgress}%`,
        change: Math.random() * 15,
        trend: 'up',
        icon: Target,
        color: "purple",
        priority: "high",
        description: "Progreso hacia objetivo mensual",
        target: 100,
        current: monthlyProgress,
        unit: "%"
      },
      {
        title: "Satisfacción",
        value: `${satisfaction.toFixed(1)}%`,
        change: Math.random() * 8 - 2,
        trend: satisfaction > 90 ? 'up' : 'neutral',
        icon: TrendingUp,
        color: "teal",
        priority: "medium",
        description: "Índice de satisfacción del cliente",
        target: 95,
        current: satisfaction,
        unit: "%"
      },
      {
        title: "Eficiencia",
        value: `${efficiency.toFixed(1)}%`,
        change: Math.random() * 12 - 3,
        trend: efficiency > 85 ? 'up' : 'down',
        icon: Zap,
        color: "indigo",
        priority: "critical",
        description: "Eficiencia operativa del sistema",
        target: 90,
        current: efficiency,
        unit: "%"
      },
      {
        title: "Latencia Red",
        value: `${networkLatency}ms`,
        change: Math.random() * 20 - 10,
        trend: networkLatency < 30 ? 'up' : 'down',
        icon: Activity,
        color: "cyan",
        priority: "medium",
        description: "Latencia promedio de la red",
        target: 25,
        current: networkLatency,
        unit: "ms",
        alerts: networkLatency > 60 ? ["Alta latencia detectada"] : []
      },
      {
        title: "Carga Servidor",
        value: `${serverLoad}%`,
        change: Math.random() * 15 - 7,
        trend: serverLoad < 60 ? 'up' : 'down',
        icon: AlertTriangle,
        color: "rose",
        priority: serverLoad > 80 ? "critical" : "low",
        description: "Carga actual del servidor",
        target: 70,
        current: serverLoad,
        unit: "%",
        alerts: serverLoad > 85 ? ["Servidor sobrecargado"] : []
      }
    ]);
    
    setIsUpdating(false);
  };

  useEffect(() => {
    updateMetrics();
  }, [lastUpdate]);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 15000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/50 hover:from-emerald-100 hover:to-emerald-200',
      blue: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 hover:from-blue-100 hover:to-blue-200',
      orange: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200/50 hover:from-orange-100 hover:to-orange-200',
      purple: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 hover:from-purple-100 hover:to-purple-200',
      teal: 'text-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200/50 hover:from-teal-100 hover:to-teal-200',
      indigo: 'text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200/50 hover:from-indigo-100 hover:to-indigo-200',
      cyan: 'text-cyan-600 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200/50 hover:from-cyan-100 hover:to-cyan-200',
      rose: 'text-rose-600 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200/50 hover:from-rose-100 hover:to-rose-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return { variant: 'destructive' as const, text: 'CRÍTICO', color: 'bg-red-500' };
      case 'high': return { variant: 'destructive' as const, text: 'ALTO', color: 'bg-orange-500' };
      case 'medium': return { variant: 'secondary' as const, text: 'MEDIO', color: 'bg-yellow-500' };
      case 'low': return { variant: 'outline' as const, text: 'BAJO', color: 'bg-green-500' };
      default: return { variant: 'outline' as const, text: 'NORMAL', color: 'bg-gray-500' };
    }
  };

  const getSystemHealthColor = () => {
    switch (systemHealth) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            Métricas en Tiempo Real
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">Actualización automática cada 15 segundos</p>
            <Badge className={`${getSystemHealthColor()} border-0 font-semibold`}>
              Sistema: {systemHealth.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Button 
          onClick={updateMetrics} 
          disabled={isUpdating}
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
        >
          <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
          {isUpdating ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = getColorClasses(metric.color);
          const badge = getPriorityBadge(metric.priority);
          const progressPercentage = metric.target && metric.current ? 
            Math.min((metric.current / metric.target) * 100, 100) : 0;
          
          return (
            <Card 
              key={index} 
              className={`${colorClasses} hover:shadow-2xl hover:scale-105 transition-all duration-500 border-2 relative overflow-hidden group`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Priority indicator */}
              <div className="absolute top-0 right-0 z-10">
                <Badge variant={badge.variant} className="text-xs rounded-none rounded-bl-lg shadow-lg">
                  {badge.text}
                </Badge>
              </div>
              
              {/* Alert indicator */}
              {metric.alerts && metric.alerts.length > 0 && (
                <div className="absolute top-0 left-0 z-10">
                  <div className="bg-red-500 text-white p-1 rounded-br-lg">
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                </div>
              )}
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-6 relative z-10">
                <CardTitle className="text-sm font-bold leading-tight pr-12">
                  {metric.title}
                </CardTitle>
                <div className="bg-white/20 p-2 rounded-full">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                <div className="text-3xl font-bold leading-none">{metric.value}</div>
                
                {/* Progress bar */}
                {metric.target && metric.current && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progreso</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-2 bg-white/30"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    ) : null}
                    <span className={
                      metric.trend === 'up' ? 'text-green-700 font-bold' : 
                      metric.trend === 'down' ? 'text-red-700 font-bold' : 
                      'text-gray-600'
                    }>
                      {metric.change > 0 ? '+' : ''}{Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-gray-600 font-medium">vs ayer</span>
                </div>
                
                <p className="text-xs opacity-90 leading-tight font-medium">{metric.description}</p>
                
                {/* Alerts */}
                {metric.alerts && metric.alerts.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    {metric.alerts.map((alert, alertIndex) => (
                      <div key={alertIndex} className="text-xs text-red-700 font-medium flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {alert}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Enhanced last update indicator */}
      <div className="flex items-center justify-center text-sm text-gray-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <Clock className="h-4 w-4 mr-2" />
        Última actualización: {new Date(lastUpdate).toLocaleTimeString('es-DO')}
        <div className="ml-4 flex space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
