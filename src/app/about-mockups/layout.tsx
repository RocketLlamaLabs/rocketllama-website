import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "@/app/(home)/v7.css";
import "@/components/v7/v7.css";
import "@/components/v7/about-mockups.css";

// Three About page mockups on the version 7 look. Not linked from the site and not indexed.
const libreFranklin = Libre_Franklin({ variable: "--font-libre-franklin", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], axes: ["opsz"] });

export const metadata: Metadata = { title: "About page mockups", robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`v7 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}>{children}</div>;
}
