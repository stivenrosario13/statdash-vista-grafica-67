
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Download, 
  Send, 
  FileText, 
  Users, 
  Calculator,
  TrendingUp,
  Settings,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  route?: string;
  action?: () => void;
  badge?: string;
  disabled?: boolean;
}

export function QuickActions() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleExportData = () => {
    setIsLoading('export');
    // Simulate export process
    setTimeout(() => {
      toast.success('Datos exportados exitosamente');
      setIsLoading(null);
    }, 2000);
  };

  const handleSendReport = () => {
    setIsLoading('report');
    setTimeout(() => {
      toast.success('Reporte enviado por email');
      setIsLoading(null);
    }, 1500);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'new-cobro',
      title: 'Nuevo Cobro',
      description: 'Registrar un nuevo cobro en el sistema',
      icon: Plus,
      color: 'bg-green-500 hover:bg-green-600',
      route: '/cobros',
      badge: 'Rápido'
    },
    {
      id: 'export-data',
      title: 'Exportar Datos',
      description: 'Descargar reporte completo de cobros',
      icon: Download,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: handleExportData
    },
    {
      id: 'send-report',
      title: 'Enviar Reporte',
      description: 'Enviar resumen diario por email',
      icon: Send,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: handleSendReport
    },
    {
      id: 'manage-clients',
      title: 'Gestionar Clientes',
      description: 'Ver y editar información de clientes',
      icon: Users,
      color: 'bg-orange-500 hover:bg-orange-600',
      route: '/clients'
    },
    {
      id: 'analytics',
      title: 'Analytics Avanzado',
      description: 'Ver análisis detallado de métricas',
      icon: TrendingUp,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      route: '/analytics',
      badge: 'Nuevo'
    },
    {
      id: 'calculator',
      title: 'Calculadora',
      description: 'Herramientas de cálculo financiero',
      icon: Calculator,
      color: 'bg-teal-500 hover:bg-teal-600',
      action: () => toast.info('Calculadora financiera próximamente')
    },
    {
      id: 'templates',
      title: 'Plantillas',
      description: 'Gestionar plantillas de documentos',
      icon: FileText,
      color: 'bg-pink-500 hover:bg-pink-600',
      route: '/invoice-templates'
    },
    {
      id: 'settings',
      title: 'Configuración',
      description: 'Ajustar preferencias del sistema',
      icon: Settings,
      color: 'bg-gray-500 hover:bg-gray-600',
      route: '/settings'
    }
  ];

  const handleActionClick = (action: QuickAction) => {
    if (action.disabled) {
      toast.warning('Esta función no está disponible');
      return;
    }

    if (action.route) {
      navigate(action.route);
    } else if (action.action) {
      action.action();
    }
  };

  return (
    <Card className="shadow-xl border-gray-200">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-black">
          <Zap className="h-6 w-6 text-yellow-600" />
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const loading = isLoading === action.id;
            
            return (
              <Button
                key={action.id}
                variant="outline"
                className={`
                  h-auto p-4 flex flex-col items-center gap-3 
                  hover:shadow-lg transition-all duration-300 
                  group relative overflow-hidden
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                `}
                onClick={() => handleActionClick(action)}
                disabled={loading || action.disabled}
              >
                {action.badge && (
                  <Badge className="absolute -top-1 -right-1 text-xs bg-red-500 text-white">
                    {action.badge}
                  </Badge>
                )}
                
                <div className={`
                  w-12 h-12 rounded-lg ${action.color} 
                  flex items-center justify-center 
                  transition-all duration-300 group-hover:scale-110
                  ${loading ? 'animate-pulse' : ''}
                `}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-sm text-black">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
                
                {loading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
