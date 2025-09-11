
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: "gradient" | "mesh" | "dots" | "waves";
  className?: string;
}

export function AnimatedBackground({ 
  children, 
  variant = "gradient", 
  className 
}: AnimatedBackgroundProps) {
  const backgrounds = {
    gradient: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    mesh: "bg-gradient-to-br from-blue-50 to-indigo-100 relative",
    dots: "bg-white relative",
    waves: "bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden"
  };

  return (
    <div className={cn("min-h-screen relative", backgrounds[variant], className)}>
      {variant === "mesh" && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 bg-[size:20px_20px] bg-[image:radial-gradient(circle,_rgba(59,130,246,0.15)_1px,_transparent_1px)]" />
      )}
      
      {variant === "dots" && (
        <div className="absolute inset-0 bg-[size:20px_20px] bg-[image:radial-gradient(circle,_rgba(59,130,246,0.1)_1px,_transparent_1px)]" />
      )}
      
      {variant === "waves" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
