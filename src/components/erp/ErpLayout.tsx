import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ErpSidebar } from "./Sidebar";
import { ErpHeader } from "./Header";

export function ErpLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ErpSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <ErpHeader sidebarCollapsed={collapsed} />
      <main className={cn("pt-16 transition-all duration-300", collapsed ? "pl-16" : "pl-64")}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
