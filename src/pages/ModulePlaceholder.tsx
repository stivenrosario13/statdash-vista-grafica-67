import { useLocation } from "react-router-dom";
import { Construction, ArrowRight } from "lucide-react";
import { managementSections } from "@/components/erp/erpData";
import { getIcon } from "@/components/erp/icons";

const ModulePlaceholder = () => {
  const { pathname } = useLocation();
  const allModules = managementSections.flatMap((s) =>
    s.modules.map((m) => ({ ...m, section: s.name }))
  );
  const mod = allModules.find((m) => m.href === pathname);
  const Icon = getIcon(mod?.iconName || "Package");

  const features = (mod as any)?.features as string[] | undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {mod?.section}
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            {mod?.name || "Módulo"}
          </h1>
          <p className="text-sm text-muted-foreground">{mod?.description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <Construction className="h-6 w-6 text-primary" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              Módulo en preparación
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Este módulo forma parte del ERP empresarial. Próximamente podrás
              acceder a todas sus funcionalidades desde esta pantalla.
            </p>

            {features && features.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Funcionalidades planificadas
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePlaceholder;
