"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-orbius-navy2/95 backdrop-blur-md border-t border-orbius-gold/20 py-3 px-4 animate-slide-up">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <p className="text-orbius-white text-sm font-medium">
          <span className="text-orbius-gold">&#10022;</span> 3 posti rimasti per
          Aprile 2026
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-orbius-gold text-orbius-navy px-5 py-2 rounded-xl text-sm font-bold hover:bg-orbius-goldLight transition-colors"
        >
          Prenota Ora &rarr;
        </a>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
