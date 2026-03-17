"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "rounded-full cursor-pointer transition-opacity duration-200",
        variant === "primary" && "hover:opacity-80",
        className
      )}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        padding: "10px 22px",
        background: variant === "primary" ? "var(--ink-fg)" : "transparent",
        color: variant === "primary" ? "var(--ink-bg)" : "var(--ink-fg)",
        border: variant === "ghost" ? "1px solid var(--ink-border)" : "none",
      }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
