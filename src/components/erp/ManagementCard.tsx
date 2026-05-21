import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getIcon } from "./icons";
import type { ManagementSection } from "./erpData";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const colorMap: Record<string, { text: string; bg: string; border: string; hover: string }> = {
  commercial: { text: "text-primary", bg: "bg-primary/10", border: "border-primary/20", hover: "hover:border-primary/40" },
  financial: { text: "text-sky-600", bg: "bg-sky-500/10", border: "border-sky-500/20", hover: "hover:border-sky-500/40" },
  human: { text: "text-cyan-600", bg: "bg-cyan-500/10", border: "border-cyan-500/20", hover: "hover:border-cyan-500/40" },
  tools: { text: "text-indigo-600", bg: "bg-indigo-500/10", border: "border-indigo-500/20", hover: "hover:border-indigo-500/40" },
};

interface Props { section: ManagementSection }

export function ManagementCard({ section }: Props) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(section.iconName);
  const c = colorMap[section.color];
  const visible = expanded ? section.modules : section.modules.slice(0, 4);

  return (
    <div className={cn("group rounded-xl border bg-card p-5 transition-all duration-300", c.border, c.hover, "hover:shadow-lg")}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-lg p-2.5", c.bg)}>
            <Icon className={cn("h-5 w-5", c.text)} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{section.name}</h3>
            <p className="text-xs text-muted-foreground">{section.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">{section.modules.length}</Badge>
      </div>
      <div className="space-y-2">
        {visible.map((m) => {
          const MIcon = getIcon(m.iconName);
          return (
            <Link key={m.id} to={m.href} className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-3 transition-all hover:border-primary/30 hover:bg-secondary/50">
              <div className="flex items-center gap-3">
                <MIcon className={cn("h-4 w-4", c.text)} />
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.badge && <Badge variant="outline" className={cn("text-[10px]", c.text)}>{m.badge}</Badge>}
                {m.stats && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{m.stats.label}</p>
                    <p className={cn("text-sm font-semibold", c.text)}>{m.stats.value}</p>
                  </div>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
      {section.modules.length > 4 && (
        <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Ver menos" : `Ver ${section.modules.length - 4} más`}
        </Button>
      )}
    </div>
  );
}
