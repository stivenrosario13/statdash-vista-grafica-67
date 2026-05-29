export interface Module {
  id: string;
  name: string;
  description: string;
  iconName: string;
  href: string;
  badge?: string;
  stats?: { label: string; value: string };
  features?: string[];
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
  { id: "pagos", name: "Sistema de Pagos", description: "Procesamiento de pagos multicanal", iconName: "CreditCard", href: "/payments", badge: "Core" },
  { id: "cobros", name: "Recaudaciones", description: "Registro y control de cobros", iconName: "Receipt", href: "/cobros", stats: { label: "Hoy", value: "$8,500" } },
  { id: "tesoreria", name: "Tesorería", description: "Control de caja, bancos y flujo de efectivo", iconName: "Landmark", href: "/finanzas/tesoreria",
    features: ["Conciliación bancaria automática", "Múltiples cuentas y monedas", "Transferencias internas", "Flujo de caja proyectado"] },
  { id: "cxc", name: "Cuentas por Cobrar", description: "Control de cartera y vencimientos", iconName: "Wallet", href: "/finanzas/cxc",
    features: ["Antigüedad de saldos", "Recordatorios automáticos", "Notas de crédito/débito", "Estados de cuenta"] },
  { id: "cxp", name: "Cuentas por Pagar", description: "Gestión de proveedores y pagos", iconName: "CreditCard", href: "/finanzas/cxp",
    features: ["Programación de pagos", "Aprobaciones multi-nivel", "Retenciones", "Conciliación de facturas"] },
  { id: "contabilidad", name: "Contabilidad", description: "Libro mayor, asientos y balances", iconName: "Calculator", href: "/finanzas/contabilidad",
    features: ["Plan de cuentas", "Asientos automáticos", "Balance general", "Estado de resultados"] },
  { id: "presupuestos", name: "Presupuestos", description: "Planificación y control presupuestario", iconName: "Target", href: "/finanzas/presupuestos",
    features: ["Presupuesto anual por área", "Comparativo real vs plan", "Alertas de desviación", "Reasignaciones"] },
  { id: "impuestos", name: "Impuestos", description: "ITBIS, ISR y cumplimiento fiscal", iconName: "FileText", href: "/finanzas/impuestos",
    features: ["Cálculo automático ITBIS", "Reportes 606/607", "Retenciones", "Declaraciones DGII"] },
  { id: "activos", name: "Activos Fijos", description: "Control y depreciación de activos", iconName: "Building2", href: "/finanzas/activos",
    features: ["Inventario de activos", "Depreciación automática", "Bajas y traslados", "Etiquetado y trazabilidad"] },
  { id: "reportes", name: "Reportes Financieros", description: "Estados financieros ejecutivos", iconName: "FileText", href: "/reports" },
  { id: "historial", name: "Historial", description: "Histórico de operaciones", iconName: "Calendar", href: "/history" },
  { id: "estadisticas", name: "Análisis Financiero", description: "KPIs y ratios financieros", iconName: "BarChart3", href: "/finanzas/analisis",
    features: ["Ratios de liquidez", "Rentabilidad por línea", "ROI y EBITDA", "Comparativos anuales"] },
];

const humanaModules: Module[] = [
  { id: "empleados", name: "Empleados", description: "Expediente y gestión del personal", iconName: "UserCog", href: "/employees", stats: { label: "Activos", value: "248" } },
  { id: "operaciones", name: "Operaciones", description: "Gestión operativa diaria", iconName: "Activity", href: "/operations" },
  { id: "reclutamiento", name: "Reclutamiento", description: "Vacantes, candidatos y selección", iconName: "UserCheck", href: "/rrhh/reclutamiento",
    features: ["Publicación de vacantes", "Pipeline de candidatos", "Entrevistas programadas", "Ofertas y contrataciones"] },
  { id: "nomina", name: "Nómina", description: "Cálculo y pago de nómina", iconName: "Wallet", href: "/rrhh/nomina", badge: "Core",
    features: ["Cálculo automático TSS/ISR", "Múltiples ciclos de pago", "Volantes digitales", "Reportes a SIPEN"] },
  { id: "asistencia", name: "Asistencia", description: "Control de horarios y ponchados", iconName: "Clock", href: "/rrhh/asistencia",
    features: ["Reloj biométrico/GPS", "Horarios y turnos", "Tardanzas y ausencias", "Banco de horas"] },
  { id: "vacaciones", name: "Vacaciones y Permisos", description: "Solicitudes y aprobaciones", iconName: "Calendar", href: "/rrhh/vacaciones",
    features: ["Solicitud digital", "Calendario del equipo", "Saldos automáticos", "Flujo de aprobación"] },
  { id: "desempeno", name: "Desempeño", description: "Evaluaciones y objetivos", iconName: "Target", href: "/rrhh/desempeno",
    features: ["Evaluaciones 360°", "OKRs y KPIs", "Feedback continuo", "Planes de desarrollo"] },
  { id: "capacitacion", name: "Capacitación", description: "Cursos y desarrollo del talento", iconName: "Brain", href: "/rrhh/capacitacion",
    features: ["Catálogo de cursos", "Rutas de aprendizaje", "Certificaciones", "Reportes de cumplimiento"] },
  { id: "beneficios", name: "Beneficios", description: "Seguros, bonos y compensaciones", iconName: "HeartPulse", href: "/rrhh/beneficios",
    features: ["ARS y seguros", "Bonos y comisiones", "Préstamos al personal", "Reconocimientos"] },
  { id: "organigrama", name: "Organigrama", description: "Estructura organizacional", iconName: "FolderKanban", href: "/rrhh/organigrama",
    features: ["Estructura visual", "Departamentos y áreas", "Jerarquía y reportes", "Posiciones vacantes"] },
  { id: "clima", name: "Clima Laboral", description: "Encuestas y bienestar", iconName: "HeartPulse", href: "/rrhh/clima",
    features: ["Encuestas anónimas", "Indicadores de satisfacción", "Acciones de mejora", "Pulse surveys"] },
];

const herramientasModules: Module[] = [
  { id: "analytics", name: "Análisis Avanzado", description: "BI ejecutivo y predictivo", iconName: "Brain", href: "/analytics", badge: "AI" },
  { id: "bar", name: "Gráficos Barras", description: "Comparativos visuales", iconName: "BarChart3", href: "/bar-charts" },
  { id: "line", name: "Gráficos Líneas", description: "Tendencias en el tiempo", iconName: "LineChart", href: "/line-charts" },
  { id: "pie", name: "Gráficos Circulares", description: "Distribución porcentual", iconName: "PieChart", href: "/pie-charts" },
  { id: "importar", name: "Importar Datos", description: "Excel, CSV y bases externas", iconName: "Package", href: "/tools/importar",
    features: ["Importar Excel/CSV", "Mapeo de columnas", "Validación de datos", "Plantillas reusables"] },
  { id: "exportar", name: "Exportar / Backups", description: "Respaldos y exportaciones", iconName: "Boxes", href: "/tools/exportar",
    features: ["Backup automático", "Exportar a Excel/PDF", "Programación de respaldos", "Restauración por fecha"] },
  { id: "automatizacion", name: "Automatizaciones", description: "Flujos y reglas de negocio", iconName: "RefreshCcw", href: "/tools/automatizacion",
    features: ["Disparadores y acciones", "Reglas condicionales", "Plantillas predefinidas", "Logs de ejecución"] },
  { id: "integraciones", name: "Integraciones", description: "APIs y servicios externos", iconName: "Boxes", href: "/tools/integraciones",
    features: ["API REST y webhooks", "Conectores SaaS", "OAuth y tokens", "Monitor de salud"] },
  { id: "auditoria", name: "Auditoría", description: "Registro de actividad del sistema", iconName: "Shield", href: "/tools/auditoria",
    features: ["Log de accesos", "Cambios por usuario", "Alertas de seguridad", "Exportación forense"] },
  { id: "permisos", name: "Roles y Permisos", description: "Control de acceso granular", iconName: "Shield", href: "/tools/permisos",
    features: ["Roles personalizados", "Permisos por módulo", "Restricciones por IP", "MFA obligatorio"] },
  { id: "tareas", name: "Tareas y Proyectos", description: "Gestión interna de proyectos", iconName: "CheckSquare", href: "/tools/tareas",
    features: ["Kanban y listas", "Asignaciones y plazos", "Subtareas y dependencias", "Reportes de avance"] },
  { id: "calendario", name: "Calendario", description: "Eventos y agenda corporativa", iconName: "Calendar", href: "/tools/calendario",
    features: ["Calendario compartido", "Recordatorios", "Sincronización Google/Outlook", "Reuniones recurrentes"] },
  { id: "notificaciones", name: "Centro de Notificaciones", description: "Alertas y mensajería interna", iconName: "MessageSquare", href: "/tools/notificaciones",
    features: ["Push y email", "Notificaciones por canal", "Plantillas reutilizables", "Historial completo"] },
  { id: "settings", name: "Configuración", description: "Ajustes generales del sistema", iconName: "Settings", href: "/settings" },
];

export const managementSections: ManagementSection[] = [
  { id: "comercial", name: "Gestión Comercial", description: "Ventas, clientes y facturación", iconName: "ShoppingBag", color: "commercial", gradient: "from-blue-500/20 to-blue-600/5", modules: comercialModules },
  { id: "financiera", name: "Gestión Financiera", description: "Pagos, contabilidad y tesorería", iconName: "DollarSign", color: "financial", gradient: "from-sky-500/20 to-sky-600/5", modules: financieraModules },
  { id: "humana", name: "Gestión Humana", description: "Personal, nómina y desarrollo", iconName: "Users", color: "human", gradient: "from-cyan-500/20 to-cyan-600/5", modules: humanaModules },
  { id: "herramientas", name: "Herramientas", description: "Análisis, automatización y utilidades", iconName: "Boxes", color: "tools", gradient: "from-indigo-500/20 to-indigo-600/5", modules: herramientasModules },
];

export const quickStats = [
  { label: "Ventas Hoy", value: "$45,230", change: "+12.5%", trend: "up" as const, iconName: "TrendingUp" },
  { label: "Pedidos Pendientes", value: "23", change: "-8%", trend: "down" as const, iconName: "ShoppingCart" },
  { label: "Clientes Activos", value: "2,847", change: "+3.2%", trend: "up" as const, iconName: "Users" },
  { label: "Ingresos Mes", value: "$892,450", change: "+18.7%", trend: "up" as const, iconName: "DollarSign" },
];
