
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, User, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  clientName: string;
  clientId: string;
  service: string;
  contactMethod: 'whatsapp' | 'email' | 'presencial';
  issue: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  assignedTo: string;
}

export function ClientSupport() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      clientName: 'Juan Pérez',
      clientId: 'CLI-001',
      service: 'Aseo Residencial',
      contactMethod: 'whatsapp',
      issue: 'Problema con la frecuencia del servicio',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00',
      assignedTo: 'María García'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    clientName: '',
    clientId: '',
    service: '',
    contactMethod: 'whatsapp' as const,
    issue: '',
    assignedTo: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddTicket = () => {
    if (!newTicket.clientName || !newTicket.issue) {
      toast({
        title: "Error",
        description: "Complete los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      ...newTicket,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTickets([...tickets, ticket]);
    setNewTicket({
      clientName: '',
      clientId: '',
      service: '',
      contactMethod: 'whatsapp',
      issue: '',
      assignedTo: ''
    });

    toast({
      title: "Ticket creado",
      description: "El ticket de soporte ha sido registrado exitosamente"
    });
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'whatsapp': return <MessageCircle className="h-4 w-4 text-green-600" />;
      case 'email': return <Mail className="h-4 w-4 text-blue-600" />;
      case 'presencial': return <User className="h-4 w-4 text-purple-600" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="destructive">Pendiente</Badge>;
      case 'in-progress': return <Badge variant="default">En Proceso</Badge>;
      case 'resolved': return <Badge variant="secondary">Resuelto</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Asistencia a Clientes</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Ticket de Soporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombre del Cliente</label>
                <Input
                  value={newTicket.clientName}
                  onChange={(e) => setNewTicket({...newTicket, clientName: e.target.value})}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="text-sm font-medium">ID Cliente</label>
                <Input
                  value={newTicket.clientId}
                  onChange={(e) => setNewTicket({...newTicket, clientId: e.target.value})}
                  placeholder="CLI-XXX"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Servicio</label>
              <Select value={newTicket.service} onValueChange={(value) => setNewTicket({...newTicket, service: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aseo">Aseo</SelectItem>
                  <SelectItem value="permiso_operacion">Permiso de Operación</SelectItem>
                  <SelectItem value="letrero">Letrero</SelectItem>
                  <SelectItem value="rampa">Rampa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Método de Contacto</label>
              <Select value={newTicket.contactMethod} onValueChange={(value: any) => setNewTicket({...newTicket, contactMethod: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Correo Electrónico</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Descripción del Problema</label>
              <Textarea
                value={newTicket.issue}
                onChange={(e) => setNewTicket({...newTicket, issue: e.target.value})}
                placeholder="Describe el problema del cliente..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Asignado a</label>
              <Input
                value={newTicket.assignedTo}
                onChange={(e) => setNewTicket({...newTicket, assignedTo: e.target.value})}
                placeholder="Nombre del gestor"
              />
            </div>

            <Button onClick={handleAddTicket} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Crear Ticket
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{ticket.clientName}</h4>
                      <p className="text-sm text-gray-600">{ticket.clientId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getContactIcon(ticket.contactMethod)}
                      {getStatusBadge(ticket.status)}
                    </div>
                  </div>
                  <p className="text-sm"><strong>Servicio:</strong> {ticket.service}</p>
                  <p className="text-sm text-gray-700">{ticket.issue}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Asignado a: {ticket.assignedTo}</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
