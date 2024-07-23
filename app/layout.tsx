"use client";
import React from "react";
import "@/app/ui/global.scss";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
    <body>
    {children}
    </body>
    </html>
  );
}
