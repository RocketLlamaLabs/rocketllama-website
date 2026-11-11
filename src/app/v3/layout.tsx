import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./v3.css";

// The version 3 sample keeps the mockup's two typefaces: Libre Franklin for
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
    default: "Rocket Llama Labs · Version 3",
    template: "%s · Rocket Llama Labs v3",
  },
};

// Every page of version 3 renders inside .v3, which scopes the sample's styles
// (src/app/v3/v3.css) away from the admin and the other versions.
export default function V3Layout({ children }: LayoutProps<"/v3">) {
  return (
    <div
      className={`v3 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}
    >
      {children}
    </div>
  );
}
