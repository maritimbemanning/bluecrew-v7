import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "@/components/icons";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gold-500 text-navy-900 italic hover:bg-gold-400 hover:shadow-xl shadow-lg shadow-gold-500/20 hover:-translate-y-0.5 focus:ring-gold-500 font-medium tracking-wide",
      secondary:
        "bg-gold-500 text-navy-900 italic hover:bg-gold-400 focus:ring-gold-500 shadow-md hover:shadow-lg",
      outline:
        "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-cream-50 focus:ring-navy-500",
      ghost: "text-navy-900 hover:bg-slate-100 focus:ring-navy-500",
      danger:
        "bg-error text-white hover:bg-red-700 focus:ring-error shadow-md hover:shadow-lg",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;


