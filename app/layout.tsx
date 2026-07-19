import type { Metadata } from "next";
import localFont from "next/font/local";
import { Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Grain from "@/components/Grain";
import PaperPlaneCanvas from "@/components/PaperPlaneCanvas";
import SoundKit from "@/components/SoundKit";

const zodiak = localFont({
  src: [
    { path: "../public/fonts/Zodiak-Variable.woff2", style: "normal" },
    { path: "../public/fonts/Zodiak-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

const generalSans = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SACHI — Marketing agency",
  description:
    "SACHI is a marketing agency in Visakhapatnam. We build brands people remember — not content people scroll past.",
  openGraph: {
    title: "SACHI — Marketing agency",
    description:
      "We build brands people remember — not content people scroll past.",
    images: [{ url: "/images/generated/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/generated/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zodiak.variable} ${generalSans.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <PaperPlaneCanvas />
        <SoundKit />
        <Grain />
      </body>
    </html>
  );
}
