import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "UNILAG Aggregate Calculator — UTME 2026",
  description:
    "Calculate your UNILAG admission aggregate score using your JAMB, Post-UTME and O'Level grades, and view 5-year cutoff history.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto px-5 py-10 sm:py-14">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
