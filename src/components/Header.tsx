"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import OrbisIcon from "./OrbisIcon";
import { WHATSAPP_URL } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#lavori", label: "Lavori" },
  { href: "/offerta", label: "Offerta" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-orbius-navy/80 backdrop-blur-md border-b border-orbius-gray700/20"
          : "bg-transparent"
      }`}
      animate={{ y: 0 }}
      initial={{ y: -100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span className="font-outfit font-extrabold text-sm tracking-wide text-orbius-white group-hover:text-orbius-gold transition-colors">
              ORBIUS
              <span className="text-orbius-gold">.AGENCY</span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-outfit font-light text-xs text-orbius-gray500 hover:text-orbius-gold transition-colors uppercase tracking-widest"
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
            className="hidden md:flex items-center gap-2 text-orbius-gold font-outfit font-light text-xs uppercase tracking-widest hover:underline underline-offset-2 transition-all"
          >
            Parliamo
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-orbius-gray300 hover:text-orbius-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-orbius-navy border-b border-orbius-gray700/20"
        >
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-outfit font-light text-xs text-orbius-gray300 hover:text-orbius-gold transition-colors uppercase tracking-widest py-2"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-outfit font-light text-xs text-orbius-gold uppercase tracking-widest pt-2"
            >
              <MessageCircle size={14} />
              Parliamo
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
