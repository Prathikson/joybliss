"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";
import { PixelFooter } from "@/components/ui/PixelFooter";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";
import SvgIcon from "../ui/SvgIcon";

const col1 = { title: "Works",    links: [{ label: "Portfolio", href: "/gallery" }, { label: "Services", href: "/services" }] };
const col2 = { title: "About", links: [{ label: "Our Artist", href: "/artist" }, { label: "Contact", href: "/contact" }] };
const col3 = { title: "Legal",   links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Cookie Policy", href: "/terms#cookies" }] };
const col4 = { title: "Socials", links: [{ label: "Instagram", href: siteConfig.studio.instagram }] };

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  const colStyle = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "var(--ink-fg)",
    letterSpacing: "-0.005em",
  };
  const linkStyle = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    color: "var(--ink-fg3)",
  };

  return (
    <footer ref={ref} style={{ borderTop: "1px solid var(--ink-border)" }}>
      {/* Main footer content */}
      <div className="px-8 pt-12 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-x-16 gap-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-1 flex items-start gap-3"
          >
<a href="/" aria-label="Spectre Ink home">
  <SvgIcon />
</a>
          </motion.div>

          {/* Nav columns */}
          {[col1, col2, col3, col4].map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + ci * 0.07, duration: 0.55 }}
            >
              <p style={colStyle} className="mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={linkStyle} className="hover:text-[var(--ink-fg)] transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-14 pt-8"
          style={{ borderTop: "1px solid var(--ink-border)" }}
        >
          <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)" }}>
            © 2026, Spectre Ink. Edmonton, Alberta, Canada. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)" }}>
            Registered in Alberta · BN: 123456789
          </p>
        </div>
      </div>

      {/* Animated pixel art */}
      <PixelFooter />
    </footer>
  );
}
