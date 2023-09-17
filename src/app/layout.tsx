"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import Footer from "@/components/footer/Footer";
import { Poppins } from "next/font/google"
import { VerifiedToolContextProvider } from "@/lib/verifiedToolContext";
import { ActiveMenuContextProvider } from "@/lib/ActiveMenuContext";


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
        <ActiveMenuContextProvider>
        <ProductContextProvider>
          <VerifiedToolContextProvider>
            <VisibleItemContextProvider>
              <main>{children}</main>
            </VisibleItemContextProvider>
          </VerifiedToolContextProvider>
        </ProductContextProvider>
        </ActiveMenuContextProvider>
        <Footer />
      </body>
    </html>
  );
}
