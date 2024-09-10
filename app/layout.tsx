import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google"; // Import Montserrat
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Import Montserrat with required styles (for example, weights from 400 to 700)
const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat", // Define the CSS variable for Montserrat
});

export const metadata: Metadata = {
  title: "Forge",
  description: "Generated your AI tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <ClerkProvider>
          <GoogleOneTap />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
