
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, Target, Users, X } from "lucide-react";
import { employees, teams, calculateEmployeeTotal, TimeframeType } from '@/data/employeesData';

interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  icon: React.ReactNode;
  action?: string;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [timeframe] = useState<TimeframeType>('daily');

  // Generar alertas inteligentes
  const generateAlerts = () => {
    const newAlerts: Alert[] = [];

    // Detectar gestores inactivos
    const inactiveEmployees = employees.filter(emp => 
      calculateEmployeeTotal(emp.id, timeframe) === 0
    );

    if (inactiveEmployees.length > 0) {
      newAlerts.push({
        id: 'inactive-employees',
        type: 'warning',
        title: 'Gestores Inactivos',
        message: `${inactiveEmployees.length} gestores sin cobros hoy`,
        icon: <Users className="h-4 w-4" />,
        action: 'Ver detalles'
      });
    }

    // Detectar bajo rendimiento por equipo
    teams.forEach(team => {
      const teamTotal = employees
        .filter(emp => emp.teamId === team.id)
        .reduce((sum, emp) => sum + calculateEmployeeTotal(emp.id, timeframe), 0);
      
      if (teamTotal < 100) { // Meta mínima ejemplo
        newAlerts.push({
          id: `low-performance-${team.id}`,
          type: 'danger',
          title: 'Meta No Alcanzada',
          message: `${team.name}: $${teamTotal.toFixed(2)} (Meta: $100)`,
          icon: <Target className="h-4 w-4" />,
          action: 'Ver equipo'
        });
      }
    });

    // Detectar tendencia negativa
    newAlerts.push({
      id: 'negative-trend',
      type: 'info',
      title: 'Análisis de Tendencia',
      message: 'Se detectó una disminución del 15% comparado con ayer',
      icon: <TrendingDown className="h-4 w-4" />,
      action: 'Ver análisis'
    });

    setAlerts(newAlerts);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'danger': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getBadgeVariant = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'secondary';
      case 'danger': return 'destructive';
      case 'info': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertas Inteligentes
          </CardTitle>
          <Button onClick={generateAlerts} variant="outline" size="sm">
            Actualizar Alertas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No hay alertas activas</p>
            <Button onClick={generateAlerts} variant="ghost" size="sm" className="mt-2">
              Generar Alertas
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      {alert.action && (
                        <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs">
                          {alert.action}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
