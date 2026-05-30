import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURUM — Gestão Financeira Premium",
  description: "Plataforma de gestão financeira pessoal e empresarial de alto padrão",
  keywords: "finanças, gestão financeira, controle financeiro, investimentos, orçamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
