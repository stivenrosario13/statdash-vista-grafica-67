import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Users, Settings, Paperclip } from "lucide-react";
import { RoleGuard } from "@/components/auth/RoleGuard";

const EmailPage = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "",
    port: "",
    username: "",
    password: ""
  });
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
    template: ""
  });
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const mockClients = [
    { id: "1", name: "Juan Pérez", email: "juan.perez@email.com", debt: 1250.00 },
    { id: "2", name: "María García", email: "maria.garcia@email.com", debt: 850.50 },
    { id: "3", name: "Pedro Martínez", email: "pedro.martinez@email.com", debt: 2100.75 }
  ];

  const emailTemplates = [
    { id: "payment_reminder", name: "Recordatorio de Pago" },
    { id: "invoice", name: "Envío de Factura" },
    { id: "follow_up", name: "Seguimiento" }
  ];

  const handleConfigureEmail = () => {
    if (emailConfig.smtpServer && emailConfig.username) {
      setIsConfigured(true);
    }
  };

  const handleSendEmail = () => {
    if (emailData.subject && emailData.body && selectedClients.length > 0) {
      selectedClients.forEach(clientId => {
        const client = mockClients.find(c => c.id === clientId);
        if (client) {
          const emailUrl = `mailto:${client.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
          window.open(emailUrl, '_blank');
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
            Gestión de Email
          </h1>
          <p className="text-purple-600 mt-2">Comunicación profesional por correo electrónico</p>
        </div>
        <Badge variant={isConfigured ? "default" : "secondary"} className="px-4 py-2">
          {isConfigured ? "Configurado" : "Sin Configurar"}
        </Badge>
      </div>

      {/* Configuración Email */}
      {!isConfigured && (
        <Card className="w-full bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurar Servidor SMTP
            </CardTitle>
            <CardDescription className="text-purple-100">
              Configure su servidor de correo para enviar emails
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="smtp" className="text-purple-800 font-semibold">Servidor SMTP</Label>
                <Input
                  id="smtp"
                  placeholder="smtp.gmail.com"
                  value={emailConfig.smtpServer}
                  onChange={(e) => setEmailConfig({...emailConfig, smtpServer: e.target.value})}
                  className="border-purple-300 focus:ring-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="port" className="text-purple-800 font-semibold">Puerto</Label>
                <Input
                  id="port"
                  placeholder="587"
                  value={emailConfig.port}
                  onChange={(e) => setEmailConfig({...emailConfig, port: e.target.value})}
                  className="border-purple-300 focus:ring-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="username" className="text-purple-800 font-semibold">Usuario</Label>
                <Input
                  id="username"
                  placeholder="tu-email@empresa.com"
                  value={emailConfig.username}
                  onChange={(e) => setEmailConfig({...emailConfig, username: e.target.value})}
                  className="border-purple-300 focus:ring-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-purple-800 font-semibold">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={emailConfig.password}
                  onChange={(e) => setEmailConfig({...emailConfig, password: e.target.value})}
                  className="border-purple-300 focus:ring-purple-500"
                />
              </div>
            </div>
            <Button 
              onClick={handleConfigureEmail}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              <Mail className="h-4 w-4 mr-2" />
              Configurar Email
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Interface de Email */}
      {isConfigured && (
        <RoleGuard allowedRoles={['admin', 'manager']}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lista de Clientes */}
            <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Destinatarios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {mockClients.map(client => (
                    <div key={client.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-purple-50">
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
                        className="rounded border-purple-300"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-purple-900">{client.name}</div>
                        <div className="text-sm text-purple-600">{client.email}</div>
                        <div className="text-sm font-medium">Deuda: €{client.debt.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Composer de Email */}
            <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Redactar Email
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template" className="text-purple-800 font-semibold">Plantilla</Label>
                    <Select value={emailData.template} onValueChange={(value) => setEmailData({...emailData, template: value})}>
                      <SelectTrigger className="border-purple-300">
                        <SelectValue placeholder="Seleccionar plantilla" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-purple-800 font-semibold">Asunto</Label>
                    <Input
                      id="subject"
                      placeholder="Asunto del email"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      className="border-purple-300 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="body" className="text-purple-800 font-semibold">Mensaje</Label>
                    <Textarea
                      id="body"
                      placeholder="Escriba su mensaje aquí..."
                      value={emailData.body}
                      onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                      className="border-purple-300 focus:ring-purple-500 min-h-32"
                    />
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Adjuntar Archivos
                  </Button>
                  <Button 
                    onClick={handleSendEmail}
                    disabled={!emailData.subject || !emailData.body || selectedClients.length === 0}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar a {selectedClients.length} destinatario(s)
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

export default EmailPage;
