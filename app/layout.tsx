import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { getSiteBranding, getSiteMetadata } from "./directus";
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
  const [
    { site_title, site_description },
    { social_image, favicon },
  ] = await Promise.all([getSiteMetadata(), getSiteBranding()]);

  return {
    title: site_title,
    description: site_description,
    icons: {
      icon: favicon,
      shortcut: favicon,
    },
    metadataBase: new URL("https://www.stardust-swg.com"),
    openGraph: {
      title: site_title,
      description: site_description,
      images: [social_image],
    },
    twitter: {
      card: "summary_large_image",
      title: site_title,
      description: site_description,
      images: [social_image],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site_background } = await getSiteBranding();

  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable}`}
        style={{
          "--site-background-image": `url("${site_background}")`,
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
