
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Filter, X } from "lucide-react";
import { TimeframeType, employees, teams } from '@/data/employeesData';

interface FilterState {
  dateFrom: string;
  dateTo: string;
  teamIds: number[];
  employeeIds: number[];
  minAmount: string;
  maxAmount: string;
  services: string[];
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  timeframe: TimeframeType;
  onTimeframeChange: (timeframe: TimeframeType) => void;
}

export function AdvancedFilters({ onFiltersChange, timeframe, onTimeframeChange }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    teamIds: [],
    employeeIds: [],
    minAmount: '',
    maxAmount: '',
    services: []
  });

  const services = [
    { id: 'permiso', name: 'Permiso de Operación' },
    { id: 'aseo', name: 'Aseo' },
    { id: 'letrero', name: 'Letrero' },
    { id: 'rampa', name: 'Rampa' }
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleTeam = (teamId: number) => {
    const newTeamIds = filters.teamIds.includes(teamId)
      ? filters.teamIds.filter(id => id !== teamId)
      : [...filters.teamIds, teamId];
    updateFilter('teamIds', newTeamIds);
  };

  const toggleEmployee = (employeeId: number) => {
    const newEmployeeIds = filters.employeeIds.includes(employeeId)
      ? filters.employeeIds.filter(id => id !== employeeId)
      : [...filters.employeeIds, employeeId];
    updateFilter('employeeIds', newEmployeeIds);
  };

  const toggleService = (serviceId: string) => {
    const newServices = filters.services.includes(serviceId)
      ? filters.services.filter(id => id !== serviceId)
      : [...filters.services, serviceId];
    updateFilter('services', newServices);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      dateFrom: '',
      dateTo: '',
      teamIds: [],
      employeeIds: [],
      minAmount: '',
      maxAmount: '',
      services: []
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateFrom || filters.dateTo) count++;
    if (filters.teamIds.length > 0) count++;
    if (filters.employeeIds.length > 0) count++;
    if (filters.minAmount || filters.maxAmount) count++;
    if (filters.services.length > 0) count++;
    return count;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avanzados
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} activos
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm">
              {isOpen ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
            {getActiveFiltersCount() > 0 && (
              <Button onClick={clearFilters} variant="ghost" size="sm">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {/* Filtros de Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">Fecha Desde</Label>
              <div className="relative">
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="dateTo">Fecha Hasta</Label>
              <div className="relative">
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Filtros de Monto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmount">Monto Mínimo</Label>
              <Input
                id="minAmount"
                type="number"
                placeholder="0.00"
                value={filters.minAmount}
                onChange={(e) => updateFilter('minAmount', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxAmount">Monto Máximo</Label>
              <Input
                id="maxAmount"
                type="number"
                placeholder="999.99"
                value={filters.maxAmount}
                onChange={(e) => updateFilter('maxAmount', e.target.value)}
              />
            </div>
          </div>

          {/* Filtros de Equipos */}
          <div>
            <Label>Equipos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {teams.map((team) => (
                <Badge
                  key={team.id}
                  variant={filters.teamIds.includes(team.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTeam(team.id)}
                  style={{
                    backgroundColor: filters.teamIds.includes(team.id) ? team.color : 'transparent',
                    borderColor: team.color,
                    color: filters.teamIds.includes(team.id) ? 'white' : team.color
                  }}
                >
                  {team.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Filtros de Gestores */}
          <div>
            <Label>Gestores</Label>
            <div className="flex flex-wrap gap-2 mt-2 max-h-20 overflow-y-auto">
              {employees.map((employee) => (
                <Badge
                  key={employee.id}
                  variant={filters.employeeIds.includes(employee.id) ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => toggleEmployee(employee.id)}
                >
                  {employee.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Filtros de Servicios */}
          <div>
            <Label>Tipos de Servicio</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {services.map((service) => (
                <Badge
                  key={service.id}
                  variant={filters.services.includes(service.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleService(service.id)}
                >
                  {service.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
