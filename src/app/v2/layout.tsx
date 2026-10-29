import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./v2.css";

// The version 2 sample keeps the mockup's two typefaces: Libre Franklin for
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
    default: "Rocket Llama Labs · Version 2",
    template: "%s · Rocket Llama Labs v2",
  },
};

// Every page under /v2 renders inside .v2, which scopes the sample's styles
// (src/app/v2/v2.css) away from the admin and the v1 homepage.
export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return (
    <div
      className={`v2 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}
    >
      {children}
    </div>
  );
}
