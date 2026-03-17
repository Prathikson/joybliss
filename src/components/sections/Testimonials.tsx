"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  { id: "1", quote: "I've been to a dozen studios across Canada. Nothing compares to the attention to detail and artistry here. My sleeve is a conversation piece everywhere I go.", name: "Jordan M.", role: "Full Sleeve · Edmonton", initials: "JM", stars: 5 },
  { id: "2", quote: "The fine line work is extraordinary. Six months later and it still looks freshly done. The artist's precision is something else entirely — worth every penny.", name: "Sofia R.", role: "Fine Line · Calgary", initials: "SR", stars: 5 },
  { id: "3", quote: "Covered an old tattoo I'd been hiding for ten years. They turned it into something I'm genuinely proud of. The transformation was unbelievable.", name: "Tyler K.", role: "Cover-Up · Vancouver", initials: "TK", stars: 5 },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="testimonials"
      className="px-6 md:px-8 py-24"
      style={{ borderTop: "1px solid var(--ink-border)" }}
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="mb-14"
      >
        <span className="section-label">Testimonials</span>
        <h2 style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "clamp(36px, 5vw, 80px)",
          fontWeight: 300,
          letterSpacing: "-0.025em",
          lineHeight: 1.04,
          color: "var(--ink-fg)",
          marginTop: "20px",
        }}>
          What they&apos;re<br />
          <span style={{ color: "var(--ink-fg3)" }}>saying.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.25 } }}
            className="rounded-[18px] flex flex-col gap-6 cursor-default"
            style={{ background: "var(--ink-bg2)", padding: "28px 28px" }}
          >
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, si) => (
                <span key={si} style={{ color: "var(--ink-fg)", fontSize: "12px" }}>★</span>
              ))}
            </div>
            <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg2)", lineHeight: 1.78, flex: 1 }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--ink-border)" }}
              >
                <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--ink-fg2)" }}>{t.initials}</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-fg)" }}>{t.name}</p>
                <p style={{ fontSize: "11px", fontWeight: 300, color: "var(--ink-fg3)" }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
