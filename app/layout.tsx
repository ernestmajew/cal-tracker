import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CalTracker",
  description: "Calorie tracking made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen ">
          <Navbar></Navbar>
          <div className="overflow-auto flex flex-col w-full h-full pr-4">
            {children}
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
