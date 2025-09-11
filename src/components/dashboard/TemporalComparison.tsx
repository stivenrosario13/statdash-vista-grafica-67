
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Calendar, TrendingUp, TrendingDown, BarChart3, Activity, Target } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

interface ComparisonData {
  period: string;
  actual: number;
  previous: number;
  target: number;
  efficiency: number;
}

export function TemporalComparison() {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const { lastUpdate } = useRealtimeUpdates();

  useEffect(() => {
    generateComparisonData();
  }, [selectedPeriod, lastUpdate]);

  const generateComparisonData = () => {
    const periods = selectedPeriod === 'daily' ? 7 : selectedPeriod === 'weekly' ? 4 : 12;
    const data: ComparisonData[] = [];

    for (let i = 0; i < periods; i++) {
      const actual = Math.floor(Math.random() * 50000) + 20000;
      const previous = Math.floor(Math.random() * 50000) + 15000;
      const target = Math.floor(Math.random() * 60000) + 40000;
      const efficiency = (actual / target) * 100;

      data.push({
        period: selectedPeriod === 'daily' ? `Día ${i + 1}` : 
                selectedPeriod === 'weekly' ? `Sem ${i + 1}` : `Mes ${i + 1}`,
        actual,
        previous,
        target,
        efficiency
      });
    }

    setComparisonData(data);
  };

  const totalActual = comparisonData.reduce((sum, item) => sum + item.actual, 0);
  const totalPrevious = comparisonData.reduce((sum, item) => sum + item.previous, 0);
  const averageEfficiency = comparisonData.reduce((sum, item) => sum + item.efficiency, 0) / comparisonData.length;
  const growthRate = totalPrevious > 0 ? ((totalActual - totalPrevious) / totalPrevious) * 100 : 0;

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6" />
            <CardTitle>Comparación Temporal Avanzada</CardTitle>
          </div>
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period ? "bg-white text-indigo-600" : "text-white hover:bg-white/20"}
              >
                {period === 'daily' ? 'Diario' : period === 'weekly' ? 'Semanal' : 'Mensual'}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Métricas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Crecimiento</p>
                <p className="text-2xl font-bold">{growthRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Total Actual</p>
                <p className="text-2xl font-bold">RD$ {totalActual.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Eficiencia</p>
                <p className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">vs Anterior</p>
                <p className="text-2xl font-bold flex items-center">
                  {growthRate > 0 ? (
                    <TrendingUp className="h-5 w-5 mr-1" />
                  ) : (
                    <TrendingDown className="h-5 w-5 mr-1" />
                  )}
                  {Math.abs(growthRate).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos de Comparación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Líneas - Tendencia */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tendencia de Cobros</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `RD$ ${value.toLocaleString()}`,
                    name === 'actual' ? 'Actual' : name === 'previous' ? 'Anterior' : 'Meta'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#6b7280', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras - Comparación */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Comparación Directa</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `RD$ ${value.toLocaleString()}`,
                    name === 'actual' ? 'Período Actual' : 'Período Anterior'
                  ]}
                />
                <Bar dataKey="actual" fill="#3b82f6" name="actual" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" fill="#94a3b8" name="previous" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Área - Eficiencia */}
        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Evolución de la Eficiencia</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Eficiencia']}
              />
              <Area 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#8b5cf6" 
                fill="url(#colorEfficiency)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Análisis Detallado */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">Mejor Período</h4>
            <p className="text-blue-700">
              {comparisonData.reduce((best, current) => 
                current.actual > best.actual ? current : best, 
                comparisonData[0] || { period: 'N/A', actual: 0 }
              ).period}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              RD$ {comparisonData.reduce((best, current) => 
                current.actual > best.actual ? current : best, 
                comparisonData[0] || { actual: 0 }
              ).actual.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <h4 className="font-bold text-green-800 mb-2">Tendencia</h4>
            <div className="flex items-center">
              {growthRate > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className={growthRate > 0 ? 'text-green-700' : 'text-red-700'}>
                {growthRate > 0 ? 'Crecimiento' : 'Declive'}
              </span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              {Math.abs(growthRate).toFixed(1)}% vs período anterior
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2">Proyección</h4>
            <p className="text-purple-700">
              RD$ {(totalActual * 1.1).toLocaleString()}
            </p>
            <p className="text-sm text-purple-600 mt-1">
              Proyección siguiente período (+10%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
