
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Users,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  PieChart,
  LineChart,
  Building2,
  CreditCard,
  Mail,
  Phone,
  UserCheck,
  History,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  TrendingDown,
  Briefcase,
  FolderOpen,
  Sparkles,
  LogOut,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function EnhancedSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, hasPermission, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
    navigate("/login", { replace: true });
  };

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      badge: null,
      permission: null,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: TrendingDown,
      badge: "Nuevo",
      permission: "canViewReports",
    },
    {
      title: "Operaciones",
      href: "/operations",
      icon: Briefcase,
      badge: null,
      permission: "canCreateCobros",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: FolderOpen,
      badge: null,
      permission: "canViewAllTeams",
    },
  ];

  const chartsItems = [
    {
      title: "Gráficos de Barras",
      href: "/bar-charts",
      icon: BarChart3,
      permission: "canViewReports",
    },
    {
      title: "Gráficos de Líneas",
      href: "/line-charts",
      icon: LineChart,
      permission: "canViewReports",
    },
    {
      title: "Gráficos Circulares",
      href: "/pie-charts",
      icon: PieChart,
      permission: "canViewReports",
    },
  ];

  const managementItems = [
    {
      title: "Empleados",
      href: "/employees",
      icon: Users,
      permission: "canManageUsers",
    },
    {
      title: "Cobros",
      href: "/cobros",
      icon: DollarSign,
      permission: "canCreateCobros",
    },
    {
      title: "Clientes",
      href: "/clients",
      icon: UserCheck,
      permission: null,
    },
    {
      title: "Asignación de Clientes",
      href: "/client-assignment",
      icon: Users,
      permission: "canManageUsers",
    },
  ];

  const communicationItems = [
    {
      title: "WhatsApp",
      href: "/whatsapp",
      icon: Phone,
      permission: null,
    },
    {
      title: "Email",
      href: "/email",
      icon: Mail,
      permission: null,
    },
  ];

  const reportsItems = [
    {
      title: "Pagos",
      href: "/payments",
      icon: CreditCard,
      permission: "canViewReports",
    },
    {
      title: "Plantillas de Factura",
      href: "/invoice-templates",
      icon: FileText,
      permission: "canViewReports",
    },
    {
      title: "Soporte al Cliente",
      href: "/client-support",
      icon: Building2,
      permission: null,
    },
    {
      title: "Reportes",
      href: "/reports",
      icon: TrendingUp,
      permission: "canViewReports",
    },
    {
      title: "Historial",
      href: "/history",
      icon: History,
      permission: null,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  const NavItem = ({ item, isSubItem = false }: { item: any; isSubItem?: boolean }) => {
    if (item.permission && !hasPermission(item.permission)) {
      return null;
    }

    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
          isActive(item.href)
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-500/25"
            : "text-blue-200 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-cyan-600/30 hover:text-white hover:shadow-lg",
          isSubItem && "ml-4",
          isCollapsed && "justify-center px-2"
        )}
      >
        <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive(item.href) && "text-white")} />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <Badge
                variant={isActive(item.href) ? "secondary" : "default"}
                className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );
  };

  const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => {
    if (isCollapsed) return null;
    
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
        <Icon className="h-4 w-4" />
        {title}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-900 via-blue-950 to-slate-800 border-r border-blue-400/20 transition-all duration-300 flex flex-col h-full shadow-2xl",
      isCollapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-blue-400/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Steven Rosario
                </h2>
                <p className="text-xs text-blue-300">Sistema Empresarial</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-blue-800/30 text-blue-200 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!isCollapsed && authState.user && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-800/30 to-cyan-800/30 rounded-2xl border border-blue-400/20 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">{authState.user.name}</p>
            <p className="text-xs text-blue-300">{authState.user.email}</p>
            <Badge
              variant="outline"
              className="mt-2 text-xs bg-blue-500/20 text-blue-300 border-blue-400/30"
            >
              {authState.user.role === 'admin' ? 'Administrador' : 
               authState.user.role === 'manager' ? 'Gestor' : 'Visualizador'}
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <SectionHeader title="Principal" icon={Sparkles} />
            {navigationItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          {/* Charts */}
          <div className="space-y-1">
            <SectionHeader title="Gráficos" icon={BarChart3} />
            {chartsItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          {/* Management */}
          <div className="space-y-1">
            <SectionHeader title="Gestión" icon={Users} />
            {managementItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          {/* Communication */}
          <div className="space-y-1">
            <SectionHeader title="Comunicación" icon={Phone} />
            {communicationItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          {/* Reports */}
          <div className="space-y-1">
            <SectionHeader title="Reportes" icon={TrendingUp} />
            {reportsItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-blue-400/20 space-y-3">
        {!isCollapsed && (
          <div className="flex items-center justify-between mb-3">
            <div className="text-blue-300">
              <NotificationBell />
            </div>
            <ThemeToggle />
          </div>
        )}
        
        <NavItem
          item={{
            title: "Configuración",
            href: "/settings",
            icon: Settings,
            permission: null,
          }}
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-red-300 hover:bg-red-500/20 hover:text-red-200",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  );
}
