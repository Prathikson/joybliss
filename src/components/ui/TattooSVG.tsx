"use client";
import { cn } from "@/lib/utils";

interface TattooSVGProps {
  variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
}

export function TattooSVG({ variant, className }: TattooSVGProps) {
  const svgs: Record<number, React.ReactNode> = {
    1: (
      <svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#e8e6e0" }}>
        <circle cx="60" cy="55" r="28" fill="none" stroke="#b0aea8" strokeWidth="1.5" />
        <path d="M45 55 Q60 35 75 55 Q60 75 45 55Z" fill="#c8c6c0" stroke="#b0aea8" strokeWidth="1" />
        <path d="M52 80 Q60 95 68 80" fill="none" stroke="#b0aea8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="120" r="8" fill="none" stroke="#c8c6c0" strokeWidth="1" />
        <line x1="60" y1="20" x2="60" y2="140" stroke="#ccc" strokeWidth="0.4" strokeDasharray="3,6" />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#1a1a18" }}>
        <path d="M50 20 L55 35 L70 35 L58 45 L62 60 L50 50 L38 60 L42 45 L30 35 L45 35Z" fill="none" stroke="#c8c6c0" strokeWidth="1.5" />
        <circle cx="50" cy="90" r="15" fill="none" stroke="#666" strokeWidth="1" />
        <path d="M40 85 Q50 75 60 85 Q50 95 40 85Z" fill="#444" stroke="#666" strokeWidth="0.5" />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#f0ede5" }}>
        <path d="M55 25 C35 25 20 45 20 65 C20 90 40 110 55 115 C70 110 90 90 90 65 C90 45 75 25 55 25Z" fill="none" stroke="#aaa9a4" strokeWidth="1.5" />
        <path d="M42 55 Q55 45 68 55 Q55 70 42 55Z" fill="#d4d2cc" stroke="#aaa9a4" strokeWidth="1" />
        <circle cx="55" cy="80" r="4" fill="#bbb" />
        <path d="M45 92 Q55 88 65 92" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 115 140" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#0a0a09" }}>
        <path d="M57 15 L60 30 L75 25 L65 38 L80 45 L65 47 L68 62 L57 52 L46 62 L49 47 L34 45 L49 38 L39 25 L54 30Z" fill="none" stroke="#d4d2cc" strokeWidth="1.2" />
        <path d="M35 80 Q57 70 79 80 Q79 100 57 108 Q35 100 35 80Z" fill="none" stroke="#555" strokeWidth="1.5" />
        <circle cx="57" cy="90" r="6" fill="none" stroke="#888" strokeWidth="1" />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 105 125" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#e4e2dc" }}>
        <path d="M52 20 Q38 35 38 55 Q38 75 52 90 Q66 75 66 55 Q66 35 52 20Z" fill="none" stroke="#aaaaa0" strokeWidth="2" />
        <line x1="52" y1="20" x2="52" y2="90" stroke="#c8c6c0" strokeWidth="1" strokeDasharray="4,4" />
        <circle cx="52" cy="55" r="8" fill="#d8d6d0" stroke="#aaaaa0" strokeWidth="1" />
        <path d="M32 100 Q52 108 72 100" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    6: (
      <svg viewBox="0 0 110 135" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#141412" }}>
        <path d="M55 18 C55 18 70 30 70 50 C70 70 55 75 55 75 C55 75 40 70 40 50 C40 30 55 18 55 18Z" fill="none" stroke="#888" strokeWidth="1.5" />
        <circle cx="55" cy="45" r="12" fill="none" stroke="#666" strokeWidth="1" />
        <path d="M49 41 L55 37 L61 41 L61 49 L55 53 L49 49Z" fill="none" stroke="#777" strokeWidth="1" />
        <path d="M30 95 Q55 85 80 95 Q80 112 55 118 Q30 112 30 95Z" fill="none" stroke="#444" strokeWidth="1.5" />
      </svg>
    ),
    7: (
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#f2f0ea" }}>
        <path d="M50 22 L35 48 L20 48 L32 62 L28 88 L50 75 L72 88 L68 62 L80 48 L65 48Z" fill="none" stroke="#aaa" strokeWidth="1.5" />
        <circle cx="50" cy="55" r="6" fill="#ddd" stroke="#aaa" />
        <path d="M38 100 Q50 95 62 100" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    8: (
      <svg viewBox="0 0 108 128" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)} style={{ background: "#080808" }}>
        <path d="M54 20 C40 28 28 42 28 58 C28 74 40 82 54 90 C68 82 80 74 80 58 C80 42 68 28 54 20Z" fill="none" stroke="#c8c6c0" strokeWidth="1.5" />
        <path d="M44 50 Q54 40 64 50 Q54 64 44 50Z" fill="#333" stroke="#888" strokeWidth="1" />
        <path d="M44 66 Q54 60 64 66 Q54 78 44 66Z" fill="#222" stroke="#666" strokeWidth="1" />
        <circle cx="54" cy="105" r="5" fill="none" stroke="#444" strokeWidth="1" />
      </svg>
    ),
  };

  return <>{svgs[variant]}</>;
}

export function ShowcaseSVGDark() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block" style={{ background: "#1a1a18" }}>
      <circle cx="300" cy="280" r="160" fill="none" stroke="#c8c6c0" strokeWidth="0.8" opacity="0.6" />
      <circle cx="300" cy="280" r="140" fill="none" stroke="#c8c6c0" strokeWidth="0.5" opacity="0.4" />
      <path d="M300 140 L310 170 L340 170 L316 188 L326 218 L300 200 L274 218 L284 188 L260 170 L290 170Z" fill="none" stroke="#d4d2cc" strokeWidth="1.2" />
      <path d="M200 280 Q300 200 400 280 Q300 360 200 280Z" fill="none" stroke="#888" strokeWidth="0.8" />
      <path d="M250 300 Q300 270 350 300 Q300 340 250 300Z" fill="#333" stroke="#666" strokeWidth="0.6" />
      <circle cx="300" cy="320" r="20" fill="none" stroke="#777" strokeWidth="0.8" />
      <path d="M180 380 Q300 420 420 380" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" />
      <line x1="300" y1="120" x2="300" y2="440" stroke="#333" strokeWidth="0.4" strokeDasharray="3,6" />
      <line x1="140" y1="280" x2="460" y2="280" stroke="#333" strokeWidth="0.4" strokeDasharray="3,6" />
      <text x="300" y="500" textAnchor="middle" fill="#444" fontFamily="monospace" fontSize="11" letterSpacing="4">SPECTRE INK</text>
    </svg>
  );
}

export function ShowcaseSVGLight() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block" style={{ background: "#f2f0ea" }}>
      <path d="M300 80 L340 180 L450 180 L360 240 L395 340 L300 280 L205 340 L240 240 L150 180 L260 180Z" fill="#1a1a18" stroke="#c8c6c0" strokeWidth="1" />
      <circle cx="300" cy="220" r="30" fill="none" stroke="#888" strokeWidth="1.5" />
      <path d="M180 380 Q300 340 420 380 Q420 460 300 480 Q180 460 180 380Z" fill="#1a1a18" stroke="#555" strokeWidth="1.5" />
      <path d="M200 410 Q300 395 400 410 Q300 445 200 410Z" fill="#333" stroke="#666" strokeWidth="0.8" />
      <text x="300" y="530" textAnchor="middle" fill="#aaa" fontFamily="monospace" fontSize="10" letterSpacing="6">BLACKWORK</text>
    </svg>
  );
}
