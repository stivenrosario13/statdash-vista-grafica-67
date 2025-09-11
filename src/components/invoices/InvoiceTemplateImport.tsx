
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportedTemplate {
  name: string;
  file: File;
  preview?: string;
  status: 'pending' | 'success' | 'error';
}

interface InvoiceTemplateImportProps {
  onTemplateImported: (template: any) => void;
}

export function InvoiceTemplateImport({ onTemplateImported }: InvoiceTemplateImportProps) {
  const [importedFiles, setImportedFiles] = useState<ImportedTemplate[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'application/json' || 
      file.type === 'text/html' || 
      file.name.endsWith('.json') ||
      file.name.endsWith('.html')
    );

    if (validFiles.length !== files.length) {
      toast({
        title: "Archivos no válidos",
        description: "Solo se permiten archivos JSON y HTML",
        variant: "destructive"
      });
    }

    const newImports: ImportedTemplate[] = validFiles.map(file => ({
      name: file.name,
      file,
      status: 'pending'
    }));

    setImportedFiles(prev => [...prev, ...newImports]);
  };

  const processImport = async (importedTemplate: ImportedTemplate) => {
    setIsImporting(true);
    
    try {
      const content = await importedTemplate.file.text();
      let templateData;

      if (importedTemplate.file.name.endsWith('.json')) {
        templateData = JSON.parse(content);
      } else {
        // Procesar HTML y extraer estilos
        templateData = {
          name: importedTemplate.name.replace(/\.[^/.]+$/, ""),
          description: "Plantilla importada desde HTML",
          headerText: "Plantilla Importada",
          footerText: "Gracias por su preferencia",
          colors: {
            primary: "#2563eb",
            secondary: "#64748b",
            text: "#1e293b"
          },
          htmlContent: content
        };
      }

      // Validar estructura de la plantilla
      if (!templateData.name) {
        throw new Error("La plantilla debe tener un nombre");
      }

      setImportedFiles(prev => 
        prev.map(item => 
          item.name === importedTemplate.name 
            ? { ...item, status: 'success' }
            : item
        )
      );

      onTemplateImported(templateData);

      toast({
        title: "Plantilla importada",
        description: `${templateData.name} se ha importado exitosamente`
      });

    } catch (error) {
      setImportedFiles(prev => 
        prev.map(item => 
          item.name === importedTemplate.name 
            ? { ...item, status: 'error' }
            : item
        )
      );

      toast({
        title: "Error al importar",
        description: "No se pudo procesar el archivo de plantilla",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  const removeImport = (name: string) => {
    setImportedFiles(prev => prev.filter(item => item.name !== name));
  };

  const clearAll = () => {
    setImportedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importar Plantillas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-4">
            Arrastra archivos aquí o selecciona archivos para importar plantillas
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".json,.html"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            <Upload className="h-4 w-4 mr-2" />
            Seleccionar Archivos
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Formatos soportados: JSON, HTML
          </p>
        </div>

        {importedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Archivos para importar</h4>
              <Button size="sm" variant="ghost" onClick={clearAll}>
                Limpiar todo
              </Button>
            </div>
            
            {importedFiles.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.status === 'success' && <Check className="h-4 w-4 text-green-500" />}
                  {item.status === 'error' && <X className="h-4 w-4 text-red-500" />}
                </div>
                <div className="flex gap-2">
                  {item.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => processImport(item)}
                      disabled={isImporting}
                    >
                      Importar
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => removeImport(item.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
