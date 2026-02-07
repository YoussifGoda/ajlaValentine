import type { Metadata } from "next";
import Link from "next/link";
import { Fredoka, Josefin_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine",
  description: "A tiny, playful Valentine experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${josefin.variable} font-sans antialiased text-rose-900`}
      >
        <Link
          href="/"
          className="fixed left-4 top-4 z-50 rounded-full border-2 border-rose-200 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition-colors duration-200 hover:bg-rose-50"
          aria-label="Back to start"
        >
          Back to start
        </Link>
        {children}
      </body>
    </html>
  );
}
