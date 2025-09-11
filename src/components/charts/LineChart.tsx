import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
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

interface LineChartProps {
  title: string;
  data: any[];
  lines: {
    dataKey: string;
    stroke: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  className?: string;
  timeframe?: TimeframeType;
  onTimeframeChange?: (timeframe: TimeframeType) => void;
}

export function LineChart({ 
  title, 
  data, 
  lines, 
  xAxisDataKey, 
  className,
  timeframe,
  onTimeframeChange
}: LineChartProps) {
  const exportToPDF = async () => {
    const element = document.getElementById('line-chart');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('line-chart.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'line-chart-data.xlsx');
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
        <div id="line-chart" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: '#888' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <Legend />
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  name={line.name || line.dataKey}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
