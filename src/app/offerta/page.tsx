import type { Metadata } from "next";
import { X, Check, Target, BarChart3, Zap, Armchair, Shield, Clock, Gift } from "lucide-react";
import OrbisIcon from "@/components/OrbisIcon";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FadeIn from "@/components/FadeIn";
import PlanSelector from "@/components/PlanSelector";
import StickyBar from "@/components/StickyBar";
import { BONUSES, TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Offerta — Gestione Social Media",
  description:
    "Trasformiamo la tua presenza social in una macchina che porta clienti ogni giorno. Scopri i nostri piani a partire da €300/mese.",
};

export default function OffertaPage() {
  return (
    <>
      {/* 2.1 Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-8">
              <OrbisIcon size={32} />
              <span className="font-extrabold text-lg text-orbius-white">
                ORBIUS<span className="text-orbius-gold">.AGENCY</span>
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-orbius-white leading-tight mb-6">
              Il Tuo Ristorante Ha{" "}
              <span className="text-orbius-gold">4.8 Stelle</span> su Google.
              <br />
              Ma i Social Raccontano{" "}
              <span className="text-orbius-gray500 font-light">
                Un&apos;Altra Storia.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg text-orbius-gray300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Trasformiamo la tua presenza social in una macchina che porta
              clienti ogni giorno. Senza che tu debba muovere un dito.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { stat: "73%", desc: "cerca online prima" },
                { stat: "10 min", desc: "a settimana da te" },
                { stat: "30 gg", desc: "primi risultati" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-orbius-gold mb-1">
                    {item.stat}
                  </p>
                  <p className="text-orbius-gray500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2.2 Pain vs Dream */}
      <section className="py-20 sm:py-28 bg-orbius-navy2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pain */}
            <FadeIn>
              <div className="rounded-xl border border-orbius-red/20 bg-orbius-navy p-8">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-red mb-6">
                  La Realtà Oggi
                </h3>
                <ul className="space-y-4">
                  {[
                    "Ultimo post su Instagram: 3 mesi fa",
                    'Il nipote "ci pensa lui" ma non pubblica',
                    "I concorrenti ti rubano clienti online",
                    "Nessuna strategia, solo post casuali",
                    "Paghi l'affitto ma regali visibilità",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X size={18} className="text-orbius-red shrink-0 mt-0.5" />
                      <span className="text-orbius-gray300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Dream */}
            <FadeIn delay={150}>
              <div className="rounded-xl border border-orbius-green/20 bg-orbius-navy p-8">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-green mb-6">
                  Con Orbius
                </h3>
                <ul className="space-y-4">
                  {[
                    "Profilo professionale che attira clienti",
                    "Contenuti pubblicati ogni settimana",
                    "Clienti ti trovano e prenotano via social",
                    "Strategia chiara, risultati misurabili",
                    "Un partner che si occupa di tutto",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-orbius-green shrink-0 mt-0.5" />
                      <span className="text-orbius-gray300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2.3 Value Equation */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gold bg-orbius-gold/10 px-4 py-1.5 rounded-full mb-4">
                La Value Equation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white">
                Perché Questa Offerta È Irresistibile
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Target, label: "Dream Outcome", direction: "↑", color: "text-orbius-green", desc: "Clienti che arrivano dai social ogni giorno" },
              { icon: BarChart3, label: "Probabilità", direction: "↑", color: "text-orbius-green", desc: "Strategia testata su decine di attività" },
              { icon: Zap, label: "Tempo", direction: "↓", color: "text-orbius-gold", desc: "Solo 10 minuti a settimana da parte tua" },
              { icon: Armchair, label: "Sforzo", direction: "↓", color: "text-orbius-gold", desc: "Ci occupiamo noi di tutto, dalla A alla Z" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-xl border border-orbius-gray700/20 bg-orbius-navy2 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon size={24} className={item.color} />
                    <span className="font-bold text-orbius-white">
                      {item.label}{" "}
                      <span className={`${item.color} text-lg`}>{item.direction}</span>
                    </span>
                  </div>
                  <p className="text-orbius-gray300 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2.4 & 2.5 Grand Slam Offer — Plan Selector + Value Stack */}
      <section className="py-20 sm:py-28 bg-orbius-navy2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gold bg-orbius-gold/10 px-4 py-1.5 rounded-full mb-4">
                Scegli il Tuo Piano
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white">
                La Grand Slam Offer
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <PlanSelector />
          </FadeIn>
        </div>
      </section>

      {/* 2.6 Bonus Stack */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gold bg-orbius-gold/10 px-4 py-1.5 rounded-full mb-4">
                <Gift size={14} />
                Bonus — Solo per i Primi 10 Clienti
              </span>
            </div>
          </FadeIn>

          <div className="rounded-xl border border-orbius-gold/20 bg-orbius-navy2 p-6 sm:p-8">
            <div className="space-y-4">
              {BONUSES.map((bonus, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-orbius-gray700/15 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-orbius-gold shrink-0 mt-0.5" />
                      <span className="text-orbius-gray100 text-sm">
                        {bonus.label}
                      </span>
                    </div>
                    <span className="text-orbius-gray500 text-sm line-through shrink-0">
                      &euro;{bonus.value}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-orbius-gray700/25 text-center">
              <span className="text-orbius-gold font-bold text-lg">
                Valore bonus: &euro;
                {BONUSES.reduce((sum, b) => sum + b.value, 0)}
              </span>
              <span className="text-orbius-green font-bold text-lg ml-2">
                — GRATIS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.8 Garantia */}
      <section className="py-20 sm:py-28 bg-orbius-navy2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <Shield size={48} className="text-orbius-green mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-6">
              Garanzia Risultati o Rimborso
            </h2>
            <p className="text-orbius-gray300 leading-relaxed mb-8 max-w-xl mx-auto">
              Crediamo talmente tanto nel nostro lavoro che ti offriamo una
              garanzia completa: se nei primi 30 giorni non sei soddisfatto del
              servizio, ti rimborsiamo il 100% senza domande. Zero rischi per
              te, tutta la responsabilità è sulle nostre spalle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                { icon: Clock, label: "30 giorni per decidere" },
                { icon: Shield, label: "Rimborso completo" },
                { icon: Check, label: "Nessun vincolo" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-orbius-green/10 text-orbius-green text-sm font-semibold px-4 py-2 rounded-full"
                >
                  <badge.icon size={16} />
                  {badge.label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2.9 Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white text-center mb-12">
              Cosa Dicono i Nostri Clienti
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-xl border border-orbius-gray700/20 bg-orbius-navy2 p-6 h-full flex flex-col">
                  <p className="text-orbius-gray300 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-orbius-white font-bold text-sm">
                      {t.name}
                    </p>
                    <p className="text-orbius-gray500 text-xs">{t.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2.10 Scarcity Bar */}
      <section className="py-12 bg-orbius-navy2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="rounded-xl border border-orbius-gold/20 bg-orbius-navy p-6">
              <p className="text-orbius-white font-bold text-lg mb-2">
                <Clock size={18} className="inline mr-2 text-orbius-gold" />
                Solo 10 posti per Aprile 2026
              </p>
              <p className="text-orbius-gold text-sm font-semibold">
                7 già prenotati — restano 3 posti
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2.11 CTA Final */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <OrbisIcon size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-6">
              Pronto a Far <span className="text-orbius-gold">Brillare</span> la
              Tua Attività?
            </h2>
            <WhatsAppCTA text="Scrivici su WhatsApp" variant="solid" size="lg" className="mb-6" />
            <p className="text-orbius-gray500 text-sm">
              Risposta entro 2 ore &middot; Nessun impegno &middot; Consulenza gratuita
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2.12 Sticky Bar */}
      <StickyBar />
    </>
  );
}
