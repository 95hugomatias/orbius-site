import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Orbius Agency | Gestione Social Media per PME Italiane",
    template: "%s | Orbius Agency",
  },
  description:
    "Trasformiamo la presenza social della tua attività in una macchina che porta clienti ogni giorno. Ristoranti, cliniche, negozi — facciamo brillare il tuo business.",
  keywords: [
    "social media",
    "gestione social",
    "agenzia social media",
    "instagram ristorante",
    "marketing digitale PMI",
    "social media italia",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://orbius.agency",
    siteName: "Orbius Agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-outfit">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
