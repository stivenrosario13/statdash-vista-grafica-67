
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, CheckCircle, XCircle, Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { registrarCobro, employees } from '@/data/employeesData';

interface ImportData {
  empleado: string;
  monto: number;
  descripcion: string;
  fecha?: string;
}

export function ExcelImport() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setImportResults(null);
      } else {
        toast.error('Por favor selecciona un archivo Excel (.xlsx o .xls)');
      }
    }
  };

  const processExcelFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as ImportData[];

        let successful = 0;
        let failed = 0;
        const errors: string[] = [];

        jsonData.forEach((row, index) => {
          try {
            // Buscar empleado por nombre
            const empleado = employees.find(emp => 
              emp.name.toLowerCase().includes(row.empleado?.toLowerCase() || '')
            );

            if (!empleado) {
              errors.push(`Fila ${index + 2}: Empleado "${row.empleado}" no encontrado`);
              failed++;
              return;
            }

            if (!row.monto || row.monto <= 0) {
              errors.push(`Fila ${index + 2}: Monto inválido`);
              failed++;
              return;
            }

            if (!row.descripcion) {
              errors.push(`Fila ${index + 2}: Descripción requerida`);
              failed++;
              return;
            }

            // Registrar el cobro
            registrarCobro(empleado.id, row.monto, row.descripcion);
            successful++;

          } catch (error) {
            errors.push(`Fila ${index + 2}: Error al procesar datos`);
            failed++;
          }
        });

        setImportResults({ successful, failed, errors });
        
        if (successful > 0) {
          toast.success(`${successful} cobros importados exitosamente`);
        }
        if (failed > 0) {
          toast.error(`${failed} registros fallaron al importar`);
        }

      } catch (error) {
        toast.error('Error al procesar el archivo Excel');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        empleado: 'Juan Pérez',
        monto: 150.50,
        descripcion: 'Permiso de Operación - Local 123',
        fecha: '2024-01-15'
      },
      {
        empleado: 'María García',
        monto: 75.00,
        descripcion: 'Aseo - Sector Norte',
        fecha: '2024-01-15'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');
    XLSX.writeFile(wb, 'plantilla-cobros.xlsx');
    
    toast.success('Plantilla descargada exitosamente');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Importar Cobros desde Excel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Descargar plantilla */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Paso 1: Descargar plantilla</h3>
          <p className="text-sm text-gray-600 mb-3">
            Descarga la plantilla de Excel con el formato correcto para importar cobros.
          </p>
          <Button 
            variant="outline" 
            onClick={downloadTemplate}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Descargar Plantilla
          </Button>
        </div>

        {/* Subir archivo */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="excel-file">Paso 2: Seleccionar archivo Excel</Label>
            <div className="mt-2">
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            {file && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Archivo seleccionado: {file.name}
              </p>
            )}
          </div>

          <Button 
            onClick={processExcelFile}
            disabled={!file || isProcessing}
            className="w-full flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isProcessing ? 'Procesando...' : 'Importar Cobros'}
          </Button>
        </div>

        {/* Resultados */}
        {importResults && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Exitosos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {importResults.successful}
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Fallidos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {importResults.failed}
                  </p>
                </div>
              </div>
            </div>

            {importResults.errors.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Errores encontrados:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {importResults.errors.slice(0, 10).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                  {importResults.errors.length > 10 && (
                    <li className="font-medium">
                      ... y {importResults.errors.length - 10} errores más
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Instrucciones */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Formato requerido:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>empleado:</strong> Nombre del gestor (debe existir en el sistema)</li>
            <li>• <strong>monto:</strong> Cantidad numérica (ejemplo: 150.50)</li>
            <li>• <strong>descripcion:</strong> Descripción del cobro</li>
            <li>• <strong>fecha:</strong> Fecha opcional (formato: YYYY-MM-DD)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
