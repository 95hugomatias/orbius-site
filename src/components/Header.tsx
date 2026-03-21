"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import OrbisIcon from "./OrbisIcon";
import { WHATSAPP_URL } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#servizi", label: "Servizi" },
  { href: "/offerta", label: "Offerta" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-orbius-navy/80 backdrop-blur-md border-b border-orbius-gray700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <OrbisIcon size={24} />
            <span className="font-extrabold text-lg tracking-tight text-orbius-white">
              ORBIUS<span className="text-orbius-gold">.AGENCY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-orbius-gold border border-orbius-gold/40 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orbius-gold hover:text-orbius-navy transition-all"
          >
            <MessageCircle size={16} />
            Scrivici
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-orbius-gray300 hover:text-orbius-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-orbius-navy border-b border-orbius-gray700/20">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-orbius-gray300 hover:text-orbius-gold transition-colors text-base font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orbius-gold font-semibold pt-2"
            >
              <MessageCircle size={18} />
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
