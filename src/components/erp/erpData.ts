export interface Module {
  id: string;
  name: string;
  description: string;
  iconName: string;
  href: string;
  badge?: string;
  stats?: { label: string; value: string };
}

export interface ManagementSection {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: "commercial" | "financial" | "human" | "tools";
  gradient: string;
  modules: Module[];
}

const comercialModules: Module[] = [
  {
    id: "facturacion",
    name: "Facturación",
    description: "StatDash completo: métricas, KPIs y análisis en tiempo real",
    iconName: "Receipt",
    href: "/comercial/facturacion",
    badge: "StatDash",
    stats: { label: "Módulo", value: "Activo" },
  },
  { id: "clientes", name: "Clientes", description: "Gestión completa de clientes", iconName: "Users", href: "/clients", stats: { label: "Total", value: "2,847" } },
  { id: "cartera", name: "Cartera", description: "Gestión de cartera", iconName: "Target", href: "/portfolio" },
  { id: "asignacion", name: "Asignación", description: "Asignación de clientes", iconName: "UserCheck", href: "/client-assignment" },
  { id: "plantillas", name: "Plantillas Facturas", description: "Diseño de plantillas", iconName: "FileText", href: "/invoice-templates" },
  { id: "soporte", name: "Soporte", description: "Atención al cliente", iconName: "Headphones", href: "/client-support" },
  { id: "whatsapp", name: "WhatsApp", description: "Mensajería WhatsApp", iconName: "MessageSquare", href: "/whatsapp" },
  { id: "email", name: "Email", description: "Campañas y notificaciones", iconName: "Mail", href: "/email" },
];

const financieraModules: Module[] = [
  { id: "pagos", name: "Sistema de Pagos", description: "Procesamiento de pagos", iconName: "CreditCard", href: "/payments", badge: "Core" },
  { id: "cobros", name: "Recaudaciones", description: "Registro de cobros", iconName: "Receipt", href: "/cobros", stats: { label: "Hoy", value: "$8,500" } },
  { id: "reportes", name: "Reportes", description: "Reportes ejecutivos", iconName: "FileText", href: "/reports" },
  { id: "historial", name: "Historial", description: "Histórico de operaciones", iconName: "Calendar", href: "/history" },
  { id: "estadisticas", name: "Estadísticas", description: "Análisis financiero", iconName: "BarChart3", href: "/analytics" },
];

const humanaModules: Module[] = [
  { id: "empleados", name: "Empleados", description: "Gestión del personal", iconName: "UserCog", href: "/employees", stats: { label: "Activos", value: "248" } },
  { id: "operaciones", name: "Operaciones", description: "Gestión operativa", iconName: "Activity", href: "/operations" },
];

const herramientasModules: Module[] = [
  { id: "analytics", name: "Análisis Avanzado", description: "BI y predictivo", iconName: "Brain", href: "/analytics", badge: "AI" },
  { id: "bar", name: "Gráficos Barras", description: "Visualizaciones", iconName: "BarChart3", href: "/bar-charts" },
  { id: "line", name: "Gráficos Líneas", description: "Tendencias", iconName: "LineChart", href: "/line-charts" },
  { id: "pie", name: "Gráficos Circulares", description: "Distribución", iconName: "PieChart", href: "/pie-charts" },
  { id: "settings", name: "Configuración", description: "Ajustes del sistema", iconName: "Settings", href: "/settings" },
];

export const managementSections: ManagementSection[] = [
  { id: "comercial", name: "Gestión Comercial", description: "Ventas, clientes y facturación", iconName: "ShoppingBag", color: "commercial", gradient: "from-blue-500/20 to-blue-600/5", modules: comercialModules },
  { id: "financiera", name: "Gestión Financiera", description: "Pagos, cobros y reportes", iconName: "DollarSign", color: "financial", gradient: "from-sky-500/20 to-sky-600/5", modules: financieraModules },
  { id: "humana", name: "Gestión Humana", description: "Personal y operaciones", iconName: "Users", color: "human", gradient: "from-cyan-500/20 to-cyan-600/5", modules: humanaModules },
  { id: "herramientas", name: "Herramientas", description: "Análisis y utilidades", iconName: "Boxes", color: "tools", gradient: "from-indigo-500/20 to-indigo-600/5", modules: herramientasModules },
];

export const quickStats = [
  { label: "Ventas Hoy", value: "$45,230", change: "+12.5%", trend: "up" as const, iconName: "TrendingUp" },
  { label: "Pedidos Pendientes", value: "23", change: "-8%", trend: "down" as const, iconName: "ShoppingCart" },
  { label: "Clientes Activos", value: "2,847", change: "+3.2%", trend: "up" as const, iconName: "Users" },
  { label: "Ingresos Mes", value: "$892,450", change: "+18.7%", trend: "up" as const, iconName: "DollarSign" },
];
export interface Module {
  id: string;
  name: string;
  description: string;
  iconName: string;
  href: string;
  badge?: string;
  stats?: { label: string; value: string };
}

export interface ManagementSection {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: "commercial" | "financial" | "human" | "tools";
  gradient: string;
  modules: Module[];
}

const comercialModules: Module[] = [
  {
    id: "facturacion",
    name: "Facturación",
    description: "StatDash completo: métricas, KPIs y análisis en tiempo real",
    iconName: "Receipt",
    href: "/comercial/facturacion",
    badge: "StatDash",
    stats: { label: "Módulo", value: "Activo" },
  },
  { id: "clientes", name: "Clientes", description: "Gestión completa de clientes", iconName: "Users", href: "/clients", stats: { label: "Total", value: "2,847" } },
  { id: "cartera", name: "Cartera", description: "Gestión de cartera", iconName: "Target", href: "/portfolio" },
  { id: "asignacion", name: "Asignación", description: "Asignación de clientes", iconName: "UserCheck", href: "/client-assignment" },
  { id: "plantillas", name: "Plantillas Facturas", description: "Diseño de plantillas", iconName: "FileText", href: "/invoice-templates" },
  { id: "soporte", name: "Soporte", description: "Atención al cliente", iconName: "Headphones", href: "/client-support" },
  { id: "whatsapp", name: "WhatsApp", description: "Mensajería WhatsApp", iconName: "MessageSquare", href: "/whatsapp" },
  { id: "email", name: "Email", description: "Campañas y notificaciones", iconName: "Mail", href: "/email" },
   { id: "pagos", name: "Sistema de Pagos", description: "Procesamiento de pagos", iconName: "CreditCard", href: "/payments", badge: "Core" },
  { id: "cobros", name: "Recaudaciones", description: "Registro de cobros", iconName: "Receipt", href: "/cobros", stats: { label: "Hoy", value: "$8,500" } },
  { id: "reportes", name: "Reportes", description: "Reportes ejecutivos", iconName: "FileText", href: "/reports" },
  { id: "historial", name: "Historial", description: "Histórico de operaciones", iconName: "Calendar", href: "/history" },
  { id: "estadisticas", name: "Estadísticas", description: "Análisis financiero", iconName: "BarChart3", href: "/analytics" },
  { id: "empleados", name: "Empleados", description: "Gestión del personal", iconName: "UserCog", href: "/employees", stats: { label: "Activos", value: "248" } },
  { id: "operaciones", name: "Operaciones", description: "Gestión operativa", iconName: "Activity", href: "/operations" },
  { id: "analytics", name: "Análisis Avanzado", description: "BI y predictivo", iconName: "Brain", href: "/analytics", badge: "AI" },
  { id: "bar", name: "Gráficos Barras", description: "Visualizaciones", iconName: "BarChart3", href: "/bar-charts" },
  { id: "line", name: "Gráficos Líneas", description: "Tendencias", iconName: "LineChart", href: "/line-charts" },
  { id: "pie", name: "Gráficos Circulares", description: "Distribución", iconName: "PieChart", href: "/pie-charts" },
  { id: "settings", name: "Configuración", description: "Ajustes del sistema", iconName: "Settings", href: "/settings" },
];

const financieraModules: Module[] = [

];

const humanaModules: Module[] = [
 
];

const herramientasModules: Module[] = [ 

];

export const managementSections: ManagementSection[] = [
  { id: "comercial", name: "Gestión Comercial", description: "Ventas, clientes y facturación", iconName: "ShoppingBag", color: "commercial", gradient: "from-blue-500/20 to-blue-600/5", modules: comercialModules },
  { id: "financiera", name: "Gestión Financiera", description: "Pagos, cobros y reportes", iconName: "DollarSign", color: "financial", gradient: "from-sky-500/20 to-sky-600/5", modules: financieraModules },
  { id: "humana", name: "Gestión Humana", description: "Personal y operaciones", iconName: "Users", color: "human", gradient: "from-cyan-500/20 to-cyan-600/5", modules: humanaModules },
  { id: "herramientas", name: "Herramientas", description: "Análisis y utilidades", iconName: "Boxes", color: "tools", gradient: "from-indigo-500/20 to-indigo-600/5", modules: herramientasModules },
];

export const quickStats = [
  { label: "Ventas Hoy", value: "$45,230", change: "+12.5%", trend: "up" as const, iconName: "TrendingUp" },
  { label: "Pedidos Pendientes", value: "23", change: "-8%", trend: "down" as const, iconName: "ShoppingCart" },
  { label: "Clientes Activos", value: "2,847", change: "+3.2%", trend: "up" as const, iconName: "Users" },
  { label: "Ingresos Mes", value: "$892,450", change: "+18.7%", trend: "up" as const, iconName: "DollarSign" },
];
