"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrbisIcon from "./OrbisIcon";
import RevealText from "./RevealText";

export default function Manifesto() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-40 bg-orbius-navy px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main text — 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <RevealText
              delay={0}
              className="font-outfit font-[800] text-[clamp(28px,4vw,48px)] leading-[1.2] text-orbius-white space-y-12"
            >
              {`Non siamo un'agenzia
che pubblica post.
Siamo strateghi che trasformano
la tua presenza digitale
in clienti reali.`}
            </RevealText>

            {/* Highlight */}
            <div className="mt-12 space-y-4">
              <style jsx>{`
                .highlight-gold {
                  background: linear-gradient(
                    120deg,
                    #C9A84C,
                    #DFC06A,
                    #C9A84C
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
              `}</style>
              <p className="font-outfit font-[800] text-[clamp(28px,4vw,48px)] leading-[1.2]">
                <span className="highlight-gold">
                  pubblica post
                </span>
              </p>
              <p className="font-outfit font-[800] text-[clamp(28px,4vw,48px)] leading-[1.2]">
                <span className="text-orbius-gray500">in</span>
                <br />
                <span className="highlight-gold">
                  clienti reali.
                </span>
              </p>
            </div>

            {/* Complementary text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 pt-12 border-t border-orbius-gray700/20"
            >
              <p className="font-outfit font-light text-[15px] leading-relaxed text-orbius-gray300 max-w-md">
                Orbius nasce dall&apos;idea che ogni attività merita di brillare
                online. Come i pianeti ruotano attorno a una stella, noi ruotiamo
                attorno al tuo business per farlo risplendere.
              </p>
            </motion.div>
          </div>

          {/* Icon — 1/3 width on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center lg:justify-end items-start pt-8"
          >
            <OrbisIcon size={120} color="#C9A84C" className="opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
