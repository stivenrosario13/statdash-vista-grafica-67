
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MobileDownload() {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Descarga iniciada",
      description: "La aplicación móvil se está descargando...",
    });
    
    // Simular descarga
    setTimeout(() => {
      toast({
        title: "Descarga completada",
        description: "Instala la aplicación en tu dispositivo móvil",
      });
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Smartphone className="h-5 w-5" />
          Aplicación Móvil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-blue-700">
          Descarga nuestra aplicación móvil para gestionar tus cobros desde cualquier lugar
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Descargar APK
          </Button>
          <Button variant="outline" className="flex-1">
            <QrCode className="h-4 w-4 mr-2" />
            Código QR
          </Button>
        </div>
        
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          <strong>Características:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Registro de cobros offline</li>
            <li>Sincronización automática</li>
            <li>Notificaciones push</li>
            <li>Reportes en tiempo real</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
