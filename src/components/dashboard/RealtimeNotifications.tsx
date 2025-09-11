
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, Info, X, DollarSign, Users, TrendingUp } from "lucide-react";
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  data?: any;
  read: boolean;
}

export function RealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { lastUpdate } = useRealtimeUpdates();

  useEffect(() => {
    const handleCobroRegistered = (event: CustomEvent) => {
      const { empleadoId, monto, teamId, clientName, employeeName, fecha } = event.detail;
      
      const newNotification: Notification = {
        id: `cobro-${Date.now()}`,
        type: 'success',
        title: 'Nuevo Cobro Registrado',
        message: `${employeeName} registró RD$ ${monto.toLocaleString()} de ${clientName}`,
        timestamp: new Date(),
        data: { empleadoId, monto, teamId, clientName, employeeName, fecha },
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    };

    const handleSystemAlert = (event: CustomEvent) => {
      const { type, title, message, data } = event.detail;
      
      const newNotification: Notification = {
        id: `alert-${Date.now()}`,
        type,
        title,
        message,
        timestamp: new Date(),
        data,
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    };

    window.addEventListener('cobroRegistered', handleCobroRegistered);
    window.addEventListener('systemAlert', handleSystemAlert);

    return () => {
      window.removeEventListener('cobroRegistered', handleCobroRegistered);
      window.removeEventListener('systemAlert', handleSystemAlert);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <X className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-yellow-500';
      case 'error': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <CardTitle className="text-white">Notificaciones en Tiempo Real</CardTitle>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-white hover:bg-white/20"
            >
              Marcar todo como leído
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No hay notificaciones</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-l-4 ${getBorderColor(notification.type)} ${
                  !notification.read ? 'bg-blue-50' : 'bg-white'
                } hover:bg-gray-50 transition-colors cursor-pointer`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.timestamp.toLocaleTimeString('es-DO')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
