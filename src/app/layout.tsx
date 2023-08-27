"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import Footer from "@/components/footer/Footer";
import { Poppins } from "next/font/google"
import { VerifiedToolContextProvider } from "@/lib/verifiedToolContext";


const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ["400", "700"]
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
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
