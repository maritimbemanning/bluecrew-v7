import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "navy" | "slate";
  noPadding?: boolean;
}

export default function Section({
  children,
  className,
  variant = "default",
  noPadding = false,
  ...props
}: SectionProps) {
  const variants = {
    default: "bg-white",
    navy: "bg-navy-900 text-cream-50",
    slate: "bg-slate-50",
  };

  return (
    <section
      className={cn(
        variants[variant],
        !noPadding && "py-16 md:py-24 lg:py-32",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}


