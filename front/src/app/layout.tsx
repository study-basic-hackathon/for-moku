import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/organisms/TopNav";
import Header from "@/components/templates/common/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "for Moku App",
  description: "もくもく会に関わる全ての人のためのサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex`}
      >
        <TopNav />
        <main className="fixed top-14 overflow-y-auto w-full h-[calc(100vh-56px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
