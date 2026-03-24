"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const COUNTRIES = {
  "076": { name: "BRASILE", desc: "Dove tutto è iniziato", year: "2018", key: "br" },
  "620": { name: "PORTOGALLO", desc: "Dove siamo cresciuti", year: "2025", key: "pt" },
  "380": { name: "ITALIA", desc: "Dove siamo adesso", year: "2026", key: "it" },
};

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

// Animation timeline (ms)
const T = {
  brHighlight: 500, brGlow: 800, brLabel: 1000,
  arc1Start: 1500, arc1Duration: 2000,
  ptHighlight: 3500, ptGlow: 3800, ptLabel: 4000,
  arc2Start: 4800, arc2Duration: 1500,
  itHighlight: 6000, itGlow: 6300, itLabel: 6500,
  headline: 8000, scrollDots: 9000,
};

// Layout config per country — positions as % of viewport
function getLayout(isMobile: boolean) {
  if (isMobile) {
    return {
      br: { cx: 0.22, cy: 0.30, scale: 500, labelDx: 0, labelDy: -16, anchor: "middle" as const },
      pt: { cx: 0.55, cy: 0.18, scale: 1600, labelDx: 0, labelDy: -12, anchor: "middle" as const },
      it: { cx: 0.82, cy: 0.22, scale: 1000, labelDx: 0, labelDy: -12, anchor: "middle" as const },
    };
  }
  return {
    br: { cx: 0.18, cy: 0.38, scale: 600, labelDx: 0, labelDy: -22, anchor: "middle" as const },
    pt: { cx: 0.50, cy: 0.28, scale: 2200, labelDx: 0, labelDy: -18, anchor: "middle" as const },
    it: { cx: 0.78, cy: 0.25, scale: 1400, labelDx: 0, labelDy: -20, anchor: "middle" as const },
  };
}

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
    const layout = getLayout(isMobile);

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    fetch("/geo/world-110m.json")
      .then((res) => res.json())
      .then((topo: Topology) => {
        const countriesGeo = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        );
        const features = (countriesGeo as GeoJSON.FeatureCollection).features;

        // Only get our 3 countries
        const countryFeatures: Record<string, GeoJSON.Feature> = {};
        features.forEach((f) => {
          const id = f.id as string;
          if (COUNTRIES[id as keyof typeof COUNTRIES]) {
            const info = COUNTRIES[id as keyof typeof COUNTRIES];
            countryFeatures[info.key] = f;
          }
        });

        d3.select(svg).selectAll("*").remove();
        const root = d3.select(svg);

        // Fade in SVG
        d3.select(svg).style("opacity", "0")
          .transition().duration(500).style("opacity", "1");

        // Center points for arcs/glows (in pixel space)
        const centers: Record<string, [number, number]> = {};

        // --- Render each country with its own projection ---
        const hlTimings: Record<string, number> = {
          br: T.brHighlight, pt: T.ptHighlight, it: T.itHighlight,
        };

        (["br", "pt", "it"] as const).forEach((key) => {
          const feature = countryFeatures[key];
          if (!feature) return;

          const lay = layout[key];
          const centerCoord = d3.geoCentroid(feature as d3.GeoPermissibleObjects);

          // Individual projection centered on each country
          const proj = d3.geoMercator()
            .center(centerCoord)
            .scale(lay.scale)
            .translate([width * lay.cx, height * lay.cy]);

          const pathGen = d3.geoPath().projection(proj);

          // Store center pixel position
          const projected = proj(centerCoord);
          if (projected) centers[key] = projected;

          // Draw country path
          const path = root.append("path")
            .attr("d", pathGen(feature as d3.GeoPermissibleObjects) || "")
            .attr("fill", "#132438")
            .attr("stroke", "#2a4560")
            .attr("stroke-width", 0.8)
            .attr("opacity", 0.4);

          // Animate highlight
          path.transition()
            .delay(hlTimings[key])
            .duration(1000)
            .attr("fill", "#1e3a52")
            .attr("stroke", "rgba(201, 168, 76, 0.4)")
            .attr("stroke-width", 1.2)
            .attr("opacity", 0.9);
        });

        // --- Arcs ---
        function drawArc(
          from: [number, number], to: [number, number],
          curvature: number, delay: number, duration: number
        ) {
          const arcPath = quadBezier(from[0], from[1], to[0], to[1], curvature);
          const arc = root.append("path")
            .attr("d", arcPath)
            .attr("stroke", "#C9A84C")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.7)
            .attr("fill", "none");

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

        if (centers.br && centers.pt) {
          drawArc(centers.br, centers.pt, -0.3, T.arc1Start, T.arc1Duration);
        }
        if (centers.pt && centers.it) {
          drawArc(centers.pt, centers.it, -0.25, T.arc2Start, T.arc2Duration);
        }

        // --- Glows ---
        const glowTimings: Record<string, number> = {
          br: T.brGlow, pt: T.ptGlow, it: T.itGlow,
        };

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centers[key];
          if (!c) return;

          const glowSize = key === "br" ? (isMobile ? 25 : 35) : (isMobile ? 18 : 25);

          const g = root.append("g")
            .attr("transform", `translate(${c[0]}, ${c[1]})`)
            .style("opacity", "0");

          g.append("circle").attr("r", glowSize).attr("fill", "#C9A84C").attr("opacity", 0.06);
          g.append("circle").attr("r", glowSize * 0.6).attr("fill", "#C9A84C").attr("opacity", 0.12);
          g.append("circle").attr("r", isMobile ? 4 : 5).attr("fill", "#C9A84C").attr("opacity", 0.9);

          g.transition().delay(glowTimings[key]).duration(800).style("opacity", "1");
        });

        // --- Labels ---
        const labelTimings: Record<string, number> = {
          br: T.brLabel, pt: T.ptLabel, it: T.itLabel,
        };

        (["br", "pt", "it"] as const).forEach((key) => {
          const c = centers[key];
          if (!c) return;
          const info = Object.values(COUNTRIES).find((h) => h.key === key);
          if (!info) return;
          const lay = layout[key];

          const lg = root.append("g")
            .attr("transform", `translate(${c[0] + lay.labelDx}, ${c[1] + lay.labelDy})`)
            .style("opacity", "0");

          lg.append("text")
            .text(info.name)
            .attr("fill", "#C9A84C")
            .attr("font-size", isMobile ? 11 : 13)
            .attr("font-weight", 600)
            .attr("letter-spacing", "0.05em")
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", lay.anchor);

          lg.append("text")
            .text(info.desc)
            .attr("y", isMobile ? 14 : 16)
            .attr("fill", "#8A97A8")
            .attr("font-size", isMobile ? 9 : 11)
            .attr("font-weight", 300)
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", lay.anchor);

          lg.append("text")
            .text(info.year)
            .attr("y", isMobile ? 26 : 30)
            .attr("fill", "#C9A84C")
            .attr("font-size", isMobile ? 9 : 10)
            .attr("font-weight", 600)
            .attr("opacity", 0.7)
            .attr("font-family", "var(--font-outfit), sans-serif")
            .attr("text-anchor", lay.anchor);

          lg.transition().delay(labelTimings[key]).duration(800).style("opacity", "1");
        });

        // --- Headline + dots ---
        setTimeout(() => setShowHeadline(true), T.headline);
        setTimeout(() => setShowDots(true), T.scrollDots);
      });
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-map-section relative h-screen w-full overflow-hidden bg-orbius-navy"
    >
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
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 20%, #0C1B2A 100%)",
        }}
      />

      {/* Headline */}
      <div
        className={`absolute bottom-[100px] sm:bottom-[12%] left-0 right-0 text-center px-4 transition-all duration-1000 ${
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
