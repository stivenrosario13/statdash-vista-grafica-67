
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Lock, Eye, Save, AlertTriangle, CheckCircle, XCircle, Activity, Wifi, Server } from "lucide-react";
import { toast } from "sonner";

export function EnhancedSecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    passwordExpiry: true,
    sessionTimeout: "60",
    maxLoginAttempts: "3",
    ipWhitelist: true,
    auditLog: true,
    encryptionLevel: "aes256",
    passwordComplexity: "high",
    biometricAuth: false,
    sslForced: true,
    dataBackup: true,
    realTimeMonitoring: true
  });

  const [securityScore, setSecurityScore] = useState(85);
  const [activeThreats, setActiveThreats] = useState(0);
  const [blockedAttempts, setBlockedAttempts] = useState(12);

  const handleSave = () => {
    // Calculate security score based on settings
    let score = 0;
    if (security.twoFactorAuth) score += 20;
    if (security.passwordComplexity === "high") score += 15;
    if (security.encryptionLevel === "aes256") score += 15;
    if (security.auditLog) score += 10;
    if (security.ipWhitelist) score += 10;
    if (security.sslForced) score += 10;
    if (security.realTimeMonitoring) score += 10;
    if (security.biometricAuth) score += 10;

    setSecurityScore(score);
    console.log("Guardando configuración de seguridad avanzada:", security);
    toast.success("Configuración de seguridad actualizada con éxito");
  };

  const getScoreColor = () => {
    if (securityScore >= 90) return "text-green-600 bg-green-100";
    if (securityScore >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLevel = () => {
    if (securityScore >= 90) return "EXCELENTE";
    if (securityScore >= 70) return "BUENO";
    return "CRÍTICO";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Configuración de Seguridad Avanzada
        </h2>
        <div className={`px-4 py-2 rounded-xl font-bold ${getScoreColor()}`}>
          Nivel: {getScoreLevel()}
        </div>
      </div>

      {/* Security Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Puntuación de Seguridad</p>
                <p className="text-3xl font-bold text-blue-800">{securityScore}%</p>
              </div>
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <Progress value={securityScore} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium">Amenazas Activas</p>
                <p className="text-3xl font-bold text-green-800">{activeThreats}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">Sistema seguro</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-medium">Intentos Bloqueados</p>
                <p className="text-3xl font-bold text-orange-800">{blockedAttempts}</p>
              </div>
              <XCircle className="h-12 w-12 text-orange-600" />
            </div>
            <p className="text-sm text-orange-600 mt-2">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">Estado del Sistema</p>
                <p className="text-lg font-bold text-purple-800">ACTIVO</p>
              </div>
              <Activity className="h-12 w-12 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <p className="text-sm text-purple-600">Monitoreo en tiempo real</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Authentication */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Autenticación Avanzada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="twoFactorAuth" className="font-semibold">Autenticación de Dos Factores</Label>
                <p className="text-sm text-gray-600">Seguridad adicional con código SMS/Email</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={security.twoFactorAuth}
                onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="biometricAuth" className="font-semibold">Autenticación Biométrica</Label>
                <p className="text-sm text-gray-600">Huella digital o reconocimiento facial</p>
              </div>
              <Switch
                id="biometricAuth"
                checked={security.biometricAuth}
                onCheckedChange={(checked) => setSecurity({...security, biometricAuth: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="passwordExpiry" className="font-semibold">Expiración de Contraseñas</Label>
                <p className="text-sm text-gray-600">Renovación obligatoria cada 90 días</p>
              </div>
              <Switch
                id="passwordExpiry"
                checked={security.passwordExpiry}
                onCheckedChange={(checked) => setSecurity({...security, passwordExpiry: checked})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts" className="font-semibold">Máximo Intentos de Login</Label>
              <Select 
                value={security.maxLoginAttempts} 
                onValueChange={(value) => setSecurity({...security, maxLoginAttempts: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 intentos (Alto)</SelectItem>
                  <SelectItem value="5">5 intentos (Medio)</SelectItem>
                  <SelectItem value="10">10 intentos (Bajo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordComplexity" className="font-semibold">Complejidad de Contraseñas</Label>
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
                  <SelectItem value="high">Alta (12+ caracteres, símbolos, mayús)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Network Security */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-6 w-6 text-green-600" />
              Seguridad de Red
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout" className="font-semibold">Tiempo de Sesión (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                className="font-mono"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="ipWhitelist" className="font-semibold">Lista Blanca de IPs</Label>
                <p className="text-sm text-gray-600">Solo IPs autorizadas pueden acceder</p>
              </div>
              <Switch
                id="ipWhitelist"
                checked={security.ipWhitelist}
                onCheckedChange={(checked) => setSecurity({...security, ipWhitelist: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="sslForced" className="font-semibold">SSL/TLS Forzado</Label>
                <p className="text-sm text-gray-600">Conexiones encriptadas obligatorias</p>
              </div>
              <Switch
                id="sslForced"
                checked={security.sslForced}
                onCheckedChange={(checked) => setSecurity({...security, sslForced: checked})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryptionLevel" className="font-semibold">Nivel de Encriptación</Label>
              <Select 
                value={security.encryptionLevel} 
                onValueChange={(value) => setSecurity({...security, encryptionLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes128">AES-128 (Estándar)</SelectItem>
                  <SelectItem value="aes256">AES-256 (Recomendado)</SelectItem>
                  <SelectItem value="rsa2048">RSA-2048 (Máximo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="realTimeMonitoring" className="font-semibold">Monitoreo en Tiempo Real</Label>
                <p className="text-sm text-gray-600">Detección de amenazas activa</p>
              </div>
              <Switch
                id="realTimeMonitoring"
                checked={security.realTimeMonitoring}
                onCheckedChange={(checked) => setSecurity({...security, realTimeMonitoring: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced API Keys Management */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6 text-purple-600" />
              Gestión de Claves API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Key className="h-4 w-4" />
                Claves Activas
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <div>
                    <span className="font-medium">API Principal</span>
                    <p className="text-xs text-gray-500">Creada: 15/11/2024</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Activa</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <div>
                    <span className="font-medium">API Backup</span>
                    <p className="text-xs text-gray-500">Creada: 10/11/2024</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Standby</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-gradient-to-r from-blue-50 to-indigo-50">
                <Key className="h-4 w-4 mr-2" />
                Generar Nueva Clave API
              </Button>

              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Revocar Claves Inactivas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Activity Log */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-orange-600" />
              Registro de Actividad Avanzado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auditLog" className="font-semibold">Registro de Auditoría</Label>
                <p className="text-sm text-gray-600">Log detallado de todas las acciones</p>
              </div>
              <Switch
                id="auditLog"
                checked={security.auditLog}
                onCheckedChange={(checked) => setSecurity({...security, auditLog: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dataBackup" className="font-semibold">Respaldo Automático</Label>
                <p className="text-sm text-gray-600">Backup diario de logs de seguridad</p>
              </div>
              <Switch
                id="dataBackup"
                checked={security.dataBackup}
                onCheckedChange={(checked) => setSecurity({...security, dataBackup: checked})}
              />
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-4">Actividad Reciente</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Login exitoso - admin@test.com</span>
                  </div>
                  <span className="text-gray-500">10:30 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Configuración de seguridad modificada</span>
                  </div>
                  <span className="text-gray-500">09:15 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-purple-500" />
                    <span>Backup automático ejecutado</span>
                  </div>
                  <span className="text-gray-500">03:00 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Intento de acceso bloqueado</span>
                  </div>
                  <span className="text-gray-500">02:45 AM</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Ver Registro Completo de Seguridad
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Restablecer Cambios
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Configuración Avanzada
        </Button>
      </div>
    </div>
  );
}
