import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash2, Eye, Upload, Download, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTemplateImport } from "./InvoiceTemplateImport";

interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  headerText: string;
  footerText: string;
  logoUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  isDefault: boolean;
  createdAt: string;
  htmlContent?: string;
}

export function InvoiceTemplates() {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([
    {
      id: '1',
      name: 'Plantilla Estándar',
      description: 'Plantilla por defecto del sistema',
      headerText: 'Steven Rosario Estadísticas\nGestión Inteligente',
      footerText: 'Gracias por confiar en nuestros servicios',
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        text: '#1e293b'
      },
      isDefault: true,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '2',
      name: 'Plantilla Moderna',
      description: 'Diseño moderno con gradientes',
      headerText: 'Steven Rosario Estadísticas\nSoluciones Innovadoras',
      footerText: 'Transformando la gestión de cobros',
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        text: '#1f2937'
      },
      isDefault: false,
      createdAt: '2024-01-15T00:00:00'
    }
  ]);

  const [editingTemplate, setEditingTemplate] = useState<InvoiceTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    headerText: '',
    footerText: '',
    primary: '#2563eb',
    secondary: '#64748b',
    text: '#1e293b'
  });

  const { toast } = useToast();

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.headerText) {
      toast({
        title: "Error",
        description: "Complete los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const template: InvoiceTemplate = {
      id: editingTemplate?.id || Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      headerText: newTemplate.headerText,
      footerText: newTemplate.footerText,
      colors: {
        primary: newTemplate.primary,
        secondary: newTemplate.secondary,
        text: newTemplate.text
      },
      isDefault: false,
      createdAt: editingTemplate?.createdAt || new Date().toISOString()
    };

    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? template : t));
      toast({
        title: "Plantilla actualizada",
        description: "La plantilla ha sido actualizada exitosamente"
      });
    } else {
      setTemplates([...templates, template]);
      toast({
        title: "Plantilla creada",
        description: "La nueva plantilla ha sido creada exitosamente"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setNewTemplate({
      name: '',
      description: '',
      headerText: '',
      footerText: '',
      primary: '#2563eb',
      secondary: '#64748b',
      text: '#1e293b'
    });
    setEditingTemplate(null);
  };

  const handleEditTemplate = (template: InvoiceTemplate) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      description: template.description,
      headerText: template.headerText,
      footerText: template.footerText,
      primary: template.colors.primary,
      secondary: template.colors.secondary,
      text: template.colors.text
    });
  };

  const handleDeleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template?.isDefault) {
      toast({
        title: "Error",
        description: "No se puede eliminar la plantilla por defecto",
        variant: "destructive"
      });
      return;
    }

    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Plantilla eliminada",
      description: "La plantilla ha sido eliminada exitosamente"
    });
  };

  const setAsDefault = (id: string) => {
    setTemplates(templates.map(t => ({
      ...t,
      isDefault: t.id === id
    })));
    toast({
      title: "Plantilla por defecto actualizada",
      description: "La plantilla seleccionada ahora es la predeterminada"
    });
  };

  const handleTemplateImported = (importedTemplate: any) => {
    const template: InvoiceTemplate = {
      id: Date.now().toString(),
      name: importedTemplate.name,
      description: importedTemplate.description || "Plantilla importada",
      headerText: importedTemplate.headerText || "Plantilla Importada",
      footerText: importedTemplate.footerText || "Gracias por su preferencia",
      colors: importedTemplate.colors || {
        primary: '#2563eb',
        secondary: '#64748b',
        text: '#1e293b'
      },
      isDefault: false,
      createdAt: new Date().toISOString(),
      htmlContent: importedTemplate.htmlContent
    };

    setTemplates([...templates, template]);
  };

  const exportTemplate = (template: InvoiceTemplate) => {
    const exportData = {
      name: template.name,
      description: template.description,
      headerText: template.headerText,
      footerText: template.footerText,
      colors: template.colors,
      htmlContent: template.htmlContent
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Plantilla exportada",
      description: "La plantilla se ha descargado exitosamente"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Palette className="h-6 w-6" />
          Plantillas de Facturas
        </h2>
        <Button onClick={() => resetForm()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Plantilla
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Formulario de Creación/Edición */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>
              {editingTemplate ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre de la Plantilla</label>
              <Input
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                placeholder="Ej: Plantilla Corporativa"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Input
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                placeholder="Descripción de la plantilla"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Texto del Encabezado</label>
              <Textarea
                value={newTemplate.headerText}
                onChange={(e) => setNewTemplate({...newTemplate, headerText: e.target.value})}
                placeholder="Steven Rosario Estadísticas&#10;Gestión Inteligente"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Texto del Pie de Página</label>
              <Textarea
                value={newTemplate.footerText}
                onChange={(e) => setNewTemplate({...newTemplate, footerText: e.target.value})}
                placeholder="Gracias por confiar en nuestros servicios"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium">Color Primario</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newTemplate.primary}
                    onChange={(e) => setNewTemplate({...newTemplate, primary: e.target.value})}
                    className="w-10 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={newTemplate.primary}
                    onChange={(e) => setNewTemplate({...newTemplate, primary: e.target.value})}
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Color Secundario</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newTemplate.secondary}
                    onChange={(e) => setNewTemplate({...newTemplate, secondary: e.target.value})}
                    className="w-10 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={newTemplate.secondary}
                    onChange={(e) => setNewTemplate({...newTemplate, secondary: e.target.value})}
                    placeholder="#64748b"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Color de Texto</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newTemplate.text}
                    onChange={(e) => setNewTemplate({...newTemplate, text: e.target.value})}
                    className="w-10 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={newTemplate.text}
                    onChange={(e) => setNewTemplate({...newTemplate, text: e.target.value})}
                    placeholder="#1e293b"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveTemplate} className="flex-1">
                {editingTemplate ? 'Actualizar' : 'Crear'} Plantilla
              </Button>
              {editingTemplate && (
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Plantillas */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Plantillas Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {templates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {template.name}
                        {template.isDefault && (
                          <Badge variant="default" className="text-xs">Por Defecto</Badge>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEditTemplate(template)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => exportTemplate(template)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      {!template.isDefault && (
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteTemplate(template.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: template.colors.primary }}
                    ></div>
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: template.colors.secondary }}
                    ></div>
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: template.colors.text }}
                    ></div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Vista Previa
                    </Button>
                    {!template.isDefault && (
                      <Button size="sm" onClick={() => setAsDefault(template.id)}>
                        Usar por Defecto
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Importar Plantillas */}
        <div className="xl:col-span-3">
          <InvoiceTemplateImport onTemplateImported={handleTemplateImported} />
        </div>
      </div>
    </div>
  );
}
