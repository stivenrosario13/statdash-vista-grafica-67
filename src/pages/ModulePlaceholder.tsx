import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, RefreshCw, X, AlertCircle, Database } from "lucide-react";
import { managementSections } from "@/components/erp/erpData";
import { getIcon } from "@/components/erp/icons";
import { moduleSchemas, type FieldDef } from "@/components/erp/moduleSchemas";
import { ModuleConnections } from "@/components/erp/ModuleConnections";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";


const fmt = {
  money: (v: any) =>
    "RD$ " +
    Number(v || 0).toLocaleString("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  date: (v: any) => {
    if (!v) return "—";
    const d = new Date(v);
    return isNaN(d.getTime()) ? String(v) : d.toLocaleDateString("es-DO");
  },
};

const Badge = ({ value }: { value: any }) => (
  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
    {String(value ?? "—")}
  </span>
);

const ModulePlaceholder = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();

  const allModules = managementSections.flatMap((s) =>
    s.modules.map((m) => ({ ...m, section: s.name }))
  );
  const mod = allModules.find((m) => m.href === pathname);
  const Icon = getIcon(mod?.iconName || "Package");
  const schema = moduleSchemas[pathname];

  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const resource = schema?.resource;

  const load = async () => {
    if (!resource) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.list(resource, { limit: 100, q: query });
      setItems(res.items || []);
      setTotal(res.total || 0);
    } catch (e: any) {
      setError(e.message || "Error cargando datos");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setQuery("");
    if (resource) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const openCreate = () => {
    setEditing(null);
    setForm({});
    setFormOpen(true);
  };
  const openEdit = (row: any) => {
    setEditing(row);
    setForm({ ...row });
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setForm({});
  };

  const save = async () => {
    if (!resource) return;
    try {
      if (editing) {
        await api.update(resource, editing.id, form);
        toast({ title: "Actualizado", description: `${schema.singular} actualizado correctamente.` });
      } else {
        await api.create(resource, form);
        toast({ title: "Creado", description: `${schema.singular} creado correctamente.` });
      }
      closeForm();
      load();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "No se pudo guardar",
        variant: "destructive",
      });
    }
  };

  const remove = async (row: any) => {
    if (!resource) return;
    if (!confirm(`¿Eliminar este registro?`)) return;
    try {
      await api.remove(resource, row.id);
      toast({ title: "Eliminado", description: "Registro eliminado correctamente." });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((row) =>
      Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [items, query]);

  if (!schema) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Configuración del módulo no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {mod?.section}
            </p>
            <h1 className="text-2xl font-bold text-foreground">{schema.title}</h1>
            <p className="text-sm text-muted-foreground">{mod?.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
          {schema.fields.length > 0 && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Nuevo {schema.singular}
            </button>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total registros</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Visibles</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{filtered.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Backend</p>
          <p className="mt-1 text-sm font-mono text-foreground truncate">/api/{resource}/</p>
        </div>
      </div>

      {/* Conexiones entre módulos */}
      <ModuleConnections path={pathname} />

      {/* Search */}
      <div className="flex items-center gap-2">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Error / connection helper */}
      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
            <div className="flex-1 text-sm text-amber-900">
              <p className="font-semibold">No se pudo conectar al backend</p>
              <p className="mt-1">{error}</p>
              <p className="mt-2 text-xs text-amber-800">
                Asegúrate de que XAMPP esté ejecutándose y el backend en{" "}
                <code className="rounded bg-amber-100 px-1.5 py-0.5">{api.url}</code>
                . Importa <code>backend/sql/schema.sql</code> en phpMyAdmin.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-50/60 text-left text-xs uppercase tracking-wider text-blue-900">
              <tr>
                {schema.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && (
                <tr>
                  <td colSpan={schema.columns.length + 1} className="px-4 py-8 text-center text-muted-foreground">
                    Cargando...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={schema.columns.length + 1} className="px-4 py-12 text-center">
                    <Database className="mx-auto h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">No hay registros aún</p>
                    {schema.fields.length > 0 && (
                      <button
                        onClick={openCreate}
                        className="mt-3 text-sm font-medium text-primary hover:underline"
                      >
                        Crear el primero →
                      </button>
                    )}
                  </td>
                </tr>
              )}
              {!loading && filtered.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30">
                  {schema.columns.map((c) => {
                    const v = row[c.key];
                    return (
                      <td key={c.key} className="px-4 py-3 text-foreground">
                        {c.format === "money" ? fmt.money(v)
                          : c.format === "date" ? fmt.date(v)
                          : c.format === "badge" ? <Badge value={v} />
                          : String(v ?? "—")}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-md p-1.5 text-blue-600 hover:bg-blue-100"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(row)}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-100"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={closeForm}>
          <div
            className="w-full max-w-2xl rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-bold text-foreground">
                {editing ? `Editar ${schema.singular}` : `Nuevo ${schema.singular}`}
              </h2>
              <button onClick={closeForm} className="rounded-md p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {schema.fields.map((f: FieldDef) => (
                  <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {f.label}
                      {f.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    ) : f.type === "select" ? (
                      <select
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      >
                        <option value="">— Seleccionar —</option>
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={f.type || "text"}
                        value={form[f.name] ?? ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [f.name]:
                              f.type === "number"
                                ? e.target.value === "" ? "" : Number(e.target.value)
                                : e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-6 py-4">
              <button
                onClick={closeForm}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {editing ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulePlaceholder;
