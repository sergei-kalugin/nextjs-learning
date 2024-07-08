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

    <div className="test-div">
      <h1 className="text-blue-500">I'm from the "/" layout!</h1>
    </div>

    {children}
    </body>
    </html>
  );
}
