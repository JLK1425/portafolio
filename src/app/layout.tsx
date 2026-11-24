import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/portfolio";

const { perfil } = portfolio;

export const metadata: Metadata = {
  title: `${perfil.nombreCorto} — ${perfil.titulo}`,
  description: perfil.pitch,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
