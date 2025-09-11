
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, DollarSign, Building2, CreditCard, Users, FileText, Eye, TrendingUp } from "lucide-react";
import { ClientProfile } from "./types";

interface ClientDetailsModalProps {
  client: ClientProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onAccountStatement: (client: ClientProfile) => void;
}

export function ClientDetailsModal({ client, isOpen, onClose, onAccountStatement }: ClientDetailsModalProps) {
  if (!isOpen || !client) return null;

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'aseo': return Users;
      case 'permiso_operacion': return FileText;
      case 'letrero': return Eye;
      case 'rampa': return TrendingUp;
      default: return DollarSign;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Detalles del Cliente</h2>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><strong>Nombre:</strong> {client.name}</div>
                <div><strong>ID Cliente:</strong> {client.clientId}</div>
                <div><strong>Email:</strong> {client.email}</div>
                <div><strong>Teléfono:</strong> {client.phone}</div>
                <div><strong>Dirección:</strong> {client.address}</div>
                <div><strong>Tipo:</strong> <span className="capitalize">{client.clientType.replace('_', ' ')}</span></div>
                <div><strong>Gestor:</strong> {client.manager}</div>
              </CardContent>
            </Card>

            {/* Servicios Adquiridos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Servicios Adquiridos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.services.map((service) => {
                    const ServiceIcon = getServiceIcon(service.type);
                    return (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="font-medium capitalize">{service.type.replace('_', ' ')}</div>
                            <div className="text-sm text-gray-600">{service.periodicity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">RD$ {service.rate}</div>
                          <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                            {service.status === 'active' ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Propiedades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Propiedades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.properties.map((property) => (
                    <div key={property.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{property.address}</div>
                      <div className="text-sm text-gray-600">{property.type}</div>
                      {property.apartments && (
                        <div className="text-sm text-blue-600">{property.apartments} apartamentos</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Historial de Pagos Reciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Historial de Pagos Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.paymentHistory.slice(0, 3).map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{new Date(payment.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-600">{payment.method}</div>
                      </div>
                      <div className="font-bold text-green-600">
                        RD$ {payment.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex gap-2 justify-end">
            <Button 
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button 
              onClick={() => onAccountStatement(client)}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Ver Estado de Cuenta Completo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
