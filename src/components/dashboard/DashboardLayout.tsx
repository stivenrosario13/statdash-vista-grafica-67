
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EnhancedSidebar } from "./EnhancedSidebar";
import { ThemeProvider as ShadcnThemeProvider } from "@/components/ui/theme-provider";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <ShadcnThemeProvider defaultTheme="dark" storageKey="steven-rosario-theme">
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
          <EnhancedSidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          
          <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
            <div className="min-h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </ShadcnThemeProvider>
    </ThemeProvider>
  );
}
