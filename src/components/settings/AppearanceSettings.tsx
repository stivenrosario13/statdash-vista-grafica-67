
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
import { useNumberFormat } from "@/hooks/useNumberFormat";

export function AppearanceSettings() {
  const { formatNumber } = useNumberFormat();
  const [appearance, setAppearance] = useState({
    darkMode: true,
    theme: "blue",
    fontSize: "medium",
    sidebarPosition: "left",
    compactMode: false,
    animations: true,
    highContrast: false,
    customColors: {
      primary: "#3B82F6",
      secondary: "#1E40AF",
      accent: "#06B6D4"
    },
    borderRadius: 8,
    spacing: "normal",
    fontFamily: "inter"
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    // Apply dark mode by default for enterprise theme
    const root = document.documentElement;
    root.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.color = '#ffffff';
  }, []);

  const handleSave = () => {
    const root = document.documentElement;
    
    // Apply dark mode
    if (appearance.darkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }

    // Apply theme colors correctly
    root.style.setProperty('--primary', appearance.customColors.primary);
    root.style.setProperty('--secondary', appearance.customColors.secondary);
    root.style.setProperty('--accent', appearance.customColors.accent);
    
    // Apply border radius
    root.style.setProperty('--radius', `${appearance.borderRadius}px`);
    
    // Apply font family
    root.style.setProperty('--font-family', appearance.fontFamily);

    // Force update of all chart colors to blue/white theme
    const style = document.createElement('style');
    style.innerHTML = `
      .recharts-text { fill: #ffffff !important; }
      .recharts-cartesian-axis-tick-value { fill: #cbd5e1 !important; }
      .recharts-legend-item-text { color: #e2e8f0 !important; }
      .recharts-tooltip-wrapper { background: rgba(15, 23, 42, 0.95) !important; }
    `;
    document.head.appendChild(style);

    console.log("Guardando configuración de apariencia:", appearance);
    toast.success("Configuración de apariencia actualizada con éxito");
  };

  const toggleDarkMode = (enabled: boolean) => {
    setAppearance({...appearance, darkMode: enabled});
    
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }
  };

  const applyThemePreset = (preset: any) => {
    const newAppearance = {
      ...appearance,
      customColors: {
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent
      }
    };
    setAppearance(newAppearance);

    // Apply immediately
    const root = document.documentElement;
    root.style.setProperty('--primary', preset.primary);
    root.style.setProperty('--secondary', preset.secondary);
    root.style.setProperty('--accent', preset.accent);
  };

  const presetThemes = [
    { name: "Azul Corporativo", primary: "#3B82F6", secondary: "#1E40AF", accent: "#06B6D4" },
    { name: "Azul Profundo", primary: "#1E40AF", secondary: "#1E3A8A", accent: "#3B82F6" },
    { name: "Cian Moderno", primary: "#06B6D4", secondary: "#0891B2", accent: "#67E8F9" },
    { name: "Índigo Premium", primary: "#6366F1", secondary: "#4F46E5", accent: "#8B5CF6" },
    { name: "Azul Marino", primary: "#1E3A8A", secondary: "#1E40AF", accent: "#3B82F6" }
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
        <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
          <Palette className="h-8 w-8 text-blue-400" />
          Configuración de Apariencia Empresarial
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('desktop')}
            className="border-blue-400 text-blue-300"
          >
            <Laptop className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('tablet')}
            className="border-blue-400 text-blue-300"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('mobile')}
            className="border-blue-400 text-blue-300"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Theme Settings */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-blue-400/30 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-b border-blue-400/20">
            <CardTitle className="flex items-center gap-2 text-white">
              <Palette className="h-6 w-6 text-blue-400" />
              Tema y Colores Avanzados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="flex items-center gap-2 font-semibold text-blue-200">
                {appearance.darkMode ? <Moon className="h-5 w-5 text-blue-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                Modo Oscuro Empresarial
              </Label>
              <Switch
                id="darkMode"
                checked={appearance.darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>

            <div className="space-y-3">
              <Label className="font-semibold text-blue-200">Temas Predefinidos</Label>
              <div className="grid grid-cols-1 gap-2">
                {presetThemes.map((theme, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-blue-400/30 bg-slate-800/50 hover:bg-blue-600/20 text-white"
                    onClick={() => applyThemePreset(theme)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20" 
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20" 
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20" 
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <span className="font-medium text-blue-100">{theme.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-blue-200">Color Primario</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.customColors.primary}
                    onChange={(e) => {
                      const newColors = { ...appearance.customColors, primary: e.target.value };
                      setAppearance({ ...appearance, customColors: newColors });
                      document.documentElement.style.setProperty('--primary', e.target.value);
                    }}
                    className="w-12 h-12 rounded-lg border border-blue-400/30 bg-transparent"
                  />
                  <span className="text-blue-300 font-mono text-sm">{appearance.customColors.primary}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Color Secundario</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.customColors.secondary}
                    onChange={(e) => {
                      const newColors = { ...appearance.customColors, secondary: e.target.value };
                      setAppearance({ ...appearance, customColors: newColors });
                      document.documentElement.style.setProperty('--secondary', e.target.value);
                    }}
                    className="w-12 h-12 rounded-lg border border-blue-400/30 bg-transparent"
                  />
                  <span className="text-blue-300 font-mono text-sm">{appearance.customColors.secondary}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Color de Acento</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.customColors.accent}
                    onChange={(e) => {
                      const newColors = { ...appearance.customColors, accent: e.target.value };
                      setAppearance({ ...appearance, customColors: newColors });
                      document.documentElement.style.setProperty('--accent', e.target.value);
                    }}
                    className="w-12 h-12 rounded-lg border border-blue-400/30 bg-transparent"
                  />
                  <span className="text-blue-300 font-mono text-sm">{appearance.customColors.accent}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview and Advanced Settings */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border border-blue-400/30 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-b border-blue-400/20">
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="h-6 w-6 text-blue-400" />
              Vista Previa y Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Preview */}
            <div className="space-y-3">
              <Label className="text-blue-200">Vista Previa del Tema</Label>
              <div className={`${getPreviewClasses()} bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 border border-blue-400/30`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: appearance.customColors.primary }}
                    >
                      <span className="text-white font-bold">SR</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Steven Rosario</h4>
                      <p className="text-blue-300 text-sm">Sistema Empresarial</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: appearance.customColors.secondary }}
                    >
                      <p className="text-sm opacity-90">Total</p>
                      <p className="font-bold">{formatNumber(125000, 2)}</p>
                    </div>
                    <div 
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: appearance.customColors.accent }}
                    >
                      <p className="text-sm opacity-90">Meta</p>
                      <p className="font-bold">{formatNumber(150000, 2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-blue-200">Radio de Bordes</Label>
                <Slider
                  value={[appearance.borderRadius]}
                  onValueChange={(value) => setAppearance({...appearance, borderRadius: value[0]})}
                  max={20}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <span className="text-blue-300 text-sm">{appearance.borderRadius}px</span>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Familia de Fuente</Label>
                <Select 
                  value={appearance.fontFamily} 
                  onValueChange={(value) => setAppearance({...appearance, fontFamily: value})}
                >
                  <SelectTrigger className="border-blue-400/30 bg-slate-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    <SelectItem value="inter">Inter (Recomendado)</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="system-ui">System UI</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-blue-200">Animaciones</Label>
                <Switch
                  checked={appearance.animations}
                  onCheckedChange={(checked) => setAppearance({...appearance, animations: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-blue-200">Alto Contraste</Label>
                <Switch
                  checked={appearance.highContrast}
                  onCheckedChange={(checked) => setAppearance({...appearance, highContrast: checked})}
                />
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
