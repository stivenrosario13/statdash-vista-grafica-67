
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeframeType, employees, teams, calculateEmployeeTotal } from '@/data/employeesData';
import { TimeframeSelector } from '@/components/TimeframeSelector';

export function EmployeeStats() {
  const [timeframe, setTimeframe] = useState<TimeframeType>('daily');
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Cobros por Empleado</CardTitle>
          <TimeframeSelector activeTimeframe={timeframe} onChange={setTimeframe} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {employees.map(employee => {
            const team = teams.find(t => t.id === employee.teamId);
            const total = calculateEmployeeTotal(employee.id, timeframe);
            
            return (
              <div 
                key={employee.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold"
                    style={{ backgroundColor: `${team?.color}20` }}
                  >
                    {employee.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div 
                      className="text-xs px-2 py-1 rounded-full inline-block mt-1"
                      style={{ 
                        backgroundColor: `${team?.color}20`, 
                        color: team?.color 
                      }}
                    >
                      {team?.name}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-lg">
                  ${total.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
