"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import OrbisIcon from "./OrbisIcon";

interface NarrativeSectionProps {
  titleSolid: string;
  titleOutline: string;
  body: string;
  children?: React.ReactNode;
  bg?: string;
  /** Show large decorative OrbisIcon in background */
  showBackgroundIcon?: boolean;
}

export default function NarrativeSection({
  titleSolid,
  titleOutline,
  body,
  children,
  bg = "#0A1018",
  showBackgroundIcon = false,
}: NarrativeSectionProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Background decorative icon */}
      {showBackgroundIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <OrbisIcon
            size={360}
            color="#C9A84C"
            className="opacity-[0.04]"
          />
        </div>
      )}

      <div className="relative z-10 max-w-[860px] mx-auto px-6 sm:px-12 py-28 sm:py-36">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-outfit leading-[1.0] mb-0"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
              color: "#C9A84C",
            }}
          >
            {titleSolid}
          </h2>
          <h2
            className="font-outfit leading-[1.0]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
              WebkitTextStroke: "1.5px #C9A84C",
              color: "transparent",
            }}
          >
            {titleOutline}
          </h2>
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-outfit font-light text-base leading-[1.7] text-[#8A97A8] max-w-[600px] mt-8"
        >
          {body}
        </motion.p>

        {/* Optional children (e.g., WorkGrid content) */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
