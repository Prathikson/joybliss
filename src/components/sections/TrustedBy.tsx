"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  { id: "1", name: "Vogue Living" },
  { id: "2", name: "INK Magazine" },
  { id: "3", name: "Hypebeast" },
  { id: "4", name: "Complex CA" },
];

export function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="trusted"
      className="px-6 md:px-8 py-20"
      style={{ borderTop: "1px solid var(--ink-border)" }}
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Trusted By</span>
          <h2 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--ink-fg)",
            marginTop: "16px",
          }}>
            Worn by<br />the bold.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[16px] flex items-center justify-center cursor-pointer"
              style={{ background: "var(--ink-bg2)", padding: "26px 18px", minHeight: "84px" }}
            >
              <span style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--ink-fg2)",
                letterSpacing: "0",
                textAlign: "center",
              }}>
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
