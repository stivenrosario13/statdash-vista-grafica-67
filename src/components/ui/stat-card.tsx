
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "gradient" | "neon";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
  trend,
  className,
  variant = "default"
}: StatCardProps) {
  const variants = {
    default: "bg-gradient-to-br from-white to-blue-50 border-blue-200",
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white border-none",
    neon: "bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 shadow-purple-500/25"
  };

  return (
    <div className={cn(
      "p-6 rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105",
      variants[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            variant === "gradient" ? "text-blue-100" : "text-gray-600"
          )}>
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className={cn(
              "text-3xl font-bold",
              variant === "gradient" ? "text-white" : "text-gray-900"
            )}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <span className={cn(
                "text-sm font-semibold px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "text-green-700 bg-green-100" 
                  : "text-red-700 bg-red-100"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className={cn(
              "text-sm",
              variant === "gradient" ? "text-blue-200" : "text-gray-500"
            )}>
              {description}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-xl",
            variant === "gradient" 
              ? "bg-white/20 backdrop-blur-sm" 
              : "bg-blue-100"
          )}>
            <Icon className={cn(
              "h-8 w-8",
              variant === "gradient" ? "text-white" : iconColor
            )} />
          </div>
        )}
      </div>
    </div>
  );
}
