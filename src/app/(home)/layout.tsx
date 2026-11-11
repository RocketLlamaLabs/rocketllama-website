import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./v7.css";
import "@/components/v7/v7.css";
import { Motion } from "@/components/v7/motion";

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
    default: "Rocket Llama Labs",
    template: "%s | Rocket Llama Labs",
  },
};

// Every page under  renders inside .v2, which scopes the sample's styles
// (src/app/v2.css) away from the admin and the v1 homepage.
export default function V7Layout({ children }: LayoutProps<"/">) {
  return (
    <div
      className={`v7 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}
    >
      <Motion />
      {children}
    </div>
  );
}
