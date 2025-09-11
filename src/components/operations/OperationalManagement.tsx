
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Target, AlertTriangle, CheckCircle, Activity, Settings, Zap } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

interface OperationalMetrics {
  teamStatus: Array<{
    id: number;
    name: string;
    active: number;
    total: number;
    efficiency: number;
    status: 'excellent' | 'good' | 'warning' | 'critical';
  }>;
  systemHealth: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  workflows: Array<{
    id: string;
    name: string;
    status: 'active' | 'paused' | 'error';
    completion: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  alerts: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

export function OperationalManagement() {
  const [metrics, setMetrics] = useState<OperationalMetrics | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { lastUpdate, triggerUpdate } = useRealtimeUpdates();

  useEffect(() => {
    loadOperationalData();
  }, [lastUpdate]);

  const loadOperationalData = () => {
    const data: OperationalMetrics = {
      teamStatus: [
        { id: 1, name: 'Turno Mañana', active: 12, total: 12, efficiency: 98, status: 'excellent' },
        { id: 2, name: 'Turno Tarde', active: 11, total: 12, efficiency: 89, status: 'good' },
        { id: 3, name: 'Turno Noche', active: 10, total: 12, efficiency: 76, status: 'warning' },
        { id: 4, name: 'Equipo Calle', active: 8, total: 12, efficiency: 85, status: 'good' }
      ],
      systemHealth: {
        uptime: 99.8,
        responseTime: 1.2,
        errorRate: 0.02,
        throughput: 1847
      },
      workflows: [
        { id: 'wf1', name: 'Proceso de Cobros', status: 'active', completion: 94, priority: 'high' },
        { id: 'wf2', name: 'Gestión de Clientes', status: 'active', completion: 87, priority: 'medium' },
        { id: 'wf3', name: 'Reportes Automáticos', status: 'paused', completion: 45, priority: 'low' },
        { id: 'wf4', name: 'Notificaciones', status: 'active', completion: 99, priority: 'high' }
      ],
      alerts: [
        { id: 'a1', type: 'warning', message: 'Rendimiento bajo en Turno Noche', timestamp: new Date() },
        { id: 'a2', type: 'info', message: 'Mantenimiento programado 23:00', timestamp: new Date() },
        { id: 'a3', type: 'critical', message: '3 gestores ausentes sin justificar', timestamp: new Date() }
      ]
    };
    setMetrics(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleWorkflowAction = (workflowId: string, action: 'start' | 'pause' | 'restart') => {
    console.log(`${action} workflow ${workflowId}`);
    triggerUpdate('WORKFLOW_UPDATED', { workflowId, action });
    loadOperationalData();
  };

  if (!metrics) return <div>Cargando gestión operativa...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-blue-600 bg-clip-text text-transparent">
          Gestión Operativa Avanzada
        </h2>
        <Badge variant="outline" className="px-4 py-2">
          <Activity className="h-4 w-4 mr-2" />
          Sistema Activo: {metrics.systemHealth.uptime}%
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen Operativo</TabsTrigger>
          <TabsTrigger value="teams">Gestión de Equipos</TabsTrigger>
          <TabsTrigger value="workflows">Flujos de Trabajo</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Uptime Sistema</p>
                    <p className="text-2xl font-bold text-green-800">{metrics.systemHealth.uptime}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Tiempo Respuesta</p>
                    <p className="text-2xl font-bold text-blue-800">{metrics.systemHealth.responseTime}s</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Throughput</p>
                    <p className="text-2xl font-bold text-purple-800">{metrics.systemHealth.throughput}</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Tasa de Error</p>
                    <p className="text-2xl font-bold text-orange-800">{metrics.systemHealth.errorRate}%</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Equipos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.teamStatus.map((team) => (
                    <div key={team.id} className={`p-4 rounded-lg border ${getStatusColor(team.status)}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{team.name}</h4>
                        <Badge variant="outline">{team.active}/{team.total} activos</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Eficiencia: {team.efficiency}%</span>
                        <Progress value={team.efficiency} className="w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${
                      alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          alert.type === 'critical' ? 'text-red-600' :
                          alert.type === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                        <span className="text-sm font-medium">{alert.message}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {metrics.teamStatus.map((team) => (
              <Card key={team.id} className={`${getStatusColor(team.status)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {team.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{team.active}/{team.total}</p>
                      <p className="text-sm">Gestores Activos</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Eficiencia</span>
                        <span className="text-sm font-medium">{team.efficiency}%</span>
                      </div>
                      <Progress value={team.efficiency} />
                    </div>
                    <Button size="sm" className="w-full">
                      Gestionar Equipo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metrics.workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{workflow.name}</CardTitle>
                    <Badge variant={workflow.status === 'active' ? 'default' : workflow.status === 'paused' ? 'secondary' : 'destructive'}>
                      {workflow.status === 'active' ? 'Activo' : workflow.status === 'paused' ? 'Pausado' : 'Error'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Completado</span>
                        <span className="text-sm font-medium">{workflow.completion}%</span>
                      </div>
                      <Progress value={workflow.completion} />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={workflow.status === 'active' ? 'secondary' : 'default'}
                        onClick={() => handleWorkflowAction(workflow.id, workflow.status === 'active' ? 'pause' : 'start')}
                      >
                        {workflow.status === 'active' ? 'Pausar' : 'Iniciar'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleWorkflowAction(workflow.id, 'restart')}
                      >
                        Reiniciar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Uptime</span>
                    <div className="text-right">
                      <span className="font-bold">{metrics.systemHealth.uptime}%</span>
                      <Progress value={metrics.systemHealth.uptime} className="w-24 mt-1" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tiempo de Respuesta</span>
                    <span className="font-bold">{metrics.systemHealth.responseTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Throughput</span>
                    <span className="font-bold">{metrics.systemHealth.throughput} req/min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasa de Error</span>
                    <span className="font-bold text-green-600">{metrics.systemHealth.errorRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Alertas
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Ver Logs del Sistema
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Optimizar Rendimiento
                  </Button>
                  <Button className="w-full" variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Mantenimiento de Emergencia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
