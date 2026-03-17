"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Real Unsplash tattoo images for showcase
const mainImages = [
  "https://images.unsplash.com/photo-1543488733-a15272cc2f09?w=700&h=700&fit=crop",
  "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=700&h=700&fit=crop",
];

const thumbImages = [
  [
    "https://images.unsplash.com/photo-1590246814883-57c511e76370?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1570381933887-463e820ee3bc?w=300&h=320&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=320&fit=crop",
    "https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?w=300&h=320&fit=crop",
  ],
];

const videoThumbs = [
  "https://images.unsplash.com/photo-1590246814883-57c511e76370?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&h=280&fit=crop",
  "https://images.unsplash.com/photo-1543488733-a15272cc2f09?w=400&h=300&fit=crop",
];

function LazyImg({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      {!loaded && <div className="absolute inset-0 skeleton" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt={alt} loading="lazy" decoding="async"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover block"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
    </div>
  );
}

function ShowcaseBlock({ blockIndex }: { blockIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const isDark = blockIndex === 0;
  const labels = [["Fine Line Mastery", "Single needle precision · 4 sessions", "Fine Line"],
                  ["Blackwork Collection", "Bold geometric & ornamental · Various sizes", "Blackwork"]];
  const [title, subtitle, tag] = labels[blockIndex];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[24px] overflow-hidden mb-4 grid grid-cols-1 md:grid-cols-2"
      style={{
        background: isDark ? "#1a1a18" : "#edece8",
        minHeight: "clamp(380px, 52vw, 600px)",
      }}
    >
      {/* Main image */}
      <motion.div
        className={`relative overflow-hidden ${blockIndex === 1 ? "md:order-last" : ""}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <LazyImg
          src={mainImages[blockIndex]}
          alt={title}
          className="w-full h-full"
          style={{ minHeight: "320px" }}
        />
      </motion.div>

      {/* Thumb grid */}
      <div className="p-4 grid grid-cols-2 gap-2.5 content-start">
        {thumbImages[blockIndex].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.18 + i * 0.07, duration: 0.5 }}
          >
            <LazyImg
              src={src}
              alt={`${title} ${i + 1}`}
              className="w-full rounded-[14px]"
              style={{ minHeight: "clamp(80px, 11vw, 150px)" }}
            />
          </motion.div>
        ))}

        {/* Caption row */}
        <div className="col-span-2 flex items-end justify-between flex-wrap gap-3 pt-3">
          <div>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: isDark ? "#f5f4f0" : "var(--ink-fg)",
            }}>{title}</p>
            <p style={{ fontSize: "12px", fontWeight: 300, color: isDark ? "#5a5a57" : "var(--ink-fg3)", marginTop: "3px" }}>{subtitle}</p>
          </div>
          <span style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isDark ? "#5a5a57" : "var(--ink-fg3)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--ink-border)"}`,
            borderRadius: "100px",
            padding: "5px 13px",
          }}>{tag}</span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="rounded-[24px] overflow-hidden grid grid-cols-1 md:grid-cols-2 mb-4"
      style={{ background: "var(--ink-fg)", minHeight: "clamp(340px, 44vw, 520px)" }}
    >
      <div className="p-8 md:p-12 flex flex-col justify-end">
        <span className="section-label mb-4" style={{ color: "#5a5a57" }}>AI Video Production</span>
        <h3 style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 300,
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          color: "var(--ink-bg)",
          marginBottom: "16px",
        }}>
          Art that<br />moves.
        </h3>
        <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(245,244,240,0.45)", lineHeight: 1.75, maxWidth: "320px" }}>
          Watch our artists&apos; work come alive — from the first needle touch to final reveal.
        </p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2.5 content-start">
        {videoThumbs.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            className={`relative group cursor-pointer rounded-[14px] overflow-hidden ${i === 2 ? "col-span-2" : ""}`}
            style={{ minHeight: i === 2 ? "100px" : "clamp(90px, 12vw, 150px)", background: "rgba(255,255,255,0.06)" }}
            whileHover={{ scale: 1.02 }}
          >
            <LazyImg src={src} alt={`Video ${i + 1}`} className="w-full h-full" />
            {/* Play button on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="#000">
                  <path d="M5.5 3.5l8 4.5-8 4.5V3.5z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <section id="showcase" className="px-6 md:px-8 pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="section-label">· AI Fashion Photoshoot</span>
      </motion.div>

      <ShowcaseBlock blockIndex={0} />
      <ShowcaseBlock blockIndex={1} />
      <VideoShowcase />
    </section>
  );
}
