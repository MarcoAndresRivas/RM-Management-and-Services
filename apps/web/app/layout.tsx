import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RM Management & Services | Holding Empresarial",
  description: "Holding empresarial chileno que agrupa supermercados, tecnología, ingeniería y clínicas de salud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}


