"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/useTheme";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SvgIcon from "../ui/SvgIcon";

const navItems = [
  { label: "Our Artist", href: "/artist" },
  { label: "Services",   href: "/services" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Contact",    href: "/contact" },
];

export function Header({ visible }: { visible: boolean }) {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef   = useRef<HTMLDivElement>(null);
  const { isDark, toggle } = useTheme();
  const progress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillBox, setPillBox] = useState({ left: 0, width: 0, top: 0 });
  const router = useRouter();

  // Measure pill so dropdown can anchor to it precisely
  useEffect(() => {
    function measure() {
      if (!pillRef.current) return;
      const r = pillRef.current.getBoundingClientRect();
      setPillBox({ left: r.left, width: r.width, top: r.bottom });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.1 }
    );
  }, [visible]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleMenuToggle = () => {
    // Re-measure right before opening so position is always fresh
    if (pillRef.current) {
      const r = pillRef.current.getBoundingClientRect();
      setPillBox({ left: r.left, width: r.width, top: r.bottom });
    }
    setMenuOpen(o => !o);
  };

  const closeMenu = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => router.push(href), 380);
  };

  const fontStyle = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontWeight: 400,
  };

  // Dropdown is at least 280px wide, centered on the pill
  const dropW    = Math.max(pillBox.width, 280);
  const dropLeft = pillBox.left - (dropW - pillBox.width) / 2;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-8 py-[18px]"
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <a href="/" aria-label="Joy Bliss home">
          <SvgIcon />
        </a>

        {/* Centre pill */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            ref={pillRef}
            className="flex items-center rounded-full overflow-hidden"
            style={{ background: "var(--ink-fg)", padding: "6px 6px 6px 18px", gap: 0 }}
          >
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2.5 cursor-pointer"
              style={{ paddingRight: "14px", background: "none", border: "none" }}
              aria-label="Toggle menu"
            >
              <MenuIcon open={menuOpen} />
              <span style={{ ...fontStyle, fontSize: "14px", color: "var(--ink-bg)" }}>
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>

            <div style={{ width: 1, height: 24, background: "rgba(245,244,240,0.18)", margin: "0 2px" }} />

            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-white/10 transition-colors"
              style={{ background: "none", border: "none" }}
              aria-label="Toggle theme"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>

            <div
              className="rounded-full text-center tabular-nums"
              style={{
                ...fontStyle,
                fontSize: "12px",
                color: "var(--ink-bg)",
                background: "rgba(255,255,255,0.12)",
                padding: "6px 14px",
                marginLeft: "6px",
                minWidth: "50px",
              }}
            >
              {progress}%
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"
            style={{ borderColor: "var(--ink-border)", color: "var(--ink-fg)", background: "none" }}
            aria-label="Account"
          >
            <PersonIcon />
          </button>
          <button
            className="hidden sm:block rounded-full cursor-pointer transition-opacity hover:opacity-80"
            style={{
              ...fontStyle,
              fontSize: "14px",
              background: "var(--ink-fg)",
              color: "var(--ink-bg)",
              padding: "10px 22px",
              border: "none",
            }}
          >
            Book Now
          </button>
        </div>
      </header>

      {/* Dropdown — pixel-anchored to pill via getBoundingClientRect */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[97]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed z-[99] rounded-b-[24px] shadow-2xl overflow-hidden"
              style={{
                background: "var(--ink-bg)",
                top: 0,
                left: dropLeft,
                width: dropW,
                paddingTop: `${pillBox.top + 14}px`,
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingBottom: "32px",
              }}
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="section-label mb-4">Menu</p>
              <ul className="mb-7">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => closeMenu(item.href)}
                      className="block w-full text-left py-1 hover:opacity-40 transition-opacity cursor-pointer"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "clamp(22px, 4vw, 28px)",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        color: "var(--ink-fg)",
                        background: "none",
                        border: "none",
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <hr style={{ borderColor: "var(--ink-border)" }} />

              <p className="section-label mt-5 mb-3">Other</p>
              <ul className="space-y-2 mb-5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(t => (
                  <li key={t}>
                    <a href="#" style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-fg2)" }}>
                      {t}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="section-label mb-2">Social media</p>
              <a href="#" style={{ fontSize: "14px", fontWeight: 400, color: "var(--ink-fg)" }}>
                Instagram
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--ink-bg)" strokeWidth="1.5" strokeLinecap="round">
      {open
        ? (<><line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" /></>)
        : (<><line x1="2" y1="5.5" x2="14" y2="5.5" /><line x1="2" y1="10.5" x2="14" y2="10.5" /></>)
      }
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="var(--ink-bg)" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="3.5" />
      <line x1="10" y1="1.5"  x2="10" y2="3.5"  />
      <line x1="10" y1="16.5" x2="10" y2="18.5" />
      <line x1="1.5"  y1="10" x2="3.5"  y2="10" />
      <line x1="16.5" y1="10" x2="18.5" y2="10" />
      <line x1="4.1" y1="4.1"   x2="5.5"  y2="5.5"  />
      <line x1="14.5" y1="14.5" x2="15.9" y2="15.9" />
      <line x1="4.1"  y1="15.9" x2="5.5"  y2="14.5" />
      <line x1="14.5" y1="5.5"  x2="15.9" y2="4.1"  />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="var(--ink-bg)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M17 12A7 7 0 1 1 8 3a5.5 5.5 0 0 0 9 9z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="5" r="3" />
      <path d="M1.5 15c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" />
    </svg>
  );
}