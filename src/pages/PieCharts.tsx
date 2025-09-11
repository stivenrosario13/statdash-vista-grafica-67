
import { useState } from "react";
import { PieChart } from "@/components/charts/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart as PieChartIcon, Users, Target, TrendingUp, Filter, Download, Eye } from "lucide-react";

const PieCharts = () => {
  const [viewMode, setViewMode] = useState("percentage");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketShareData = [
    { name: 'Equipo Centro', value: 285000 },
    { name: 'Equipo Norte', value: 340000 },
    { name: 'Equipo Sur', value: 220000 },
    { name: 'Equipo Este', value: 310000 },
    { name: 'Equipo Oeste', value: 395000 },
  ];

  const deviceData = [
    { name: 'Móvil', value: 65 },
    { name: 'Desktop', value: 25 },
    { name: 'Tablet', value: 10 },
  ];
  
  const sourceData = [
    { name: 'Directo', value: 40 },
    { name: 'Referidos', value: 30 },
    { name: 'Publicidad', value: 20 },
    { name: 'Redes Sociales', value: 7 },
    { name: 'Otros', value: 3 },
  ];

  const statusData = [
    { name: 'Pagado', value: 60 },
    { name: 'Pendiente', value: 25 },
    { name: 'Atrasado', value: 12 },
    { name: 'En Negociación', value: 3 },
  ];

  const categoryData = [
    { name: 'Préstamos Personales', value: 45 },
    { name: 'Servicios Financieros', value: 30 },
    { name: 'Productos Bancarios', value: 15 },
    { name: 'Seguros', value: 10 },
  ];

  const regionData = [
    { name: 'Santo Domingo', value: 35 },
    { name: 'Santiago', value: 20 },
    { name: 'La Vega', value: 15 },
    { name: 'San Pedro de Macorís', value: 12 },
    { name: 'Puerto Plata', value: 8 },
    { name: 'Otros', value: 10 },
  ];

  const ageGroupData = [
    { name: '18-25 años', value: 15 },
    { name: '26-35 años', value: 35 },
    { name: '36-45 años', value: 28 },
    { name: '46-55 años', value: 16 },
    { name: '56+ años', value: 6 },
  ];

  const channelData = [
    { name: 'Teléfono', value: 45 },
    { name: 'WhatsApp', value: 30 },
    { name: 'Email', value: 15 },
    { name: 'Presencial', value: 8 },
    { name: 'SMS', value: 2 },
  ];
  
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
            Distribución y Segmentación
          </h1>
          <p className="text-purple-600 mt-2">Análisis detallado de la distribución por categorías</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-4 py-2">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Vista Circular
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            Segmentación Avanzada
          </Badge>
        </div>
      </div>

      {/* Controles avanzados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Configuración de Vista
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Modo de Vista</label>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Modo de vista" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Porcentajes</SelectItem>
                  <SelectItem value="absolute">Valores Absolutos</SelectItem>
                  <SelectItem value="comparison">Comparativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="performance">Rendimiento</SelectItem>
                  <SelectItem value="geographic">Geográfica</SelectItem>
                  <SelectItem value="demographic">Demográfica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="mt-6">
              <Eye className="h-4 w-4 mr-2" />
              Vista Detallada
            </Button>

            <Button variant="outline" className="mt-6">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Rendimiento por Equipo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={marketShareData}
              colors={['#4A8AF4', '#9B5DE5', '#05D77C', '#FF7C43', '#F72585']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-blue-600">
                Equipo Oeste lidera con RD$ 395,000
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Canales de Adquisición
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={sourceData}
              colors={['#05D77C', '#4A8AF4', '#FF7C43', '#9B5DE5', '#F72585']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600">
                40% de clientes vienen directamente
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Acceso por Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={deviceData}
              colors={['#4361EE', '#F72585', '#2EC4B6']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-purple-600">
                65% prefiere dispositivos móviles
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Estado de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={statusData}
              colors={['#10b981', '#f59e0b', '#ef4444', '#6366f1']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-orange-600">
                60% de pagos están al día
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Categorías de Servicio
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={categoryData}
              colors={['#0891b2', '#059669', '#7c3aed', '#dc2626']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-teal-600">
                Préstamos personales dominan (45%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Distribución Regional
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={regionData}
              colors={['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#94a3b8']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-indigo-600">
                Santo Domingo concentra el 35%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Grupos de Edad
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={ageGroupData}
              colors={['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-pink-600">
                26-35 años es el segmento principal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Canales de Comunicación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PieChart
              title=""
              data={channelData}
              colors={['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-cyan-600">
                Teléfono sigue siendo preferido (45%)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-2">Segmentación Inteligente</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <p className="text-purple-600 text-sm">
                Categorías principales identificadas para estrategias focalizadas
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-800 mb-2">Oportunidades</h3>
              <div className="text-3xl font-bold text-pink-600 mb-2">25%</div>
              <p className="text-pink-600 text-sm">
                Potencial de crecimiento en segmentos poco atendidos
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Diversificación</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">Óptima</div>
              <p className="text-indigo-600 text-sm">
                Distribución equilibrada reduce riesgos operacionales
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PieCharts;
