import { managementSections } from "./erpData";
import { StatsCards } from "./StatsCards";
import { ManagementCard } from "./ManagementCard";

export function ErpDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Bienvenido al Sistema ERP</h1>
          <p className="text-sm text-muted-foreground">Resumen general de operaciones</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Sistema operando normalmente
          </span>
        </div>
      </div>

      <StatsCards />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Módulos del Sistema</h2>
          <p className="text-xs text-muted-foreground">
            {managementSections.reduce((a, s) => a + s.modules.length, 0)} módulos disponibles
          </p>
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
