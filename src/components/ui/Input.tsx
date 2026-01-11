"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "@/components/icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, fullWidth = false, success, id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("relative group", fullWidth && "w-full")}>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            className={cn(
              "peer block w-full px-4 pt-6 pb-2 rounded-xl border-2 bg-white text-navy-900 font-medium",
              "outline-none transition-all duration-200",
              "placeholder:text-transparent",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : success
                ? "border-success focus:border-success focus:ring-4 focus:ring-success/10"
                : "border-slate-200 hover:border-slate-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10",
              "disabled:bg-slate-50 disabled:cursor-not-allowed",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
          
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 top-4 text-slate-500 transition-all duration-200 pointer-events-none origin-left",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
                "peer-focus:scale-75 peer-focus:-translate-y-3",
                "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-3",
                error && "text-red-500",
                success && "text-success"
              )}
            >
              {label} {props.required && <span className="text-red-500">*</span>}
            </label>
          )}

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            {success && !error && <Check className="w-5 h-5 text-success" />}
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;


