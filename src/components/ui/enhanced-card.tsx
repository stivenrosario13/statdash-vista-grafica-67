
import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "gradient" | "glass" | "neon"
    hover?: boolean
  }
>(({ className, variant = "default", hover = true, ...props }, ref) => {
  const variants = {
    default: "bg-card border shadow-lg",
    gradient: "bg-gradient-to-br from-white via-blue-50 to-indigo-100 border-blue-200 shadow-xl",
    glass: "bg-white/80 backdrop-blur-lg border-white/20 shadow-2xl",
    neon: "bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30 shadow-purple-500/25 shadow-2xl"
  }

  const hoverEffect = hover ? "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" : ""

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl text-card-foreground",
        variants[variant],
        hoverEffect,
        className
      )}
      {...props}
    />
  )
})
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: boolean
  }
>(({ className, gradient = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-8",
      gradient && "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl",
      className
    )}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl"
  }

  return (
    <h3
      ref={ref}
      className={cn(
        "font-bold leading-tight tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
        sizes[size],
        className
      )}
      {...props}
    />
  )
})
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-8 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { 
  EnhancedCard, 
  EnhancedCardHeader, 
  EnhancedCardFooter, 
  EnhancedCardTitle, 
  EnhancedCardDescription, 
  EnhancedCardContent 
}
