"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface WorkCase {
  id: string;
  business: string;
  city: string;
  metric: string;
  type: string;
}

const WORK_CASES: WorkCase[] = [
  {
    id: "1",
    business: "Ristorante Da Marco",
    city: "Milano",
    metric: "+120% prenotazioni in 3 mesi",
    type: "Social Media Management",
  },
  {
    id: "2",
    business: "Studio Dentistico Bianchi",
    city: "Roma",
    metric: "+85% nuovi pazienti",
    type: "Brand & Social",
  },
  {
    id: "3",
    business: "Boutique Giulia",
    city: "Firenze",
    metric: "+40% vendite online",
    type: "Instagram Strategy",
  },
  {
    id: "4",
    business: "Pizzeria Napoletana",
    city: "Napoli",
    metric: "+200 follower/mese",
    type: "Content Creation",
  },
];

export default function WorkGrid() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 } as any,
    },
  };

  return (
    <div ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-orbius-gray500">
            Lavori Selezionati
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {WORK_CASES.map((caseItem) => (
            <motion.div key={caseItem.id} variants={itemVariants}>
              <div className="group rounded-xl overflow-hidden bg-orbius-navy2 h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="relative aspect-video bg-orbius-navy3 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orbius-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-orbius-gray500 text-sm relative z-10">
                    Instagram feed mockup
                  </span>
                  {/* TODO: Sostituire placeholder con immagini reali dei progetti */}
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-outfit font-medium text-orbius-white text-base mb-2">
                    {caseItem.business}
                  </p>
                  <p className="font-outfit font-semibold text-orbius-gold text-sm mb-3">
                    {caseItem.metric}
                  </p>
                  <p className="font-outfit font-light text-orbius-gray500 text-xs">
                    {caseItem.type}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* All work link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contatti"
            className="inline-flex items-center text-orbius-gold font-outfit font-medium text-sm hover:underline underline-offset-2 transition-all"
          >
            Tutti i lavori →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
