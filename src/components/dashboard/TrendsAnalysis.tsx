
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Brain, Target, Award } from "lucide-react";
import { employees, teams, calculateEmployeeTotal, TimeframeType } from '@/data/employeesData';

interface TrendInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  recommendation?: string;
}

export function TrendsAnalysis() {
  const [timeframe] = useState<TimeframeType>('daily');
  const [insights, setInsights] = useState<TrendInsight[]>([]);

  const generateInsights = () => {
    const newInsights: TrendInsight[] = [];

    // Análisis de rendimiento por equipo
    const teamPerformance = teams.map(team => {
      const teamTotal = employees
        .filter(emp => emp.teamId === team.id)
        .reduce((sum, emp) => sum + calculateEmployeeTotal(emp.id, timeframe), 0);
      return { team, total: teamTotal };
    });

    const bestTeam = teamPerformance.reduce((best, current) => 
      current.total > best.total ? current : best
    );

    const worstTeam = teamPerformance.reduce((worst, current) => 
      current.total < worst.total ? current : worst
    );

    // Insight del mejor equipo
    newInsights.push({
      id: 'best-team',
      type: 'positive',
      title: 'Equipo Destacado',
      description: `${bestTeam.team.name} lidera con excelente performance`,
      value: `$${bestTeam.total.toFixed(2)}`,
      icon: <Award className="h-4 w-4" />,
      recommendation: `Aplicar estrategias de ${bestTeam.team.name} a otros equipos`
    });

    // Insight del equipo que necesita apoyo
    if (worstTeam.total < bestTeam.total * 0.5) {
      newInsights.push({
        id: 'needs-support',
        type: 'negative',
        title: 'Equipo Necesita Apoyo',
        description: `${worstTeam.team.name} está por debajo del promedio`,
        value: `$${worstTeam.total.toFixed(2)}`,
        icon: <TrendingDown className="h-4 w-4" />,
        recommendation: 'Considerar capacitación adicional o redistribución de recursos'
      });
    }

    // Análisis de gestores top
    const employeePerformance = employees.map(emp => ({
      employee: emp,
      total: calculateEmployeeTotal(emp.id, timeframe)
    })).sort((a, b) => b.total - a.total);

    const topPerformer = employeePerformance[0];
    if (topPerformer && topPerformer.total > 0) {
      newInsights.push({
        id: 'top-performer',
        type: 'positive',
        title: 'Gestor Estrella',
        description: `${topPerformer.employee.name} está superando expectativas`,
        value: `$${topPerformer.total.toFixed(2)}`,
        icon: <TrendingUp className="h-4 w-4" />,
        recommendation: 'Considerar como mentor para otros gestores'
      });
    }

    // Análisis de patrones
    const totalCollections = employeePerformance.reduce((sum, emp) => sum + emp.total, 0);
    const avgPerEmployee = totalCollections / employees.length;

    newInsights.push({
      id: 'performance-analysis',
      type: 'neutral',
      title: 'Análisis General',
      description: `Promedio por gestor: $${avgPerEmployee.toFixed(2)}`,
      value: `${employeePerformance.filter(emp => emp.total > avgPerEmployee).length}/${employees.length}`,
      icon: <Brain className="h-4 w-4" />,
      recommendation: 'Enfocarse en elevar el rendimiento de gestores por debajo del promedio'
    });

    // Predicción de meta mensual
    const dailyRate = totalCollections;
    const monthlyProjection = dailyRate * 30; // Proyección simple
    const monthlyGoal = 15000; // Meta ejemplo

    newInsights.push({
      id: 'monthly-projection',
      type: monthlyProjection >= monthlyGoal ? 'positive' : 'negative',
      title: 'Proyección Mensual',
      description: `Tendencia actual hacia $${monthlyProjection.toFixed(2)}`,
      value: `${((monthlyProjection / monthlyGoal) * 100).toFixed(0)}%`,
      icon: <Target className="h-4 w-4" />,
      recommendation: monthlyProjection >= monthlyGoal 
        ? 'Mantener el ritmo actual' 
        : 'Acelerar esfuerzos para alcanzar la meta'
    });

    setInsights(newInsights);
  };

  const getInsightColor = (type: TrendInsight['type']) => {
    switch (type) {
      case 'positive': return 'bg-green-50 border-green-200';
      case 'negative': return 'bg-red-50 border-red-200';
      case 'neutral': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getBadgeVariant = (type: TrendInsight['type']) => {
    switch (type) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      case 'neutral': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Análisis Inteligente
          </CardTitle>
          <Button onClick={generateInsights} variant="outline" size="sm">
            Generar Análisis
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Brain className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Haz clic en "Generar Análisis" para ver insights inteligentes</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {insight.icon}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <Badge variant={getBadgeVariant(insight.type)} className="text-xs">
                    {insight.type}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                
                <div className="text-lg font-bold text-gray-800 mb-2">
                  {insight.value}
                </div>
                
                {insight.recommendation && (
                  <div className="text-xs text-gray-500 bg-white/50 p-2 rounded">
                    <strong>Recomendación:</strong> {insight.recommendation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
