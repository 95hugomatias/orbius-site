import type { Metadata } from "next";
import { MessageCircle, Mail, Instagram, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { WHATSAPP_URL, EMAIL, INSTAGRAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contattaci per una consulenza gratuita. Ti rispondiamo entro 2 ore.",
};

export default function ContattiPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-orbius-white mb-4">
              Contattaci
            </h1>
            <p className="text-orbius-gray300 max-w-xl mx-auto">
              Siamo qui per aiutarti. Scrivici e ti rispondiamo entro 2 ore.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-orbius-white mb-6">
                  Come Raggiungerci
                </h2>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-orbius-gold/20 bg-orbius-navy2 hover:border-orbius-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-orbius-gold/10 flex items-center justify-center">
                  <MessageCircle size={24} className="text-orbius-gold" />
                </div>
                <div>
                  <p className="text-orbius-white font-bold group-hover:text-orbius-gold transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-orbius-gray500 text-sm">
                    Il modo più veloce per contattarci
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 p-5 rounded-xl border border-orbius-gray700/25 bg-orbius-navy2 hover:border-orbius-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-orbius-gold/10 flex items-center justify-center">
                  <Mail size={24} className="text-orbius-gold" />
                </div>
                <div>
                  <p className="text-orbius-white font-bold group-hover:text-orbius-gold transition-colors">
                    Email
                  </p>
                  <p className="text-orbius-gray500 text-sm">{EMAIL}</p>
                </div>
              </a>

              {/* TODO: Sostituire con link Instagram reale */}
              <a
                href="#"
                className="flex items-center gap-4 p-5 rounded-xl border border-orbius-gray700/25 bg-orbius-navy2 hover:border-orbius-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-orbius-gold/10 flex items-center justify-center">
                  <Instagram size={24} className="text-orbius-gold" />
                </div>
                <div>
                  <p className="text-orbius-white font-bold group-hover:text-orbius-gold transition-colors">
                    Instagram
                  </p>
                  <p className="text-orbius-gray500 text-sm">{INSTAGRAM}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-orbius-gray700/25 bg-orbius-navy2">
                <div className="w-12 h-12 rounded-xl bg-orbius-gold/10 flex items-center justify-center">
                  <Clock size={24} className="text-orbius-gold" />
                </div>
                <div>
                  <p className="text-orbius-white font-bold">Orari</p>
                  <p className="text-orbius-gray500 text-sm">
                    Lun-Ven 9:00-18:00
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={150}>
            <div className="rounded-xl border border-orbius-gray700/25 bg-orbius-navy2 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold tracking-tight text-orbius-white mb-6">
                Inviaci un Messaggio
              </h2>

              {/* TODO: Collegare a Formspree o backend */}
              <form
                action="https://formspree.io/f/PLACEHOLDER"
                method="POST"
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-orbius-gray300 text-sm font-medium mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-orbius-navy border border-orbius-gray700/30 rounded-xl px-4 py-3 text-orbius-white text-sm placeholder-orbius-gray500 focus:outline-none focus:border-orbius-gold/50 transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-orbius-gray300 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-orbius-navy border border-orbius-gray700/30 rounded-xl px-4 py-3 text-orbius-white text-sm placeholder-orbius-gray500 focus:outline-none focus:border-orbius-gold/50 transition-colors"
                    placeholder="la-tua@email.it"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-orbius-gray300 text-sm font-medium mb-2"
                  >
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-orbius-navy border border-orbius-gray700/30 rounded-xl px-4 py-3 text-orbius-white text-sm placeholder-orbius-gray500 focus:outline-none focus:border-orbius-gold/50 transition-colors resize-none"
                    placeholder="Raccontaci della tua attività e come possiamo aiutarti..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orbius-gold text-orbius-navy px-6 py-3 rounded-xl font-bold text-base hover:bg-orbius-goldLight transition-colors"
                >
                  Invia Messaggio
                </button>

                <p className="text-orbius-gray500 text-xs text-center">
                  Ti rispondiamo entro 2 ore durante gli orari lavorativi.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
