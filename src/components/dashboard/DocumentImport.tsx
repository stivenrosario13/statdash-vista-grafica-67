
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Check, X } from "lucide-react";

export function DocumentImport() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleProcessFiles = async () => {
    setIsUploading(true);
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importar Facturas y Recibos
        </CardTitle>
        <CardDescription className="text-orange-100">
          Suba facturas y recibos en formato PDF, JPG o PNG
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Zona de subida */}
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
            <Upload className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <p className="text-orange-700 font-semibold mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
            <p className="text-orange-600 text-sm">PDF, JPG, PNG (máx. 10MB por archivo)</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg cursor-pointer hover:from-orange-700 hover:to-orange-800 transition-all"
            >
              Seleccionar Archivos
            </label>
          </div>

          {/* Lista de archivos */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-800">Archivos Seleccionados:</h3>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-900">{file.name}</p>
                      <p className="text-sm text-orange-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                onClick={handleProcessFiles}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
              >
                {isUploading ? (
                  "Procesando..."
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Procesar {uploadedFiles.length} archivo(s)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
