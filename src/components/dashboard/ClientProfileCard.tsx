
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CreditCard, Mail, Phone, MapPin, Calendar, Users, AlertTriangle, Building2, Home, Store, DollarSign, FileText, TrendingUp } from "lucide-react";
import { ClientProfile } from "./types";

interface ClientProfileCardProps {
  client: ClientProfile;
  onViewDetails: (client: ClientProfile) => void;
  onAccountStatement: (client: ClientProfile) => void;
}

export function ClientProfileCard({ client, onViewDetails, onAccountStatement }: ClientProfileCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800 border-green-300';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Moroso': return 'bg-red-100 text-red-800 border-red-300';
      case 'Inactivo': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case 'residencial': return Building2;
      case 'casa': return Home;
      default: return Store;
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'aseo': return Users;
      case 'permiso_operacion': return FileText;
      case 'letrero': return Eye;
      case 'rampa': return TrendingUp;
      default: return DollarSign;
    }
  };

  const ClientTypeIcon = getClientTypeIcon(client.clientType);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">{client.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge variant="outline" className="text-xs">
                  {client.clientId}
                </Badge>
                <ClientTypeIcon className="h-4 w-4" />
                <span className="capitalize">{client.clientType.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Información de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700">{client.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-500" />
            <span className="text-gray-700">{client.phone}</span>
          </div>
          <div className="flex items-center gap-2 col-span-full">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-gray-700">{client.address}</span>
          </div>
        </div>

        {/* Métricas Financieras */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">
              RD$ {client.debt.toLocaleString()}
            </div>
            <div className="text-xs text-red-700">Deuda</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              RD$ {client.totalPaid.toLocaleString()}
            </div>
            <div className="text-xs text-green-700">Total Pagado</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {client.totalInvoices}
            </div>
            <div className="text-xs text-blue-700">Facturas</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className={`text-lg font-bold ${getRiskColor(client.riskLevel)}`}>
              {client.creditScore}
            </div>
            <div className="text-xs text-purple-700">Score</div>
          </div>
        </div>

        {/* Servicios Activos */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Servicios Activos</div>
          <div className="flex flex-wrap gap-2">
            {client.services.filter(s => s.status === 'active').map((service) => {
              const ServiceIcon = getServiceIcon(service.type);
              return (
                <Badge key={service.id} variant="outline" className="flex items-center gap-1">
                  <ServiceIcon className="h-3 w-3" />
                  <span className="capitalize">{service.type.replace('_', ' ')}</span>
                  <span className="text-green-600">RD$ {service.rate}</span>
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Información Adicional */}
        <div className="flex items-center justify-between text-xs text-gray-600 border-t pt-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Registrado: {new Date(client.registrationDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Gestor: {client.manager}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className={`h-3 w-3 ${getRiskColor(client.riskLevel)}`} />
            <span className={`capitalize ${getRiskColor(client.riskLevel)}`}>
              Riesgo {client.riskLevel === 'low' ? 'Bajo' : client.riskLevel === 'medium' ? 'Medio' : 'Alto'}
            </span>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails(client)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
          <Button 
            size="sm"
            onClick={() => onAccountStatement(client)}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <CreditCard className="h-4 w-4 mr-1" />
            Estado de Cuenta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
