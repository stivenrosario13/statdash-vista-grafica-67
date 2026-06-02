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
          <div
            key={i}
            className="enterprise-card enterprise-card-hover relative overflow-hidden p-5"
          >
            {/* Acento lateral azul */}
            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {stat.value}
                </p>
                <div
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
                    isUp
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  )}
                >
                  {isUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">vs. mes anterior</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
