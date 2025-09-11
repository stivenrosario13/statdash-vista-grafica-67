import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Filter, Calendar, Users, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { teams } from '@/data/employeesData';
import { DateRange } from "react-day-picker";

interface FilterState {
  dateRange: DateRange | null;
  team: string;
  employee: string;
  amountRange: string;
  status: string;
}

interface FilterSummary {
  totalRecords: number;
  filteredRecords: number;
  totalAmount: number;
  averageAmount: number;
}

export function AdvancedDashboardFilters() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: null,
    team: 'all',
    employee: 'all',
    amountRange: 'all',
    status: 'all'
  });
  
  const [summary, setSummary] = useState<FilterSummary>({
    totalRecords: 0,
    filteredRecords: 0,
    totalAmount: 0,
    averageAmount: 0
  });

  const { lastUpdate, triggerUpdate } = useRealtimeUpdates();

  useEffect(() => {
    updateSummary();
  }, [filters, lastUpdate]);

  const updateSummary = () => {
    // Simular datos filtrados
    const baseRecords = Math.floor(Math.random() * 500) + 200;
    const filteredRecords = Math.floor(baseRecords * (0.6 + Math.random() * 0.4));
    const totalAmount = Math.floor(Math.random() * 500000) + 100000;
    
    setSummary({
      totalRecords: baseRecords,
      filteredRecords,
      totalAmount,
      averageAmount: filteredRecords > 0 ? totalAmount / filteredRecords : 0
    });
  };

  const resetFilters = () => {
    setFilters({
      dateRange: null,
      team: 'all',
      employee: 'all',
      amountRange: 'all',
      status: 'all'
    });
    triggerUpdate('FILTERS_RESET', {});
  };

  const applyFilters = () => {
    triggerUpdate('FILTERS_APPLIED', filters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== 'all' && value !== null
  ).length;

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-6 w-6" />
            <CardTitle>Filtros Avanzados del Dashboard</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge className="bg-yellow-500 text-yellow-900 font-bold">
                {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Filtros Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Rango de Fechas</label>
            <DatePickerWithRange 
              date={filters.dateRange}
              setDate={(range) => setFilters(prev => ({ ...prev, dateRange: range }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Equipo</label>
            <Select value={filters.team} onValueChange={(value) => setFilters(prev => ({ ...prev, team: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar equipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los equipos</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: team.color }}
                      />
                      {team.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Empleado</label>
            <Select value={filters.employee} onValueChange={(value) => setFilters(prev => ({ ...prev, employee: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empleado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los empleados</SelectItem>
                <SelectItem value="top-performers">Top Performers</SelectItem>
                <SelectItem value="new-employees">Empleados Nuevos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Rango de Monto</label>
            <Select value={filters.amountRange} onValueChange={(value) => setFilters(prev => ({ ...prev, amountRange: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rango" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los montos</SelectItem>
                <SelectItem value="0-1000">RD$ 0 - 1,000</SelectItem>
                <SelectItem value="1000-5000">RD$ 1,000 - 5,000</SelectItem>
                <SelectItem value="5000-10000">RD$ 5,000 - 10,000</SelectItem>
                <SelectItem value="10000+">RD$ 10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Estado</label>
            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="processing">Procesando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resumen de Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Total Filtrado</p>
                <p className="text-2xl font-bold">RD$ {summary.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Registros</p>
                <p className="text-2xl font-bold">{summary.filteredRecords}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Promedio</p>
                <p className="text-2xl font-bold">RD$ {summary.averageAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              <div>
                <p className="text-sm opacity-90">Eficiencia</p>
                <p className="text-2xl font-bold">{((summary.filteredRecords / summary.totalRecords) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Aplicar */}
        <div className="flex justify-center">
          <Button 
            onClick={applyFilters}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Filter className="h-5 w-5 mr-2" />
            Aplicar Filtros Avanzados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
