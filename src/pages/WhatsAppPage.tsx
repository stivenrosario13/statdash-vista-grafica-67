import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Send, Users, CheckCircle } from "lucide-react";
import { RoleGuard } from "@/components/auth/RoleGuard";

const WhatsAppPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const mockClients = [
    { id: "1", name: "Juan Pérez", phone: "+34600123456", debt: 1250.00 },
    { id: "2", name: "María García", phone: "+34600789012", debt: 850.50 },
    { id: "3", name: "Pedro Martínez", phone: "+34600345678", debt: 2100.75 }
  ];

  const handleConnect = () => {
    if (phoneNumber) {
      setIsConnected(true);
    }
  };

  const handleSendMessage = () => {
    if (message && selectedClients.length > 0) {
      selectedClients.forEach(clientId => {
        const client = mockClients.find(c => c.id === clientId);
        if (client) {
          const whatsappUrl = `https://wa.me/${client.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            Chat WhatsApp
          </h1>
          <p className="text-green-600 mt-2">Comunicación directa con clientes via WhatsApp</p>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"} className="px-4 py-2">
          {isConnected ? "Conectado" : "Desconectado"}
        </Badge>
      </div>

      {/* Conexión WhatsApp */}
      {!isConnected && (
        <Card className="w-full bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Conectar WhatsApp Business
            </CardTitle>
            <CardDescription className="text-green-100">
              Ingrese su número de WhatsApp Business para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-green-800 font-semibold">Número de WhatsApp Business</Label>
                <Input
                  id="phone"
                  placeholder="+34 600 123 456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-green-300 focus:ring-green-500"
                />
              </div>
              <Button 
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Conectar WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      {isConnected && (
        <RoleGuard allowedRoles={['admin', 'manager']}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lista de Clientes */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Seleccionar Clientes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {mockClients.map(client => (
                    <div key={client.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-green-50">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedClients([...selectedClients, client.id]);
                          } else {
                            setSelectedClients(selectedClients.filter(id => id !== client.id));
                          }
                        }}
                        className="rounded border-green-300"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-green-900">{client.name}</div>
                        <div className="text-sm text-green-600">{client.phone}</div>
                        <div className="text-sm font-medium">Deuda: €{client.debt.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mensaje */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Enviar Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message" className="text-green-800 font-semibold">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Escriba su mensaje aquí..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-green-300 focus:ring-green-500 min-h-32"
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message || selectedClients.length === 0}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar a {selectedClients.length} cliente(s)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </RoleGuard>
      )}
    </div>
  );
};

export default WhatsAppPage;
