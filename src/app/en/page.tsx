import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { portfolios } from "@/lib/portfolio";

const { perfil } = portfolios.en;

export const metadata: Metadata = {
  title: `${perfil.nombreCorto} — ${perfil.titulo}`,
  description: perfil.pitch,
  alternates: { languages: { es: "/", en: "/en/" } },
};

export default function HomeEn() {
  return <Portfolio lang="en" />;
}
