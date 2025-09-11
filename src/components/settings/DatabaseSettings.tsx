
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2, 
  HardDrive, 
  Activity,
  Shield,
  Clock,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  Server,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { getGlobalCobros, getGlobalClients } from '@/hooks/useRealtimeUpdates';

interface DatabaseMetrics {
  totalRecords: number;
  totalSize: string;
  lastBackup: string;
  connectionStatus: 'online' | 'offline' | 'maintenance';
  performance: number;
  queries: number;
}

export function DatabaseSettings() {
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [metrics, setMetrics] = useState<DatabaseMetrics>({
    totalRecords: 0,
    totalSize: '0 MB',
    lastBackup: 'Nunca',
    connectionStatus: 'online',
    performance: 95,
    queries: 0
  });

  const [activeConnections, setActiveConnections] = useState(12);

  useEffect(() => {
    loadDatabaseMetrics();
    const interval = setInterval(loadDatabaseMetrics, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const loadDatabaseMetrics = () => {
    const cobros = getGlobalCobros();
    const clients = getGlobalClients();
    
    const totalRecords = cobros.length + clients.length;
    const estimatedSize = Math.round((totalRecords * 0.5) * 100) / 100; // Estimación
    
    setMetrics(prev => ({
      ...prev,
      totalRecords,
      totalSize: `${estimatedSize} MB`,
      queries: prev.queries + Math.floor(Math.random() * 10),
      performance: 85 + Math.floor(Math.random() * 15)
    }));
  };

  const handleBackup = async () => {
    setIsBackupRunning(true);
    setBackupProgress(0);

    const steps = [
      'Preparando backup...',
      'Exportando cobros...',
      'Exportando clientes...',
      'Comprimiendo datos...',
      'Verificando integridad...',
      'Finalizando backup...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setBackupProgress(((i + 1) / steps.length) * 100);
      toast.info(steps[i]);
    }

    setIsBackupRunning(false);
    setMetrics(prev => ({
      ...prev,
      lastBackup: new Date().toLocaleString('es-DO')
    }));
    
    toast.success("Backup completado exitosamente", {
      description: `Base de datos respaldada: ${metrics.totalSize}`
    });
  };

  const handleOptimize = async () => {
    const steps = [
      'Analizando índices...',
      'Optimizando consultas...',
      'Limpiando caché...',
      'Reorganizando tablas...'
    ];

    for (const step of steps) {
      toast.info(step);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setMetrics(prev => ({
      ...prev,
      performance: Math.min(100, prev.performance + 5)
    }));

    toast.success("Base de datos optimizada", {
      description: "El rendimiento ha mejorado"
    });
  };

  const handleMaintenance = () => {
    setMetrics(prev => ({ ...prev, connectionStatus: 'maintenance' }));
    
    setTimeout(() => {
      setMetrics(prev => ({ ...prev, connectionStatus: 'online' }));
      toast.success("Mantenimiento completado");
    }, 5000);

    toast.info("Iniciando mantenimiento programado...");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Base de Datos</h2>
          <p className="text-muted-foreground mt-2">Monitoreo, backup y mantenimiento del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDatabaseMetrics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button onClick={handleOptimize}>
            <Zap className="h-4 w-4 mr-2" />
            Optimizar
          </Button>
        </div>
      </div>

      {/* Estado de la Base de Datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estado</p>
                <div className="flex items-center gap-2 mt-2">
                  {metrics.connectionStatus === 'online' && (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                    </>
                  )}
                  {metrics.connectionStatus === 'maintenance' && (
                    <>
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">Mantenimiento</Badge>
                    </>
                  )}
                </div>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Registros</p>
                <p className="text-2xl font-bold mt-2">{metrics.totalRecords.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tamaño</p>
                <p className="text-2xl font-bold mt-2">{metrics.totalSize}</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rendimiento</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold">{metrics.performance}%</span>
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backup">Copias de Seguridad</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="backup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Crear Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isBackupRunning ? (
                  <div className="space-y-4">
                    <Progress value={backupProgress} className="h-3" />
                    <p className="text-sm text-center text-muted-foreground">
                      Creando backup... {Math.round(backupProgress)}%
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Último backup: {metrics.lastBackup}</p>
                      <p>Tamaño estimado: {metrics.totalSize}</p>
                    </div>
                    <Button onClick={handleBackup} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Crear Backup Completo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Restaurar Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backup-file">Seleccionar archivo de backup</Label>
                  <Input 
                    id="backup-file"
                    type="file" 
                    accept=".sql,.db,.json" 
                    className="mt-2" 
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Restaurar Base de Datos
                </Button>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800 font-medium">Precaución</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Esta acción sobrescribirá todos los datos actuales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Backups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'backup_2024-01-15_14-30.sql', size: '2.3 MB', date: '15/01/2024 14:30' },
                  { name: 'backup_2024-01-14_14-30.sql', size: '2.1 MB', date: '14/01/2024 14:30' },
                  { name: 'backup_2024-01-13_14-30.sql', size: '1.9 MB', date: '13/01/2024 14:30' }
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{backup.name}</p>
                      <p className="text-sm text-muted-foreground">{backup.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{backup.size}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Rendimiento en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Memoria</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Almacenamiento</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Conexiones Activas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">{activeConnections}</div>
                  <p className="text-muted-foreground">Conexiones simultáneas</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Máximo hoy</div>
                      <div className="text-muted-foreground">24</div>
                    </div>
                    <div>
                      <div className="font-medium">Promedio</div>
                      <div className="text-muted-foreground">15</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Consultas Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { query: 'SELECT * FROM cobros WHERE fecha >= ...', time: '2ms', status: 'success' },
                  { query: 'UPDATE clientes SET debt = ...', time: '5ms', status: 'success' },
                  { query: 'INSERT INTO cobros VALUES ...', time: '3ms', status: 'success' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {item.query}
                      </code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tareas de Mantenimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleOptimize} variant="outline" className="w-full justify-start">
                  <Zap className="h-4 w-4 mr-2" />
                  Optimizar Rendimiento
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Verificar Integridad
                </Button>
                
                <Button onClick={handleMaintenance} variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Mantenimiento Programado
                </Button>
                
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar Datos Antiguos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cache-size">Tamaño de Caché (MB)</Label>
                  <Input id="cache-size" type="number" defaultValue="256" />
                </div>
                
                <div>
                  <Label htmlFor="connection-limit">Límite de Conexiones</Label>
                  <Input id="connection-limit" type="number" defaultValue="100" />
                </div>
                
                <div>
                  <Label htmlFor="query-timeout">Timeout de Consultas (seg)</Label>
                  <Input id="query-timeout" type="number" defaultValue="30" />
                </div>

                <Button className="w-full">
                  Aplicar Configuración
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configuración de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backup-encryption">Encriptación de Backups</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" id="backup-encryption" defaultChecked />
                    <label htmlFor="backup-encryption" className="text-sm">
                      Activar encriptación AES-256
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="access-log">Registro de Accesos</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" id="access-log" defaultChecked />
                    <label htmlFor="access-log" className="text-sm">
                      Registrar todos los accesos
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="failed-attempts">Intentos Fallidos</Label>
                  <Input 
                    id="failed-attempts" 
                    type="number" 
                    defaultValue="3" 
                    className="mt-2"
                    placeholder="Máximo de intentos antes de bloqueo"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eventos de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: 'Login exitoso', user: 'admin@test.com', time: '10:30 AM', type: 'success' },
                    { event: 'Backup creado', user: 'Sistema', time: '9:15 AM', type: 'info' },
                    { event: 'Configuración modificada', user: 'admin@test.com', time: '8:45 AM', type: 'warning' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'success' ? 'bg-green-500' :
                          item.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
