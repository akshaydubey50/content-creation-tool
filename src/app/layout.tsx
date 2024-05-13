import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const metadata = {
  title: 'Content Creation Tool',
  description: 'Dummy description'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-poppins">
        <div className='flex flex-col min-h-screen'>
          <Providers>
            <Navbar />
            <main className="pt-[40px] lg:pt-[90px] flex-1">{children}</main>
          </Providers>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
