
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, Clock, Users, X, Bell } from "lucide-react";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
  timestamp: string;
  icon: React.ComponentType<any>;
}

export function SmartAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Clientes Morosos Críticos',
      description: '5 clientes con más de 60 días de retraso',
      action: 'Ver clientes',
      timestamp: 'Hace 5 min',
      icon: AlertTriangle
    },
    {
      id: '2',
      type: 'warning',
      title: 'Bajo Rendimiento',
      description: 'Gestor Carlos R. 30% bajo la meta mensual',
      action: 'Ver detalles',
      timestamp: 'Hace 15 min',
      icon: TrendingDown
    },
    {
      id: '3',
      type: 'info',
      title: 'Vencimientos Próximos',
      description: '12 facturas vencen en los próximos 3 días',
      action: 'Programar recordatorios',
      timestamp: 'Hace 1 hora',
      icon: Clock
    },
    {
      id: '4',
      type: 'warning',
      title: 'Equipo Incompleto',
      description: '2 gestores ausentes en turno tarde',
      action: 'Gestionar turnos',
      timestamp: 'Hace 2 horas',
      icon: Users
    }
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'outline';
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No hay alertas pendientes</p>
          <p className="text-sm text-gray-400">Todo está funcionando correctamente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alertas Inteligentes
          <Badge variant="destructive" className="ml-2">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                        {alert.type === 'critical' ? 'Crítico' : 
                         alert.type === 'warning' ? 'Advertencia' : 'Info'}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-75">{alert.timestamp}</span>
                      {alert.action && (
                        <Button size="sm" variant="outline" className="text-xs">
                          {alert.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dismissAlert(alert.id)}
                  className="text-xs p-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
