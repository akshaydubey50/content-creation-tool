"use client";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "react-redux";
import appStore from "@/lib/store";

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
        <VisibleItemContextProvider>
          <Provider store={appStore}>
            <Navbar />
            <main>{children}</main>
          </Provider>
        </VisibleItemContextProvider>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
