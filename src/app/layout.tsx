import "./globals.css";
import { LucideKanban } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { homePath , ticketsPath } from "@/paths";
import { Header } from "@/components/header";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road to Next Robin",
  description: "My cRobin Course Road to next",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}> 

        <Header />

        <main 
          className=" min-h-screen flex-1
                      overflow-y-auto overflow-x-hidden
                      py-24 px-8
                      bg-secondary/20
                      flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
