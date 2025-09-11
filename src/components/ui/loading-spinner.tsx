
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "bars";
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default", 
  className 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-blue-600 rounded-full animate-pulse",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4"
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.6s"
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-blue-600 animate-pulse",
              size === "sm" ? "w-1 h-4" : size === "md" ? "w-1 h-6" : size === "lg" ? "w-2 h-8" : "w-2 h-12"
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.8s"
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizes[size], className)}>
        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75" />
        <div className="relative bg-blue-700 rounded-full w-full h-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizes[size],
        className
      )}
    />
  );
}
