"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Poppins } from "next/font/google"
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import { VerifiedToolContextProvider } from "@/lib/verifiedToolContext";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ["400", "700"]
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-poppins">
          <Navbar />
        <ProductContextProvider>
          <VerifiedToolContextProvider>
            <VisibleItemContextProvider>
              <main>{children}</main>
            </VisibleItemContextProvider>
          </VerifiedToolContextProvider>
        </ProductContextProvider>
        <Footer />
      </body>
    </html>
  );
}
