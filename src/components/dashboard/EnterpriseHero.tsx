
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Shield, Zap, BarChart3, Users } from 'lucide-react';

export function EnterpriseHero() {
  return (
    <div className="relative">
      {/* Hero principal oscuro */}
      <Card className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border-2 border-blue-400/50 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/15"></div>
        <div className="relative p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Steven Rosario
                  </h1>
                  <p className="text-2xl font-semibold text-blue-300">Estadísticas Empresariales</p>
                </div>
              </div>

              <p className="text-xl text-blue-200 max-w-3xl leading-relaxed">
                Plataforma de inteligencia empresarial con análisis predictivo en tiempo real, 
                gestión avanzada de cobros y métricas de rendimiento corporativo de última generación.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2 text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Sistema Activo
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2 text-sm font-semibold">
                  <Shield className="w-4 h-4 mr-2" />
                  Seguro & Confiable
                </Badge>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2 text-sm font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  Tiempo Real
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 border-0">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Ver Analytics
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-blue-400/50 hover:border-blue-400 text-blue-200 hover:text-white hover:bg-blue-600/20 px-8 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Gestionar Equipos
                </Button>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                  <div className="text-2xl font-bold text-green-300">98.5%</div>
                  <div className="text-sm text-green-400">Eficiencia</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                  <Activity className="w-8 h-8 text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-blue-300">24/7</div>
                  <div className="text-sm text-blue-400">Monitoreo</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-400/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-purple-300">100%</div>
                  <div className="text-sm text-purple-400">Seguro</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-400/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-orange-400 mb-2" />
                  <div className="text-2xl font-bold text-orange-300">&lt;1s</div>
                  <div className="text-sm text-orange-400">Respuesta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
