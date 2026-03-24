"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const HIGHLIGHT_IDS: Record<
  string,
  { name: string; desc: string; year: string; key: string }
> = {
  "076": {
    name: "BRASILE",
    desc: "Dove tutto è iniziato",
    year: "2018",
    key: "br",
  },
  "620": {
    name: "PORTOGALLO",
    desc: "Dove siamo cresciuti",
    year: "2025",
    key: "pt",
  },
  "380": {
    name: "ITALIA",
    desc: "Dove siamo adesso",
    year: "2026",
    key: "it",
  },
};

function getLabelOffset(
  key: string,
  isMobile: boolean
): { dx: number; dy: number; anchor: string } {
  if (isMobile) {
    if (key === "br") return { dx: 10, dy: 40, anchor: "start" };
    if (key === "pt") return { dx: 0, dy: 35, anchor: "middle" };
    return { dx: 15, dy: -30, anchor: "start" };
  }
  if (key === "br") return { dx: -10, dy: 50, anchor: "start" };
  if (key === "pt") return { dx: 0, dy: 45, anchor: "end" };
  return { dx: 25, dy: -25, anchor: "start" };
}

function quadBezier(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  curvature: number
): string {
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const cx = mx - dy * curvature;
  const cy = my + dx * curvature;
  return `M ${x0},${y0} Q ${cx},${cy} ${x1},${y1}`;
}

export default function HeroMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 640;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const projection = d3
      .geoNaturalEarth1()
      .center(isMobile ? [-18, 12] : [-20, 15])
      .scale(width * (isMobile ? 0.38 : 0.28))
      .translate([width / 2, isMobile ? height * 0.40 : height * 0.45]);

    const pathGenerator = d3.geoPath().projection(projection);

    fetch("/geo/world-110m.json")
      .then((res) => res.json())
      .then((topo: Topology) => {
        const countriesGeo = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        );

        const features = (countriesGeo as GeoJSON.FeatureCollection).features;

        const baseCountries = features.filter(
          (f) => !HIGHLIGHT_IDS[f.id as string]
        );
        const highlightCountries = features.filter(
          (f) => HIGHLIGHT_IDS[f.id as string]
        );

        // Clear SVG
        d3.select(svg).selectAll("*").remove();

        const root = d3.select(svg);

        // --- Layer 1: Base countries ---
        const baseGroup = root.append("g").attr("class", "map-base");
        baseGroup
          .selectAll("path")
          .data(baseCountries)
          .enter()
          .append("path")
          .attr(
            "d",
            (d) => pathGenerator(d as d3.GeoPermissibleObjects) || ""
          )
          .attr("fill", "#0F1D2C")
          .attr("stroke", "#2D3D50")
          .attr("stroke-width", 0.3)
          .attr("opacity", 0.3);

        // --- Highlight countries ---
        const hlGroup = root.append("g").attr("class", "map-highlights");
        highlightCountries.forEach((feature) => {
          const info = HIGHLIGHT_IDS[feature.id as string];
          if (!info) return;

          hlGroup
            .append("path")
            .attr(
              "d",
              pathGenerator(feature as d3.GeoPermissibleObjects) || ""
            )
            .attr("fill", "#152a3d")
            .attr("stroke", "#3a5068")
            .attr("stroke-width", 0.6)
            .attr("class", `country-hl country-${info.key}`);
        });

        // --- Calculate centroids ---
        const centroids: Record<string, [number, number]> = {};
        highlightCountries.forEach((feature) => {
          const info = HIGHLIGHT_IDS[feature.id as string];
          if (!info) return;
          const centroid = d3.geoCentroid(
            feature as d3.GeoPermissibleObjects
          );
          const projected = projection(centroid);
          if (projected) {
            centroids[info.key] = projected;
          }
        });

        // --- Layer 3: Arcs ---
        const arcGroup = root.append("g").attr("class", "map-arcs");

        if (centroids.br && centroids.pt) {
          const arcPath = quadBezier(
            centroids.br[0],
            centroids.br[1],
            centroids.pt[0],
            centroids.pt[1],
            -0.3
          );
          arcGroup
            .append("path")
            .attr("d", arcPath)
            .attr("class", "arc-trace arc-1")
            .attr("stroke", "#C9A84C")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.7);
        }

        if (centroids.pt && centroids.it) {
          const arcPath = quadBezier(
            centroids.pt[0],
            centroids.pt[1],
            centroids.it[0],
            centroids.it[1],
            -0.25
          );
          arcGroup
            .append("path")
            .attr("d", arcPath)
            .attr("class", "arc-trace arc-2")
            .attr("stroke", "#C9A84C")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.7);
        }

        // --- Layer 3b: Glows ---
        // Use nested <g> elements: outer <g> has D3 position, inner <g> has CSS animation class
        // This prevents CSS transform from overriding D3 translate
        const glowGroup = root.append("g").attr("class", "map-glows");

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centroids[key];
          if (!c) return;

          // Outer group: D3 positioning (transform: translate)
          const posGroup = glowGroup
            .append("g")
            .attr("transform", `translate(${c[0]}, ${c[1]})`);

          // Inner group: CSS animation (opacity only, no transform)
          const g = posGroup
            .append("g")
            .attr("class", `glow-group glow-${key}`);

          // Outer glow
          g.append("circle")
            .attr("r", isMobile ? 20 : 30)
            .attr("fill", "#C9A84C")
            .attr("opacity", 0.08);
          // Medium glow
          g.append("circle")
            .attr("r", isMobile ? 12 : 18)
            .attr("fill", "#C9A84C")
            .attr("opacity", 0.15);
          // Inner point (breathing)
          g.append("circle")
            .attr("r", isMobile ? 4 : 5)
            .attr("fill", "#C9A84C")
            .attr("opacity", 0.9)
            .attr("class", `point-breathe point-breathe-${key}`);
        });

        // --- Layer 4: Labels ---
        // Same nested <g> approach: outer for D3 position, inner for CSS animation
        const labelGroup = root.append("g").attr("class", "map-labels");

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centroids[key];
          if (!c) return;

          const entry = Object.values(HIGHLIGHT_IDS).find(
            (h) => h.key === key
          );
          if (!entry) return;

          const offset = getLabelOffset(key, isMobile);

          // Outer group: D3 positioning (transform: translate)
          const posGroup = labelGroup
            .append("g")
            .attr(
              "transform",
              `translate(${c[0] + offset.dx}, ${c[1] + offset.dy})`
            );

          // Inner group: CSS animation (opacity only, no transform)
          const lg = posGroup
            .append("g")
            .attr("class", `map-label label-${key}`);

          lg.append("text")
            .text(entry.name)
            .attr("fill", "#C9A84C")
            .attr("font-size", isMobile ? 11 : 13)
            .attr("font-weight", 600)
            .attr("letter-spacing", "0.05em")
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", offset.anchor);

          lg.append("text")
            .text(entry.desc)
            .attr("y", isMobile ? 14 : 16)
            .attr("fill", "#8A97A8")
            .attr("font-size", isMobile ? 9 : 11)
            .attr("font-weight", 300)
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", offset.anchor);

          lg.append("text")
            .text(entry.year)
            .attr("y", isMobile ? 26 : 30)
            .attr("fill", "#C9A84C")
            .attr("font-size", isMobile ? 9 : 10)
            .attr("font-weight", 600)
            .attr("opacity", 0.7)
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", offset.anchor);
        });

        setReady(true);
      });
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-map-section relative h-screen w-full overflow-hidden bg-orbius-navy"
    >
      {/* SVG Map */}
      <svg
        ref={svgRef}
        className={`absolute inset-0 w-full h-full map-fade-in ${ready ? "map-visible" : ""}`}
        preserveAspectRatio="none"
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #0C1B2A 100%)",
        }}
      />

      {/* Headline */}
      <div className="hero-headline absolute bottom-[120px] sm:bottom-[15%] left-0 right-0 text-center px-4">
        <h1
          className="font-outfit font-[900] text-orbius-white leading-[0.95]"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="text-[clamp(32px,5vw,64px)] block">
            Facciamo{" "}
            <span className="text-orbius-gold">brillare</span>
            <br />
            la tua attività.
          </span>
        </h1>
        <p className="font-outfit font-light text-orbius-gray300 text-base mt-3 max-w-lg mx-auto">
          Da São Paulo a Milano. Un&apos;agenzia che parla la lingua del tuo
          business.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold" />
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
      </div>

      {/* Animation styles — IMPORTANT: no transform in label/glow animations
          to avoid overriding D3's transform: translate() positioning */}
      <style jsx>{`
        .map-fade-in {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        .map-visible {
          opacity: 1;
        }

        /* Country highlights — safe: uses fill/stroke, not transform */
        :global(.country-hl) {
          transition: fill 1s ease, stroke 1s ease;
        }
        :global(.country-br) {
          animation: highlightCountry 1s ease-out 0.5s forwards;
        }
        :global(.country-pt) {
          animation: highlightCountry 1s ease-out 3.5s forwards;
        }
        :global(.country-it) {
          animation: highlightCountry 1s ease-out 6.0s forwards;
        }

        @keyframes highlightCountry {
          to {
            fill: #1e3a52;
            stroke: rgba(201, 168, 76, 0.35);
            stroke-width: 1px;
          }
        }

        /* Glow groups — opacity only, NO transform (position is on parent <g>) */
        :global(.glow-group) {
          opacity: 0;
        }
        :global(.glow-br) {
          animation: fadeInOpacity 0.8s ease-out 0.8s forwards;
        }
        :global(.glow-pt) {
          animation: fadeInOpacity 0.8s ease-out 3.8s forwards;
        }
        :global(.glow-it) {
          animation: fadeInOpacity 0.8s ease-out 6.3s forwards;
        }

        @keyframes fadeInOpacity {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Breathing points */
        :global(.point-breathe) {
          animation: breathe 4s ease-in-out infinite;
        }
        :global(.point-breathe-br) {
          animation-delay: 1.6s;
        }
        :global(.point-breathe-pt) {
          animation-delay: 4.6s;
        }
        :global(.point-breathe-it) {
          animation-delay: 7.1s;
        }

        @keyframes breathe {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Arc tracing — safe: uses stroke-dashoffset, not transform */
        :global(.arc-trace) {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          fill: none;
        }
        :global(.arc-1) {
          animation: traceArc 2s ease-out 1.5s forwards;
        }
        :global(.arc-2) {
          animation: traceArc 1.5s ease-out 4.8s forwards;
        }

        @keyframes traceArc {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Labels — opacity only, NO transform (position is on parent <g>) */
        :global(.map-label) {
          opacity: 0;
        }
        :global(.label-br) {
          animation: fadeInOpacity 0.8s ease-out 1s forwards;
        }
        :global(.label-pt) {
          animation: fadeInOpacity 0.8s ease-out 4s forwards;
        }
        :global(.label-it) {
          animation: fadeInOpacity 0.8s ease-out 6.5s forwards;
        }

        /* Headline — this is a regular HTML div, transform is safe here */
        .hero-headline {
          opacity: 0;
          animation: fadeInUp 1s ease-out 8s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scroll dots */
        .scroll-dots {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 9s forwards;
        }
      `}</style>
    </section>
  );
}
