import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EG Battle Sim"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className + ' text-black bg-gradient-to-br from-gray-200 to-gray-300'}>
      <main className="min-h-screen">
        <div className="w-full h-16 bg-slate-100">

        </div>
        {children}
      </main>
    </body>
    </html>
  );
}
