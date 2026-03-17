"use client";
import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis: import("@studio-freight/lenis").default | null = null;

    async function initLenis() {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      lenis.on("scroll", ScrollTrigger.update);
      gsapModule.gsap.ticker.add((time: number) => {
        lenis?.raf(time * 1000);
      });
      gsapModule.gsap.ticker.lagSmoothing(0);
    }

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);
}
