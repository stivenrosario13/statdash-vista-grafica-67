import { cn } from "@/lib/utils";
import { quickStats } from "./erpData";
import { getIcon } from "./icons";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {quickStats.map((stat, i) => {
        const Icon = getIcon(stat.iconName);
        const isUp = stat.trend === "up";
        return (
          <div key={i} className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <div className={cn("flex items-center gap-1 text-xs font-medium", isUp ? "text-emerald-600" : "text-rose-600")}>
                  {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>{stat.change}</span>
                  <span className="text-muted-foreground">vs. mes anterior</span>
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
