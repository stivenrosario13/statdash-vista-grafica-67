
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TimeframeType } from "@/data/employeesData";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
  timeframe: TimeframeType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  timeframe,
  trend, 
  className 
}: StatCardProps) {
  const timeframeLabel = timeframe === 'daily' ? 'hoy' : 
                        timeframe === 'weekly' ? 'esta semana' : 
                        'este mes';
                        
  return (
    <Card className={cn("border border-blue-200 rounded-md shadow-sm overflow-hidden bg-gradient-to-br from-blue-50 to-white", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight mt-1 text-blue-900">{value}</h3>
            
            <div className="text-xs text-blue-600 mt-1">
              {timeframeLabel}
            </div>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span 
                  className={cn(
                    "text-xs font-medium", 
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-blue-500">vs. período anterior</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-blue-600 mt-2">{description}</p>
            )}
          </div>
          
          {icon && (
            <div className="rounded-full p-2 bg-blue-100 border border-blue-200">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
