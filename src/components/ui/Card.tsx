import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export default function Card({
  children,
  className,
  variant = "light",
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300",
        variant === "light"
          ? "bg-white border border-slate-200"
          : "bg-navy-800/50 border border-white/5 backdrop-blur-sm",
        hover && "hover:-translate-y-1",
        hover && variant === "light" && "hover:shadow-lg hover:border-gold-400/30",
        hover && variant === "dark" && "hover:shadow-lg hover:border-gold-400/30",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}


