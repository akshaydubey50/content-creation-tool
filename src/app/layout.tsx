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
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "200+ Content Creation Tools",
  description:
    "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
  keywords:
    "content creation, productivity tools, digital marketing, content management",
  /* authors: [{ name: "Your Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  formatDetection: {
    telephone: false,
  }, */
  metadataBase: new URL("https://contentcreation.fyi/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "200+ Content Creation Tools",
    description:
      "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
    url: "https://contentcreation.fyi/",
    siteName: "Content Creation FYI",
    /*  images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Content Creation Tools Directory",
      },
    ], */
    locale: "en_US",
    type: "website",
  },
  /* twitter: {
    card: "summary_large_image",
    title: "200+ Content Creation Tools | Your Site Name",
    description:
      "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
    images: ["https://your-domain.com/twitter-image.jpg"],
    creator: "@yourTwitterHandle",
  }, */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /*  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    // Add other search engine verifications as needed
  }, */
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
      <body className="font-poppins flex flex-col min-h-screen ">
        <Authprovider>
          <Providers>
            <Toaster />
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
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
