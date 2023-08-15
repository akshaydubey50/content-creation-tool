"use client"

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProductContextProvider } from "@/lib/productContext";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <ProductContextProvider>
         <VisibleItemContextProvider>
          <main>{children}</main>
         </VisibleItemContextProvider>
        </ProductContextProvider>
        <div>Footer</div>
      </body>
    </html>
  );
}
