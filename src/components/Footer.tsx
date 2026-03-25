"use client";

import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import OrbisIcon from "./OrbisIcon";
import { WHATSAPP_URL, EMAIL, INSTAGRAM } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-orbius-navy2 border-t border-orbius-gray700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12 pb-12 border-b border-orbius-gray700/20">
          {/* Left: Brand + Icon */}
          <div className="flex items-center gap-3">
            <OrbisIcon size={24} color="#C9A84C" />
            <span className="font-outfit font-extrabold text-xs uppercase tracking-widest text-orbius-white">
              Orbius Agency
            </span>
          </div>

          {/* Center: Nav Links */}
          <div className="flex items-center gap-6 text-xs text-orbius-gray500 font-outfit font-light uppercase tracking-widest">
            <Link href="/" className="hover:text-orbius-gold transition-colors">
              Home
            </Link>
            <span>·</span>
            <Link href="/#visione" className="hover:text-orbius-gold transition-colors">
              Chi Siamo
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-orbius-gold transition-colors">
              Blog
            </Link>
            <span>·</span>
            <Link href="/contatti" className="hover:text-orbius-gold transition-colors">
              Contatti
            </Link>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-4">
            {/* TODO: Sostituire con link Instagram reale */}
            <a
              href="#"
              className="text-orbius-gray500 hover:text-orbius-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            {/* TODO: Sostituire con link LinkedIn reale */}
            <a
              href="#"
              className="text-orbius-gray500 hover:text-orbius-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center text-xs text-orbius-gray500 font-outfit font-light">
          {/* TODO: Sostituire P.IVA con valore reale */}
          <p>&copy; 2026 Orbius Agency · P.IVA XXXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
