
import { useState } from "react";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Settings as SettingsIcon, 
  Bell, 
  Database, 
  Shield, 
  Palette,
  Activity,
  BarChart3,
  Zap,
  Lock,
  Globe,
  Smartphone
} from "lucide-react";
import { UserManagement } from "@/components/settings/UserManagement";
import { SystemSettings } from "@/components/settings/SystemSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { DatabaseSettings } from "@/components/settings/DatabaseSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { useNumberFormat } from "@/hooks/useNumberFormat";

const Settings = () => {
  const { formatNumber } = useNumberFormat();
  const [activeTab, setActiveTab] = useState("appearance");

  const settingsStats = {
    totalUsers: 48, // 48 gestores total
    activeUsers: 46,
    lastBackup: "Hoy 10:30 AM",
    systemHealth: 98,
    securityLevel: "Alto",
    notifications: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
      {/* Patrones de fondo empresariales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
      
      <div className="relative z-10 p-8">
        <RoleGuard allowedRoles={['admin']} fallback={
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/30">
                <Shield className="h-10 w-10 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Acceso Restringido</h2>
              <p className="text-blue-200 text-lg mb-6">
                Solo los administradores pueden acceder a la configuración del sistema.
              </p>
              <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                <p className="text-red-300 text-sm">
                  Si necesitas acceso a esta sección, contacta al administrador del sistema.
                </p>
              </div>
            </div>
          </div>
        }>
          <div className="space-y-8 animate-fade-in">
            {/* Header mejorado */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Panel de Configuración</h1>
                  <p className="text-blue-100 text-lg">
                    Administración completa del Sistema de Gestión Steven Rosario
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Activity className="h-3 w-3 mr-1" />
                      Sistema Activo
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Seguridad: {settingsStats.securityLevel}
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Rendimiento: {settingsStats.systemHealth}%
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{formatNumber(settingsStats.totalUsers)}</div>
                  <div className="text-blue-100">Usuarios del Sistema</div>
                </div>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-blue-400/30">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(settingsStats.totalUsers)}</div>
                  <div className="text-blue-300 text-sm">Total Usuarios</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-emerald-400/30">
                <CardContent className="p-6 text-center">
                  <Activity className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(settingsStats.activeUsers)}</div>
                  <div className="text-emerald-300 text-sm">Usuarios Activos</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-purple-400/30">
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white truncate">{settingsStats.lastBackup}</div>
                  <div className="text-purple-300 text-sm">Último Backup</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-orange-400/30">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{settingsStats.systemHealth}%</div>
                  <div className="text-orange-300 text-sm">Rendimiento</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-red-400/30">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{settingsStats.securityLevel}</div>
                  <div className="text-red-300 text-sm">Seguridad</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-indigo-400/30">
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(settingsStats.notifications)}</div>
                  <div className="text-indigo-300 text-sm">Notificaciones</div>
                </CardContent>
              </Card>
            </div>

            {/* Panel principal de configuración */}
            <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-blue-400/30 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-t-lg border-b border-blue-400/20">
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <SettingsIcon className="h-7 w-7 text-blue-400" />
                  Configuración del Sistema
                  <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30 ml-auto">
                    Panel Administrativo
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-blue-400/20 bg-slate-800/30">
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-16 bg-transparent">
                      <TabsTrigger 
                        value="appearance" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <Palette className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Apariencia</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="users" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <Users className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Usuarios</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="system" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <SettingsIcon className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Sistema</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="notifications" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <Bell className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Alertas</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="database" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <Database className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Base Datos</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="security" 
                        className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-blue-300"
                      >
                        <Shield className="h-5 w-5" />
                        <span className="hidden sm:inline text-xs">Seguridad</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="min-h-[600px] bg-gradient-to-br from-slate-900 to-blue-950">
                    <TabsContent value="appearance" className="p-8 m-0">
                      <AppearanceSettings />
                    </TabsContent>

                    <TabsContent value="users" className="p-8 m-0">
                      <UserManagement />
                    </TabsContent>

                    <TabsContent value="system" className="p-8 m-0">
                      <SystemSettings />
                    </TabsContent>

                    <TabsContent value="notifications" className="p-8 m-0">
                      <NotificationSettings />
                    </TabsContent>

                    <TabsContent value="database" className="p-8 m-0">
                      <DatabaseSettings />
                    </TabsContent>

                    <TabsContent value="security" className="p-8 m-0">
                      <SecuritySettings />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Footer informativo */}
            <div className="bg-gradient-to-r from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-3xl border border-blue-400/20 shadow-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">Sistema de Gestión Steven Rosario</h3>
                  <p className="text-blue-300 text-sm">
                    Versión 2.0 - Panel de Administración Avanzado
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-blue-300">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>Conectado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Smartphone className="h-4 w-4" />
                    <span>Responsivo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RoleGuard>
      </div>
    </div>
  );
};

export default Settings;
