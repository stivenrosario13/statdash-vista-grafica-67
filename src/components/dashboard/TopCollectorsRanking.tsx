
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeframeType, employees, teams, calculateEmployeeTotal } from '@/data/employeesData';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { Medal, Trophy } from 'lucide-react';

export function TopCollectorsRanking() {
  const [timeframe, setTimeframe] = useState<TimeframeType>('daily');
  
  // Obtener top 3 por equipo
  const getTopCollectorsByTeam = (teamId: number) => {
    const teamEmployees = employees.filter(emp => emp.teamId === teamId);
    return teamEmployees
      .map(emp => ({
        ...emp,
        total: calculateEmployeeTotal(emp.id, timeframe)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  };
  
  return (
    <Card className="w-full bg-white border-blue-200">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Ranking Top Gestores por Equipo
          </CardTitle>
          <TimeframeSelector activeTimeframe={timeframe} onChange={setTimeframe} />
        </div>
      </CardHeader>
      <CardContent className="bg-white p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {teams.map(team => (
            <div key={team.id} className="space-y-4">
              <h3 
                className="font-semibold text-lg text-center p-2 rounded-lg"
                style={{ color: team.color, backgroundColor: `${team.color}15` }}
              >
                {team.name}
              </h3>
              {getTopCollectorsByTeam(team.id).map((emp, index) => (
                <div 
                  key={emp.id}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: `${team.color}30` }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${team.color}20`, color: team.color }}
                    >
                      {index === 0 && <Medal className="h-4 w-4 text-yellow-500" />}
                      {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                      {index === 2 && <Medal className="h-4 w-4 text-amber-600" />}
                    </div>
                    <div>
                      <span className="font-medium text-blue-800 text-sm">{emp.name}</span>
                      <div className="text-xs text-gray-500">{emp.avatar}</div>
                    </div>
                  </div>
                  <span className="font-bold text-blue-900">${emp.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
