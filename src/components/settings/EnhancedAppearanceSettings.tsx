
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Palette, Moon, Sun, Monitor, Save, Eye, Smartphone, Laptop, Tablet } from "lucide-react";
import { toast } from "sonner";

export function EnhancedAppearanceSettings() {
  const [appearance, setAppearance] = useState({
    darkMode: false,
    theme: "blue",
    fontSize: "medium",
    sidebarPosition: "left",
    compactMode: false,
    animations: true,
    highContrast: false,
    customColors: {
      primary: "#3B82F6",
      secondary: "#06B6D4",
      accent: "#8B5CF6"
    },
    borderRadius: 8,
    spacing: "normal",
    fontFamily: "inter"
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleSave = () => {
    const root = document.documentElement;
    
    // Apply dark mode
    if (appearance.darkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }

    // Apply theme colors
    root.style.setProperty('--primary', appearance.customColors.primary);
    root.style.setProperty('--secondary', appearance.customColors.secondary);
    root.style.setProperty('--accent', appearance.customColors.accent);
    
    // Apply border radius
    root.style.setProperty('--radius', `${appearance.borderRadius}px`);
    
    // Apply font family
    root.style.setProperty('--font-family', appearance.fontFamily);

    console.log("Guardando configuración de apariencia avanzada:", appearance);
    toast.success("Configuración de apariencia actualizada con éxito");
  };

  const toggleDarkMode = (enabled: boolean) => {
    setAppearance({...appearance, darkMode: enabled});
    
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  };

  const presetThemes = [
    { name: "Azul Corporativo", primary: "#3B82F6", secondary: "#06B6D4", accent: "#8B5CF6" },
    { name: "Verde Éxito", primary: "#10B981", secondary: "#059669", accent: "#34D399" },
    { name: "Púrpura Premium", primary: "#8B5CF6", secondary: "#A855F7", accent: "#C084FC" },
    { name: "Rojo Dinámico", primary: "#EF4444", secondary: "#F87171", accent: "#FCA5A5" },
    { name: "Naranja Energía", primary: "#F97316", secondary: "#FB923C", accent: "#FDBA74" }
  ];

  const getPreviewClasses = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80 h-96';
      case 'tablet': return 'w-96 h-72';
      default: return 'w-full h-64';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Palette className="h-8 w-8 text-blue-600" />
          Configuración de Apariencia Avanzada
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('desktop')}
          >
            <Laptop className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Theme Settings */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-blue-600" />
              Tema y Colores Avanzados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="flex items-center gap-2 font-semibold">
                {appearance.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                Modo Oscuro
              </Label>
              <Switch
                id="darkMode"
                checked={appearance.darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>

            <div className="space-y-3">
              <Label className="font-semibold">Temas Predefinidos</Label>
              <div className="grid grid-cols-1 gap-2">
                {presetThemes.map((theme, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    onClick={() => setAppearance({
                      ...appearance,
                      customColors: {
                        primary: theme.primary,
                        secondary: theme.secondary,
                        accent: theme.accent
                      }
                    })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.primary}}></div>
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.secondary}}></div>
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: theme.accent}}></div>
                      </div>
                      <span className="font-medium">{theme.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="font-semibold">Colores Personalizados</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Color Primario</Label>
                  <input
                    type="color"
                    value={appearance.customColors.primary}
                    onChange={(e) => setAppearance({
                      ...appearance,
                      customColors: {...appearance.customColors, primary: e.target.value}
                    })}
                    className="w-12 h-8 rounded border"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Color Secundario</Label>
                  <input
                    type="color"
                    value={appearance.customColors.secondary}
                    onChange={(e) => setAppearance({
                      ...appearance,
                      customColors: {...appearance.customColors, secondary: e.target.value}
                    })}
                    className="w-12 h-8 rounded border"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Color de Acento</Label>
                  <input
                    type="color"
                    value={appearance.customColors.accent}
                    onChange={(e) => setAppearance({
                      ...appearance,
                      customColors: {...appearance.customColors, accent: e.target.value}
                    })}
                    className="w-12 h-8 rounded border"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="highContrast" className="font-semibold">Alto Contraste</Label>
                <p className="text-sm text-gray-600">Mejora la accesibilidad visual</p>
              </div>
              <Switch
                id="highContrast"
                checked={appearance.highContrast}
                onCheckedChange={(checked) => setAppearance({...appearance, highContrast: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Layout Settings */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-6 w-6 text-green-600" />
              Diseño y Tipografía
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="fontFamily" className="font-semibold">Familia de Fuente</Label>
              <Select 
                value={appearance.fontFamily} 
                onValueChange={(value) => setAppearance({...appearance, fontFamily: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter (Moderno)</SelectItem>
                  <SelectItem value="roboto">Roboto (Clásico)</SelectItem>
                  <SelectItem value="poppins">Poppins (Amigable)</SelectItem>
                  <SelectItem value="monospace">Monospace (Técnico)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize" className="font-semibold">Tamaño de Fuente</Label>
              <Select 
                value={appearance.fontSize} 
                onValueChange={(value) => setAppearance({...appearance, fontSize: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño (12px)</SelectItem>
                  <SelectItem value="medium">Mediano (14px)</SelectItem>
                  <SelectItem value="large">Grande (16px)</SelectItem>
                  <SelectItem value="xl">Extra Grande (18px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="font-semibold">Radio de Bordes: {appearance.borderRadius}px</Label>
              <Slider
                value={[appearance.borderRadius]}
                onValueChange={(value) => setAppearance({...appearance, borderRadius: value[0]})}
                max={20}
                min={0}
                step={2}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spacing" className="font-semibold">Espaciado</Label>
              <Select 
                value={appearance.spacing} 
                onValueChange={(value) => setAppearance({...appearance, spacing: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compacto</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="comfortable">Cómodo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sidebarPosition" className="font-semibold">Posición de la Barra Lateral</Label>
              <Select 
                value={appearance.sidebarPosition} 
                onValueChange={(value) => setAppearance({...appearance, sidebarPosition: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Izquierda</SelectItem>
                  <SelectItem value="right">Derecha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="compactMode" className="font-semibold">Modo Compacto</Label>
                <p className="text-sm text-gray-600">Reduce el espacio entre elementos</p>
              </div>
              <Switch
                id="compactMode"
                checked={appearance.compactMode}
                onCheckedChange={(checked) => setAppearance({...appearance, compactMode: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="animations" className="font-semibold">Animaciones</Label>
                <p className="text-sm text-gray-600">Transiciones suaves y efectos</p>
              </div>
              <Switch
                id="animations"
                checked={appearance.animations}
                onCheckedChange={(checked) => setAppearance({...appearance, animations: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Preview Section */}
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-purple-600" />
              Vista Previa del Tema
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-700">
              Modo {previewMode}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className={`mx-auto ${getPreviewClasses()} p-6 rounded-xl border-2 transition-all duration-300 ${
            appearance.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`} style={{
            borderRadius: `${appearance.borderRadius}px`,
            fontFamily: appearance.fontFamily
          }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold" style={{color: appearance.customColors.primary}}>
                  Steven Rosario Estadísticas
                </h3>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: appearance.customColors.accent}}></div>
              </div>
              
              <p className={`text-sm ${appearance.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Gestión Inteligente
              </p>
              
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded" style={{backgroundColor: appearance.customColors.primary}}></div>
                <div className="w-6 h-6 rounded" style={{backgroundColor: appearance.customColors.secondary}}></div>
                <div className="w-6 h-6 rounded" style={{backgroundColor: appearance.customColors.accent}}></div>
              </div>
              
              <div className="space-y-2">
                <div className={`h-2 rounded-full ${appearance.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full w-3/4" style={{backgroundColor: appearance.customColors.primary}}></div>
                </div>
                <div className={`h-2 rounded-full ${appearance.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full w-1/2" style={{backgroundColor: appearance.customColors.secondary}}></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 rounded text-white text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: appearance.customColors.primary,
                    borderRadius: `${appearance.borderRadius}px`
                  }}
                >
                  Primario
                </button>
                <button 
                  className="px-3 py-1 rounded text-white text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: appearance.customColors.secondary,
                    borderRadius: `${appearance.borderRadius}px`
                  }}
                >
                  Secundario
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Restablecer Cambios
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Save className="h-4 w-4 mr-2" />
          Aplicar Configuración
        </Button>
      </div>
    </div>
  );
}
