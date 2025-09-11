
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, BellRing, Check, X, AlertCircle, DollarSign, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: 'payment' | 'invoice' | 'alert' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Nuevo Pago Recibido',
      message: 'Juan Pérez realizó un pago de RD$ 15,000.00',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'invoice',
      title: 'Factura Generada',
      message: 'Se generó la factura FAC-2024-001234 exitosamente',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Cliente Moroso',
      message: 'María García tiene 3 facturas vencidas por RD$ 45,000',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: true,
      priority: 'high'
    },
    {
      id: '4',
      type: 'system',
      title: 'Backup Completado',
      message: 'Respaldo automático ejecutado correctamente a las 03:00 AM',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
      priority: 'low'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simular notificaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.8; // 20% de probabilidad
      
      if (shouldAddNotification && notifications.length < 10) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? 'payment' : 'system',
          title: Math.random() > 0.5 ? 'Nuevo Cobro Registrado' : 'Actualización del Sistema',
          message: Math.random() > 0.5 ? 
            `Nuevo cobro de RD$ ${(Math.random() * 50000 + 5000).toFixed(0)} registrado` : 
            'El sistema se ha actualizado con mejoras de rendimiento',
          timestamp: new Date().toISOString(),
          read: false,
          priority: Math.random() > 0.7 ? 'high' : 'medium'
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        toast.info(newNotification.title, {
          description: newNotification.message
        });
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [notifications.length]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notificación eliminada");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsOpen(false);
    toast.success("Todas las notificaciones eliminadas");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'invoice':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative hover:bg-gray-50 transition-colors">
          {unreadCount > 0 ? (
            <BellRing className="h-4 w-4 text-blue-600" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Notificaciones</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-white hover:bg-white/20">
                    <Check className="h-4 w-4 mr-1" />
                    Marcar todas
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="text-white hover:bg-white/20">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-blue-100">{unreadCount} notificaciones sin leer</p>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">No hay notificaciones</p>
                  <p className="text-sm">Te mantendremos informado de nuevas actividades</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-blue-50' : 'bg-white'
                      } hover:bg-gray-50 transition-colors cursor-pointer group relative`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-semibold truncate pr-2 ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatTime(notification.timestamp)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-0.5 ${
                                notification.priority === 'high' ? 'border-red-200 text-red-700' :
                                notification.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                                'border-blue-200 text-blue-700'
                              }`}
                            >
                              {notification.priority === 'high' ? 'Alta' :
                               notification.priority === 'medium' ? 'Media' : 'Baja'}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
