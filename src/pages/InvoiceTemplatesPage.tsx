
import { InvoiceTemplates } from "@/components/invoices/InvoiceTemplates";

const InvoiceTemplatesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden">
      {/* Patrones de fondo empresariales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
      
      <div className="relative z-10 animate-fade-in p-8">
        <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 shadow-2xl p-1">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl">
            <InvoiceTemplates />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplatesPage;
