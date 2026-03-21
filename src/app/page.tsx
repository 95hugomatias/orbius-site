"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import VideoHero from "@/components/VideoHero";
import WorkGrid from "@/components/WorkGrid";
import Manifesto from "@/components/Manifesto";
import OrbisIcon from "@/components/OrbisIcon";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero Video */}
      <VideoHero />

      {/* Section 2: Work Grid */}
      <WorkGrid />

      {/* Section 3: Manifesto */}
      <Manifesto />

      {/* Section 4: CTA Final */}
      <section className="py-40 bg-orbius-navy2 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <OrbisIcon size={32} color="#C9A84C" />
            </div>

            {/* Heading */}
            <h2 className="font-outfit font-bold text-[clamp(26px,3vw,36px)] leading-tight text-orbius-white">
              Pronto a far{" "}
              <span className="text-orbius-gold">brillare</span> la tua
              attività?
            </h2>

            {/* Subtext */}
            <p className="font-outfit font-light text-orbius-gray300 text-base leading-relaxed">
              Scrivici su WhatsApp. Ti mostriamo cosa possiamo fare. Nessun
              impegno.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <WhatsAppCTA
                text="Scrivici su WhatsApp"
                variant="solid"
                size="lg"
              />
            </div>

            {/* Meta */}
            <p className="text-orbius-gray500 text-xs">
              Risposta entro 2 ore · Nessun impegno
            </p>

            {/* Secondary link */}
            <Link
              href="/offerta"
              className="inline-block text-orbius-gold font-outfit font-medium text-sm hover:underline underline-offset-2 transition-all pt-2"
            >
              Oppure scopri la nostra offerta →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
