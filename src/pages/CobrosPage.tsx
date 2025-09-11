
import { CobrosTable } from "@/components/dashboard/CobrosTable";
import { CobroForm } from "@/components/dashboard/CobroForm";
import { ExcelImport } from "@/components/dashboard/ExcelImport";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";
import { FileText, Plus, Upload } from "lucide-react";

const CobrosPage = () => {
  return (
    <GlobalDataProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
        {/* Patrones de fondo empresariales */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
        
        <div className="relative z-10 flex flex-col gap-8 animate-fade-in p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Registro de Cobros
              </h1>
              <p className="text-blue-300 mt-2">Gestión profesional de cobros y facturación en tiempo real</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Formulario de registro de cobros - Solo para managers y admins */}
          <RoleGuard requiredPermission="canCreateCobros">
            <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl p-6">
                  <div className="flex items-center gap-3">
                    <Plus className="h-6 w-6" />
                    <div>
                      <h2 className="text-xl font-bold">Registrar Nuevo Cobro</h2>
                      <p className="text-blue-100 text-sm">Complete los datos del cobro realizado - Se actualizarán todas las secciones automáticamente</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <CobroForm />
                </div>
              </div>
            </div>
          </RoleGuard>

          {/* Importación de Excel - Solo admins y managers */}
          <RoleGuard allowedRoles={['admin', 'manager']}>
            <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-emerald-400/30 shadow-2xl p-1">
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-3xl p-6">
                  <div className="flex items-center gap-3">
                    <Upload className="h-6 w-6" />
                    <div>
                      <h2 className="text-xl font-bold">Importación Masiva</h2>
                      <p className="text-emerald-100 text-sm">Importe múltiples cobros desde Excel - Actualización automática del sistema</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <ExcelImport />
                </div>
              </div>
            </div>
          </RoleGuard>
          
          {/* Tabla de cobros con diseño mejorado */}
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <CobrosTable />
            </div>
          </div>
        </div>
      </div>
    </GlobalDataProvider>
  );
};

export default CobrosPage;
