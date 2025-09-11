
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Key, Lock, Eye, Save } from "lucide-react";
import { toast } from "sonner";

export function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordExpiry: true,
    sessionTimeout: "60",
    maxLoginAttempts: "3",
    ipWhitelist: false,
    auditLog: true,
    encryptionLevel: "aes256",
    passwordComplexity: "medium"
  });

  const handleSave = () => {
    console.log("Guardando configuración de seguridad:", security);
    toast.success("Configuración de seguridad actualizada");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración de Seguridad</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Autenticación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">Autenticación de Dos Factores</Label>
              <Switch
                id="twoFactorAuth"
                checked={security.twoFactorAuth}
                onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="passwordExpiry">Expiración de Contraseñas</Label>
              <Switch
                id="passwordExpiry"
                checked={security.passwordExpiry}
                onCheckedChange={(checked) => setSecurity({...security, passwordExpiry: checked})}
              />
            </div>

            <div>
              <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
              <Select 
                value={security.maxLoginAttempts} 
                onValueChange={(value) => setSecurity({...security, maxLoginAttempts: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 intentos</SelectItem>
                  <SelectItem value="5">5 intentos</SelectItem>
                  <SelectItem value="10">10 intentos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="passwordComplexity">Complejidad de Contraseñas</Label>
              <Select 
                value={security.passwordComplexity} 
                onValueChange={(value) => setSecurity({...security, passwordComplexity: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja (6+ caracteres)</SelectItem>
                  <SelectItem value="medium">Media (8+ caracteres, números)</SelectItem>
                  <SelectItem value="high">Alta (12+ caracteres, símbolos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Sesiones y Acceso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="ipWhitelist">Lista Blanca de IPs</Label>
              <Switch
                id="ipWhitelist"
                checked={security.ipWhitelist}
                onCheckedChange={(checked) => setSecurity({...security, ipWhitelist: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auditLog">Registro de Auditoría</Label>
              <Switch
                id="auditLog"
                checked={security.auditLog}
                onCheckedChange={(checked) => setSecurity({...security, auditLog: checked})}
              />
            </div>

            <div>
              <Label htmlFor="encryptionLevel">Nivel de Encriptación</Label>
              <Select 
                value={security.encryptionLevel} 
                onValueChange={(value) => setSecurity({...security, encryptionLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="aes256">AES-256 (Recomendado)</SelectItem>
                  <SelectItem value="rsa2048">RSA-2048</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Claves API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Claves Activas</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Principal</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Backup</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Generar Nueva Clave API
            </Button>

            <Button variant="destructive" className="w-full">
              Revocar Todas las Claves
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Registro de Actividad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Actividad Reciente</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Login exitoso - admin@test.com</span>
                  <span className="text-gray-500">10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Configuración modificada</span>
                  <span className="text-gray-500">09:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup automático ejecutado</span>
                  <span className="text-gray-500">03:00 AM</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Ver Registro Completo
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
