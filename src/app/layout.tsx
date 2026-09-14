import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { AudioProvider } from "@/context/audio-context";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paradigm Radio | American Country, Gospel & Blues",
  description:
    "Stream live American radio across Country, Gospel, and Blues stations from across the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#241C15]">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
