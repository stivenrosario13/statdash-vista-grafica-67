
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, DollarSign } from "lucide-react";

interface Prediction {
  title: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'positive' | 'negative' | 'stable';
  icon: React.ComponentType<any>;
}

export function PredictiveAnalytics() {
  const predictions: Prediction[] = [
    {
      title: "Cobros Fin de Mes",
      current: 67,
      predicted: 85,
      confidence: 92,
      trend: 'positive',
      icon: DollarSign
    },
    {
      title: "Meta Trimestral",
      current: 45,
      predicted: 78,
      confidence: 88,
      trend: 'positive',
      icon: Target
    },
    {
      title: "Retención Clientes",
      current: 89,
      predicted: 91,
      confidence: 85,
      trend: 'stable',
      icon: TrendingUp
    },
    {
      title: "Pagos Puntuales",
      current: 72,
      predicted: 68,
      confidence: 79,
      trend: 'negative',
      icon: Calendar
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Análisis Predictivo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => {
          const Icon = prediction.icon;
          const improvement = prediction.predicted - prediction.current;
          
          return (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{prediction.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{getTrendIcon(prediction.trend)}</span>
                  <Badge 
                    variant={prediction.trend === 'positive' ? 'default' : 
                            prediction.trend === 'negative' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {improvement > 0 ? '+' : ''}{improvement.toFixed(0)}%
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Actual: {prediction.current}%</span>
                  <span>Predicción: {prediction.predicted}%</span>
                </div>
                <Progress value={prediction.predicted} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Confianza: {prediction.confidence}%
                  </span>
                  <span className={`text-xs font-medium ${getTrendColor(prediction.trend)}`}>
                    {prediction.trend === 'positive' ? 'Mejorando' :
                     prediction.trend === 'negative' ? 'Declinando' : 'Estable'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 <strong>Recomendación:</strong> Enfócate en mejorar los pagos puntuales 
            con recordatorios automatizados para alcanzar las metas proyectadas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
