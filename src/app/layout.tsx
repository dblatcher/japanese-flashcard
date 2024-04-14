import { PageHeader } from "@/components/PageHeader";
import { CssBaseline } from "@mui/material";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CSSProperties } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japanese Flashcards",
  description: "An app for learning Japanese characters",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],

  authors: [
    { name: "dblatcher" },
  ],

  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  // "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
}

const layoutStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}

CssBaseline

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={layoutStyle}>
        <PageHeader />
        {children}
      </body>
    </html>
  );
}
