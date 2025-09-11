import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Activity, BarChart3, Target, Filter, Download, RefreshCw } from "lucide-react";

const LineCharts = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [isLoading, setIsLoading] = useState(false);

  const revenueData = [
    { name: 'Ene', value: 450000, forecast: 420000, target: 400000 },
    { name: 'Feb', value: 520000, forecast: 480000, target: 450000 },
    { name: 'Mar', value: 480000, forecast: 500000, target: 460000 },
    { name: 'Abr', value: 610000, forecast: 580000, target: 480000 },
    { name: 'May', value: 550000, forecast: 590000, target: 500000 },
    { name: 'Jun', value: 670000, forecast: 640000, target: 520000 },
    { name: 'Jul', value: 730000, forecast: 700000, target: 550000 },
    { name: 'Ago', value: 690000, forecast: 720000, target: 580000 },
    { name: 'Sep', value: 780000, forecast: 760000, target: 600000 },
    { name: 'Oct', value: 820000, forecast: 800000, target: 650000 },
    { name: 'Nov', value: 890000, forecast: 850000, target: 700000 },
    { name: 'Dic', value: 950000, forecast: 920000, target: 750000 },
  ];

  const efficiencyData = [
    { name: 'Sem 1', value: 75, teamAvg: 72, industry: 68 },
    { name: 'Sem 2', value: 78, teamAvg: 74, industry: 69 },
    { name: 'Sem 3', value: 82, teamAvg: 79, industry: 70 },
    { name: 'Sem 4', value: 85, teamAvg: 82, industry: 71 },
    { name: 'Sem 5', value: 88, teamAvg: 85, industry: 72 },
    { name: 'Sem 6', value: 91, teamAvg: 87, industry: 73 },
    { name: 'Sem 7', value: 89, teamAvg: 86, industry: 74 },
    { name: 'Sem 8', value: 93, teamAvg: 89, industry: 75 },
  ];

  const clientSatisfactionData = [
    { name: 'Q1', value: 82, nps: 65, retention: 89 },
    { name: 'Q2', value: 85, nps: 68, retention: 91 },
    { name: 'Q3', value: 88, nps: 72, retention: 93 },
    { name: 'Q4', value: 92, nps: 75, retention: 95 },
  ];

  const growthData = [
    { name: '2020', value: 350, organic: 280, paid: 70 },
    { name: '2021', value: 420, organic: 320, paid: 100 },
    { name: '2022', value: 510, organic: 380, paid: 130 },
    { name: '2023', value: 680, organic: 500, paid: 180 },
    { name: '2024', value: 850, organic: 620, paid: 230 },
  ];

  const refreshData = async () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-800 to-blue-600 bg-clip-text text-transparent">
            Tendencias Temporales
          </h1>
          <p className="text-green-600 mt-2">Análisis de evolución y tendencias en el tiempo</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            En Vivo
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <BarChart3 className="h-4 w-4 mr-2" />
            Análisis Avanzado
          </Badge>
        </div>
      </div>

      {/* Controles avanzados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Configuración Avanzada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Rango Temporal</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Seleccionar rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mes</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={refreshData} 
              variant="outline" 
              className="mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Actualizar
            </Button>

            <Button variant="outline" className="mt-6">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ingresos Anuales (RD$ Miles)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LineChart
              title=""
              data={revenueData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value", stroke: "#3b82f6", name: "Ingresos Reales" },
                { dataKey: "forecast", stroke: "#94a3b8", name: "Pronóstico" },
                { dataKey: "target", stroke: "#ef4444", name: "Meta" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Eficiencia Semanal (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LineChart
              title=""
              data={efficiencyData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value", stroke: "#10b981", name: "Nuestra Eficiencia" },
                { dataKey: "teamAvg", stroke: "#34d399", name: "Promedio Equipos" },
                { dataKey: "industry", stroke: "#6b7280", name: "Industria" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Satisfacción del Cliente (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LineChart
              title=""
              data={clientSatisfactionData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value", stroke: "#8b5cf6", name: "Satisfacción" },
                { dataKey: "nps", stroke: "#a78bfa", name: "NPS Score" },
                { dataKey: "retention", stroke: "#c4b5fd", name: "Retención" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Crecimiento Anual (Clientes)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LineChart
              title=""
              data={growthData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value", stroke: "#f97316", name: "Total" },
                { dataKey: "organic", stroke: "#fb923c", name: "Orgánico" },
                { dataKey: "paid", stroke: "#fdba74", name: "Pagado" }
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">Crecimiento Anual</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">+25.8%</div>
              <p className="text-green-600 text-sm">
                Crecimiento sostenido en ingresos comparado con el año anterior
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Eficiencia Líder</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">93%</div>
              <p className="text-blue-600 text-sm">
                Por encima del promedio de la industria en 18 puntos
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-2">Satisfacción</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
              <p className="text-purple-600 text-sm">
                Score de satisfacción y retención del 95% de clientes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineCharts;
