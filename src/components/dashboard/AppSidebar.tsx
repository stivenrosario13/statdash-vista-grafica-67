
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronUp,
  CreditCard,
  FileText,
  Home,
  Inbox,
  LineChart,
  Mail,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Users,
  Wallet,
  Phone,
  Receipt,
  TrendingUp,
  Target,
  Brain,
  Zap,
  Shield,
  Database,
  Activity,
  DollarSign,
  UserCheck,
  ClipboardList,
  Headphones
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Estructura mejorada del menú por categorías
const menuItems = [
  {
    title: "Panel Principal",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Búsqueda Global",
        url: "/search",
        icon: Search,
      }
    ]
  },
  {
    title: "Análisis y Reportes",
    items: [
      {
        title: "Análisis Avanzado",
        url: "/analytics",
        icon: Brain,
      },
      {
        title: "Reportes Ejecutivos",
        url: "/reports",
        icon: FileText,
      },
      {
        title: "Gráficos de Barras",
        url: "/bar-charts",
        icon: BarChart3,
      },
      {
        title: "Gráficos de Líneas",
        url: "/line-charts",
        icon: LineChart,
      },
      {
        title: "Gráficos Circulares",
        url: "/pie-charts",
        icon: PieChart,
      }
    ]
  },
  {
    title: "Gestión Operativa",
    items: [
      {
        title: "Gestión Operativa",
        url: "/operations",
        icon: Activity,
      },
      {
        title: "Empleados",
        url: "/employees",
        icon: Users,
      },
      {
        title: "Registro de Cobros",
        url: "/cobros",
        icon: DollarSign,
      },
      {
        title: "Historial",
        url: "/history",
        icon: Calendar,
      }
    ]
  },
  {
    title: "Cartera y Clientes",
    items: [
      {
        title: "Gestión de Cartera",
        url: "/portfolio",
        icon: Target,
      },
      {
        title: "Clientes",
        url: "/clients",
        icon: Building2,
      },
      {
        title: "Asignación de Clientes",
        url: "/client-assignment",
        icon: UserCheck,
      }
    ]
  },
  {
    title: "Comunicación",
    items: [
      {
        title: "WhatsApp",
        url: "/whatsapp",
        icon: MessageSquare,
      },
      {
        title: "Email",
        url: "/email",
        icon: Mail,
      },
      {
        title: "Soporte al Cliente",
        url: "/client-support",
        icon: Headphones,
      }
    ]
  },
  {
    title: "Pagos y Facturación",
    items: [
      {
        title: "Sistema de Pagos",
        url: "/payments",
        icon: CreditCard,
      },
      {
        title: "Plantillas de Facturas",
        url: "/invoice-templates",
        icon: Receipt,
      }
    ]
  }
];

// Menú administrativo (solo para admin)
const adminItems = [
  {
    title: "Administración",
    items: [
      {
        title: "Configuración",
        url: "/settings",
        icon: Settings,
      },
      {
        title: "Base de Datos",
        url: "/database",
        icon: Database,
      },
      {
        title: "Seguridad",
        url: "/security",
        icon: Shield,
      }
    ]
  }
];

export function AppSidebar() {
  const { authState } = useAuth();

  return (
    <Sidebar variant="inset" className="bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      <SidebarHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Steven Rosario</h2>
            <p className="text-xs text-blue-100">Sistema Profesional</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {menuItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel className="text-blue-800 font-semibold text-xs uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      asChild 
                      className="hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 rounded-lg"
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Sección administrativa - Solo para admins */}
        <RoleGuard allowedRoles={['admin']}>
          {adminItems.map((group, groupIndex) => (
            <SidebarGroup key={`admin-${groupIndex}`}>
              <SidebarGroupLabel className="text-red-700 font-semibold text-xs uppercase tracking-wider">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-red-100 hover:text-red-800 transition-all duration-200 rounded-lg"
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </RoleGuard>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-gradient-to-r from-gray-100 to-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {authState.user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{authState.user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-500 capitalize">{authState.user?.role || 'viewer'}</p>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Inbox className="mr-2 h-4 w-4" />
                  Notificaciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
