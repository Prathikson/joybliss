"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How do I book a tattoo appointment?", a: "Fill out our contact form or DM us on Instagram. We'll get back within 24 hours to discuss your idea, schedule a consultation, and confirm your session date." },
  { q: "How much does a tattoo cost?", a: "Pricing depends on size, placement, style, and complexity. Small pieces start from $150. Custom full sleeves and large works are quoted per project. All prices include a complimentary touch-up session." },
  { q: "How should I prepare for my appointment?", a: "Eat a full meal before your session, stay hydrated, wear comfortable clothing that allows easy access to the tattoo area, and avoid alcohol for 24 hours prior." },
  { q: "Do you do walk-ins?", a: "We are primarily appointment-based to ensure full attention to your piece. Limited walk-in slots may be available — call ahead to check availability." },
  { q: "How long does healing take?", a: "Surface healing typically takes 2–3 weeks. Full deep-skin healing takes 3–6 months. We provide a complete aftercare guide and check-in at the 6-week mark." },
  { q: "Can you cover an existing tattoo?", a: "Absolutely. Cover-ups are one of our specialties. We'll assess your existing piece during consultation and design something that completely transforms it." },
  { q: "What styles do you specialize in?", a: "Fine line, blackwork, geometric, realism, neo-traditional, watercolor, and minimalist. Our artist is versatile — bring any reference and we'll make it work." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: "1px solid var(--ink-border)" }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        style={{ background: "none", border: "none" }}
      >
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "clamp(14px, 1.4vw, 17px)",
          fontWeight: 400,
          color: "var(--ink-fg)",
          letterSpacing: "-0.01em",
          paddingRight: "24px",
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: 28, height: 28, borderRadius: "50%",
            border: "1px solid var(--ink-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "var(--ink-fg3)",
            fontSize: "18px", lineHeight: 1,
            fontWeight: 300,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "14px", fontWeight: 300,
              color: "var(--ink-fg2)", lineHeight: 1.78,
              paddingBottom: "20px", maxWidth: "640px",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="faq" className="px-6 md:px-8 py-24" style={{ borderTop: "1px solid var(--ink-border)" }} ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="lg:pr-16 pb-12 lg:pb-0"
        >
          <span className="section-label">FAQ</span>
          <h2 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--ink-fg)",
            marginTop: "20px",
          }}>
            Questions<br /><span style={{ color: "var(--ink-fg3)" }}>answered.</span>
          </h2>
        </motion.div>
        <div style={{ borderTop: "1px solid var(--ink-border)" }}>
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
