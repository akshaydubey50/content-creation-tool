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
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <head>
        <link
          rel="preconnect"
          href="https://embeds.beehiiv.com"
        />
        <link
          rel="preload"
          href="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true"
          as="document"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P65VN64G');
            `,
          }}
        />
      </head>
      <body className="font-poppins">
        <Authprovider>
          <Providers>
            <main>{children}</main>
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-P65VN64G"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          </Providers>
        </Authprovider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
