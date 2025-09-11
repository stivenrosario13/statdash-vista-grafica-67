
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, Printer } from "lucide-react";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { getTeamStats } from "@/data/employeesData";

const ReportsPage = () => {
  const { formatCurrency, formatNumber } = useNumberFormat();
  const [reportType, setReportType] = useState("daily");
  const [teamFilter, setTeamFilter] = useState("all");
  
  const teamStats = getTeamStats();

  const mockReportData = {
    daily: teamStats.map(team => ({
      team: team.name,
      manager: `Manager ${team.name}`,
      collections: Math.floor(team.totalDaily / 500),
      amount: team.totalDaily
    })),
    weekly: teamStats.map(team => ({
      team: team.name,
      manager: `Manager ${team.name}`,
      collections: Math.floor(team.totalWeekly / 500),
      amount: team.totalWeekly
    })),
    monthly: teamStats.map(team => ({
      team: team.name,
      manager: `Manager ${team.name}`,
      collections: Math.floor(team.totalMonthly / 500),
      amount: team.totalMonthly
    }))
  };

  const getCurrentData = () => {
    return mockReportData[reportType as keyof typeof mockReportData] || [];
  };

  const getTotalAmount = () => {
    return getCurrentData().reduce((sum, item) => sum + item.amount, 0);
  };

  const getTotalCollections = () => {
    return getCurrentData().reduce((sum, item) => sum + item.collections, 0);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportReport = () => {
    const data = getCurrentData();
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Equipo,Gestor,Cobros,Monto\n"
      + data.map(row => `${row.team},${row.manager},${row.collections},${row.amount}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reporte_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getReportTitle = () => {
    switch(reportType) {
      case 'daily': return 'Reporte Diario';
      case 'weekly': return 'Reporte Semanal';
      case 'monthly': return 'Reporte Mensual';
      default: return 'Reporte';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
      {/* Patrones de fondo empresariales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
      
      <div className="relative z-10 flex flex-col gap-8 animate-fade-in p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Reportes Nivel Pro
            </h1>
            <p className="text-blue-300 mt-2">Análisis detallado y reportes ejecutivos</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handlePrintReport}
              variant="outline" 
              className="border-blue-400/30 text-blue-300 hover:bg-blue-600/20 bg-slate-800/50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button 
              onClick={handleExportReport}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros de Reporte */}
        <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-bold">Configuración de Reporte</h2>
              </div>
              <p className="text-blue-100 text-sm mt-1">
                Seleccione el tipo de reporte y filtros a aplicar
              </p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-blue-200 font-semibold text-sm">Período</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="border-blue-400/30 bg-slate-800/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-blue-400/30">
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-blue-200 font-semibold text-sm">Equipo</label>
                  <Select value={teamFilter} onValueChange={setTeamFilter}>
                    <SelectTrigger className="border-blue-400/30 bg-slate-800/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-blue-400/30">
                      <SelectItem value="all">Todos los Equipos</SelectItem>
                      <SelectItem value="morning">Turno Mañana</SelectItem>
                      <SelectItem value="night">Turno Noche</SelectItem>
                      <SelectItem value="street">Turno Calle</SelectItem>
                      <SelectItem value="callcenter">Call Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-2xl border border-emerald-400/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium">Total Cobrado</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(getTotalAmount())}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Cobros</p>
                <p className="text-2xl font-bold text-white">{formatNumber(getTotalCollections())}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-2xl border border-purple-400/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Promedio por Cobro</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(getTotalAmount() / getTotalCollections())}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Tabla de Resultados */}
        <RoleGuard allowedRoles={['admin', 'manager']}>
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl p-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <h2 className="text-xl font-bold">{getReportTitle()} - Detalle por Equipo y Gestor</h2>
                </div>
                <p className="text-blue-100 text-sm mt-1">
                  Resultados detallados de cobros por equipo y gestor responsable
                </p>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-400/20">
                      <TableHead className="text-blue-200 font-bold">Equipo</TableHead>
                      <TableHead className="text-blue-200 font-bold">Gestor Responsable</TableHead>
                      <TableHead className="text-blue-200 font-bold">N° Cobros</TableHead>
                      <TableHead className="text-blue-200 font-bold">Monto Total</TableHead>
                      <TableHead className="text-blue-200 font-bold">Promedio</TableHead>
                      <TableHead className="text-blue-200 font-bold">Rendimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getCurrentData().map((row, index) => (
                      <TableRow key={index} className="hover:bg-blue-800/20 transition-colors border-blue-400/10">
                        <TableCell className="font-semibold text-blue-100">{row.team}</TableCell>
                        <TableCell className="text-blue-200">{row.manager}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-800/30 text-blue-200 border-blue-400/30">
                            {formatNumber(row.collections)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-white">{formatCurrency(row.amount)}</TableCell>
                        <TableCell className="text-blue-200">{formatCurrency(row.amount / row.collections)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              row.amount > 25000 ? "bg-emerald-600/20 text-emerald-300 border-emerald-400/30" :
                              row.amount > 15000 ? "bg-yellow-600/20 text-yellow-300 border-yellow-400/30" :
                              "bg-red-600/20 text-red-300 border-red-400/30"
                            }
                          >
                            {row.amount > 25000 ? "Excelente" : row.amount > 15000 ? "Bueno" : "Mejorable"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </RoleGuard>
      </div>
    </div>
  );
};

export default ReportsPage;
