"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "@/components/ui/Logo";
import { services } from "@/lib/data";
import SvgIcon from "../ui/SvgIcon";

// Real Unsplash images — tattoo models & tattoo art
// Using direct Unsplash source URLs (no API key needed)
const orbitImages = [
  {
    url: "/images/realism2.png",
    alt: "Tattoo model portrait",
    w: 130, h: 160,
  },
  {
    url: "/images/cover.png",
    alt: "Tattoo close up",
    w: 115, h: 135,
  },
  {
    url: "/images/geo.png",
    alt: "Inked model",
    w: 120, h: 148,
  },
  {
    url: "/images/black.png",
    alt: "Arm tattoo",
    w: 118, h: 140,
  },
  {
    url: "/images/black2.png",
    alt: "Tattoo artist model",
    w: 125, h: 150,
  },
  {
    url: "/images/tattoo2.jpg",
    alt: "Back tattoo",
    w: 115, h: 138,
  },
  {
    url: "/images/tattoo3.jpg",
    alt: "Portrait with tattoos",
    w: 112, h: 134,
  },
  {
    url: "/images/realism.png",
    alt: "Tattoo detail",
    w: 120, h: 142,
  },
];

// Positions around a circle — matching reference layout exactly
// Angles in degrees starting from top, going clockwise
const POSITIONS = [
  { angle: -60,  dist: 1.0 }, // top-left
  { angle: -15,  dist: 1.0 }, // top-right
  { angle:  30,  dist: 1.05 }, // right-top
  { angle:  80,  dist: 1.0 }, // right
  { angle: 130,  dist: 1.0 }, // bottom-right
  { angle: 175,  dist: 1.05 }, // bottom-left
  { angle: -150, dist: 1.0 }, // left-bottom
  { angle: -110, dist: 1.05 }, // left-top
];

function getOrbitStyle(angle: number, dist: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius * dist;
  const y = Math.sin(rad) * radius * dist;
  return {
    position: "absolute" as const,
    left: `calc(50% + ${x}px)`,
    top:  `calc(50% + ${y}px)`,
    transform: "translate(-50%, -50%)",
  };
}

export function Hero() {
  const orbitRef   = useRef<HTMLDivElement>(null);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(orbitImages.length).fill(false)
  );

  // Responsive orbit radius
  const [radius, setRadius] = useState(210);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640)       setRadius(130);
      else if (vw < 1024) setRadius(170);
      else                setRadius(215);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // GSAP animations
  useEffect(() => {
    const orbit = orbitRef.current;
    const imgs  = imgRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!orbit || !imgs.length) return;

    // Entrance stagger
    gsap.fromTo(imgs,
      { scale: 0.55, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.06, ease: "back.out(1.6)", delay: 0.35 }
    );
    gsap.fromTo(centerRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.8)", delay: 0.85 }
    );
    gsap.fromTo(headlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.45 }
    );
    gsap.fromTo(metaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.7 }
    );

    // Continuous orbit rotation
    gsap.to(orbit, { rotation: 360, duration: 44, ease: "none", repeat: -1 });
    // Counter-rotate each image so they stay upright
    imgs.forEach(img => {
      gsap.to(img, { rotation: -360, duration: 44, ease: "none", repeat: -1 });
    });
    if (centerRef.current) {
      gsap.to(centerRef.current, { rotation: -360, duration: 44, ease: "none", repeat: -1 });
    }
  }, [radius]);

  // Service cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(i => (i + 1) % services.length);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  const markLoaded = (i: number) => {
    setImagesLoaded(prev => { const n = [...prev]; n[i] = true; return n; });
  };

  // Orbit size for layout
  const orbitSize = radius * 2 + 180;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ display: "grid", gridTemplateColumns: "1fr auto" }}
    >
      {/* ── Left: orbit area ── */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div
          ref={orbitRef}
          className="relative"
          style={{ width: orbitSize, height: orbitSize, maxWidth: "90vw", maxHeight: "90vw" }}
        >
          {/* Orbit images */}
          {orbitImages.map((img, i) => {
            const pos = POSITIONS[i];
            return (
              <div
                key={i}
                ref={el => { imgRefs.current[i] = el; }}
                className="absolute overflow-hidden"
                style={{
                  ...getOrbitStyle(pos.angle, pos.dist, radius),
                  width:  img.w,
                  height: img.h,
                  borderRadius: "22px",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.10)",
                  willChange: "transform",
                  opacity: 0,
                }}
              >
                {/* Skeleton while loading */}
                {!imagesLoaded[i] && (
                  <div className="absolute inset-0 skeleton" style={{ borderRadius: "22px" }} />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="eager"
                  decoding="async"
                  onLoad={() => markLoaded(i)}
                  className="w-full h-full object-cover block"
                  style={{
                    opacity: imagesLoaded[i] ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    borderRadius: "22px",
                  }}
                />
              </div>
            );
          })}

          {/* Centre: logo placeholder */}
          <div
            ref={centerRef}
            className="absolute"
            style={{
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 108, height: 108,
              background: "var(--ink-card)",
              border: "1px solid var(--ink-border)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              zIndex: 10,
              opacity: 0,
            }}
          >
<SvgIcon/>
          </div>
        </div>

        {/* ── Bottom-left headline ── */}
        <div
          ref={headlineRef}
          className="absolute bottom-0 left-0 pb-7 pl-6 md:pl-8"
          style={{ opacity: 0 }}
        >
          <h1 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(38px, 5.8vw, 88px)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--ink-fg)",
          }}>
            Your vision,<br />
            <span style={{ color: "var(--ink-fg3)" }}>permanently<br />perfected.</span>
          </h1>
        </div>

        {/* ── Bottom meta ── */}
        <div
          ref={metaRef}
          className="absolute bottom-0 right-0 pb-7 pr-6 flex flex-col items-end gap-1.5"
          style={{ opacity: 0 }}
        >
          <span className="section-label">©2026</span>
          <span className="section-label">Scroll Down</span>
        </div>
      </div>

      {/* ── Right: service tags — exact reference layout ── */}
      <div
        className="hidden lg:flex flex-col justify-center items-end gap-2.5 pr-8"
        style={{ minWidth: "160px", paddingTop: "0" }}
      >
        {services.map((s, i) => {
          const isActive = i === activeService;
          return (
            <button
              key={s.id}
              onClick={() => setActiveService(i)}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: isActive ? "var(--ink-fg)" : "var(--ink-fg3)",
                background: isActive ? "transparent" : "transparent",
                border: isActive ? "1px solid var(--ink-border)" : "none",
                borderRadius: "10px",
                padding: isActive ? "5px 14px" : "5px 14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                outline: "none",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
