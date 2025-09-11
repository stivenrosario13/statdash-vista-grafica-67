
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, MessageSquare, Save } from "lucide-react";
import { toast } from "sonner";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsNotifications: false,
    inactiveEmployeeAlert: true,
    lowPerformanceAlert: true,
    dailyReports: true,
    weeklyReports: true,
    monthlyReports: false,
    emailFrequency: "immediate",
    alertThreshold: "50"
  });

  const handleSave = () => {
    console.log("Guardando configuración de notificaciones:", notifications);
    toast.success("Configuración de notificaciones guardada");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración de Alertas y Notificaciones</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Tipos de Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailAlerts">Alertas por Email</Label>
              <Switch
                id="emailAlerts"
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Notificaciones Push</Label>
              <Switch
                id="pushNotifications"
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">Mensajes SMS</Label>
              <Switch
                id="smsNotifications"
                checked={notifications.smsNotifications}
                onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Alertas del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="inactiveEmployeeAlert">Empleados Inactivos</Label>
              <Switch
                id="inactiveEmployeeAlert"
                checked={notifications.inactiveEmployeeAlert}
                onCheckedChange={(checked) => setNotifications({...notifications, inactiveEmployeeAlert: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowPerformanceAlert">Bajo Rendimiento</Label>
              <Switch
                id="lowPerformanceAlert"
                checked={notifications.lowPerformanceAlert}
                onCheckedChange={(checked) => setNotifications({...notifications, lowPerformanceAlert: checked})}
              />
            </div>

            <div>
              <Label htmlFor="alertThreshold">Umbral de Alerta (%)</Label>
              <Input
                id="alertThreshold"
                type="number"
                value={notifications.alertThreshold}
                onChange={(e) => setNotifications({...notifications, alertThreshold: e.target.value})}
                placeholder="50"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Reportes Automáticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dailyReports">Reportes Diarios</Label>
              <Switch
                id="dailyReports"
                checked={notifications.dailyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, dailyReports: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weeklyReports">Reportes Semanales</Label>
              <Switch
                id="weeklyReports"
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyReports">Reportes Mensuales</Label>
              <Switch
                id="monthlyReports"
                checked={notifications.monthlyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, monthlyReports: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Frecuencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emailFrequency">Frecuencia de Emails</Label>
              <Select 
                value={notifications.emailFrequency} 
                onValueChange={(value) => setNotifications({...notifications, emailFrequency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Inmediato</SelectItem>
                  <SelectItem value="hourly">Cada Hora</SelectItem>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Vista Previa de Notificaciones</h4>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• Alertas de empleados inactivos: {notifications.inactiveEmployeeAlert ? 'Activadas' : 'Desactivadas'}</p>
                <p>• Reportes diarios: {notifications.dailyReports ? 'Activados' : 'Desactivados'}</p>
                <p>• Frecuencia: {notifications.emailFrequency}</p>
              </div>
            </div>
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
