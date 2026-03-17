"use client";
import { useEffect, useRef } from "react";

export function useGSAPOnMount(
  callback: (gsap: typeof import("gsap").gsap) => (() => void) | void,
  deps: unknown[] = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        cleanupRef.current = callback(gsap);
      });
    }

    init();

    return () => {
      ctx?.revert();
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
