import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers/Providers";
import Authprovider from "./Authprovider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Content Creation FYI",
  description:
    "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://embeds.beehiiv.com" />
        <link
          rel="preload"
          href="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true"
          as="document"
        />
        <GoogleAnalytics gaId="GTM-P65VN64G" />
      </head>
      <body className="flex flex-col min-h-screen font-poppins ">
        <Authprovider>
          <Providers>
            <Toaster />
            <Navbar />
            <main className="flex items-center justify-center flex-grow">
              {children}
            </main>
            <Footer />
          </Providers>
        </Authprovider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
