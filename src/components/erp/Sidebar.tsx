import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { managementSections } from "./erpData";
import { getIcon } from "./icons";
import {
  ChevronDown, ChevronRight, LayoutDashboard, Settings, HelpCircle,
  LogOut, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const colorMap: Record<string, string> = {
  commercial: "text-primary",
  financial: "text-sky-600",
  human: "text-cyan-600",
  tools: "text-indigo-600",
};

const bgColorMap: Record<string, string> = {
  commercial: "bg-primary/10 border-primary/20",
  financial: "bg-sky-500/10 border-sky-500/20",
  human: "bg-cyan-500/10 border-cyan-500/20",
  tools: "bg-indigo-500/10 border-indigo-500/20",
};

export function ErpSidebar({ collapsed, onToggle }: SidebarProps) {
  const { pathname } = useLocation();
  // Auto-expand sections that contain the active route
  const initialExpanded = useMemo(() => {
    const active = managementSections
      .filter((s) => s.modules.some((m) => m.href === pathname))
      .map((s) => s.id);
    return active.length ? active : ["comercial"];
  }, []);
  const [expandedSections, setExpandedSections] = useState<string[]>(initialExpanded);

  const toggleSection = (id: string) =>
    setExpandedSections((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!collapsed && (
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">E</span>
                </div>
                <span className="text-lg font-semibold text-foreground">ERP Pro</span>
              </Link>
            )}
            <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 shrink-0">
              {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          <ScrollArea className="flex-1 px-2 py-4">
            <div className="mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === "/"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Dashboard</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">Dashboard</TooltipContent>}
              </Tooltip>
            </div>

            <div className="space-y-2">
              {managementSections.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                const SectionIcon = getIcon(section.iconName);
                return (
                  <div key={section.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => !collapsed && toggleSection(section.id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <SectionIcon className={cn("h-5 w-5 shrink-0", colorMap[section.color])} />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left font-medium">{section.name}</span>
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </>
                          )}
                        </button>
                      </TooltipTrigger>
                      {collapsed && <TooltipContent side="right">{section.name}</TooltipContent>}
                    </Tooltip>

                    {!collapsed && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                        {section.modules.map((module) => {
                          const ModuleIcon = getIcon(module.iconName);
                          const isActive = pathname === module.href;
                          return (
                            <Link
                              key={module.id}
                              to={module.href}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                                isActive
                                  ? cn("border", bgColorMap[section.color], colorMap[section.color])
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )}
                            >
                              <ModuleIcon className="h-4 w-4" />
                              <span>{module.name}</span>
                              {module.badge && (
                                <span className={cn("ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium", bgColorMap[section.color], colorMap[section.color])}>
                                  {module.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Settings className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Configuración</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Configuración</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <HelpCircle className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Ayuda</span>}
                </button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Ayuda</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Cerrar Sesión</span>}
                </button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Cerrar Sesión</TooltipContent>}
            </Tooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
