
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity, Clock, Zap } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { teams, calculateTeamTotal, employees } from '@/data/employeesData';

interface ExecutiveMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  target?: number;
  current?: number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export function ExecutiveMetrics() {
  const [metrics, setMetrics] = useState<ExecutiveMetric[]>([]);
  const { lastUpdate } = useRealtimeUpdates();

  useEffect(() => {
    updateExecutiveMetrics();
  }, [lastUpdate]);

  const updateExecutiveMetrics = () => {
    const totalToday = teams.reduce((sum, team) => sum + calculateTeamTotal(team.id, 'daily'), 0);
    const totalEmployees = employees.length;
    const activeTeams = teams.length;
    const efficiency = Math.random() * 30 + 70; // 70-100%
    const satisfaction = Math.random() * 20 + 80; // 80-100%
    const avgResponseTime = Math.random() * 10 + 15; // 15-25 min

    const newMetrics: ExecutiveMetric[] = [
      {
        id: 'revenue-today',
        title: 'Ingresos del Día',
        value: `RD$ ${totalToday.toLocaleString()}`,
        change: Math.random() * 20 - 5,
        trend: totalToday > 50000 ? 'up' : 'down',
        target: 150000,
        current: totalToday,
        icon: DollarSign,
        color: 'emerald',
        description: 'Total cobrado hoy'
      },
      {
        id: 'active-staff',
        title: 'Personal Activo',
        value: `${totalEmployees}`,
        change: Math.random() * 5,
        trend: 'up',
        target: 48,
        current: totalEmployees,
        icon: Users,
        color: 'blue',
        description: 'Gestores en servicio'
      },
      {
        id: 'team-performance',
        title: 'Rendimiento Equipos',
        value: `${activeTeams}/4`,
        change: Math.random() * 8,
        trend: 'up',
        target: 4,
        current: activeTeams,
        icon: Target,
        color: 'purple',
        description: 'Equipos activos'
      },
      {
        id: 'efficiency',
        title: 'Eficiencia Global',
        value: `${efficiency.toFixed(1)}%`,
        change: Math.random() * 12,
        trend: efficiency > 85 ? 'up' : 'neutral',
        target: 95,
        current: efficiency,
        icon: Zap,
        color: 'orange',
        description: 'Eficiencia operativa'
      },
      {
        id: 'satisfaction',
        title: 'Satisfacción Cliente',
        value: `${satisfaction.toFixed(1)}%`,
        change: Math.random() * 6,
        trend: satisfaction > 90 ? 'up' : 'neutral',
        target: 95,
        current: satisfaction,
        icon: Activity,
        color: 'teal',
        description: 'Índice de satisfacción'
      },
      {
        id: 'response-time',
        title: 'Tiempo Respuesta',
        value: `${avgResponseTime.toFixed(1)} min`,
        change: -Math.random() * 8,
        trend: avgResponseTime < 20 ? 'up' : 'down',
        target: 15,
        current: avgResponseTime,
        icon: Clock,
        color: 'indigo',
        description: 'Tiempo promedio'
      }
    ];

    setMetrics(newMetrics);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600 text-white',
      blue: 'from-blue-500 to-blue-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white',
      orange: 'from-orange-500 to-orange-600 text-white',
      teal: 'from-teal-500 to-teal-600 text-white',
      indigo: 'from-indigo-500 to-indigo-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Métricas Ejecutivas en Tiempo Real
        </h2>
        <Badge className="bg-green-100 text-green-800 px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          Actualización Automática
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const progressPercentage = metric.target && metric.current ? 
            Math.min((metric.current / metric.target) * 100, 100) : 0;

          return (
            <Card key={metric.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0">
              <div className={`bg-gradient-to-br ${getColorClasses(metric.color)} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center text-sm">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    ) : null}
                    <span className="font-bold">
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm opacity-90">{metric.title}</h3>
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="text-xs opacity-80">{metric.description}</p>
                </div>
              </div>
              
              {metric.target && metric.current && (
                <CardContent className="p-4 bg-white">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progreso hacia meta</span>
                      <span className="font-bold">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
