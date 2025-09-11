
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeframeType, teams, calculateTeamTotal } from '@/data/employeesData';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { PieChart } from '@/components/charts/PieChart';
import { BarChart } from '@/components/charts/BarChart';
import { Button } from "@/components/ui/button";
import { Printer, FileText, Users } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export function TeamStats() {
  const [timeframe, setTimeframe] = useState<TimeframeType>("daily");
  
  // Prepare data for charts
  const chartData = teams.map(team => ({
    name: team.name,
    value: calculateTeamTotal(team.id, timeframe)
  }));
  
  const teamColors = teams.map(team => team.color);

  const exportToPDF = async (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('team-stats.pdf');
  };

  const exportToExcel = (data: any[], filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Cobros por Equipo - Horizontal */}
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Cobros por Equipo
            </CardTitle>
            <div className="flex items-center gap-2">
              <TimeframeSelector activeTimeframe={timeframe} onChange={setTimeframe} />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToPDF('teams-list')}
                >
                  <Printer className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToExcel(chartData, 'teams-data')}
                >
                  <FileText className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div id="teams-list">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {teams.map(team => {
                const total = calculateTeamTotal(team.id, timeframe);
                
                return (
                  <div 
                    key={team.id}
                    className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderColor: `${team.color}30` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white mb-3"
                      style={{ backgroundColor: team.color }}
                    >
                      {team.name.split(' ')[1]?.substring(0, 2) || team.name.substring(0, 2)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-800">{team.name}</div>
                      <div 
                        className="text-xs px-2 py-1 rounded-full inline-block mt-1 mb-2"
                        style={{ 
                          backgroundColor: `${team.color}20`, 
                          color: team.color 
                        }}
                      >
                        {timeframe === 'daily' ? 'Hoy' : 
                         timeframe === 'weekly' ? 'Esta semana' : 
                         'Este mes'}
                      </div>
                      <div className="font-bold text-xl text-blue-900">${total.toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos - 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Distribución de Cobros</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="bar-chart" className="h-[300px]">
              <BarChart
                title="Distribución de Cobros"
                data={chartData}
                xAxisDataKey="name"
                bars={[{ dataKey: "value", fill: "#87CEEB", name: "Monto" }]}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Distribución por Porcentaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="pie-chart">
              <PieChart
                title="Distribución por Porcentaje"
                data={chartData}
                colors={teamColors}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
