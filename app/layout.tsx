import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WalletProvider } from "@/components/WalletProvider";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "GreenStake | Reforestation on Stellar",
  description:
    "Submit tree-planting claims, stake XLM, verify community impact, and reward planters on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-cream)] text-[var(--color-forest)]">
        <WalletProvider>
          <Nav />
          <main className="min-h-screen overflow-hidden">{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
