import React from "react";
import "@/app/ui/global.scss";
import { inter } from "@/app/ui/fonts";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "Funny things!"
}

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
