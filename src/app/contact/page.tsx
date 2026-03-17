"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { siteConfig } from "@/lib/seo";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const services = ["Fine Line", "Blackwork", "Geometric", "Cover-Up", "Realism", "Watercolor", "Minimalist", "Not sure yet"];
const budgets  = ["Under $200", "$200–500", "$500–1000", "$1000–2500", "$2500+", "Let's talk"];

function MapCreative() {
  return (
    <div className="rounded-[20px] overflow-hidden relative" style={{ minHeight: "340px", background: "var(--ink-bg2)" }}>
      {/* Stylised map — creative grid representation */}
      <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute inset-0">
        {/* Streets grid */}
        <g stroke="var(--ink-border)" strokeWidth="1" fill="none">
          {[60,120,180,240,300,360,420,480,540].map(x => <line key={x} x1={x} y1="0" x2={x} y2="340"/>)}
          {[60,120,180,240,300].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y}/>)}
          {/* Main road */}
          <line x1="0" y1="170" x2="600" y2="170" stroke="var(--ink-fg3)" strokeWidth="2.5"/>
          <line x1="300" y1="0" x2="300" y2="340" stroke="var(--ink-fg3)" strokeWidth="2"/>
        </g>
        {/* Block fills */}
        <rect x="62" y="62" width="116" height="56" rx="4" fill="var(--ink-bg2)" opacity="0.6"/>
        <rect x="182" y="62" width="116" height="56" rx="4" fill="var(--ink-bg2)" opacity="0.6"/>
        <rect x="62" y="182" width="116" height="56" rx="4" fill="var(--ink-bg2)" opacity="0.6"/>
        <rect x="362" y="122" width="116" height="96" rx="4" fill="var(--ink-bg2)" opacity="0.8"/>
        {/* Studio pin */}
        <g transform="translate(300,170)">
          <circle cx="0" cy="0" r="18" fill="var(--ink-fg)" opacity="0.15"/>
          <circle cx="0" cy="0" r="9" fill="var(--ink-fg)"/>
          <circle cx="0" cy="0" r="4" fill="var(--ink-bg)"/>
        </g>
        {/* Label */}
        <text x="322" y="155" fill="var(--ink-fg)" fontSize="10" fontFamily="sans-serif" fontWeight="400" letterSpacing="0.5">Spectre Ink</text>
      </svg>
      {/* Overlay cards */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        <a
          href="https://maps.apple.com/?q=Spectre+Ink+Edmonton"
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center gap-2 rounded-[12px] px-4 py-3 transition-opacity hover:opacity-80"
          style={{ background: "var(--ink-bg)", border: "1px solid var(--ink-border)" }}
        >
          <span style={{ fontSize: "16px" }}>🍎</span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 400, color: "var(--ink-fg)" }}>Apple Maps</span>
        </a>
        <a
          href="https://maps.google.com/?q=Spectre+Ink+Edmonton"
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center gap-2 rounded-[12px] px-4 py-3 transition-opacity hover:opacity-80"
          style={{ background: "var(--ink-bg)", border: "1px solid var(--ink-border)" }}
        >
          <span style={{ fontSize: "16px" }}>🗺️</span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 400, color: "var(--ink-fg)" }}>Google Maps</span>
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", idea: "", date: "" });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "var(--ink-bg2)", border: "1px solid var(--ink-border)",
    borderRadius: "12px", fontSize: "14px", fontWeight: 300,
    color: "var(--ink-fg)", outline: "none",
    fontFamily: "var(--font-dm-sans), sans-serif",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block", fontSize: "11px", fontWeight: 400,
    color: "var(--ink-fg3)", letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    marginBottom: "8px", fontFamily: "var(--font-dm-sans), sans-serif",
  };

  return (
    <PageShell>
      <div className="px-6 md:px-8 py-16">
        <div className="mb-14">
          <span className="section-label">Contact</span>
          <h1 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(40px, 6vw, 88px)",
            fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.02,
            color: "var(--ink-fg)", marginTop: "16px",
          }}>
            Let&apos;s talk ink.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle}>Your name *</label>
                      <input required value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle} placeholder="First and last name" />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} placeholder="you@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle}>Phone (optional)</label>
                      <input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} placeholder="+1 (780) 555-0000" />
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred date</label>
                      <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Style *</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map(s => (
                        <button type="button" key={s} onClick={() => set("service", s)} style={{
                          fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 400,
                          padding: "7px 16px", borderRadius: "100px", border: "1px solid",
                          borderColor: form.service === s ? "var(--ink-fg)" : "var(--ink-border)",
                          background: form.service === s ? "var(--ink-fg)" : "transparent",
                          color: form.service === s ? "var(--ink-bg)" : "var(--ink-fg3)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}>{s}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Budget range</label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map(b => (
                        <button type="button" key={b} onClick={() => set("budget", b)} style={{
                          fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 400,
                          padding: "7px 16px", borderRadius: "100px", border: "1px solid",
                          borderColor: form.budget === b ? "var(--ink-fg)" : "var(--ink-border)",
                          background: form.budget === b ? "var(--ink-fg)" : "transparent",
                          color: form.budget === b ? "var(--ink-bg)" : "var(--ink-fg3)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}>{b}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Tell us about your idea *</label>
                    <textarea
                      required rows={5}
                      value={form.idea}
                      onChange={e => set("idea", e.target.value)}
                      placeholder="Describe your vision, placement ideas, any reference images you have in mind…"
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    />
                  </div>

                  <button type="submit" style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400,
                    background: "var(--ink-fg)", color: "var(--ink-bg)",
                    padding: "13px 32px", borderRadius: "100px", border: "none",
                    cursor: "pointer", transition: "opacity 0.2s",
                  }} className="hover:opacity-80">
                    Send Request →
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <p style={{ fontSize: "48px", marginBottom: "16px" }}>✦</p>
                  <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "32px", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink-fg)", marginBottom: "12px" }}>
                    Message sent.
                  </h2>
                  <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-fg3)", lineHeight: 1.75 }}>
                    We'll get back to you within 24 hours.<br />Check your inbox for a confirmation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side info */}
          <div className="space-y-10">
            {/* Contact info */}
            <div>
              <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", fontWeight: 400, color: "var(--ink-fg)", marginBottom: "16px" }}>Studio info</h3>
              {[
                ["📍", "Address", siteConfig.studio.address],
                ["📞", "Phone", siteConfig.studio.phone],
                ["✉️", "Email", siteConfig.studio.email],
                ["🕐", "Hours", siteConfig.studio.hours],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--ink-border)" }}>
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 400, color: "var(--ink-fg3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px", fontFamily: "var(--font-dm-sans)" }}>{label}</p>
                    <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="space-y-3">
              <a href={`tel:${siteConfig.studio.phone}`} className="flex items-center gap-3 p-4 rounded-[14px] hover:opacity-80 transition-opacity" style={{ background: "var(--ink-bg2)", border: "1px solid var(--ink-border)" }}>
                <span style={{ fontSize: "18px" }}>📞</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)" }}>Call us directly</p>
                  <p style={{ fontSize: "11px", fontWeight: 300, color: "var(--ink-fg3)", fontFamily: "var(--font-dm-sans)" }}>Tue–Sat 11am–7pm MST</p>
                </div>
              </a>
              <a href={siteConfig.studio.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-[14px] hover:opacity-80 transition-opacity" style={{ background: "var(--ink-bg2)", border: "1px solid var(--ink-border)" }}>
                <span style={{ fontSize: "18px" }}>📷</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 400, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)" }}>DM on Instagram</p>
                  <p style={{ fontSize: "11px", fontWeight: 300, color: "var(--ink-fg3)", fontFamily: "var(--font-dm-sans)" }}>@spectreink</p>
                </div>
              </a>
            </div>

            {/* Creative Map */}
            <div>
              <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400, color: "var(--ink-fg)", marginBottom: "12px" }}>Find us</h3>
              <MapCreative />
            </div>
          </div>
          
        </div>
        <FAQ/>
        <CTABanner/>
      </div>
    </PageShell>
  );
}
