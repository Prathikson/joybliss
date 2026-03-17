"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="px-6 md:px-8 py-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[24px] overflow-hidden relative flex flex-col items-center justify-center text-center"
        style={{
          background: "var(--ink-fg)",
          padding: "clamp(60px, 10vw, 120px) 40px",
          minHeight: "clamp(320px, 40vw, 480px)",
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }} />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.55 }}
          style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,244,240,0.4)", marginBottom: "20px" }}
        >
          Ready when you are
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(36px, 6vw, 92px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "var(--ink-bg)",
            marginBottom: "36px",
            maxWidth: "800px",
          }}
        >
          Your story,<br />permanently told.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/contact"
            className="rounded-full transition-opacity hover:opacity-80"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px", fontWeight: 400,
              background: "var(--ink-bg)", color: "var(--ink-fg)",
              padding: "12px 28px",
            }}
          >
            Book a Consultation
          </Link>
          <Link
            href="/gallery"
            className="rounded-full transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px", fontWeight: 400,
              background: "transparent",
              color: "rgba(245,244,240,0.55)",
              padding: "12px 28px",
              border: "1px solid rgba(245,244,240,0.2)",
            }}
          >
            View Gallery
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
