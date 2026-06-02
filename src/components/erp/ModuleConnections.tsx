import { Link } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";

/**
 * Mapa de conexiones entre módulos.
 * Cada módulo declara qué otros módulos recibe datos / impacta.
 * Esto refleja el flujo real: cuando se gasta dinero en CxP,
 * impacta Tesorería (salida), Contabilidad (asiento), Reportes e Historial.
 */
export interface Connection {
  to: string;        // ruta destino
  label: string;     // nombre módulo destino
  reason: string;    // qué dato/efecto fluye
}

export const moduleConnections: Record<string, Connection[]> = {
  "/finanzas/tesoreria": [
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Cada movimiento genera asiento contable" },
    { to: "/finanzas/cxc", label: "Cuentas por Cobrar", reason: "Cobros aumentan saldo de caja" },
    { to: "/finanzas/cxp", label: "Cuentas por Pagar", reason: "Pagos reducen saldo bancario" },
    { to: "/history", label: "Historial", reason: "Todo movimiento queda registrado" },
    { to: "/reports", label: "Reportes", reason: "Flujo de caja consolidado" },
  ],
  "/finanzas/cxp": [
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Pago descuenta del banco/caja" },
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Genera asiento de gasto" },
    { to: "/finanzas/impuestos", label: "Impuestos", reason: "Reporte 606 - Compras" },
    { to: "/reports", label: "Reportes", reason: "Refleja en estado de resultados" },
  ],
  "/finanzas/cxc": [
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Cobro suma al banco/caja" },
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Asiento de ingreso" },
    { to: "/finanzas/impuestos", label: "Impuestos", reason: "Reporte 607 - Ventas + ITBIS" },
    { to: "/clients", label: "Clientes", reason: "Actualiza estado de cuenta" },
  ],
  "/finanzas/activos": [
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Depreciación mensual como gasto" },
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Adquisición sale de caja/banco" },
    { to: "/reports", label: "Reportes", reason: "Valor en balance general" },
  ],
  "/finanzas/contabilidad": [
    { to: "/reports", label: "Reportes", reason: "Estados financieros se generan aquí" },
    { to: "/finanzas/impuestos", label: "Impuestos", reason: "Base de cálculo DGII" },
    { to: "/history", label: "Historial", reason: "Libro mayor histórico" },
  ],
  "/finanzas/presupuestos": [
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Compara real vs presupuesto" },
    { to: "/reports", label: "Reportes", reason: "Análisis de desviaciones" },
  ],
  "/finanzas/impuestos": [
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Provisión de impuestos" },
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Pago a DGII" },
  ],
  "/rrhh/nomina": [
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Pago de nómina sale de banco" },
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Gasto de personal + TSS" },
    { to: "/finanzas/impuestos", label: "Impuestos", reason: "ISR retenido (IR-3)" },
    { to: "/employees", label: "Empleados", reason: "Historial de pagos por empleado" },
  ],
  "/rrhh/asistencia": [
    { to: "/rrhh/nomina", label: "Nómina", reason: "Horas trabajadas calculan salario" },
    { to: "/rrhh/vacaciones", label: "Vacaciones", reason: "Acumula días disponibles" },
  ],
  "/rrhh/vacaciones": [
    { to: "/rrhh/nomina", label: "Nómina", reason: "Pago de vacaciones (Ley 16-92)" },
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Provisión por vacaciones" },
  ],
  "/rrhh/beneficios": [
    { to: "/rrhh/nomina", label: "Nómina", reason: "Bonos y deducciones integradas" },
    { to: "/finanzas/contabilidad", label: "Contabilidad", reason: "Gasto de beneficios" },
  ],
  "/payments": [
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Pago acredita la cuenta" },
    { to: "/finanzas/cxc", label: "Cuentas por Cobrar", reason: "Salda factura del cliente" },
    { to: "/history", label: "Historial", reason: "Registra transacción" },
  ],
  "/cobros": [
    { to: "/finanzas/tesoreria", label: "Tesorería", reason: "Aumenta saldo de caja" },
    { to: "/finanzas/cxc", label: "Cuentas por Cobrar", reason: "Aplica al balance del cliente" },
    { to: "/clients", label: "Clientes", reason: "Estado de cuenta actualizado" },
  ],
};

export function ModuleConnections({ path }: { path: string }) {
  const connections = moduleConnections[path];
  if (!connections || connections.length === 0) return null;

  return (
    <div className="enterprise-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Link2 className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Módulos conectados</h3>
        <span className="text-xs text-muted-foreground">
          · los cambios aquí se reflejan automáticamente en:
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3 transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary">
                {c.label}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">{c.reason}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
