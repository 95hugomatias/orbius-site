"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
}: RevealTextProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Split text by line breaks or use regex para quebras naturais
  const lines = children.split("\n").filter((line) => line.trim());

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: delay + lineIndex * 0.15,
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
