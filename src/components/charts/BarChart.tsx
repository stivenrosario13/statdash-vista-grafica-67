
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
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

interface BarChartProps {
  title: string;
  data: any[];
  bars: {
    dataKey: string;
    fill: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  layout?: 'vertical' | 'horizontal';
  className?: string;
  timeframe?: TimeframeType;
  onTimeframeChange?: (timeframe: TimeframeType) => void;
}

export function BarChart({ 
  title, 
  data, 
  bars, 
  xAxisDataKey, 
  layout = 'horizontal',
  className,
  timeframe,
  onTimeframeChange
}: BarChartProps) {
  const exportToPDF = async () => {
    const element = document.getElementById('bar-chart');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('bar-chart.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'bar-chart-data.xlsx');
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
        <div id="bar-chart" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={layout}
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
                type={layout === 'vertical' ? 'number' : 'category'}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                type={layout === 'vertical' ? 'category' : 'number'}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <Legend />
              {bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.fill}
                  name={bar.name || bar.dataKey}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
