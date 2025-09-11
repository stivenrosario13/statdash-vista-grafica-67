
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { TimeframeType, employees, obtenerCobros } from '@/data/employeesData';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { Button } from "@/components/ui/button";
import { FileText, Printer, Edit, Trash2 } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export function EmployeeHistory() {
  const [timeframe, setTimeframe] = useState<TimeframeType>('daily');
  const [selectedEmployee, setSelectedEmployee] = useState<number>(1);

  const cobros = obtenerCobros();
  
  const daysToFilter = timeframe === 'daily' ? 1 : 
                      timeframe === 'weekly' ? 5 : 30;
  
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - daysToFilter);
  
  const employeeCobros = cobros.filter(cobro => 
    cobro.empleadoId === selectedEmployee && cobro.fecha >= fechaLimite
  );
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const exportToPDF = async () => {
    const element = document.getElementById('employee-history');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('historial-cobros.pdf');
  };

  const exportToExcel = () => {
    const dataToExport = employeeCobros.map(cobro => ({
      Fecha: formatDate(cobro.fecha),
      Descripción: cobro.descripcion,
      Monto: cobro.monto
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial');
    XLSX.writeFile(wb, 'historial-cobros.xlsx');
  };

  const handleEdit = (id: number) => {
    console.log('Editar cobro:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Eliminar cobro:', id);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Historial de Cobros por Empleado</CardTitle>
          <div className="flex items-center gap-2">
            <TimeframeSelector activeTimeframe={timeframe} onChange={setTimeframe} />
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
        <div className="mt-4">
          <select
            className="w-full sm:w-auto p-2 border rounded-md bg-white"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(parseInt(e.target.value))}
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div id="employee-history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Fecha</TableHead>
                  <TableHead className="font-bold">Descripción</TableHead>
                  <TableHead className="font-bold text-right">Monto</TableHead>
                  <TableHead className="font-bold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeCobros.length > 0 ? (
                  employeeCobros.map(cobro => (
                    <TableRow key={cobro.id}>
                      <TableCell className="font-medium">{formatDate(cobro.fecha)}</TableCell>
                      <TableCell>{cobro.descripcion}</TableCell>
                      <TableCell className="text-right font-bold">${cobro.monto.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(cobro.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(cobro.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No se encontraron registros para el período seleccionado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
