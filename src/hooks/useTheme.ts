"use client";
import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("spectre-theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("spectre-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("spectre-theme", "light");
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
