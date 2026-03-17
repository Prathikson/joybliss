"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

// Mini tattoo placement game
function TattooGame() {
  const [tattoos, setTattoos] = useState<{ x: number; y: number; id: number; shape: number }[]>([]);
  const [nextId, setNextId] = useState(1);
  const bodyRef = useRef<SVGSVGElement>(null);

  const shapes = ["★", "✦", "◆", "●", "⬡"];

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = bodyRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setTattoos(t => [...t, { x, y, id: nextId, shape: nextId % shapes.length }]);
    setNextId(n => n + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-fg3)", textAlign: "center" }}>
        Click anywhere on the body to place a tattoo · Click a tattoo to remove it
      </p>
      <div className="relative" style={{ maxWidth: "320px", width: "100%" }}>
        <svg
          ref={bodyRef}
          viewBox="0 0 200 420"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", cursor: "crosshair", userSelect: "none" }}
          onClick={handleClick}
        >
          {/* Body silhouette */}
          <g fill="var(--ink-bg2)" stroke="var(--ink-border)" strokeWidth="1">
            {/* Head */}
            <ellipse cx="100" cy="45" rx="30" ry="36" />
            {/* Neck */}
            <rect x="90" y="76" width="20" height="18" rx="4" />
            {/* Torso */}
            <path d="M62 92 Q100 86 138 92 L142 220 Q100 228 58 220Z" />
            {/* Left arm */}
            <path d="M62 96 Q42 110 38 160 Q36 175 40 185 Q50 175 54 160 L62 96Z" />
            {/* Right arm */}
            <path d="M138 96 Q158 110 162 160 Q164 175 160 185 Q150 175 146 160 L138 96Z" />
            {/* Left leg */}
            <path d="M72 218 Q68 270 66 320 Q64 355 68 390 Q76 392 84 390 Q86 355 86 320 L90 218Z" />
            {/* Right leg */}
            <path d="M110 218 L114 320 Q114 355 116 390 Q124 392 132 390 Q136 355 134 320 Q132 270 128 218Z" />
          </g>
          {/* Placed tattoos */}
          {tattoos.map(t => (
            <text
              key={t.id}
              x={`${t.x}%`} y={`${t.y}%`}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="16" style={{ cursor: "pointer", userSelect: "none" }}
              fill="var(--ink-fg)"
              onClick={(e) => {
                e.stopPropagation();
                setTattoos(prev => prev.filter(p => p.id !== t.id));
              }}
            >
              <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze"/>
              {shapes[t.shape]}
            </text>
          ))}
        </svg>
      </div>
      {tattoos.length > 0 && (
        <button
          onClick={() => setTattoos([])}
          style={{
            fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)",
            background: "none", border: "1px solid var(--ink-border)",
            borderRadius: "100px", padding: "6px 16px", cursor: "pointer",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Clear all ({tattoos.length})
        </button>
      )}
    </div>
  );
}

const stats = [
  { num: "800+", label: "Pieces completed" },
  { num: "6 yrs", label: "In the industry" },
  { num: "98%",   label: "Client return rate" },
  { num: "12",    label: "Awards & features" },
];

const workSamples = [
  "/images/realism2.png",
  "/images/black2.png",
  "/images/tattoo1.jpg",
  "/images/letter.png",
  "/images/black.png",
  "/images/fine.png",
];

export default function ArtistPage() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const gameRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });
  const gameInView  = useInView(gameRef,  { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <PageShell>
      {/* Hero */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cover.png"
            alt="Sojin Kim — Tattoo Artist"
            className="w-full h-full object-cover block"
            style={{ minHeight: "80vh" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, var(--ink-bg) 100%)" }} />
        </motion.div>
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-8 pb-16" style={{ minHeight: "80vh" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <span className="section-label">Our Artist</span>
            <h1 style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(48px, 8vw, 120px)",
              fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1,
              color: "var(--ink-fg)", marginTop: "12px",
            }}>
              Joy Kim.
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-[1px_1fr_1fr] gap-0" style={{ borderTop: "1px solid var(--ink-border)" }}>
        <div className="hidden lg:block" style={{ background: "var(--ink-border)" }} />
        <div className="lg:px-16 pb-12 lg:pb-0">
          <span className="section-label">About</span>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(20px, 2.5vw, 30px)",
            fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.35,
            color: "var(--ink-fg)", marginTop: "24px",
          }}>
            Precision meets intention. Every line has a reason.
          </p>
        </div>
        <div className="lg:px-16">
          {["Joy Kim is a self-taught tattoo artist based in Edmonton, Alberta. With over six years behind the needle, she has developed a distinct voice in fine line and geometric work — a style that blends architectural precision with organic feeling.",
            "Born in Vancouver, Joy moved to Edmonton in 2018 and opened Spectre Ink in 2020. Her work has been featured in INK Magazine, Hypebeast, and Vogue Living Canada.",
            "She works exclusively by appointment to ensure every client receives her full creative attention. Consultations are free and she welcomes all ideas — from first tattoos to complex full sleeves."
          ].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: "var(--ink-fg2)", marginBottom: "16px" }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="px-6 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ borderTop: "1px solid var(--ink-border)", background: "var(--ink-border)" }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09, duration: 0.55 }}
            className="flex flex-col gap-2 p-8"
            style={{ background: "var(--ink-bg)" }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", color: "var(--ink-fg)" }}>{s.num}</span>
            <span style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", letterSpacing: "0.06em" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Work samples */}
      <div className="px-6 md:px-8 py-16" style={{ borderTop: "1px solid var(--ink-border)" }}>
        <span className="section-label">Selected Work</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {workSamples.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-[16px] overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Work ${i+1}`} loading="lazy" className="w-full h-full object-cover block" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini tattoo game */}
      <div ref={gameRef} className="px-6 md:px-8 py-20" style={{ borderTop: "1px solid var(--ink-border)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gameInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <span className="section-label">Interactive</span>
          <h2 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.08,
            color: "var(--ink-fg)", marginTop: "16px",
          }}>
            Design your placement.
          </h2>
          <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg3)", marginTop: "12px", lineHeight: 1.7 }}>
            Experiment with tattoo placements before your consultation. Save a screenshot and bring it in.
          </p>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
          <TattooGame />
          <div className="max-w-xs">
            <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "18px", fontWeight: 400, color: "var(--ink-fg)", letterSpacing: "-0.01em", marginBottom: "16px" }}>Placement tips</h3>
            {[
              ["Ribs & Sternum", "High pain but incredible impact. Best for flowing botanical or script designs."],
              ["Inner Arm", "Flat canvas, heals beautifully. Perfect for fine line and geometric."],
              ["Upper Back", "Large canvas for statement pieces. Minimal sun exposure keeps it sharp."],
              ["Ankle & Foot", "Delicate placement. Works best with minimal, small-scale designs."],
            ].map(([title, desc]) => (
              <div key={title} className="mb-5 pb-5" style={{ borderBottom: "1px solid var(--ink-border)" }}>
                <p style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-fg)", marginBottom: "4px" }}>{title}</p>
                <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-8 pb-16">
        <div className="rounded-[20px] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" style={{ background: "var(--ink-bg2)" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink-fg)" }}>
              Ready to work with Joy?
            </h3>
            <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg3)", marginTop: "8px" }}>
              Book a free consultation — no commitment required.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-full transition-opacity hover:opacity-80" style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400,
            background: "var(--ink-fg)", color: "var(--ink-bg)", padding: "12px 28px",
          }}>
            Book a Consultation
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
