import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stardust-3 | A Galaxy Reimagined",
  description:
    "Stardust-3 is a reimagined Star Wars Galaxies experience built around combat, discovery, and community.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL("https://stardust-3.levarrishawk.chatgpt.site"),
  openGraph: {
    title: "Stardust-3 | A Galaxy Reimagined",
    description: "Your story. Reborn among the stars.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stardust-3 | A Galaxy Reimagined",
    description: "Your story. Reborn among the stars.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
