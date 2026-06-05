import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Sweet Photography — Capture Life's Unforgettable Moments",
  description:
    "Professional photography booking platform. Newborn, maternity, wedding, corporate, and family photography in Nepal. Seamless booking, premium photographers.",
  keywords: "photography, booking, Nepal, wedding, newborn, maternity, corporate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-white text-black overflow-x-hidden">{children}</body>
    </html>
  );
}
