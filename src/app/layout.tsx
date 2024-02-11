"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Poppins } from "next/font/google";
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";

import { VerifiedToolContextProvider } from "@/lib/verifiedToolContext";
import Loader from "@/components/spinner-loader/Loader";
import {appStore} from "@/lib/appStore";
import { Provider } from 'react-redux';


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
          <VerifiedToolContextProvider>
            <VisibleItemContextProvider>
              <Provider store={appStore} >
              <main>{children}</main>
                </Provider>
            </VisibleItemContextProvider>
          </VerifiedToolContextProvider>
        </ProductContextProvider>
        <Footer />
      </body>
    </html>
  );
}
