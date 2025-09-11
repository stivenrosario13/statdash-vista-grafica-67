
import { EmployeeStats } from "@/components/dashboard/EmployeeStats";
import { TeamStats } from "@/components/dashboard/TeamStats";
import { TopCollectorsRanking } from "@/components/dashboard/TopCollectorsRanking";
import { TrendsAnalysis } from "@/components/dashboard/TrendsAnalysis";

const EmployeesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
      {/* Patrones de fondo empresariales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
      
      <div className="relative z-10 animate-fade-in p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Gestión de Empleados
            </h1>
            <p className="text-blue-300 mt-2">Panel de control completo de equipos y gestores comerciales</p>
          </div>
        </div>
        
        {/* Ranking Top Gestores - Horizontal */}
        <div className="w-full mb-8">
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <TopCollectorsRanking />
            </div>
          </div>
        </div>
        
        {/* Cobros por Equipo - Horizontal */}
        <div className="w-full mb-8">
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <TeamStats />
            </div>
          </div>
        </div>
        
        {/* Análisis por Empleado Individual y Análisis Inteligente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <EmployeeStats />
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
              <TrendsAnalysis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
