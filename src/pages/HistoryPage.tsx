import { EmployeeHistory } from "@/components/dashboard/EmployeeHistory";
import { TrendsAnalysis } from "@/components/dashboard/TrendsAnalysis";
import { RoleGuard } from "@/components/auth/RoleGuard";

const HistoryPage = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Historial y Análisis
        </h1>
      </div>

      {/* Análisis Inteligente - Solo admins */}
      <RoleGuard allowedRoles={['admin']}>
        <TrendsAnalysis />
      </RoleGuard>
      
      {/* Historial de empleados - Solo admins y managers */}
      <RoleGuard allowedRoles={['admin', 'manager']}>
        <EmployeeHistory />
      </RoleGuard>
    </div>
  );
};

export default HistoryPage;
