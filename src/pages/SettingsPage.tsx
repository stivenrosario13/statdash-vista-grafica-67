
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AdvancedSettings } from "@/components/settings/AdvancedSettings";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";
import { Settings, Bell, Palette } from "lucide-react";

const SettingsPage = () => {
  return (
    <GlobalDataProvider>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Configuraciones</h1>
            <p className="text-gray-600">Personaliza completamente tu experiencia en el sistema</p>
          </div>
        </div>

        <Tabs defaultValue="advanced" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Configuraciones Avanzadas
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Apariencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advanced">
            <AdvancedSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="appearance">
            <div className="text-center py-12">
              <Settings className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Configuraciones de Apariencia</h3>
              <p className="text-gray-500">Esta sección estará disponible próximamente</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GlobalDataProvider>
  );
};

export default SettingsPage;
