import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { getSiteMetadata } from "./directus";
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

export async function generateMetadata(): Promise<Metadata> {
  const { site_title, site_description } = await getSiteMetadata();

  return {
    title: site_title,
    description: site_description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    metadataBase: new URL("https://www.stardust-swg.com"),
    openGraph: {
      title: site_title,
      description: site_description,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: site_title,
      description: site_description,
      images: ["/og.png"],
    },
  };
}

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
