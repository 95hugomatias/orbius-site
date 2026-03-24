"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const HIGHLIGHT_IDS: Record<
  string,
  { name: string; desc: string; year: string; key: string }
> = {
  "076": { name: "BRASILE", desc: "Dove tutto è iniziato", year: "2018", key: "br" },
  "620": { name: "PORTOGALLO", desc: "Dove siamo cresciuti", year: "2025", key: "pt" },
  "380": { name: "ITALIA", desc: "Dove siamo adesso", year: "2026", key: "it" },
};

function getLabelOffset(
  key: string,
  isMobile: boolean
): { dx: number; dy: number; anchor: string } {
  if (isMobile) {
    if (key === "br") return { dx: -50, dy: -15, anchor: "end" };
    if (key === "pt") return { dx: 0, dy: 35, anchor: "middle" };
    return { dx: 15, dy: -30, anchor: "start" };
  }
  if (key === "br") return { dx: -70, dy: -40, anchor: "end" };
  if (key === "pt") return { dx: 0, dy: 45, anchor: "end" };
  return { dx: 25, dy: -25, anchor: "start" };
}

function quadBezier(
  x0: number, y0: number, x1: number, y1: number, curvature: number
): string {
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const cx = mx - dy * curvature;
  const cy = my + dx * curvature;
  return `M ${x0},${y0} Q ${cx},${cy} ${x1},${y1}`;
}

// Animation timeline (milliseconds)
const T = {
  mapFade: 500,
  brHighlight: 500,
  brGlow: 800,
  brLabel: 1000,
  arc1Start: 1500,
  arc1Duration: 2000,
  ptHighlight: 3500,
  ptGlow: 3800,
  ptLabel: 4000,
  arc2Start: 4800,
  arc2Duration: 1500,
  itHighlight: 6000,
  itGlow: 6300,
  itLabel: 6500,
  headline: 8000,
  scrollDots: 9000,
};

export default function HeroMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showDots, setShowDots] = useState(false);

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
      .translate([width / 2, isMobile ? height * 0.38 : height * 0.40]);

    const pathGenerator = d3.geoPath().projection(projection);

    fetch("/geo/world-110m.json")
      .then((res) => res.json())
      .then((topo: Topology) => {
        const countriesGeo = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        );
        const features = (countriesGeo as GeoJSON.FeatureCollection).features;
        const baseCountries = features.filter((f) => !HIGHLIGHT_IDS[f.id as string]);
        const highlightCountries = features.filter((f) => HIGHLIGHT_IDS[f.id as string]);

        d3.select(svg).selectAll("*").remove();
        const root = d3.select(svg);

        // Fade in the whole SVG
        d3.select(svg).style("opacity", "0")
          .transition().duration(500).style("opacity", "1");

        // --- Base countries ---
        root.append("g")
          .selectAll("path")
          .data(baseCountries)
          .enter()
          .append("path")
          .attr("d", (d) => pathGenerator(d as d3.GeoPermissibleObjects) || "")
          .attr("fill", "#0F1D2C")
          .attr("stroke", "#2D3D50")
          .attr("stroke-width", 0.3)
          .attr("opacity", 0.3);

        // --- Highlighted countries (start dark, animate brighter) ---
        const hlPaths: Record<string, d3.Selection<SVGPathElement, unknown, null, undefined>> = {};
        highlightCountries.forEach((feature) => {
          const info = HIGHLIGHT_IDS[feature.id as string];
          if (!info) return;
          const path = root.append("g").append("path")
            .attr("d", pathGenerator(feature as d3.GeoPermissibleObjects) || "")
            .attr("fill", "#152a3d")
            .attr("stroke", "#3a5068")
            .attr("stroke-width", 0.6);
          hlPaths[info.key] = path;
        });

        // --- Calculate centroids ---
        const centroids: Record<string, [number, number]> = {};
        highlightCountries.forEach((feature) => {
          const info = HIGHLIGHT_IDS[feature.id as string];
          if (!info) return;
          const centroid = d3.geoCentroid(feature as d3.GeoPermissibleObjects);
          const projected = projection(centroid);
          if (projected) centroids[info.key] = projected;
        });

        // --- Animate country highlights ---
        const hlTimings: Record<string, number> = {
          br: T.brHighlight, pt: T.ptHighlight, it: T.itHighlight,
        };
        Object.entries(hlTimings).forEach(([key, delay]) => {
          hlPaths[key]?.transition().delay(delay).duration(1000)
            .attr("fill", "#1e3a52")
            .attr("stroke", "rgba(201, 168, 76, 0.35)")
            .attr("stroke-width", 1);
        });

        // --- Arcs (draw with stroke-dashoffset) ---
        const arcGroup = root.append("g");

        function drawArc(
          from: [number, number], to: [number, number],
          curvature: number, delay: number, duration: number
        ) {
          const arcPath = quadBezier(from[0], from[1], to[0], to[1], curvature);
          const arc = arcGroup.append("path")
            .attr("d", arcPath)
            .attr("stroke", "#C9A84C")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.7)
            .attr("fill", "none");

          // Get the total length for dash animation
          const totalLength = (arc.node() as SVGPathElement).getTotalLength();
          arc
            .attr("stroke-dasharray", totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .delay(delay)
            .duration(duration)
            .ease(d3.easeQuadOut)
            .attr("stroke-dashoffset", 0);
        }

        if (centroids.br && centroids.pt) {
          drawArc(centroids.br, centroids.pt, -0.3, T.arc1Start, T.arc1Duration);
        }
        if (centroids.pt && centroids.it) {
          drawArc(centroids.pt, centroids.it, -0.25, T.arc2Start, T.arc2Duration);
        }

        // --- Glows ---
        const glowTimings: Record<string, number> = {
          br: T.brGlow, pt: T.ptGlow, it: T.itGlow,
        };

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centroids[key];
          if (!c) return;

          const g = root.append("g")
            .attr("transform", `translate(${c[0]}, ${c[1]})`)
            .style("opacity", "0");

          // Outer
          g.append("circle").attr("r", isMobile ? 20 : 30)
            .attr("fill", "#C9A84C").attr("opacity", 0.08);
          // Medium
          g.append("circle").attr("r", isMobile ? 12 : 18)
            .attr("fill", "#C9A84C").attr("opacity", 0.15);
          // Inner
          g.append("circle").attr("r", isMobile ? 4 : 5)
            .attr("fill", "#C9A84C").attr("opacity", 0.9);

          // Fade in glow
          g.transition()
            .delay(glowTimings[key])
            .duration(800)
            .style("opacity", "1");
        });

        // --- Labels ---
        const labelTimings: Record<string, number> = {
          br: T.brLabel, pt: T.ptLabel, it: T.itLabel,
        };

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centroids[key];
          if (!c) return;
          const entry = Object.values(HIGHLIGHT_IDS).find((h) => h.key === key);
          if (!entry) return;
          const offset = getLabelOffset(key, isMobile);

          const lg = root.append("g")
            .attr("transform", `translate(${c[0] + offset.dx}, ${c[1] + offset.dy})`)
            .style("opacity", "0");

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

          // Fade in label
          lg.transition()
            .delay(labelTimings[key])
            .duration(800)
            .style("opacity", "1");
        });

        // --- Show headline and dots via React state ---
        setTimeout(() => setShowHeadline(true), T.headline);
        setTimeout(() => setShowDots(true), T.scrollDots);
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
        className="absolute inset-0 w-full h-full"
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
      <div
        className={`absolute bottom-[120px] sm:bottom-[15%] left-0 right-0 text-center px-4 transition-all duration-1000 ${
          showHeadline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
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
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 transition-opacity duration-600 ${
          showDots ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold animate-bounce" />
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
      </div>
    </section>
  );
}
