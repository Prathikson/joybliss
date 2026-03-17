"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";

const steps = [
  "Consultation",
  "Custom Design",
  "Placement Review",
  "Tattoo Session",
  "Aftercare Guide",
  "Healing Check",
  "Touch-Up",
];

// Triple for seamless ticker
const allSteps = [...steps, ...steps, ...steps];

export function Process() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const tickerRef   = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ticker  = tickerRef.current;
    const section = sectionRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!ticker || !section || !l1 || !l2) return;

    // Title clipped reveal
    gsap.fromTo([l1, l2],
      { y: "108%", opacity: 0 },
      {
        y: "0%", opacity: 1, duration: 0.9, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      }
    );

    // Left content
    gsap.fromTo(leftRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      }
    );

    const items = ticker.querySelectorAll<HTMLElement>("[data-step]");
    const itemH = items[0]?.offsetHeight || 76;
    const maxTranslate = (steps.length) * itemH;

    ScrollTrigger.create({
      trigger: section,
      start: "top 58%",
      end:   "bottom 42%",
      scrub: 2,
      onUpdate(self) {
        const offset = self.progress * maxTranslate;
        gsap.set(ticker, { y: -offset });

        const activeIdx = Math.round(offset / itemH) + 1;
        items.forEach((item, i) => {
          const active = i === activeIdx;
          gsap.to(item, {
            color: active ? "var(--ink-fg)" : "var(--ink-fg3)",
            duration: 0.25,
          });
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="px-6 md:px-8 py-24 md:py-32"
      style={{ borderTop: "1px solid var(--ink-border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_2.5fr] gap-0">

        {/* Left */}
        <div className="lg:pr-14 pb-14 lg:pb-0">
          <span className="section-label">How it works</span>

          {/* Clipped big text */}
          <div style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(52px, 8vw, 120px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "var(--ink-fg)",
            marginTop: "32px",
          }}>
            <div style={{ overflow: "hidden" }}>
              <span ref={line1Ref} style={{ display: "block", transform: "translateY(108%)" }}>AI</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(108%)", color: "var(--ink-fg3)" }}>that.</span>
            </div>
          </div>

          <div ref={leftRef} className="mt-10" style={{ opacity: 0 }}>
            <p style={{
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.78,
              color: "var(--ink-fg2)",
              maxWidth: "320px",
              marginBottom: "28px",
            }}>
              From concept sketch to healed masterpiece — our process ensures your experience is as unforgettable as your tattoo.
            </p>
            <Button>Begin Your Journey</Button>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block" style={{ background: "var(--ink-border)" }} />

        {/* Ticker */}
        <div className="lg:pl-12 pt-0">
          <div
            className="relative overflow-hidden"
            style={{ height: "clamp(300px, 40vw, 460px)" }}
          >
            {/* Fade top */}
            <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none" style={{
              height: "80px",
              background: "linear-gradient(to bottom, var(--ink-bg), transparent)",
            }} />

            <div ref={tickerRef} className="absolute top-0 left-0 right-0">
              {allSteps.map((step, i) => (
                <div
                  key={`${step}-${i}`}
                  data-step
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "clamp(26px, 4.2vw, 62px)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: i === 1 ? "var(--ink-fg)" : "var(--ink-fg3)",
                    borderTop: "1px solid var(--ink-border)",
                    padding: "18px 0",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 0.3s",
                  }}
                >
                  {step}
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--ink-border)" }} />
            </div>

            {/* Fade bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={{
              height: "80px",
              background: "linear-gradient(to top, var(--ink-bg), transparent)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
