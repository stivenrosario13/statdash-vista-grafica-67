
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Edit3, 
  Save, 
  X,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';

export function AdvancedGoalTracker() {
  const { state, updateSettings } = useGlobalData();
  const [isEditingMonthly, setIsEditingMonthly] = useState(false);
  const [isEditingDaily, setIsEditingDaily] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(state.settings.goals.monthly);
  const [dailyGoal, setDailyGoal] = useState(state.settings.goals.daily);

  const currentMonthRevenue = state.metrics.totalRevenue;
  const todayRevenue = state.cobros
    .filter(c => {
      const cobroDate = new Date(c.date || c.fecha);
      const today = new Date();
      return cobroDate.toDateString() === today.toDateString();
    })
    .reduce((sum, c) => sum + (c.amount || c.monto || 0), 0);

  const monthlyProgress = (currentMonthRevenue / state.settings.goals.monthly) * 100;
  const dailyProgress = (todayRevenue / state.settings.goals.daily) * 100;

  const saveMonthlyGoal = () => {
    updateSettings({
      goals: {
        ...state.settings.goals,
        monthly: monthlyGoal
      }
    });
    setIsEditingMonthly(false);
  };

  const saveDailyGoal = () => {
    updateSettings({
      goals: {
        ...state.settings.goals,
        daily: dailyGoal
      }
    });
    setIsEditingDaily(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 100) return { text: 'Completado', color: 'text-green-600', bg: 'bg-green-100' };
    if (progress >= 75) return { text: 'En Progreso', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (progress >= 50) return { text: 'A Mitad', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Necesita Atención', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <Card className="shadow-xl border-gray-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-2 text-black">
          <Target className="h-5 w-5" />
          Seguimiento Avanzado de Metas
          <Badge className="bg-purple-100 text-purple-800">
            Inteligente
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Meta Mensual */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-black">Meta Mensual</span>
            </div>
            {!isEditingMonthly ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingMonthly(true)}
                className="text-purple-600 hover:bg-purple-100"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Editar
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={saveMonthlyGoal}
                  className="text-green-600 hover:bg-green-100"
                >
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditingMonthly(false);
                    setMonthlyGoal(state.settings.goals.monthly);
                  }}
                  className="text-red-600 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {isEditingMonthly ? (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Input
                type="number"
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                className="flex-1"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {state.settings.currency} {currentMonthRevenue.toLocaleString()} / {state.settings.goals.monthly.toLocaleString()}
                </span>
                <Badge className={`${getProgressStatus(monthlyProgress).bg} ${getProgressStatus(monthlyProgress).color}`}>
                  {getProgressStatus(monthlyProgress).text}
                </Badge>
              </div>
              <Progress value={Math.min(monthlyProgress, 100)} className="h-3" />
              <div className="text-center">
                <span className="text-2xl font-bold text-purple-600">
                  {monthlyProgress.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Meta Diaria */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-black">Meta Diaria</span>
            </div>
            {!isEditingDaily ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingDaily(true)}
                className="text-blue-600 hover:bg-blue-100"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Editar
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={saveDailyGoal}
                  className="text-green-600 hover:bg-green-100"
                >
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditingDaily(false);
                    setDailyGoal(state.settings.goals.daily);
                  }}
                  className="text-red-600 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {isEditingDaily ? (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="flex-1"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {state.settings.currency} {todayRevenue.toLocaleString()} / {state.settings.goals.daily.toLocaleString()}
                </span>
                <Badge className={`${getProgressStatus(dailyProgress).bg} ${getProgressStatus(dailyProgress).color}`}>
                  {getProgressStatus(dailyProgress).text}
                </Badge>
              </div>
              <Progress value={Math.min(dailyProgress, 100)} className="h-3" />
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">
                  {dailyProgress.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas Adicionales */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Días Restantes</p>
              <p className="text-lg font-bold text-black">
                {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Promedio Diario Requerido</p>
              <p className="text-lg font-bold text-black">
                {state.settings.currency} {((state.settings.goals.monthly - currentMonthRevenue) / Math.max(1, new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate())).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
