import type { Metadata } from "next";
import { DM_Serif_Display, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LandIQ — AI-Powered Property Development Platform",
  description:
    "Automate land feasibility analysis for Australian property developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${sourceSerif.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
