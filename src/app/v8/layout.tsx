import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./v8.css";
import "@/components/v8/v8.css";

// The version 8 sample keeps the mockup's two typefaces: Libre Franklin for
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
    default: "Rocket Llama Labs · Version 8",
    template: "%s · Rocket Llama Labs v8",
  },
};

// Every page of version 8 renders inside .v8, which scopes the sample's styles
// (src/app/v8/v8.css) away from the admin and the other versions. The home page itself is src/components/v8/home.tsx.
export default function V8Layout({ children }: LayoutProps<"/v8">) {
  return (
    <div
      className={`v8 ${libreFranklin.variable} ${sourceSerif.variable} flex-1`}
    >
      {children}
    </div>
  );
}
