"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const workItems = [
  { num: "01", title: "Custom Tattoo Design", description: "Every piece begins with a conversation. We craft original artwork tailored to your vision, body placement, and skin tone — no flash sheets, no copies." },
  { num: "02", title: "Fine Line & Blackwork",  description: "Precision single-needle fine line work and bold, timeless blackwork. Styles that age with grace and stay sharp for years." },
  { num: "03", title: "Cover-Up & Reworks",     description: "Breathing new life into old ink. Whether it's a full cover-up or a refinement, we transform what was into what should be." },
  { num: "04", title: "Consultation & Aftercare", description: "Your journey extends beyond the chair. Thorough aftercare guidance and follow-up consultations ensure your piece heals beautifully." },
];

export function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="what-we-do"
      className="px-6 md:px-8 py-24 md:py-32"
      style={{ borderTop: "1px solid var(--ink-border)" }}
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_2fr] gap-0">

        {/* Left */}
        <motion.div
          className="lg:pr-16 pb-14 lg:pb-0"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">What we do</span>
          <h2 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(44px, 6.5vw, 108px)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            lineHeight: 1.02,
            color: "var(--ink-fg)",
            marginTop: "32px",
          }}>
            On-brand<br />
            visuals.<br />
            <span style={{ color: "var(--ink-fg3)" }}>Made by<br />artists.</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block" style={{ background: "var(--ink-border)" }} />

        {/* Right */}
        <div className="lg:pl-16 pt-0 lg:pt-2">
          {workItems.map((w, i) => (
            <motion.div
              key={w.num}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-8 group"
              style={{
                paddingBottom: "32px",
                marginBottom: i < workItems.length - 1 ? "32px" : 0,
                borderBottom: i < workItems.length - 1 ? "1px solid var(--ink-border)" : "none",
              }}
            >
              <span style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "var(--ink-fg3)",
                letterSpacing: "0.1em",
                minWidth: "28px",
                paddingTop: "2px",
              }}>
                {w.num}
              </span>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-fg)",
                  marginBottom: "10px",
                  transition: "opacity 0.2s",
                }}>
                  {w.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "var(--ink-fg2)",
                }}>
                  {w.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
