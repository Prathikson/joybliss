"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

const services = [
  {
    id: "fine-line", name: "Fine Line", icon: "◇",
    tagline: "Precision single-needle artistry",
    description: "The most delicate form of tattooing. Using a single needle, we create intricate, lightweight designs that look like drawings on your skin.",
    pricing: [
      { size: "Micro (under 2cm)", price: "$150", time: "30–60 min" },
      { size: "Small (2–5cm)",     price: "$200–300", time: "1–1.5 hrs" },
      { size: "Medium (5–10cm)",   price: "$350–550", time: "2–3 hrs" },
      { size: "Large (10cm+)",     price: "From $600", time: "3–5 hrs" },
    ],
    img: "/images/fine.png",
  },
  {
    id: "blackwork", name: "Blackwork", icon: "◼",
    tagline: "Bold, timeless, iconic",
    description: "Heavy black ink work — from bold tribal patterns to intricate ornamental designs. Built to last decades without fading.",
    pricing: [
      { size: "Small piece",   price: "$250–400", time: "1.5–2 hrs" },
      { size: "Medium piece",  price: "$450–700", time: "3–4 hrs" },
      { size: "Large piece",   price: "$750–1200", time: "5–7 hrs" },
      { size: "Full sleeve",   price: "From $3500", time: "Multiple sessions" },
    ],
    img: "/images/black.png",
  },
  {
    id: "geometric", name: "Geometric", icon: "△",
    tagline: "Sacred geometry meets modern ink",
    description: "Precise mathematical patterns, mandalas, and sacred geometry. Each line is perfectly measured for a clean, architectural result.",
    pricing: [
      { size: "Small mandala",   price: "$300–450", time: "2–3 hrs" },
      { size: "Medium mandala",  price: "$500–800", time: "4–5 hrs" },
      { size: "Full back piece", price: "From $2500", time: "Multiple sessions" },
      { size: "Custom geometry", price: "Quote only", time: "Varies" },
    ],
    img: "/images/geo.png",
  },
  {
    id: "cover-up", name: "Cover-Up", icon: "↺",
    tagline: "Transform what was",
    description: "We specialise in turning unwanted tattoos into new artwork. Every cover-up starts with a free assessment to understand what's possible.",
    pricing: [
      { size: "Small cover-up",   price: "From $300",  time: "2–3 hrs" },
      { size: "Medium cover-up",  price: "From $500",  time: "3–5 hrs" },
      { size: "Large cover-up",   price: "From $900",  time: "Multiple sessions" },
      { size: "Rework/Touch-up",  price: "From $150",  time: "1–2 hrs" },
    ],
    img: "/images/cover.png",
  },
  {
    id: "realism", name: "Realism", icon: "◉",
    tagline: "Photography on skin",
    description: "Hyper-realistic portraits, animals, and objects. The most technically demanding style — and one of our most requested.",
    pricing: [
      { size: "Portrait (small)",  price: "$600–900", time: "4–6 hrs" },
      { size: "Portrait (medium)", price: "$900–1500", time: "6–8 hrs" },
      { size: "Full composition",  price: "From $1800", time: "Multiple sessions" },
      { size: "Animal portrait",   price: "From $500",  time: "3–5 hrs" },
    ],
    img: "/images/realism.png",
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find(s => s.id === active)!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <PageShell>
      <div className="px-6 md:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label">Services & Pricing</span>
          <h1 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(40px, 6vw, 88px)",
            fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.02,
            color: "var(--ink-fg)", marginTop: "16px",
          }}>
            What we offer.
          </h1>
        </div>

        {/* Service selector tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400,
                padding: "8px 18px", borderRadius: "100px", border: "1px solid",
                borderColor: active === s.id ? "var(--ink-fg)" : "var(--ink-border)",
                background: active === s.id ? "var(--ink-fg)" : "transparent",
                color: active === s.id ? "var(--ink-bg)" : "var(--ink-fg3)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[24px] overflow-hidden mb-16"
            style={{ background: "var(--ink-bg2)", minHeight: "420px" }}
          >
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span style={{ fontSize: "32px" }}>{current.icon}</span>
                <h2 style={{
                  fontFamily: "var(--font-dm-sans)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.05,
                  color: "var(--ink-fg)", margin: "12px 0 8px",
                }}>{current.name}</h2>
                <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg3)", fontStyle: "italic", marginBottom: "16px" }}>{current.tagline}</p>
                <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg2)", lineHeight: 1.78, maxWidth: "400px" }}>{current.description}</p>
              </div>
              <Link href="/contact" style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400,
                background: "var(--ink-fg)", color: "var(--ink-bg)",
                padding: "12px 24px", borderRadius: "100px", display: "inline-block",
                marginTop: "32px", width: "fit-content", transition: "opacity 0.2s",
              }} className="hover:opacity-80">
                Book this style →
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.img} alt={current.name} className="w-full h-full object-cover block" style={{ minHeight: "320px" }} />
          </motion.div>
        </AnimatePresence>

        {/* Pricing table */}
        <div ref={ref} className="mb-16">
          <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "20px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink-fg)", marginBottom: "24px" }}>
            Pricing — {current.name}
          </h3>
          <div style={{ border: "1px solid var(--ink-border)", borderRadius: "16px", overflow: "hidden" }}>
            {/* Header */}
            <div className="grid grid-cols-3 px-6 py-3" style={{ background: "var(--ink-bg2)", borderBottom: "1px solid var(--ink-border)" }}>
              {["Size / Scope", "Price", "Est. Time"].map(h => (
                <span key={h} style={{ fontSize: "11px", fontWeight: 400, color: "var(--ink-fg3)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans)" }}>{h}</span>
              ))}
            </div>
            {current.pricing.map((row, i) => (
              <motion.div
                key={row.size}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="grid grid-cols-3 px-6 py-4 transition-colors hover:bg-[var(--ink-bg2)]"
                style={{ borderBottom: i < current.pricing.length - 1 ? "1px solid var(--ink-border)" : "none" }}
              >
                <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)" }}>{row.size}</span>
                <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)" }}>{row.price}</span>
                <span style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-fg3)", fontFamily: "var(--font-dm-sans)" }}>{row.time}</span>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", marginTop: "12px" }}>
            * All prices include a complimentary touch-up session within 6 weeks. Prices are estimates — complex custom work is quoted per consultation.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-[20px] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" style={{ background: "var(--ink-bg2)" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink-fg)" }}>
              Not sure what you need?
            </h3>
            <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg3)", marginTop: "8px" }}>
              Free consultations — we&apos;ll help you figure it out.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-full hover:opacity-80 transition-opacity" style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400,
            background: "var(--ink-fg)", color: "var(--ink-bg)", padding: "12px 28px",
          }}>
            Get a Free Quote
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
