"use client";

import { useEffect, useRef, useId } from "react";
import OrbisIcon from "./OrbisIcon";

interface RevealLine {
  text: string;
  color: "gold" | "white";
  /** If true, render as solid text (no outline/fill effect) */
  solid?: boolean;
  /** Override font weight */
  weight?: number;
  /** Override font size class */
  sizeClass?: string;
}

interface RevealBlock {
  lines: RevealLine[];
  /** Show OrbisIcon between this block and the next */
  showOrbisAfter?: boolean;
}

const BLOCKS: RevealBlock[] = [
  {
    lines: [
      { text: "Non creiamo", color: "gold" },
      { text: "contenuti.", color: "gold" },
    ],
    showOrbisAfter: true,
  },
  {
    lines: [
      { text: "Creiamo", color: "white" },
      { text: "clienti.", color: "white" },
    ],
  },
  {
    lines: [
      { text: "Pensiamo in", color: "gold" },
      { text: "strategia.", color: "gold" },
    ],
    showOrbisAfter: true,
  },
  {
    lines: [
      {
        text: "Non in post.",
        color: "white",
        solid: true,
        weight: 900,
        sizeClass: "text-[clamp(56px,12vw,140px)]",
      },
    ],
  },
];

function RevealWord({
  text,
  color,
  patternId,
  solid,
  weight,
  sizeClass,
}: RevealLine & { patternId: string }) {
  const fillColor = color === "gold" ? "#C9A84C" : "#E8ECF0";
  const strokeColor = color === "gold" ? "#C9A84C" : "#E8ECF0";

  if (solid) {
    return (
      <h3
        className={`reveal-text-wrapper ${sizeClass || ""}`}
        style={{
          fontWeight: weight || 800,
          color: fillColor,
        }}
      >
        {text}
      </h3>
    );
  }

  return (
    <h3 className="reveal-text-wrapper">
      <span
        className="reveal-text-outline"
        style={{
          WebkitTextStroke: `1.5px ${strokeColor}`,
          color: "transparent",
        }}
      >
        {text}
        <svg
          className="reveal-text-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              <rect
                className="reveal-fill-rect"
                data-fill-color={fillColor}
                width="100%"
                height="0%"
                y="100%"
                fill={fillColor}
              />
            </pattern>
          </defs>
          <text
            x="0"
            y="84%"
            className="reveal-text-filled"
            style={{
              fill: `url(#${patternId})`,
              fontWeight: weight || 800,
            }}
          >
            {text}
          </text>
        </svg>
      </span>
    </h3>
  );
}

export default function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>(".reveal-block");

    let rafId: number;

    function updateFill() {
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // Progress: 0 when section enters viewport bottom, 1 when it exits top
        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
        );

        const fills = section.querySelectorAll<SVGRectElement>(".reveal-fill-rect");
        fills.forEach((fill, index) => {
          // Stagger: each word fills with a slight delay
          const staggeredProgress = Math.max(
            0,
            Math.min(1, (progress - index * 0.05) / 0.5)
          );
          const pct = staggeredProgress * 100;
          fill.setAttribute("height", `${pct}%`);
          fill.setAttribute("y", `${100 - pct}%`);
        });
      });

      rafId = requestAnimationFrame(updateFill);
    }

    rafId = requestAnimationFrame(updateFill);
    return () => cancelAnimationFrame(rafId);
  }, []);

  let patternCounter = 0;

  return (
    <section ref={containerRef} className="reveal-container bg-[#0C1B2A]">
      {BLOCKS.map((block, blockIndex) => {
        const isLastPair = blockIndex >= 2;
        const bg = isLastPair ? "bg-[#091520]" : "bg-[#0C1B2A]";

        return (
          <div key={blockIndex}>
            <div
              className={`reveal-block min-h-[60vh] flex items-center justify-center ${bg}`}
              style={{ position: "relative" }}
            >
              <div className="w-full max-w-[1200px] px-6 sm:px-12 lg:px-20">
                {block.lines.map((line) => {
                  const pid = `pattern-${uniqueId}-${patternCounter++}`;
                  return (
                    <RevealWord key={pid} {...line} patternId={pid} />
                  );
                })}
              </div>
            </div>

            {block.showOrbisAfter && (
              <div
                className={`flex items-center justify-center h-[20vh] ${bg}`}
              >
                <OrbisIcon size={64} color="#C9A84C" className="opacity-20" />
              </div>
            )}
          </div>
        );
      })}

      {/* Inline styles for the reveal effect */}
      <style jsx global>{`
        .reveal-text-wrapper {
          margin: 0;
          font-family: var(--font-outfit), "Outfit", sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 10vw, 120px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          position: relative;
        }

        .reveal-text-outline {
          position: relative;
          display: block;
        }

        .reveal-text-svg {
          position: absolute;
          top: -5%;
          left: 0;
          width: 100%;
          height: 110%;
          pointer-events: none;
          overflow: visible;
        }

        .reveal-text-filled {
          font-family: var(--font-outfit), "Outfit", sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 10vw, 120px);
          letter-spacing: -0.03em;
        }
      `}</style>
    </section>
  );
}
