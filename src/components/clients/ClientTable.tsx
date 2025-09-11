
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, Edit, Trash2, DollarSign, Calendar, User, Info, FileText, Home } from "lucide-react";
import { Client } from "@/types/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ClientTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
}

export function ClientTable({ clients, onEditClient, onDeleteClient }: ClientTableProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSendWhatsApp = (client: Client) => {
    window.open(`https://wa.me/${client.phone.replace(/\s/g, '')}?text=Hola ${client.name}, contactamos desde SR Estadísticas para gestionar su cuenta.`, '_blank');
  };

  const handleSendEmail = (client: Client) => {
    window.open(`mailto:${client.email}?subject=Gestión de cuenta - SR Estadísticas&body=Estimado/a ${client.name},%0D%0A%0D%0AContactamos con usted desde SR Estadísticas...`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800 border-green-200";
      case "Pendiente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Moroso": return "bg-red-100 text-red-800 border-red-200";
      case "Inactivo": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getClientTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'residencial': 'Residencial',
      'casa': 'Casa',
      'negocio_pequeno': 'Negocio Pequeño',
      'negocio_mediano': 'Negocio Mediano',
      'negocio_grande': 'Negocio Grande',
      'negocio_muy_grande': 'Negocio Muy Grande',
      'negocio_super_grande': 'Negocio Super Grande'
    };
    return labels[type] || type;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Lista de Clientes Registrados
        </CardTitle>
        <CardDescription className="text-blue-100">
          Gestión completa de la cartera de clientes con información detallada
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 border-blue-200">
                <TableHead className="text-blue-800 font-bold">Cliente ID</TableHead>
                <TableHead className="text-blue-800 font-bold">Cliente</TableHead>
                <TableHead className="text-blue-800 font-bold">Tipo</TableHead>
                <TableHead className="text-blue-800 font-bold">Contacto</TableHead>
                <TableHead className="text-blue-800 font-bold">Deuda</TableHead>
                <TableHead className="text-blue-800 font-bold">Estado</TableHead>
                <TableHead className="text-blue-800 font-bold">Gestor</TableHead>
                <TableHead className="text-blue-800 font-bold">Servicio Cobrado</TableHead>
                <TableHead className="text-blue-800 font-bold">Propiedades</TableHead>
                <TableHead className="text-blue-800 font-bold text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-blue-50 transition-colors border-blue-100">
                  <TableCell>
                    <div className="font-mono text-sm text-blue-800 font-semibold">
                      {client.clientId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-blue-900">{client.name}</div>
                      <div className="text-sm text-blue-600 flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {client.invoices} facturas
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      {getClientTypeLabel(client.clientType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-blue-800">{client.email}</div>
                      <div className="text-sm text-blue-600 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-blue-800">
                      <DollarSign className="h-4 w-4" />
                      ${client.debt.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(client.status)} shadow-sm`}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-800 font-medium">{client.manager}</TableCell>
                  <TableCell className="text-blue-700">{client.serviceCobrado || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Home className="h-3 w-3" />
                      {client.properties.length} propiedades
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-center flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => handleSendWhatsApp(client)}
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendEmail(client)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditClient(client)}
                        className="border-orange-300 text-orange-700 hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteClient(client.id)}
                        className="transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-300 text-purple-700 hover:bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-md"
                            onClick={() => setSelectedClient(client)}
                          >
                            <Info className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-blue-800">Información Detallada del Cliente</DialogTitle>
                            <DialogDescription>
                              Detalles completos del cliente y sus propiedades
                            </DialogDescription>
                          </DialogHeader>
                          {selectedClient && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="font-semibold text-blue-700">Cliente ID:</label>
                                  <p>{selectedClient.clientId}</p>
                                </div>
                                <div>
                                  <label className="font-semibold text-blue-700">Registrado por:</label>
                                  <p>{selectedClient.registeredBy}</p>
                                </div>
                                <div>
                                  <label className="font-semibold text-blue-700">Fecha de registro:</label>
                                  <p>{new Date(selectedClient.registeredAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <label className="font-semibold text-blue-700">Tipo de cliente:</label>
                                  <p>{getClientTypeLabel(selectedClient.clientType)}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-blue-700 mb-2">Propiedades ({selectedClient.properties.length})</h4>
                                {selectedClient.properties.map((property) => (
                                  <div key={property.id} className="border border-blue-200 rounded-lg p-4 mb-4 bg-blue-50">
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                      <div>
                                        <label className="font-semibold text-blue-700">Inmueble ID:</label>
                                        <p className="font-mono text-sm">{property.propertyId}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold text-blue-700">Dirección:</label>
                                        <p>{property.address.street} {property.address.number}, {property.address.sector}</p>
                                        <p>{property.address.municipality}, {property.address.province}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <label className="font-semibold text-blue-700">Servicios contratados:</label>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                        {property.services.map((service) => (
                                          <div key={service.id} className="bg-white p-2 rounded border border-blue-200">
                                            <div className="flex justify-between items-center">
                                              <span className="font-medium">{service.type.replace('_', ' ').toUpperCase()}</span>
                                              <Badge variant={service.isActive ? "default" : "secondary"}>
                                                {service.isActive ? "Activo" : "Inactivo"}
                                              </Badge>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              <p>Tarifa: ${service.rate}</p>
                                              <p>Periodicidad: {service.periodicity} ({service.periodicityCode})</p>
                                              <p>Inicio: {service.startDate}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
