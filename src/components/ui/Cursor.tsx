"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      gsap.to(ringEl, { width: 64, height: 64, duration: 0.35, ease: "power2.out" });
      gsap.to(dot, { width: 5, height: 5, duration: 0.2 });
    };
    const shrink = () => {
      gsap.to(ringEl, { width: 38, height: 38, duration: 0.35, ease: "power2.out" });
      gsap.to(dot, { width: 10, height: 10, duration: 0.2 });
    };

    const targets = document.querySelectorAll("a, button, [data-cursor-grow]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
