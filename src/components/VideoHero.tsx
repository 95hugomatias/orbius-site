"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OrbisIcon from "./OrbisIcon";
import RevealText from "./RevealText";

export default function VideoHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as any,
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video / Placeholder */}
      <div className="absolute inset-0 w-full h-full">
        {/* TODO: Ativar o vídeo quando disponível em /public/video/hero.mp4 */}
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video> */}

        {/* Placeholder: Animated gradient background */}
        <div className="hero-placeholder absolute inset-0 w-full h-full" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orbius-navy/70 via-orbius-navy/80 to-orbius-navy/90" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <OrbisIcon size={44} color="#C9A84C" className="opacity-60" />
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="font-outfit font-[900] text-orbius-white leading-[0.95] tracking-tight">
              <span
                className="text-[clamp(40px,7vw,80px)] block"
                style={{ letterSpacing: "-0.03em" }}
              >
                Facciamo{" "}
                <span className="text-orbius-gold">brillare</span> la tua
                attività.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants}>
            <p className="text-orbius-gray300 font-outfit font-light text-[clamp(16px,2vw,20px)] leading-relaxed">
              Noi i social. Tu il business.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold" />
          <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-orbius-gold/30" />
        </div>
      </motion.div>

      {/* CSS for animated gradient placeholder */}
      <style jsx>{`
        @keyframes heroGlow {
          0% {
            background-position: 50% 50%;
          }
          25% {
            background-position: 30% 40%;
          }
          50% {
            background-position: 70% 60%;
          }
          75% {
            background-position: 40% 70%;
          }
          100% {
            background-position: 50% 50%;
          }
        }
        .hero-placeholder {
          background: radial-gradient(
            ellipse 600px 400px at 50% 50%,
            rgba(201, 168, 76, 0.06),
            transparent
          );
          background-size: 200% 200%;
          animation: heroGlow 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
