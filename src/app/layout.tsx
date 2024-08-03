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
  weight: ["300","400","500","600", "700","800"],
});

export const metadata = {
  title: "Content Creation Fyi",
  description: "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
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
            <main>{children}</main>
          </Providers>
        </Authprovider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
