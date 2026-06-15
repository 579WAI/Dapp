import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { NetworkGuard } from "@/components/NetworkGuard";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "579WAI",
  description: "Exclusive BSC Investment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <Header />
          <NetworkGuard />
          <main className="mx-auto max-w-lg px-4 pb-24 pt-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
