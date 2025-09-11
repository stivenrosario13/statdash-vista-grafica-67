
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Printer, Edit, Trash2, Eye, Search, Filter, Download, RefreshCw } from "lucide-react";
import { useRealtimeUpdates, getGlobalCobros, getGlobalClients } from '@/hooks/useRealtimeUpdates';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export function CobrosTable() {
  const [cobros, setCobros] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [filteredCobros, setFilteredCobros] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { lastUpdate, forceUpdate } = useRealtimeUpdates();
  
  useEffect(() => {
    loadCobrosData();
  }, [lastUpdate]);

  useEffect(() => {
    filterCobros();
  }, [cobros, searchTerm, statusFilter, methodFilter]);

  const loadCobrosData = () => {
    setIsLoading(true);
    try {
      const globalCobros = getGlobalCobros();
      const globalClients = getGlobalClients();
      
      console.log('CobrosTable: Loaded', globalCobros.length, 'cobros');
      
      setCobros(globalCobros);
      setClients(globalClients);
    } catch (error) {
      console.error('Error loading cobros data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCobros = () => {
    let filtered = [...cobros];

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(cobro => 
        cobro.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cobro.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cobro.amount || cobro.monto)?.toString().includes(searchTerm) ||
        cobro.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cobro.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(cobro => 
        (cobro.status || 'completado').toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Filtro por método
    if (methodFilter !== 'all') {
      filtered = filtered.filter(cobro => 
        (cobro.method || cobro.metodo || '').toLowerCase() === methodFilter.toLowerCase()
      );
    }

    setFilteredCobros(filtered);
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-DO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completado': return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'procesando': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'efectivo': return '💵';
      case 'transferencia': return '🏦';
      case 'cheque': return '📄';
      case 'tarjeta': return '💳';
      default: return '💰';
    }
  };
  
  const exportToPDF = async () => {
    const element = document.getElementById('cobros-table');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('registro-cobros.pdf');
  };

  const exportToExcel = () => {
    const dataToExport = filteredCobros.map(cobro => ({
      Fecha: formatDate(cobro.date || cobro.fecha),
      Cliente: cobro.clientName,
      Empleado: cobro.employeeName,
      Descripción: cobro.description || cobro.descripcion,
      Monto: cobro.amount || cobro.monto,
      Método: cobro.method || cobro.metodo,
      Estado: cobro.status || 'Completado',
      Factura: cobro.invoiceNumber || 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cobros');
    XLSX.writeFile(wb, 'registro-cobros.xlsx');
  };

  const handleEdit = (id: string) => {
    console.log('Editar cobro:', id);
    // Implementar edición
  };

  const handleDelete = (id: string) => {
    console.log('Eliminar cobro:', id);
    // Implementar eliminación
  };

  const handleView = (id: string) => {
    console.log('Ver detalles cobro:', id);
    // Implementar vista detallada
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center gap-3">
              <FileText className="h-6 w-6" />
              Registro de Cobros en Tiempo Real
            </CardTitle>
            <p className="text-blue-100 mt-1">
              {filteredCobros.length} cobros encontrados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={forceUpdate}
              disabled={isLoading}
              className="text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportToPDF}
              className="text-white hover:bg-white/20"
            >
              <Printer className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportToExcel}
              className="text-white hover:bg-white/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Filtros Avanzados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar cobros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="procesando">Procesando</SelectItem>
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filtrar por método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los métodos</SelectItem>
              <SelectItem value="efectivo">Efectivo</SelectItem>
              <SelectItem value="transferencia">Transferencia</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="tarjeta">Tarjeta</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setMethodFilter('all');
            }}
            variant="outline"
            className="bg-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Limpiar Filtros
          </Button>
        </div>

        {/* Resumen Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">
              RD$ {filteredCobros.reduce((sum, cobro) => sum + (cobro.amount || cobro.monto || 0), 0).toLocaleString()}
            </div>
            <div className="text-green-100 text-sm">Total Filtrado</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">{filteredCobros.length}</div>
            <div className="text-blue-100 text-sm">Cobros Mostrados</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">
              RD$ {filteredCobros.length > 0 ? Math.round(filteredCobros.reduce((sum, cobro) => sum + (cobro.amount || cobro.monto || 0), 0) / filteredCobros.length).toLocaleString() : '0'}
            </div>
            <div className="text-purple-100 text-sm">Promedio</div>
          </div>
        </div>

        {/* Tabla */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <div id="cobros-table">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-bold text-gray-900">Fecha</TableHead>
                  <TableHead className="font-bold text-gray-900">Cliente</TableHead>
                  <TableHead className="font-bold text-gray-900">Empleado</TableHead>
                  <TableHead className="font-bold text-gray-900">Monto</TableHead>
                  <TableHead className="font-bold text-gray-900">Método</TableHead>
                  <TableHead className="font-bold text-gray-900">Estado</TableHead>
                  <TableHead className="font-bold text-gray-900">Factura</TableHead>
                  <TableHead className="font-bold text-gray-900 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
                      <p className="text-gray-500">Cargando cobros...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredCobros.length > 0 ? (
                  filteredCobros.map((cobro, index) => (
                    <TableRow key={cobro.id || index} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">
                        {formatDate(cobro.date || cobro.fecha)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-gray-900">{cobro.clientName || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{cobro.clientId || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{cobro.employeeName || 'N/A'}</p>
                          <p className="text-xs text-gray-500">Gestor</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600 text-lg">
                          RD$ {(cobro.amount || cobro.monto || 0).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getMethodIcon(cobro.method || cobro.metodo)}</span>
                          <span className="font-medium">{cobro.method || cobro.metodo || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(cobro.status || 'completado')}>
                          {cobro.status || 'Completado'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {cobro.invoiceNumber || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(cobro.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(cobro.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(cobro.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No se encontraron cobros</p>
                        <p className="text-sm">Intenta ajustar los filtros o registra un nuevo cobro</p>
                      </div>
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
