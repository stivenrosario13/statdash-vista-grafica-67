import { managementSections } from "./erpData";
import { StatsCards } from "./StatsCards";
import { ManagementCard } from "./ManagementCard";
import { Activity, Building2 } from "lucide-react";

export function ErpDashboard() {
  const totalModules = managementSections.reduce((a, s) => a + s.modules.length, 0);

  return (
    <div className="space-y-8">
      {/* Hero empresarial */}
      <div className="enterprise-card relative overflow-hidden p-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                ERP Pro · Plataforma Empresarial
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Centro de Operaciones
              </h1>
              <p className="text-sm text-muted-foreground">
                Visión 360° de tu negocio · Todos los módulos conectados en tiempo real
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-background px-4 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">Sistema operativo</span>
              <span className="text-[11px] text-muted-foreground">Todos los servicios activos</span>
            </div>
          </div>
        </div>
      </div>

      <StatsCards />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Módulos del Sistema</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {totalModules} módulos integrados
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {managementSections.map((s) => (
            <ManagementCard key={s.id} section={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
