// TODO: Sostituire con il numero WhatsApp reale
export const WHATSAPP_URL =
  "https://wa.me/39XXXXXXXXXX?text=Ciao!%20Vorrei%20sapere%20di%20più%20sui%20vostri%20servizi%20social.";

export const SITE_URL = "https://orbius.agency";
export const SITE_NAME = "Orbius Agency";
export const EMAIL = "contatto@orbius.it";
// TODO: Sostituire con il handle Instagram reale
export const INSTAGRAM = "@orbius.agency";

export const PLANS = {
  presenza: {
    name: "Presenza",
    price: 300,
    badge: null,
    totalValue: 4300,
    items: [
      { label: "8 post/mese con design e copy", value: 800 },
      { label: "Programmazione e pubblicazione", value: 250 },
      { label: "Gestione commenti e DM", value: 500 },
      { label: "Strategia editoriale mensile", value: 250 },
    ],
  },
  crescita: {
    name: "Crescita",
    price: 600,
    badge: "CONSIGLIATO",
    totalValue: 5800,
    items: [
      { label: "12 post/mese con design d'autore e copywriting", value: 1200 },
      { label: "4 stories/settimana + 2 reels professionali", value: 800 },
      { label: "Programmazione e pubblicazione", value: 250 },
      { label: "Gestione completa commenti e DM", value: 500 },
      { label: "Report mensile con metriche", value: 200 },
      { label: "Strategia editoriale personalizzata", value: 350 },
    ],
  },
  dominio: {
    name: "Dominio",
    price: 1000,
    badge: null,
    totalValue: 7600,
    items: [
      { label: "12 post/mese con design d'autore e copywriting", value: 1200 },
      { label: "4 stories/settimana + 2 reels professionali", value: 800 },
      { label: "Programmazione e pubblicazione", value: 250 },
      { label: "Gestione completa commenti e DM", value: 500 },
      { label: "Report mensile con metriche", value: 200 },
      { label: "Strategia editoriale personalizzata", value: 350 },
      { label: "Gestione Google Business Profile", value: 400 },
      { label: "Risposte professionali alle recensioni", value: 350 },
      { label: "Consulenza strategica mensile 30min", value: 500 },
      { label: "Content strategy con analisi competitor", value: 550 },
    ],
  },
} as const;

export const BONUSES = [
  { label: "Audit strategico completo", value: 500 },
  { label: "Piano strategico 90 giorni", value: 800 },
  { label: "Trasformazione profilo professionale", value: 400 },
  { label: "10 template Canva personalizzati", value: 500 },
  { label: 'Masterclass "Foto Che Vendono"', value: 300 },
];

export const TESTIMONIALS = [
  {
    name: "Marco R.",
    role: "Ristorante, Milano",
    text: "Da quando Orbius gestisce i nostri social, le prenotazioni sono aumentate del 120%. Il nostro profilo Instagram è diventato il nostro miglior canale di acquisizione clienti. Non torneremmo mai indietro.",
  },
  {
    name: "Dott.ssa Bianchi",
    role: "Studio Dentistico, Roma",
    text: "Ero scettica sui social media per uno studio medico, ma Orbius ha cambiato la mia prospettiva. Contenuti professionali, rispettosi e che trasmettono fiducia. +85% nuovi pazienti in 4 mesi.",
  },
  {
    name: "Giulia T.",
    role: "Boutique, Firenze",
    text: "Finalmente qualcuno che capisce il mio brand! Orbius ha trasformato il mio Instagram in una vera vetrina digitale. Le vendite online sono cresciute del 40% e ricevo messaggi ogni giorno da nuovi clienti.",
  },
];
