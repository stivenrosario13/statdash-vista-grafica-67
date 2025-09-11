
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Home, Building2, User, MapPin } from "lucide-react";
import { dominicanProvinces, serviceRates } from "@/data/dominicanProvinces";
import { Client, Property, Service, Address } from "@/types/client";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { teams, employees } from "@/data/employeesData";

interface ClientFormProps {
  onClientAdd: (client: Client) => void;
  managers: string[];
}

export function ClientForm({ onClientAdd, managers }: ClientFormProps) {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    clientId: "",
    shift: "",
    manager: "",
    clientType: "",
    serviceCobrado: ""
  });

  const [address, setAddress] = useState({
    street: "",
    number: "",
    sector: "",
    municipality: "",
    province: "",
    postalCode: ""
  });

  const [apartments, setApartments] = useState<number>(1);

  const [selectedServices, setSelectedServices] = useState<{
    aseo: boolean;
    permiso_operacion: boolean;
    letrero: boolean;
    rampa: boolean;
  }>({
    aseo: false,
    permiso_operacion: false,
    letrero: false,
    rampa: false
  });

  const [servicePeriodicity, setServicePeriodicity] = useState<{
    aseo: string;
    permiso_operacion: string;
    letrero: string;
    rampa: string;
  }>({
    aseo: "",
    permiso_operacion: "",
    letrero: "",
    rampa: ""
  });

  const [letreroSize, setLetreroSize] = useState({
    width: 0,
    height: 0
  });

  const handleServiceToggle = (service: string, checked: boolean) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: checked
    }));
  };

  const handlePeriodicityChange = (service: string, value: string) => {
    setServicePeriodicity(prev => ({
      ...prev,
      [service]: value
    }));
  };

  const calculateServiceRate = (serviceType: string, clientType: string) => {
    if (serviceType === 'aseo') {
      if (clientType === 'residencial') {
        return 325 * apartments;
      }
      if (serviceRates.aseo[clientType as keyof typeof serviceRates.aseo]) {
        return serviceRates.aseo[clientType as keyof typeof serviceRates.aseo];
      }
    }
    if (serviceType === 'permiso_operacion' && serviceRates.permiso_operacion[clientType as keyof typeof serviceRates.permiso_operacion]) {
      return serviceRates.permiso_operacion[clientType as keyof typeof serviceRates.permiso_operacion];
    }
    return 0;
  };

  const getShiftManagers = () => {
    if (!clientData.shift) return [];
    const selectedTeam = teams.find(team => team.name === clientData.shift);
    if (!selectedTeam) return [];
    
    return employees
      .filter(emp => emp.teamId === selectedTeam.id)
      .map(emp => emp.name);
  };

  const handleShiftChange = (shift: string) => {
    setClientData(prev => ({
      ...prev,
      shift,
      manager: "" // Reset manager when shift changes
    }));
  };

  const handleSubmit = () => {
    if (!clientData.name || !clientData.email || !clientData.phone || !clientData.clientType || !clientData.shift || !clientData.manager) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    const propertyId = `PROP-${Date.now()}`;
    const clientId = clientData.clientId || `CLI-${Date.now()}`;
    
    const services: Service[] = [];
    
    Object.entries(selectedServices).forEach(([serviceType, isSelected]) => {
      if (isSelected) {
        const periodicity = servicePeriodicity[serviceType as keyof typeof servicePeriodicity];
        const rate = calculateServiceRate(serviceType, clientData.clientType);
        
        const service: Service = {
          id: `SRV-${Date.now()}-${serviceType}`,
          type: serviceType as 'aseo' | 'permiso_operacion' | 'letrero' | 'rampa',
          periodicity: periodicity as 'indefinida' | 'anual' | 'mensual',
          periodicityCode: periodicity === 'indefinida' ? 4 : periodicity === 'anual' ? 5 : 6,
          rate,
          startDate: new Date().toISOString().split('T')[0],
          isActive: true
        };

        if (serviceType === 'letrero') {
          service.width = letreroSize.width;
          service.height = letreroSize.height;
        }

        services.push(service);
      }
    });

    const newAddress: Address = {
      id: `ADDR-${Date.now()}`,
      street: address.street,
      number: address.number,
      sector: address.sector,
      municipality: address.municipality,
      province: address.province,
      postalCode: address.postalCode
    };

    const property: Property = {
      id: propertyId,
      propertyId,
      address: newAddress,
      clientId,
      services,
      apartments: clientData.clientType === 'residencial' ? apartments : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newClient: Client = {
      id: clientId,
      clientId,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      debt: services.reduce((total, service) => total + service.rate, 0),
      status: "Activo",
      manager: clientData.manager,
      lastContact: new Date().toISOString().split('T')[0],
      invoices: 0,
      clientType: clientData.clientType as any,
      properties: [property],
      registeredBy: "Usuario Actual",
      registeredAt: new Date().toISOString(),
      serviceCobrado: clientData.serviceCobrado
    };

    onClientAdd(newClient);
    
    // Reset form
    setClientData({
      name: "",
      email: "",
      phone: "",
      clientId: "",
      shift: "",
      manager: "",
      clientType: "",
      serviceCobrado: ""
    });
    setAddress({
      street: "",
      number: "",
      sector: "",
      municipality: "",
      province: "",
      postalCode: ""
    });
    setApartments(1);
    setSelectedServices({
      aseo: false,
      permiso_operacion: false,
      letrero: false,
      rampa: false
    });
    setServicePeriodicity({
      aseo: "",
      permiso_operacion: "",
      letrero: "",
      rampa: ""
    });
    setLetreroSize({ width: 0, height: 0 });
  };

  const canShowPermiso = clientData.clientType.includes('negocio');
  const isResidentialOrHouse = clientData.clientType === 'residencial' || clientData.clientType === 'casa';

  return (
    <RoleGuard allowedRoles={['admin', 'manager']}>
      <Card className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Registrar Nuevo Cliente
          </CardTitle>
          <CardDescription className="text-blue-100">
            Complete todos los datos del cliente, dirección y servicios
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Datos del Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientId" className="text-blue-800 font-semibold">Cliente ID (Opcional)</Label>
                <Input
                  id="clientId"
                  placeholder="CLI-001 (se genera automático)"
                  value={clientData.clientId}
                  onChange={(e) => setClientData({...clientData, clientId: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-800 font-semibold">Nombre Completo *</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez García"
                  value={clientData.name}
                  onChange={(e) => setClientData({...clientData, name: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-800 font-semibold">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.perez@email.com"
                  value={clientData.email}
                  onChange={(e) => setClientData({...clientData, email: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-800 font-semibold">Teléfono *</Label>
                <Input
                  id="phone"
                  placeholder="+1 809 123 4567"
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientType" className="text-blue-800 font-semibold">Tipo de Cliente *</Label>
                <Select value={clientData.clientType} onValueChange={(value) => setClientData({...clientData, clientType: value})}>
                  <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residencial">Residencial</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="negocio_pequeno">Negocio Pequeño</SelectItem>
                    <SelectItem value="negocio_mediano">Negocio Mediano</SelectItem>
                    <SelectItem value="negocio_grande">Negocio Grande</SelectItem>
                    <SelectItem value="negocio_muy_grande">Negocio Muy Grande</SelectItem>
                    <SelectItem value="negocio_super_grande">Negocio Super Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {clientData.clientType === 'residencial' && (
                <div className="space-y-2">
                  <Label htmlFor="apartments" className="text-blue-800 font-semibold">Número de Apartamentos *</Label>
                  <Input
                    id="apartments"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={apartments}
                    onChange={(e) => setApartments(Number(e.target.value) || 1)}
                    className="border-blue-300 focus:ring-blue-500"
                  />
                  <p className="text-sm text-blue-600">
                    Total aseo: ${(325 * apartments).toLocaleString()} (325 × {apartments} apartamentos)
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="shift" className="text-blue-800 font-semibold">Turno *</Label>
                <Select value={clientData.shift} onValueChange={handleShiftChange}>
                  <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccionar turno" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager" className="text-blue-800 font-semibold">Gestor Asignado *</Label>
                <Select 
                  value={clientData.manager} 
                  onValueChange={(value) => setClientData({...clientData, manager: value})}
                  disabled={!clientData.shift}
                >
                  <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                    <SelectValue placeholder={!clientData.shift ? "Primero seleccione un turno" : "Seleccionar gestor"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getShiftManagers().map(manager => (
                      <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dirección del Inmueble */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dirección del Inmueble
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="street" className="text-blue-800 font-semibold">Calle *</Label>
                <Input
                  id="street"
                  placeholder="Calle Principal"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number" className="text-blue-800 font-semibold">Número</Label>
                <Input
                  id="number"
                  placeholder="123"
                  value={address.number}
                  onChange={(e) => setAddress({...address, number: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-blue-800 font-semibold">Sector</Label>
                <Input
                  id="sector"
                  placeholder="Los Jardines"
                  value={address.sector}
                  onChange={(e) => setAddress({...address, sector: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality" className="text-blue-800 font-semibold">Municipio</Label>
                <Input
                  id="municipality"
                  placeholder="Santo Domingo Este"
                  value={address.municipality}
                  onChange={(e) => setAddress({...address, municipality: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province" className="text-blue-800 font-semibold">Provincia *</Label>
                <Select value={address.province} onValueChange={(value) => setAddress({...address, province: value})}>
                  <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {dominicanProvinces.map(province => (
                      <SelectItem key={province.id} value={province.name}>{province.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-blue-800 font-semibold">Código Postal</Label>
                <Input
                  id="postalCode"
                  placeholder="10000"
                  value={address.postalCode}
                  onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                  className="border-blue-300 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Servicios Contratados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aseo */}
              <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aseo"
                    checked={selectedServices.aseo}
                    onCheckedChange={(checked) => handleServiceToggle('aseo', checked as boolean)}
                  />
                  <Label htmlFor="aseo" className="text-blue-800 font-semibold">
                    Aseo (${calculateServiceRate('aseo', clientData.clientType).toLocaleString()})
                  </Label>
                </div>
                {selectedServices.aseo && (
                  <Select value={servicePeriodicity.aseo} onValueChange={(value) => handlePeriodicityChange('aseo', value)}>
                    <SelectTrigger className="border-blue-300">
                      <SelectValue placeholder="Periodicidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indefinida">Indefinida (4)</SelectItem>
                      <SelectItem value="anual">Anual (5)</SelectItem>
                      <SelectItem value="mensual">Mensual (6)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Permiso de Operación */}
              {canShowPermiso && (
                <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="permiso_operacion"
                      checked={selectedServices.permiso_operacion}
                      onCheckedChange={(checked) => handleServiceToggle('permiso_operacion', checked as boolean)}
                    />
                    <Label htmlFor="permiso_operacion" className="text-blue-800 font-semibold">
                      Permiso de Operación (${calculateServiceRate('permiso_operacion', clientData.clientType)})
                    </Label>
                  </div>
                  {selectedServices.permiso_operacion && (
                    <Select value={servicePeriodicity.permiso_operacion} onValueChange={(value) => handlePeriodicityChange('permiso_operacion', value)}>
                      <SelectTrigger className="border-blue-300">
                        <SelectValue placeholder="Periodicidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indefinida">Indefinida (4)</SelectItem>
                        <SelectItem value="anual">Anual (5)</SelectItem>
                        <SelectItem value="mensual">Mensual (6)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              {/* Letrero - Hidden for residential and casa */}
              {!isResidentialOrHouse && (
                <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="letrero"
                      checked={selectedServices.letrero}
                      onCheckedChange={(checked) => handleServiceToggle('letrero', checked as boolean)}
                    />
                    <Label htmlFor="letrero" className="text-blue-800 font-semibold">Letrero</Label>
                  </div>
                  {selectedServices.letrero && (
                    <div className="space-y-3">
                      <Select value={servicePeriodicity.letrero} onValueChange={(value) => handlePeriodicityChange('letrero', value)}>
                        <SelectTrigger className="border-blue-300">
                          <SelectValue placeholder="Periodicidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indefinida">Indefinida (4)</SelectItem>
                          <SelectItem value="anual">Anual (5)</SelectItem>
                          <SelectItem value="mensual">Mensual (6)</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Ancho (m)"
                          type="number"
                          value={letreroSize.width || ''}
                          onChange={(e) => setLetreroSize({...letreroSize, width: Number(e.target.value)})}
                          className="border-blue-300"
                        />
                        <Input
                          placeholder="Alto (m)"
                          type="number"
                          value={letreroSize.height || ''}
                          onChange={(e) => setLetreroSize({...letreroSize, height: Number(e.target.value)})}
                          className="border-blue-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Rampa - Hidden for residential and casa */}
              {!isResidentialOrHouse && (
                <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rampa"
                      checked={selectedServices.rampa}
                      onCheckedChange={(checked) => handleServiceToggle('rampa', checked as boolean)}
                    />
                    <Label htmlFor="rampa" className="text-blue-800 font-semibold">Rampa</Label>
                  </div>
                  {selectedServices.rampa && (
                    <Select value={servicePeriodicity.rampa} onValueChange={(value) => handlePeriodicityChange('rampa', value)}>
                      <SelectTrigger className="border-blue-300">
                        <SelectValue placeholder="Periodicidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indefinida">Indefinida (4)</SelectItem>
                        <SelectItem value="anual">Anual (5)</SelectItem>
                        <SelectItem value="mensual">Mensual (6)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Servicio Cobrado */}
          <div className="space-y-2">
            <Label htmlFor="serviceCobrado" className="text-blue-800 font-semibold">Servicio Cobrado</Label>
            <Input
              id="serviceCobrado"
              placeholder="Descripción del servicio cobrado"
              value={clientData.serviceCobrado}
              onChange={(e) => setClientData({...clientData, serviceCobrado: e.target.value})}
              className="border-blue-300 focus:ring-blue-500"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Registrar Cliente y Generar Inmueble
          </Button>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}
