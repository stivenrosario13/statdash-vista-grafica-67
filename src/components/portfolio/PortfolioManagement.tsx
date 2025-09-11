
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, DollarSign, TrendingUp, AlertTriangle, Search, Filter, Download, Eye, RefreshCw } from "lucide-react";
import { useRealtimeUpdates, getGlobalClients, getGlobalCobros } from '@/hooks/useRealtimeUpdates';

interface PortfolioMetrics {
  totalClients: number;
  totalDebt: number;
  totalPaid: number;
  collectionRate: number;
  averageDebt: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

export function PortfolioManagement() {
  const [clients, setClients] = useState<any[]>([]);
  const [cobros, setCobros] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { lastUpdate, forceUpdate } = useRealtimeUpdates();

  useEffect(() => {
    loadPortfolioData();
  }, [lastUpdate]);

  const loadPortfolioData = async () => {
    setIsLoading(true);
    try {
      console.log('PortfolioManagement: Loading data...');
      
      const globalClients = getGlobalClients();
      const globalCobros = getGlobalCobros();
      
      console.log('PortfolioManagement: Loaded', globalClients.length, 'clients and', globalCobros.length, 'cobros');
      
      setClients(globalClients);
      setCobros(globalCobros);

      // Calcular métricas con validación de null
      const totalDebt = globalClients.reduce((sum, client) => sum + (client.debt || 0), 0);
      const totalPaid = globalClients.reduce((sum, client) => sum + (client.totalPaid || 0), 0);
      const collectionRate = totalPaid > 0 ? ((totalPaid / (totalPaid + totalDebt)) * 100) : 0;

      const riskCounts = globalClients.reduce((acc, client) => {
        const risk = client.riskLevel || 'medium';
        acc[risk] = (acc[risk] || 0) + 1;
        return acc;
      }, { low: 0, medium: 0, high: 0 });

      const metricsData: PortfolioMetrics = {
        totalClients: globalClients.length,
        totalDebt,
        totalPaid,
        collectionRate,
        averageDebt: globalClients.length > 0 ? totalDebt / globalClients.length : 0,
        riskDistribution: riskCounts
      };

      setMetrics(metricsData);
      
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.clientId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || client.status?.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status.toLowerCase()) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'moroso': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (!score) return 'text-gray-600';
    if (score >= 700) return 'text-green-600';
    if (score >= 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelColor = (risk: string) => {
    if (!risk) return 'bg-gray-100 text-gray-800';
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelLabel = (risk: string) => {
    if (!risk) return 'N/A';
    switch (risk) {
      case 'low': return 'Bajo';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return risk;
    }
  };

  const formatCurrency = (value: number | null | undefined) => {
    return (value || 0).toLocaleString();
  };

  if (!metrics) return (
    <div className="flex items-center justify-center p-8">
      <RefreshCw className="h-6 w-6 animate-spin mr-2" />
      Cargando cartera...
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
          Gestión de Cartera Profesional
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={forceUpdate} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Métricas Principales Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Clientes</p>
                <p className="text-2xl font-bold text-blue-800">{metrics.totalClients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Cartera Pendiente</p>
                <p className="text-2xl font-bold text-red-800">
                  RD$ {formatCurrency(metrics.totalDebt)}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Cobrado</p>
                <p className="text-2xl font-bold text-green-800">
                  RD$ {formatCurrency(metrics.totalPaid)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Tasa de Cobro</p>
                <p className="text-2xl font-bold text-purple-800">{metrics.collectionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Deuda Promedio</p>
                <p className="text-2xl font-bold text-orange-800">
                  RD$ {formatCurrency(metrics.averageDebt)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Clientes ({filteredClients.length})</TabsTrigger>
          <TabsTrigger value="risk">Análisis de Riesgo</TabsTrigger>
          <TabsTrigger value="payments">Historial ({cobros.length})</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-6">
          {/* Filtros y Búsqueda Mejorados */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nombre, email o ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                  >
                    Todos ({clients.length})
                  </Button>
                  <Button 
                    variant={statusFilter === 'activo' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('activo')}
                  >
                    Activos ({clients.filter(c => c.status?.toLowerCase() === 'activo').length})
                  </Button>
                  <Button 
                    variant={statusFilter === 'pendiente' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('pendiente')}
                  >
                    Pendientes ({clients.filter(c => c.status?.toLowerCase() === 'pendiente').length})
                  </Button>
                  <Button 
                    variant={statusFilter === 'moroso' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('moroso')}
                  >
                    Morosos ({clients.filter(c => c.status?.toLowerCase() === 'moroso').length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Clientes Mejorada */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes - Actualización en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Deuda</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Riesgo</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Gestor</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{client.name || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{client.clientId || 'N/A'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{client.email || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{client.phone || 'N/A'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold">RD$ {formatCurrency(client.debt)}</p>
                          <p className="text-xs text-gray-500">
                            Total pagado: RD$ {formatCurrency(client.totalPaid)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskLevelColor(client.riskLevel)}>
                          {getRiskLevelLabel(client.riskLevel)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getCreditScoreColor(client.creditScore)}`}>
                          {client.creditScore || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>{client.manager || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Contactar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Riesgo Bajo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{metrics.riskDistribution.low}</p>
                  <p className="text-sm text-green-700">Clientes confiables</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-yellow-800">Riesgo Medio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">{metrics.riskDistribution.medium}</p>
                  <p className="text-sm text-yellow-700">Requieren seguimiento</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">Riesgo Alto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">{metrics.riskDistribution.high}</p>
                  <p className="text-sm text-red-700">Atención inmediata</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cobros Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cobros.slice(0, 10).map((cobro, index) => (
                    <TableRow key={cobro.id || index}>
                      <TableCell>{cobro.date || cobro.fecha || 'N/A'}</TableCell>
                      <TableCell>{cobro.clientName || 'N/A'}</TableCell>
                      <TableCell className="font-bold">RD$ {formatCurrency(cobro.amount || cobro.monto)}</TableCell>
                      <TableCell>{cobro.method || cobro.metodo || 'N/A'}</TableCell>
                      <TableCell>{cobro.employeeName || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {cobro.status || 'Completado'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Reporte de Cartera Completo
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Análisis de Riesgo Crediticio
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Historial de Pagos
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Clientes Morosos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tasa de Recuperación</span>
                    <span className="font-bold text-green-600">{metrics.collectionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Cobros</span>
                    <span className="font-bold">{cobros.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cartera vs Cobrado</span>
                    <span className="font-bold text-blue-600">
                      {metrics.totalDebt > 0 ? (metrics.totalPaid / metrics.totalDebt * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Promedio por Cliente</span>
                    <span className="font-bold text-purple-600">
                      RD$ {formatCurrency(metrics.totalClients > 0 ? metrics.totalPaid / metrics.totalClients : 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
