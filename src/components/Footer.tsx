import Link from "next/link";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import OrbisIcon from "./OrbisIcon";
import { WHATSAPP_URL, EMAIL, INSTAGRAM } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-orbius-navy2 border-t border-orbius-gray700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <OrbisIcon size={28} />
              <span className="font-extrabold text-lg tracking-tight text-orbius-white">
                ORBIUS AGENCY
              </span>
            </div>
            <p className="text-orbius-gray300 text-sm leading-relaxed">
              Trasformiamo la presenza social della tua attività in una macchina
              che porta clienti ogni giorno.
            </p>
          </div>

          {/* Column 2 — Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gray500 mb-4">
              Link Rapidi
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/offerta", label: "Offerta" },
                { href: "/blog", label: "Blog" },
                { href: "/contatti", label: "Contatti" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gray500 mb-4">
              Contatti
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm"
                >
                  <Mail size={16} />
                  {EMAIL}
                </a>
              </li>
              <li>
                {/* TODO: Sostituire con link Instagram reale */}
                <a
                  href="#"
                  className="flex items-center gap-2 text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm"
                >
                  <Instagram size={16} />
                  {INSTAGRAM}
                </a>
              </li>
              <li>
                {/* TODO: Sostituire con link LinkedIn reale */}
                <a
                  href="#"
                  className="flex items-center gap-2 text-orbius-gray300 hover:text-orbius-gold transition-colors text-sm"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-orbius-gray700/20 text-center text-orbius-gray500 text-xs">
          {/* TODO: Sostituire P.IVA con valore reale */}
          <p>
            &copy; 2026 Orbius Agency &middot; P.IVA XXXXXXXXX &middot; Tutti i
            diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}
