import type { Metadata } from "next";
import localFont from "next/font/local";
import { Epilogue } from "next/font/google";
import "./globals.css";
import "@/styles/globla.scss";
import Navbar from "@/layouts/Navbar";

const electroharmonix = localFont({
  src: "../public/fonts/Electroharmonix.otf",
  variable: "--font-electro",
  display: "swap",
});

const hinaMincho = localFont({
  src: "../public/fonts/Hina-Mincho-Regular.ttf",
  variable: "--font-hina",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Graphic Design Portfolio",
  description: "Creative portfolio with controlled chaos typography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${electroharmonix.variable} ${hinaMincho.variable} ${epilogue.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
