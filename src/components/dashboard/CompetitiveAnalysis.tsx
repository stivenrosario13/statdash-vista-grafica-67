
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Award, BarChart3, RefreshCw } from "lucide-react";

interface CompetitorData {
  name: string;
  marketShare: number;
  efficiency: number;
  customerSat: number;
  growth: number;
  color: string;
  position: number;
}

interface BenchmarkMetric {
  category: string;
  ourScore: number;
  industryAvg: number;
  bestInClass: number;
  icon: React.ComponentType<any>;
}

export function CompetitiveAnalysis() {
  const [competitors] = useState<CompetitorData[]>([
    { name: "Steven Rosario", marketShare: 34.2, efficiency: 87.3, customerSat: 94.7, growth: 28.5, color: "#3B82F6", position: 1 },
    { name: "Competidor A", marketShare: 28.7, efficiency: 82.1, customerSat: 89.2, growth: 18.3, color: "#EF4444", position: 2 },
    { name: "Competidor B", marketShare: 22.1, efficiency: 79.5, customerSat: 91.1, growth: 15.7, color: "#F59E0B", position: 3 },
    { name: "Competidor C", marketShare: 15.0, efficiency: 76.8, customerSat: 87.4, growth: 12.2, color: "#10B981", position: 4 }
  ]);

  const [benchmarks] = useState<BenchmarkMetric[]>([
    { category: "Eficiencia Operativa", ourScore: 87.3, industryAvg: 79.2, bestInClass: 91.5, icon: Target },
    { category: "Satisfacción Cliente", ourScore: 94.7, industryAvg: 88.1, bestInClass: 97.2, icon: Users },
    { category: "Tiempo Respuesta", ourScore: 85.2, industryAvg: 78.9, bestInClass: 94.1, icon: TrendingUp },
    { category: "Retención", ourScore: 92.1, industryAvg: 84.7, bestInClass: 96.3, icon: Award }
  ]);

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1: return { variant: "default" as const, text: "Líder", color: "text-green-600" };
      case 2: return { variant: "secondary" as const, text: "2° Lugar", color: "text-blue-600" };
      case 3: return { variant: "outline" as const, text: "3° Lugar", color: "text-orange-600" };
      default: return { variant: "outline" as const, text: `${position}° Lugar`, color: "text-gray-600" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Position */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Posición Competitiva
            </CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitors.map((competitor, index) => {
              const badge = getPositionBadge(competitor.position);
              return (
                <div 
                  key={competitor.name}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">{competitor.name}</h4>
                    <Badge variant={badge.variant} className="text-xs">
                      {badge.text}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Cuota Mercado</span>
                      <span className="font-medium">{competitor.marketShare}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Eficiencia</span>
                      <span className="font-medium">{competitor.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Satisfacción</span>
                      <span className="font-medium">{competitor.customerSat}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Crecimiento</span>
                      <span className="font-medium text-green-600">+{competitor.growth}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análisis de Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {benchmarks.map((benchmark, index) => {
              const Icon = benchmark.icon;
              const ourPerformance = (benchmark.ourScore / benchmark.bestInClass) * 100;
              const industryPerformance = (benchmark.industryAvg / benchmark.bestInClass) * 100;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{benchmark.category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-blue-600 font-semibold">
                        Nosotros: {benchmark.ourScore}
                      </span>
                      <span className="text-gray-500">
                        Industria: {benchmark.industryAvg}
                      </span>
                      <span className="text-green-600">
                        Mejor: {benchmark.bestInClass}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Progress value={100} className="h-3 bg-gray-200" />
                    <div 
                      className="absolute top-0 left-0 h-3 bg-blue-500 rounded-l"
                      style={{ width: `${ourPerformance}%` }}
                    />
                    <div 
                      className="absolute top-0 h-3 bg-gray-400 opacity-50"
                      style={{ 
                        left: `${industryPerformance}%`, 
                        width: '2px',
                        backgroundColor: '#6B7280'
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>Promedio Industria ({benchmark.industryAvg})</span>
                    <span>Mejor en Clase ({benchmark.bestInClass})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
