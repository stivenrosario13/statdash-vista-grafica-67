import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

const managers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    clients: 15,
    totalDebt: 18750.50,
    performance: 92,
    team: "Turno Noche"
  },
  {
    id: 2,
    name: "Ana López",
    clients: 12,
    totalDebt: 14200.25,
    performance: 88,
    team: "Turno Mañana"
  },
  {
    id: 3,
    name: "Luis Fernández",
    clients: 18,
    totalDebt: 23100.75,
    performance: 85,
    team: "Turno Calle"
  },
  {
    id: 4,
    name: "Carmen Jiménez",
    clients: 10,
    totalDebt: 12500.00,
    performance: 95,
    team: "Turno Mañana"
  }
];

const unassignedClients = [
  { id: 1, name: "Roberto Silva", debt: 1500.00 },
  { id: 2, name: "Laura Mendez", debt: 850.50 },
  { id: 3, name: "Francisco Torres", debt: 2100.00 }
];

const ClientAssignmentPage = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  const handleAssignment = () => {
    if (selectedClient && selectedManager) {
      console.log(`Asignando cliente ${selectedClient} al gestor ${selectedManager}`);
      // Aquí iría la lógica de asignación
      setSelectedClient("");
      setSelectedManager("");
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "bg-green-100 text-green-800";
    if (performance >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Asignación de Gestores
          </h1>
          <p className="text-blue-600 mt-2">Gestión y distribución de cartera por gestores</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-blue-700 border-blue-300">
          {unassignedClients.length} clientes sin asignar
        </Badge>
      </div>

      {/* Resumen de gestores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managers.map((manager) => (
          <Card key={manager.id} className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 text-lg">{manager.name}</CardTitle>
              <CardDescription className="text-blue-600">{manager.team}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Clientes</span>
                </div>
                <span className="font-bold text-blue-900">{manager.clients}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Deuda Total</span>
                </div>
                <span className="font-bold text-blue-900">€{manager.totalDebt.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Rendimiento</span>
                </div>
                <Badge className={getPerformanceColor(manager.performance)}>
                  {manager.performance}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario de asignación */}
      <Card className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Asignar Cliente a Gestor
          </CardTitle>
          <CardDescription className="text-blue-100">
            Seleccione un cliente y un gestor para realizar la asignación
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-blue-800 font-semibold text-sm">Cliente sin asignar</label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedClients.map(client => (
                    <SelectItem key={client.id} value={client.name}>
                      {client.name} - €{client.debt.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-blue-800 font-semibold text-sm">Gestor responsable</label>
              <Select value={selectedManager} onValueChange={setSelectedManager}>
                <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                  <SelectValue placeholder="Seleccionar gestor" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map(manager => (
                    <SelectItem key={manager.id} value={manager.name}>
                      {manager.name} ({manager.clients} clientes)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleAssignment}
              disabled={!selectedClient || !selectedManager}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300"
            >
              Asignar Cliente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla detallada de gestores */}
      <Card className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rendimiento Detallado por Gestor
          </CardTitle>
          <CardDescription className="text-blue-100">
            Análisis completo del desempeño de cada gestor
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 border-blue-200">
                <TableHead className="text-blue-800 font-bold">Gestor</TableHead>
                <TableHead className="text-blue-800 font-bold">Equipo</TableHead>
                <TableHead className="text-blue-800 font-bold">N° Clientes</TableHead>
                <TableHead className="text-blue-800 font-bold">Deuda Total</TableHead>
                <TableHead className="text-blue-800 font-bold">Rendimiento</TableHead>
                <TableHead className="text-blue-800 font-bold">Promedio por Cliente</TableHead>
                <TableHead className="text-blue-800 font-bold">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager.id} className="hover:bg-blue-50 transition-colors border-blue-100">
                  <TableCell className="font-semibold text-blue-900">{manager.name}</TableCell>
                  <TableCell className="text-blue-700">{manager.team}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-blue-800">
                      <Users className="h-4 w-4" />
                      {manager.clients}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-blue-800">
                      <DollarSign className="h-4 w-4" />
                      €{manager.totalDebt.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(manager.performance)}>
                      {manager.performance}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-800 font-medium">
                    €{(manager.totalDebt / manager.clients).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={manager.performance >= 90 ? "default" : "secondary"} className="shadow-sm">
                      {manager.performance >= 90 ? "Excelente" : manager.performance >= 80 ? "Bueno" : "Mejorable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAssignmentPage;
