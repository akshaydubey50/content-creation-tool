import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers/Providers";
import Authprovider from "./Authprovider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Content Creation Tool",
  description: "Dummy description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-poppins">
        {" "}
        <Authprovider>
          <Providers>
            {/* <Navbar /> */}
            {/* <div className="flex flex-col min-h-screen justify-center"> */}
            {children}
            {/* </div>{" "} */}
            {/* <Footer /> */}
          </Providers>
        </Authprovider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
