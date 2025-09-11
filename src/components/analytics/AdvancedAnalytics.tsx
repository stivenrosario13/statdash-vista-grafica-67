
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, DollarSign, Users, Calendar, Activity, Brain, Zap } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

interface AnalyticsData {
  revenue: { current: number; predicted: number; growth: number };
  efficiency: { score: number; trend: number; benchmark: number };
  performance: { teams: any[]; individuals: any[]; trends: any[] };
  predictions: { nextMonth: number; nextQuarter: number; confidence: number };
}

export function AdvancedAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeframe, setTimeframe] = useState('month');
  const { lastUpdate } = useRealtimeUpdates();

  useEffect(() => {
    generateAnalytics();
  }, [lastUpdate, timeframe]);

  const generateAnalytics = () => {
    const data: AnalyticsData = {
      revenue: {
        current: 2847350 + Math.random() * 100000,
        predicted: 3200000,
        growth: 12.4 + Math.random() * 5
      },
      efficiency: {
        score: 87.3 + Math.random() * 10,
        trend: 5.2 + Math.random() * 3,
        benchmark: 82.1
      },
      performance: {
        teams: [
          { name: 'Mañana', current: 285000, target: 300000, efficiency: 95 },
          { name: 'Tarde', current: 320000, target: 350000, efficiency: 91 },
          { name: 'Noche', current: 195000, target: 220000, efficiency: 89 },
          { name: 'Calle', current: 410000, target: 400000, efficiency: 103 }
        ],
        individuals: [
          { name: 'Ana López', performance: 98, revenue: 45000, rank: 1 },
          { name: 'Carlos Ruiz', performance: 94, revenue: 42000, rank: 2 },
          { name: 'María García', performance: 91, revenue: 38000, rank: 3 }
        ],
        trends: [
          { period: 'Ene', revenue: 2100000, efficiency: 85 },
          { period: 'Feb', revenue: 2300000, efficiency: 87 },
          { period: 'Mar', revenue: 2500000, efficiency: 89 },
          { period: 'Abr', revenue: 2847350, efficiency: 91 }
        ]
      },
      predictions: {
        nextMonth: 3100000,
        nextQuarter: 9500000,
        confidence: 94.2
      }
    };
    setAnalyticsData(data);
  };

  if (!analyticsData) return <div>Cargando análisis...</div>;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
          Análisis Avanzado & Inteligencia de Negocio
        </h2>
        <div className="flex gap-2">
          {['week', 'month', 'quarter'].map((period) => (
            <Badge
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeframe(period)}
            >
              {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Trimestre'}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen Ejecutivo</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones IA</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Ingresos Actuales</p>
                    <p className="text-2xl font-bold text-blue-800">
                      RD$ {analyticsData.revenue.current.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-600">+{analyticsData.revenue.growth.toFixed(1)}% vs anterior</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Eficiencia Global</p>
                    <p className="text-2xl font-bold text-green-800">{analyticsData.efficiency.score.toFixed(1)}%</p>
                    <p className="text-xs text-green-600">+{analyticsData.efficiency.trend.toFixed(1)}% mejora</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Predicción IA</p>
                    <p className="text-2xl font-bold text-purple-800">
                      RD$ {analyticsData.predictions.nextMonth.toLocaleString()}
                    </p>
                    <p className="text-xs text-purple-600">{analyticsData.predictions.confidence}% confianza</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">ROI Trimestral</p>
                    <p className="text-2xl font-bold text-orange-800">28.5%</p>
                    <p className="text-xs text-orange-600">Superando meta 25%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.performance.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`RD$ ${Number(value).toLocaleString()}`, 'Ingresos']} />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Equipos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.performance.teams}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`RD$ ${Number(value).toLocaleString()}`, 'Actual']} />
                    <Bar dataKey="current" fill="#3B82F6" />
                    <Bar dataKey="target" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.performance.individuals.map((person, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>#{person.rank}</Badge>
                        <div>
                          <p className="font-semibold">{person.name}</p>
                          <p className="text-sm text-gray-600">RD$ {person.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{person.performance}%</p>
                        <Progress value={person.performance} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eficiencia por Equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.performance.teams}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, efficiency }) => `${name}: ${efficiency}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="efficiency"
                    >
                      {analyticsData.performance.teams.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análisis Predictivo con IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="font-semibold mb-2">Próximo Mes</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    RD$ {analyticsData.predictions.nextMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Confianza: {analyticsData.predictions.confidence}%</p>
                </div>
                <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="font-semibold mb-2">Próximo Trimestre</h3>
                  <p className="text-2xl font-bold text-green-600">
                    RD$ {analyticsData.predictions.nextQuarter.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Basado en tendencias actuales</p>
                </div>
                <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-violet-50">
                  <h3 className="font-semibold mb-2">Crecimiento Anual</h3>
                  <p className="text-2xl font-bold text-purple-600">+32.8%</p>
                  <p className="text-sm text-gray-600">Proyección optimizada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa Industrial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Eficiencia Operativa</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Nosotros: {analyticsData.efficiency.score.toFixed(1)}%</span>
                    <span className="text-sm text-gray-500">Industria: {analyticsData.efficiency.benchmark}%</span>
                  </div>
                </div>
                <Progress value={(analyticsData.efficiency.score / 100) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
