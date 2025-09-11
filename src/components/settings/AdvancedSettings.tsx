
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  Palette, 
  Database, 
  Target,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';
import { toast } from 'sonner';

export function AdvancedSettings() {
  const { state, updateSettings } = useGlobalData();
  const [localSettings, setLocalSettings] = useState(state.settings);

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Configuraciones guardadas exitosamente');
  };

  const handleReset = () => {
    setLocalSettings(state.settings);
    toast.info('Configuraciones restauradas');
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(localSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'configuraciones.json';
    link.click();
    toast.success('Configuraciones exportadas');
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setLocalSettings({ ...localSettings, ...imported });
          toast.success('Configuraciones importadas');
        } catch (error) {
          toast.error('Error al importar configuraciones');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Configuraciones Avanzadas</h2>
          <p className="text-gray-600">Personaliza completamente tu experiencia</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Restaurar
          </Button>
          <Button variant="outline" onClick={handleExportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
          </div>
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Moneda</Label>
                  <Select 
                    value={localSettings.currency} 
                    onValueChange={(value) => setLocalSettings({...localSettings, currency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RD$">Pesos Dominicanos (RD$)</SelectItem>
                      <SelectItem value="USD">Dólares (USD)</SelectItem>
                      <SelectItem value="EUR">Euros (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateFormat">Formato de Fecha</Label>
                  <Select 
                    value={localSettings.dateFormat} 
                    onValueChange={(value) => setLocalSettings({...localSettings, dateFormat: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoRefresh">Actualización Automática</Label>
                <Switch
                  id="autoRefresh"
                  checked={localSettings.autoRefresh}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings, 
                    autoRefresh: checked
                  })}
                />
              </div>

              <div>
                <Label htmlFor="refreshInterval">Intervalo de Actualización (ms)</Label>
                <Input
                  id="refreshInterval"
                  type="number"
                  value={localSettings.refreshInterval}
                  onChange={(e) => setLocalSettings({
                    ...localSettings, 
                    refreshInterval: parseInt(e.target.value)
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notificationsEnabled">Notificaciones Habilitadas</Label>
                <Switch
                  id="notificationsEnabled"
                  checked={localSettings.notifications.enabled}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    notifications: { ...localSettings.notifications, enabled: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="soundNotifications">Sonido</Label>
                <Switch
                  id="soundNotifications"
                  checked={localSettings.notifications.sound}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    notifications: { ...localSettings.notifications, sound: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="desktopNotifications">Notificaciones de Escritorio</Label>
                <Switch
                  id="desktopNotifications"
                  checked={localSettings.notifications.desktop}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    notifications: { ...localSettings.notifications, desktop: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                <Switch
                  id="emailNotifications"
                  checked={localSettings.notifications.email}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    notifications: { ...localSettings.notifications, email: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configuración del Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Select 
                  value={localSettings.dashboard.theme} 
                  onValueChange={(value: 'light' | 'dark' | 'auto') => setLocalSettings({
                    ...localSettings,
                    dashboard: { ...localSettings.dashboard, theme: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="auto">Automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compactMode">Modo Compacto</Label>
                <Switch
                  id="compactMode"
                  checked={localSettings.dashboard.compactMode}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    dashboard: { ...localSettings.dashboard, compactMode: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showAnimations">Mostrar Animaciones</Label>
                <Switch
                  id="showAnimations"
                  checked={localSettings.dashboard.showAnimations}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    dashboard: { ...localSettings.dashboard, showAnimations: checked }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="defaultTimeframe">Período por Defecto</Label>
                <Select 
                  value={localSettings.dashboard.defaultTimeframe} 
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setLocalSettings({
                    ...localSettings,
                    dashboard: { ...localSettings.dashboard, defaultTimeframe: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configuración de Gráficos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="chartType">Tipo de Gráfico por Defecto</Label>
                <Select 
                  value={localSettings.charts.type} 
                  onValueChange={(value: 'line' | 'bar' | 'area') => setLocalSettings({
                    ...localSettings,
                    charts: { ...localSettings.charts, type: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Líneas</SelectItem>
                    <SelectItem value="bar">Barras</SelectItem>
                    <SelectItem value="area">Área</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showGrid">Mostrar Cuadrícula</Label>
                <Switch
                  id="showGrid"
                  checked={localSettings.charts.showGrid}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    charts: { ...localSettings.charts, showGrid: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animate">Animaciones en Gráficos</Label>
                <Switch
                  id="animate"
                  checked={localSettings.charts.animate}
                  onCheckedChange={(checked) => setLocalSettings({
                    ...localSettings,
                    charts: { ...localSettings.charts, animate: checked }
                  })}
                />
              </div>

              <div>
                <Label>Colores de Gráficos</Label>
                <div className="flex gap-2 mt-2">
                  {localSettings.charts.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Configuración de Metas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthlyGoal">Meta Mensual</Label>
                <Input
                  id="monthlyGoal"
                  type="number"
                  value={localSettings.goals.monthly}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    goals: { ...localSettings.goals, monthly: parseInt(e.target.value) }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="dailyGoal">Meta Diaria</Label>
                <Input
                  id="dailyGoal"
                  type="number"
                  value={localSettings.goals.daily}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    goals: { ...localSettings.goals, daily: parseInt(e.target.value) }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="alertThreshold">Umbral de Alerta (%)</Label>
                <Input
                  id="alertThreshold"
                  type="number"
                  min="0"
                  max="100"
                  value={localSettings.goals.alertThreshold}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    goals: { ...localSettings.goals, alertThreshold: parseInt(e.target.value) }
                  })}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Vista Previa de Metas</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• Meta mensual: {localSettings.currency} {localSettings.goals.monthly.toLocaleString()}</p>
                  <p>• Meta diaria: {localSettings.currency} {localSettings.goals.daily.toLocaleString()}</p>
                  <p>• Alerta cuando esté por debajo del {localSettings.goals.alertThreshold}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
