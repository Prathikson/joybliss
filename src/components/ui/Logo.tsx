import { cn } from "@/lib/utils";

export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Spectre Ink logo">
      <rect width="40" height="40" rx="10" fill="currentColor" />
      <path d="M26 13C26 13 23.8 11 20 11C15.8 11 12.5 13.8 12.5 17.2C12.5 20.9 15.5 22.3 19.5 23.3C23.5 24.3 26 25.6 26 29C26 32.3 23.2 35 19 35C14.6 35 12 32 12 32"
        stroke="var(--ink-bg)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={36} className="text-[var(--ink-fg)]" />
      <span style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "var(--ink-fg)",
      }}>
        Spectre Ink
      </span>
    </div>
  );
}
