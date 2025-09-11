import { useState } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, DollarSign, Calendar, Filter, Download } from "lucide-react";

const BarCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const monthlyRevenue = [
    { name: 'Enero', value: 450000, target: 400000 },
    { name: 'Febrero', value: 520000, target: 450000 },
    { name: 'Marzo', value: 480000, target: 460000 },
    { name: 'Abril', value: 610000, target: 480000 },
    { name: 'Mayo', value: 550000, target: 500000 },
    { name: 'Junio', value: 670000, target: 520000 },
    { name: 'Julio', value: 720000, target: 550000 },
    { name: 'Agosto', value: 680000, target: 580000 },
  ];

  const teamPerformance = [
    { name: 'Equipo Centro', value: 85, efficiency: 92, contacts: 450 },
    { name: 'Equipo Norte', value: 92, efficiency: 88, contacts: 520 },
    { name: 'Equipo Sur', value: 78, efficiency: 85, contacts: 380 },
    { name: 'Equipo Este', value: 88, efficiency: 90, contacts: 410 },
    { name: 'Equipo Oeste', value: 95, efficiency: 94, contacts: 580 },
  ];

  const dailyCollections = [
    { name: 'Lun', value: 120000, previous: 115000 },
    { name: 'Mar', value: 150000, previous: 140000 },
    { name: 'Mié', value: 110000, previous: 125000 },
    { name: 'Jue', value: 160000, previous: 155000 },
    { name: 'Vie', value: 140000, previous: 135000 },
    { name: 'Sáb', value: 180000, previous: 170000 },
    { name: 'Dom', value: 130000, previous: 120000 },
  ];

  const quarterlyProductivity = [
    { name: 'Q1 2023', value: 78, growth: 5.2 },
    { name: 'Q2 2023', value: 85, growth: 8.9 },
    { name: 'Q3 2023', value: 92, growth: 8.2 },
    { name: 'Q4 2023', value: 88, growth: -4.3 },
    { name: 'Q1 2024', value: 94, growth: 6.8 },
  ];

  const getDataByPeriod = () => {
    switch (selectedPeriod) {
      case "monthly": return monthlyRevenue;
      case "daily": return dailyCollections;
      case "quarterly": return quarterlyProductivity;
      default: return monthlyRevenue;
    }
  };

  const getMetricData = () => {
    switch (selectedMetric) {
      case "revenue": return monthlyRevenue;
      case "performance": return teamPerformance;
      case "productivity": return quarterlyProductivity;
      default: return monthlyRevenue;
    }
  };

  const exportData = () => {
    console.log("Exportando datos...");
    // Aquí iría la lógica de exportación
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
            Análisis por Barras
          </h1>
          <p className="text-blue-600 mt-2">Visualización detallada del rendimiento por categorías</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tendencia Positiva
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Calendar className="h-4 w-4 mr-2" />
            Tiempo Real
          </Badge>
        </div>
      </div>

      {/* Controles de filtrado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Configuración
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Métrica</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Seleccionar métrica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Ingresos</SelectItem>
                  <SelectItem value="performance">Rendimiento</SelectItem>
                  <SelectItem value="productivity">Productividad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={exportData} variant="outline" className="mt-6">
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
              <DollarSign className="h-5 w-5" />
              Ingresos Mensuales (RD$)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BarChart
              title=""
              data={monthlyRevenue}
              xAxisDataKey="name"
              bars={[
                { dataKey: "value", fill: "#3b82f6", name: "Ingresos" },
                { dataKey: "target", fill: "#94a3b8", name: "Meta" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Rendimiento por Equipo (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BarChart
              title=""
              data={teamPerformance}
              xAxisDataKey="name"
              bars={[
                { dataKey: "value", fill: "#10b981", name: "Rendimiento" },
                { dataKey: "efficiency", fill: "#34d399", name: "Eficiencia" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cobros Diarios (RD$)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BarChart
              title=""
              data={dailyCollections}
              xAxisDataKey="name"
              bars={[
                { dataKey: "value", fill: "#8b5cf6", name: "Actual" },
                { dataKey: "previous", fill: "#c4b5fd", name: "Anterior" }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productividad Trimestral (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BarChart
              title=""
              data={quarterlyProductivity}
              xAxisDataKey="name"
              bars={[{ dataKey: "value", fill: "#f97316", name: "Productividad" }]}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Tendencias Clave</h3>
              <p className="text-blue-600 text-sm">
                Los ingresos muestran un crecimiento del 15.2% comparado con el trimestre anterior.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">Top Performer</h3>
              <p className="text-green-600 text-sm">
                El Equipo Oeste lidera con 95% de rendimiento y 580 contactos exitosos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-2">Oportunidades</h3>
              <p className="text-purple-600 text-sm">
                El Equipo Sur tiene potencial de mejora del 17% para alcanzar el promedio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarCharts;
