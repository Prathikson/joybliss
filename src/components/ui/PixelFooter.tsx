"use client";
import { useEffect, useRef, useState } from "react";

// 4 pixel art designs (20x15 grid, 1=dark dot, 0=light)
const DESIGNS = {
  // S letter
  S: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  // Heart
  heart: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  // Star
  star: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0],
    [0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  // Diamond / gem
  gem: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
};

const GRID_COLS = 60;
const GRID_ROWS = 15;
const DESIGN_KEYS = ["S", "heart", "star", "gem"] as const;

function buildFullGrid(designKey: keyof typeof DESIGNS): (0|1)[][] {
  const d = DESIGNS[designKey];
  const rows: (0|1)[][] = [];
  const dRows = d.length;
  const dCols = d[0].length;
  const startRow = Math.floor((GRID_ROWS - dRows) / 2);
  const startCol = Math.floor((GRID_COLS - dCols) / 2);
  for (let r = 0; r < GRID_ROWS; r++) {
    const row: (0|1)[] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      const dr = r - startRow;
      const dc = c - startCol;
      if (dr >= 0 && dr < dRows && dc >= 0 && dc < dCols) {
        row.push(d[dr][dc] as 0|1);
      } else {
        row.push(0);
      }
    }
    rows.push(row);
  }
  return rows;
}

// Pre-build all grids
const GRIDS = Object.fromEntries(
  DESIGN_KEYS.map(k => [k, buildFullGrid(k)])
) as Record<typeof DESIGN_KEYS[number], (0|1)[][]>;

export function PixelFooter() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx]       = useState(1);
  // Each dot has its own opacity transitioning from current to next
  const [dots, setDots] = useState<number[][]>(() =>
    GRIDS[DESIGN_KEYS[0]].map(row => [...row])
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      const next = (currentIdx + 1) % DESIGN_KEYS.length;
      const nextGrid = GRIDS[DESIGN_KEYS[next]];
      // Animate each dot individually with random delay
      const flat = nextGrid.flatMap((row, r) =>
        row.map((val, c) => ({ r, c, val, delay: Math.random() * 1200 }))
      );
      flat.forEach(({ r, c, val, delay }) => {
        setTimeout(() => {
          setDots(prev => {
            const n = prev.map(row => [...row]);
            n[r][c] = val;
            return n;
          });
        }, delay);
      });
      setCurrentIdx(next);
      setNextIdx((next + 1) % DESIGN_KEYS.length);
    };

    timerRef.current = setInterval(cycle, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentIdx]);

  return (
    <div
      className="w-full overflow-hidden"
      style={{ background: "var(--ink-bg2)", borderRadius: "0 0 24px 24px", paddingTop: "12px", paddingBottom: "4px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gap: "3px",
          padding: "0 8px",
        }}
      >
        {dots.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "50%",
                background: val === 1 ? "var(--ink-fg)" : "var(--ink-border)",
                transition: "background 0.4s ease",
                minWidth: 0,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
