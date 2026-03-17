"use client";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";

const CATEGORIES = ["All", "Fine Line", "Blackwork", "Geometric", "Realism", "Watercolor", "Cover-Up", "Minimalist"];
const SORT_OPTIONS = ["Newest", "Oldest", "A–Z"];

const galleryItems = [
  { id: 1,  title: "Botanical Sleeve",       category: "Fine Line",   src: "/images/tattoo1.jpg", size: "tall" },
  { id: 2,  title: "Sacred Geometry",         category: "Geometric",   src: "/images/tattoo2.jpg", size: "wide" },
  { id: 3,  title: "Raven Blackwork",          category: "Blackwork",   src: "/images/cover.png", size: "tall" },
  { id: 4,  title: "Watercolor Koi",           category: "Watercolor",  src: "/images/tattoo3.jpg", size: "sq" },
  { id: 5,  title: "Portrait Study",           category: "Realism",     src: "/images/black.png", size: "tall" },
  { id: 6,  title: "Minimal Linework",         category: "Minimalist",  src: "/images/realism.png", size: "sq" },
  { id: 7,  title: "Mandala Chest Piece",      category: "Geometric",   src: "/images/geo.png", size: "sq" },
  { id: 8,  title: "Script Cover-Up",          category: "Cover-Up",    src: "/images/fine.png", size: "tall" },
  { id: 9,  title: "Micro Fine Floral",        category: "Fine Line",   src: "/images/realism2.png", size: "sq" },
  { id: 10, title: "Neo-Geo Arm",              category: "Geometric",   src: "/images/black2.png", size: "tall" },
  { id: 11, title: "Dark Forest Sleeve",       category: "Blackwork",   src: "/images/realism3.png", size: "sq" },
  { id: 12, title: "Single Needle Portrait",   category: "Fine Line",   src: "/images/letter.png", size: "tall" },
];

type ViewMode = "grid" | "table";

export default function GalleryPage() {
  const [category, setCategory]   = useState("All");
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState("Newest");
  const [view, setView]           = useState<ViewMode>("grid");
  const [hoverId, setHoverId]     = useState<number | null>(null);

  const filtered = useMemo(() => {
    let items = [...galleryItems];
    if (category !== "All") items = items.filter(i => i.category === category);
    if (search.trim()) items = items.filter(i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "A–Z")    items.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Oldest") items.sort((a, b) => a.id - b.id);
    if (sort === "Newest") items.sort((a, b) => b.id - a.id);
    return items;
  }, [category, search, sort]);

  return (
    <PageShell>
      <div className="px-6 md:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">Gallery</span>
          <h1 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(40px, 6vw, 88px)",
            fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.02,
            color: "var(--ink-fg)", marginTop: "16px",
          }}>
            Our work,<br /><span style={{ color: "var(--ink-fg3)" }}>on skin.</span>
          </h1>
        </div>

        {/* Controls row */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Search + sort + view toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tattoos…"
                style={{
                  width: "100%", padding: "10px 16px 10px 38px",
                  background: "var(--ink-bg2)", border: "1px solid var(--ink-border)",
                  borderRadius: "100px", fontSize: "13px", fontWeight: 300,
                  color: "var(--ink-fg)", outline: "none",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--ink-fg3)" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
              </svg>
            </div>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: "10px 14px", background: "var(--ink-bg2)",
                border: "1px solid var(--ink-border)", borderRadius: "100px",
                fontSize: "13px", fontWeight: 300, color: "var(--ink-fg)",
                fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", outline: "none",
              }}
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full" style={{ background: "var(--ink-bg2)", border: "1px solid var(--ink-border)" }}>
              {(["grid", "table"] as ViewMode[]).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "6px 14px", borderRadius: "100px", border: "none", cursor: "pointer",
                  fontSize: "12px", fontWeight: 400,
                  background: view === v ? "var(--ink-fg)" : "transparent",
                  color: view === v ? "var(--ink-bg)" : "var(--ink-fg3)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  transition: "all 0.2s",
                }}>
                  {v === "grid" ? "⊞ Grid" : "≡ Table"}
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "6px 16px", borderRadius: "100px", border: "1px solid",
                borderColor: category === cat ? "var(--ink-fg)" : "var(--ink-border)",
                background: category === cat ? "var(--ink-fg)" : "transparent",
                color: category === cat ? "var(--ink-bg)" : "var(--ink-fg3)",
                fontSize: "12px", fontWeight: 400, cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                transition: "all 0.2s",
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-fg3)", marginBottom: "24px" }}>
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                columns: "clamp(2, calc(100vw / 260px), 4)",
                columnGap: "12px",
              }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.45 }}
                  onMouseEnter={() => setHoverId(item.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{ breakInside: "avoid", marginBottom: "12px", cursor: "pointer" }}
                >
                  <div className="relative overflow-hidden group" style={{ borderRadius: "16px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src} alt={item.title} loading="lazy"
                      className="w-full block"
                      style={{ display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: hoverId === item.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }}
                    >
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 400, color: "#fff" }}>{item.title}</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{item.category}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--ink-border)" }}>
                    {["#", "Preview", "Title", "Category", ""].map(h => (
                      <th key={h} style={{
                        padding: "10px 12px", textAlign: "left",
                        fontSize: "11px", fontWeight: 400,
                        color: "var(--ink-fg3)", letterSpacing: "0.12em", textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.35 }}
                      style={{ borderBottom: "1px solid var(--ink-border)", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--ink-bg2)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "12px", fontSize: "11px", fontWeight: 300, color: "var(--ink-fg3)", fontFamily: "var(--font-dm-sans)", width: "40px" }}>{String(i + 1).padStart(2, "0")}</td>
                      <td style={{ padding: "12px", width: "72px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.src} alt={item.title} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px", display: "block" }} />
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: 400, color: "var(--ink-fg)", fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.01em" }}>{item.title}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          fontSize: "11px", fontWeight: 400, color: "var(--ink-fg3)",
                          border: "1px solid var(--ink-border)", borderRadius: "100px",
                          padding: "4px 10px", fontFamily: "var(--font-dm-sans)",
                        }}>{item.category}</span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "13px", fontWeight: 300, color: "var(--ink-fg3)", fontFamily: "var(--font-dm-sans)" }}>View →</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
