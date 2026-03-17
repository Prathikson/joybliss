"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const SESSION_KEY = "spectre_preloader_seen";

export function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      onComplete();
      return;
    }
    setShow(true);
  }, [onComplete]);

  useEffect(() => {
    if (!show) return;

    const svg = svgRef.current;
    const tagline = taglineRef.current;
    const needle = needleRef.current;
    const progressFill = progressFillRef.current;
    if (!svg || !tagline || !needle || !progressFill) return;

    // Get all paths and measure their lengths
    const paths = Array.from(svg.querySelectorAll("path"));

    // Set each path up for stroke drawing
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.fill = "transparent";
      path.style.stroke = "#f5f4f0";
      path.style.strokeWidth = "1.2";
      path.style.transition = "none";
    });

    // Needle starts invisible
    gsap.set(needle, { opacity: 0 });
    gsap.set(tagline, { opacity: 0, y: 8 });
    gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

    // Total draw duration
    const DRAW_DURATION = 3.0;
    const EXIT_DELAY = 3600;

    // Master timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Needle flicker on
    tl.to(needle, {
      opacity: 1,
      duration: 0.08,
      ease: "none",
    });
    tl.to(needle, { opacity: 0.3, duration: 0.06 }, "+=0.04");
    tl.to(needle, { opacity: 1, duration: 0.05 }, "+=0.03");

    // Draw all paths with stagger — tattooing effect
    tl.to(
      paths,
      {
        strokeDashoffset: 0,
        duration: DRAW_DURATION,
        stagger: {
          each: 0.18,
          ease: "power1.inOut",
        },
        ease: "power2.inOut",
        onUpdate() {
          // As paths draw, fill them in gradually (ink settling)
          paths.forEach((path) => {
            const offset = parseFloat(path.style.strokeDashoffset);
            const total = parseFloat(path.style.strokeDasharray);
            const drawn = 1 - offset / total;
            if (drawn > 0.85) {
              const fillOpacity = gsap.utils.clamp(0, 1, (drawn - 0.85) / 0.15);
              path.style.fill = `rgba(245, 244, 240, ${fillOpacity})`;
            }
          });
        },
      },
      "-=0.1"
    );

    // Tagline after most paths drawn
    tl.to(
      tagline,
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      `-=${DRAW_DURATION * 0.25}`
    );

    // Progress bar synced to draw
    gsap.to(progressFill, {
      scaleX: 1,
      duration: DRAW_DURATION + 0.5,
      ease: "power1.inOut",
      delay: 0.3,
    });

    // Counter
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 7) + 2;
      if (pct >= 100) { pct = 100; clearInterval(interval); }
      setCounter(pct);
    }, 60);

    // Needle moves subtly while drawing (mimics tattooing motion)
    gsap.to(needle, {
      x: "random(-3, 3)",
      y: "random(-2, 2)",
      duration: 0.12,
      repeat: Math.floor((DRAW_DURATION * 1000) / 120),
      ease: "none",
      yoyo: true,
      delay: 0.35,
    });

    // Exit
    const exitTimer = setTimeout(() => {
      clearInterval(interval);
      setCounter(100);

      // Kill needle vibration
      gsap.killTweensOf(needle);

      // Needle lifts off
      gsap.to(needle, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
      });

      const exitTl = gsap.timeline({
        delay: 0.4,
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          onComplete();
        },
      });

      exitTl
        .to(tagline, { opacity: 0, y: -6, duration: 0.35, ease: "power2.in" })
        .to(
          paths,
          {
            opacity: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power1.in",
          },
          "-=0.2"
        )
        .to(
          wrapRef.current,
          { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
          "-=0.15"
        );
    }, EXIT_DELAY);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9995] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a09" }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Needle indicator */}
      <div
        ref={needleRef}
        className="absolute pointer-events-none"
        style={{
          width: "2px",
          height: "22px",
          background: "linear-gradient(to bottom, transparent, #c8a96e, transparent)",
          borderRadius: "1px",
          boxShadow: "0 0 8px rgba(200, 169, 110, 0.8), 0 0 20px rgba(200, 169, 110, 0.3)",
          transform: "translateY(-160px)",
          zIndex: 10,
        }}
      />

      {/* The SVG logo — large, centered */}
      <div className="relative" style={{ marginBottom: "40px" }}>
        {/* Ink glow behind */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,244,240,0.04) 0%, transparent 65%)",
            filter: "blur(30px)",
            transform: "scale(1.4)",
          }}
        />

        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 375 375"
          style={{
            width: "clamp(280px, 55vw, 560px)",
            height: "auto",
            display: "block",
            position: "relative",
            zIndex: 2,
          }}
        >
          <defs>
            <clipPath id="pl-1">
              <path d="M.602.36H117v116.16H.602Zm0 0" />
            </clipPath>
            <clipPath id="pl-2">
              <path d="M0 0h117v117H0z" />
            </clipPath>
            <clipPath id="pl-3">
              <path d="M112 3h161.96v112H112Zm0 0" />
            </clipPath>
            <clipPath id="pl-4">
              <path d="M0 0h162v112H0z" />
            </clipPath>
            <clipPath id="pl-5">
              <path d="M19.684 7.773h17.925v17.93H19.684Zm0 0" />
            </clipPath>
            <clipPath id="pl-6">
              <path d="M0 0h274v117H0z" />
            </clipPath>
          </defs>
          <g clipPath="url(#pl-6)" transform="translate(51 129)">
            <g clipPath="url(#pl-1)">
              <g clipPath="url(#pl-2)">
                <path d="M11.293 88.685c7.101 0 10.656-4.063 12.175-12.348l7.696-43.633c.421-2.453 2.03-4.566 4.226-5.664l.086-.508H22.453l-.082.508c1.859.844 2.453 3.211 2.027 5.664l-8.031 45.07c-.848 5.329-3.297 8.118-7.106 8.118-3.804 0-6.086-3.637-5.496-7.778h-.422c-.675 4.227.168 10.57 7.95 10.57M48.919 88.685c14.293 0 25.117-13.617 25.117-27.992 0-10.739-6.852-17.504-16.996-17.504-14.293 0-25.117 13.785-25.117 28.074 0 10.824 6.765 17.422 16.996 17.422m.172-1.016c-6.344 0-10.657-5.242-10.657-13.953 0-12.348 7.61-29.512 18.352-29.512 6.426 0 10.652 5.496 10.652 14.121 0 12.43-7.523 29.344-18.347 29.344m0 0" />
                <path d="M109.802 44.544c.168 1.774 0 3.887-.508 6.934C107.18 61.54 98.216 75.915 92.13 84.962l-6.344-32.555c-.762-3.804.422-6.003 3.973-7.355l.086-.508H75.81l-.086.508c2.113 1.691 2.96 3.21 3.636 7.016l8.032 39.492-1.098 1.52c-3.977 5.074-8.371 8.71-13.36 8.71-2.285 0-4.566-1.777-5.414-3.215h-.335l-2.622 5.075c2.028 1.777 3.887 2.285 6.086 2.285 5.918 0 12.516-6.09 17.672-13.531l1.27-1.692c1.777-2.789 6.597-9.808 8.965-13.36 6.593-10.655 14.543-22.41 16.066-30.695.082-.593.168-1.523.168-2.113Zm0 0" />
              </g>
            </g>
            <g clipPath="url(#pl-3)">
              <g clipPath="url(#pl-4)" transform="translate(112 3)">
                <path d="M29.37 44.485c5.969.055 11.047 2.203 15.234 6.453q6.28 6.362 6.203 15.25-.08 8.953-6.453 15.234-6.363 6.28-15.234 6.204-7.628 0-13.656-4.938v4.938H3.729l-.078-58.47H15.37v20.438q6.03-5.109 14-5.109m7.36 29.156q3.011-3.011 3.187-7.547 0-4.263-3.094-7.53-3.111-3.108-7.547-3.11c-2.898 0-5.406 1.008-7.531 3.015q-3.11 3.112-3.11 7.547-.159 4.36 3.016 7.531 3.012 3.018 7.547 3.188 4.437 0 7.531-3.094M65.54 29.407v58.219H53.821v-58.22ZM81.376 29.235v9.89H69.735v-9.89Zm.078 15.328v43.063H69.735V44.563ZM103.07 87.626q-4.36.001-7.624-1.344-2.594-.919-5.36-3.438-4.78-4.434-4.36-11.218v-.922l9.391.172h.75v.671q.078 2.099.922 3.422 1.419 2.438 6.282 2.438 4.012.002 5.78-.922.922-.421 1.25-1.094a.88.88 0 0 0 .173-.5l.078-.422q0-1.747-2.766-2.843-1.08-.421-2.5-.672a28 28 0 0 0-2.437-.422q-5.035-.499-8.375-2-3.346-1.343-5.532-3.688-3.016-3.434-3.015-7.875-.002-2.765 1.015-5.109a11.4 11.4 0 0 1 2-3.266q4.529-5.203 14.5-5.203c3.957 0 7.305.79 10.047 2.36q3.187 1.752 5.11 4.765c1 1.512 1.695 3.274 2.093 5.282q.17 1.001.25 1.921v1.766h-10.14v-1.266a2.8 2.8 0 0 1-.078-.672q-.25-.92-.672-1.5-1.846-2.514-6.61-2.515-7.047 0-7.046 2.937 0 1.501 1.687 2.422 1.747 1.095 5.938 1.594 9.637 1 13.984 6.11 2.936 3.438 2.937 7.874v.594l-.078.75c0 .73-.086 1.402-.25 2.016a11.3 11.3 0 0 1-2.515 4.765q-2.098 2.518-5.86 3.782-3.783 1.252-8.968 1.25M142.352 87.626q-4.36.001-7.625-1.344-2.594-.919-5.359-3.438-4.781-4.434-4.36-11.218v-.922l9.391.172h.75v.671q.078 2.099.922 3.422 1.418 2.438 6.281 2.438 4.013.002 5.782-.922.92-.421 1.25-1.094a.88.88 0 0 0 .171-.5l.079-.422q0-1.747-2.766-2.843c-.719-.282-1.555-.504-2.5-.672a28 28 0 0 0-2.438-.422q-5.033-.499-8.375-2-3.345-1.343-5.53-3.688-3.017-3.434-3.016-7.875-.002-2.765 1.015-5.109a11.4 11.4 0 0 1 2-3.266q4.529-5.203 14.5-5.203c3.957 0 7.305.79 10.047 2.36q3.187 1.752 5.11 4.765c1 1.512 1.695 3.274 2.093 5.282q.17 1.001.25 1.921v1.766h-10.14v-1.266a2.8 2.8 0 0 1-.079-.672q-.25-.92-.671-1.5-1.845-2.514-6.61-2.515-7.048 0-7.047 2.937 0 1.501 1.688 2.422 1.747 1.095 5.937 1.594 9.638 1 13.985 6.11 2.936 3.438 2.937 7.874v.594l-.078.75c0 .73-.086 1.402-.25 2.016a11.3 11.3 0 0 1-2.516 4.765q-2.097 2.518-5.859 3.782-3.784 1.252-8.969 1.25m0 0" />
              </g>
            </g>
            <g clipPath="url(#pl-5)">
              <path d="M28.695 7.773c-.879 7.422-1.59 8.137-9.011 9.016q.022.002.046.004c7.38.875 8.09 1.602 8.965 9.008.88-7.422 1.59-8.133 9.016-9.012-7.426-.879-8.137-1.594-9.016-9.016m0 0" />
            </g>
          </g>
        </svg>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: "10px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#3a3a37",
          marginBottom: "48px",
        }}
      >
        Tattoo Studio · Est. 2020
      </p>

      {/* Progress bar — thin, full width at bottom */}
      <div
        ref={progressTrackRef}
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "1px", background: "rgba(245,244,240,0.06)" }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            background:
              "linear-gradient(to right, transparent, #c8a96e 20%, #f5f4f0 60%, #c8a96e 80%, transparent)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            boxShadow: "0 0 12px rgba(200,169,110,0.5)",
          }}
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="absolute bottom-5 right-8"
        style={{
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: "10px",
          color: "#3a3a37",
          letterSpacing: "0.15em",
          minWidth: "42px",
          textAlign: "right",
        }}
      >
        {counter}%
      </span>

      {/* Bottom left label */}
      <span
        className="absolute bottom-5 left-8"
        style={{
          fontFamily: "var(--font-inconsolata), monospace",
          fontSize: "10px",
          color: "#2a2a27",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Loading
      </span>
    </div>
  );
}