import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@mui/material";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  applicationName: 'japanese flashcards',
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: "My Website", statusBarStyle: "black-translucent" },

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
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  // "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Container component={'body'} className={inter.className}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginY: 0,
          height: '100vh'
        }}>
        <PageHeader />
        {children}
      </Container>
    </html>
  );
}
