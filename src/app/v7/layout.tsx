import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./v7.css";
import "@/components/v7/v7.css";

// The version 7 sample keeps the mockup's two typefaces: Libre Franklin for
// headings and UI, Source Serif 4 for body copy. Both are variable fonts.
const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Rocket Llama Labs · Version 7",
    template: "%s · Rocket Llama Labs v7",
  },
};

// Every page of version 7 renders inside .v7, which scopes the sample's styles
// (src/app/v7/v7.css) away from the admin and the other versions. The custom elements and their styles live in src/components/v7.
export default function V7Layout({ children }: LayoutProps<"/v7">) {
  return (
    <div
      className={`v7 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}
    >
      {children}
    </div>
  );
}
