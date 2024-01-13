"use client";

import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";

import { VerifiedToolContextProvider } from "@/lib/verifiedToolContext";
import { BookMarkedToolContextProvider } from "@/lib/bookMarkContext";
import { LikedToolContextProvider } from "@/lib/likedToolContext";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
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
        {/* <Loader /> */}
          <ProductContextProvider>
            <BookMarkedToolContextProvider>
              <LikedToolContextProvider>
                <VerifiedToolContextProvider>
                  <VisibleItemContextProvider>
                    <main>{children}</main>
                  </VisibleItemContextProvider>
                </VerifiedToolContextProvider>
              </LikedToolContextProvider>
            </BookMarkedToolContextProvider>
          </ProductContextProvider>
        <Footer />
      </body>
    </html>
  );
}
