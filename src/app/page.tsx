import Link from "next/link";
import { ImageIcon, Users, BarChart3, TrendingUp } from "lucide-react";
import OrbisIcon from "@/components/OrbisIcon";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <OrbisIcon size={56} className="mx-auto mb-6" />
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-orbius-white leading-tight mb-6">
              Facciamo{" "}
              <span className="text-orbius-gold">Brillare</span> la Tua
              Attività sui Social
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-orbius-gray300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Gestiamo i tuoi social media con strategia, creatività e risultati
              misurabili. Tu pensi al tuo business, al resto ci pensiamo noi.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/offerta"
                className="inline-flex items-center gap-2 bg-orbius-gold text-orbius-navy px-8 py-4 rounded-xl text-base font-bold hover:bg-orbius-goldLight transition-colors"
              >
                Scopri l&apos;Offerta
              </Link>
              <WhatsAppCTA variant="outline" size="lg" />
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { stat: "73%", desc: "cerca su Instagram prima di acquistare" },
                { stat: "10 min", desc: "a settimana è tutto ciò che ti chiediamo" },
                { stat: "30 giorni", desc: "per i primi risultati" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-extrabold text-orbius-gold mb-1">
                    {item.stat}
                  </p>
                  <p className="text-orbius-gray300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Servizi */}
      <section id="servizi" className="py-20 sm:py-28 bg-orbius-navy2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-4">
                I Nostri Servizi
              </h2>
              <p className="text-orbius-gray300 max-w-xl mx-auto">
                Tutto ciò di cui hai bisogno per una presenza social professionale e che porta risultati.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ImageIcon,
                title: "Creazione Contenuti",
                desc: "Post, stories e reels professionali che raccontano la tua attività e attirano nuovi clienti.",
              },
              {
                icon: Users,
                title: "Gestione Profili",
                desc: "Pubblicazione programmata, gestione commenti e messaggi. Il tuo profilo sempre attivo e curato.",
              },
              {
                icon: BarChart3,
                title: "Strategia Digitale",
                desc: "Piano editoriale personalizzato, analisi competitor e report mensili con metriche chiare.",
              },
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-xl border border-orbius-gray700/20 bg-orbius-navy p-8 h-full">
                  <service.icon size={32} className="text-orbius-gold mb-4" />
                  <h3 className="text-xl font-extrabold tracking-tight text-orbius-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-orbius-gray300 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-6">
                  Chi Siamo
                </h2>
                <p className="text-orbius-gray300 leading-relaxed mb-4">
                  Orbius nasce dall&apos;idea che ogni attività merita di brillare online.
                  Il nostro nome viene da &ldquo;orbita&rdquo; — come i pianeti che ruotano
                  attorno a una stella, noi ruotiamo attorno al tuo business per farlo
                  risplendere.
                </p>
                <p className="text-orbius-gray300 leading-relaxed">
                  Con un approccio strategico e creativo, aiutiamo ristoranti, cliniche,
                  negozi e boutique a trasformare i social media in un vero canale di
                  acquisizione clienti.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="flex justify-center lg:justify-end">
                <div
                  className="relative"
                  style={{ filter: "drop-shadow(0 0 60px rgba(201,168,76,0.15))" }}
                >
                  <OrbisIcon size={220} color="#C9A84C" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Portfolio / Risultati */}
      {/* TODO: Sostituire con portfolio reale */}
      <section className="py-20 sm:py-28 bg-orbius-navy2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-4">
                I Nostri Risultati
              </h2>
              <p className="text-orbius-gray300 max-w-xl mx-auto">
                Numeri concreti che parlano da soli.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ristorante Da Marco, Milano",
                metric: "+120%",
                metricLabel: "prenotazioni in 3 mesi",
                desc: "Dalla gestione social completa al raddoppio delle prenotazioni. Il potere di una presenza Instagram curata.",
              },
              {
                name: "Studio Dentistico Bianchi, Roma",
                metric: "+85%",
                metricLabel: "nuovi pazienti da Instagram",
                desc: "Contenuti professionali e strategia mirata hanno portato decine di nuovi pazienti ogni mese.",
              },
              {
                name: "Boutique Giulia, Firenze",
                metric: "+40%",
                metricLabel: "vendite online",
                desc: "Instagram trasformato in una vetrina digitale che converte. Stories e reels che fanno vendere.",
              },
            ].map((caseStudy, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-xl border border-orbius-gray700/20 bg-orbius-navy overflow-hidden">
                  <div className="aspect-video bg-orbius-navy3 flex items-center justify-center">
                    <TrendingUp size={32} className="text-orbius-gray500" />
                  </div>
                  <div className="p-6">
                    <p className="text-orbius-gold text-3xl font-extrabold mb-1">
                      {caseStudy.metric}
                    </p>
                    <p className="text-orbius-gray300 text-sm mb-3">
                      {caseStudy.metricLabel}
                    </p>
                    <h3 className="text-orbius-white font-bold text-base mb-2">
                      {caseStudy.name}
                    </h3>
                    <p className="text-orbius-gray500 text-sm leading-relaxed">
                      {caseStudy.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 sm:py-28">
        <div
          className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        >
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orbius-white mb-6">
              Pronto a Far <span className="text-orbius-gold">Brillare</span> la Tua Attività?
            </h2>
            <WhatsAppCTA text="Scrivici su WhatsApp" variant="solid" size="lg" className="mb-6" />
            <p className="text-orbius-gray500 text-sm">
              Risposta entro 2 ore &middot; Nessun impegno &middot; Consulenza gratuita
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
