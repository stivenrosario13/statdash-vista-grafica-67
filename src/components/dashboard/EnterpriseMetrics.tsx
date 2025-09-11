
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Users, Clock, Calendar, DollarSign, Award } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

interface EnterpriseKPI {
  id: string;
  title: string;
  value: string;
  target: string;
  progress: number;
  trend: 'up' | 'down' | 'neutral';
  change: number;
  period: string;
  icon: React.ComponentType<any>;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export function EnterpriseMetrics() {
  const [kpis, setKpis] = useState<EnterpriseKPI[]>([]);
  const { lastUpdate } = useRealtimeUpdates();

  const updateKPIs = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    setKpis([
      {
        id: 'revenue',
        title: 'Ingresos Mensuales',
        value: 'RD$ 2,847,350',
        target: 'RD$ 3,000,000',
        progress: 94.9,
        trend: 'up',
        change: 12.4,
        period: `${currentMonth}/${currentYear}`,
        icon: DollarSign,
        color: 'emerald',
        priority: 'high'
      },
      {
        id: 'efficiency',
        title: 'Eficiencia Operativa',
        value: '87.3%',
        target: '90%',
        progress: 87.3,
        trend: 'up',
        change: 5.2,
        period: 'Promedio 30 días',
        icon: Target,
        color: 'blue',
        priority: 'high'
      },
      {
        id: 'satisfaction',
        title: 'Satisfacción Cliente',
        value: '4.7/5.0',
        target: '4.8/5.0',
        progress: 94,
        trend: 'up',
        change: 2.1,
        period: 'Última encuesta',
        icon: Award,
        color: 'purple',
        priority: 'medium'
      },
      {
        id: 'response-time',
        title: 'Tiempo Respuesta',
        value: '2.3 min',
        target: '2.0 min',
        progress: 85,
        trend: 'down',
        change: -1.2,
        period: 'Promedio diario',
        icon: Clock,
        color: 'orange',
        priority: 'medium'
      },
      {
        id: 'retention',
        title: 'Retención Clientes',
        value: '92.1%',
        target: '95%',
        progress: 92.1,
        trend: 'up',
        change: 3.8,
        period: 'Último trimestre',
        icon: Users,
        color: 'teal',
        priority: 'high'
      },
      {
        id: 'growth',
        title: 'Crecimiento Anual',
        value: '+28.5%',
        target: '+25%',
        progress: 114,
        trend: 'up',
        change: 28.5,
        period: 'Año fiscal',
        icon: TrendingUp,
        color: 'green',
        priority: 'high'
      }
    ]);
  };

  useEffect(() => {
    updateKPIs();
  }, [lastUpdate]);

  useEffect(() => {
    const interval = setInterval(updateKPIs, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string, trend: string) => {
    const baseColors = {
      emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      teal: 'text-teal-600 bg-teal-50 border-teal-200',
      green: 'text-green-600 bg-green-50 border-green-200'
    };
    return baseColors[color as keyof typeof baseColors] || baseColors.blue;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const colorClasses = getColorClasses(kpi.color, kpi.trend);
        
        return (
          <Card key={kpi.id} className={`${colorClasses} hover:shadow-xl transition-all duration-300 border-2`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <CardTitle className="text-sm font-semibold">{kpi.title}</CardTitle>
              </div>
              <Badge variant={getPriorityBadge(kpi.priority)} className="text-xs">
                {kpi.priority.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : kpi.trend === 'down' ? (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  ) : null}
                  <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Meta: {kpi.target}</span>
                  <span>{kpi.progress.toFixed(1)}%</span>
                </div>
                <Progress value={kpi.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{kpi.period}</span>
                <Calendar className="h-3 w-3" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
