import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeframeType } from '@/data/employeesData';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { Button } from "@/components/ui/button";
import { FileText, Printer } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface PieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  className?: string;
  timeframe?: TimeframeType;
  onTimeframeChange?: (timeframe: TimeframeType) => void;
}

export function PieChart({ 
  title, 
  data, 
  colors, 
  className,
  timeframe,
  onTimeframeChange
}: PieChartProps) {
  const exportToPDF = async () => {
    const element = document.getElementById('pie-chart');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('pie-chart.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'pie-chart-data.xlsx');
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {timeframe && onTimeframeChange && (
              <TimeframeSelector 
                activeTimeframe={timeframe} 
                onChange={onTimeframeChange} 
              />
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
              >
                <Printer className="h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToExcel}
              >
                <FileText className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div id="pie-chart" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}`, 'Valor']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
