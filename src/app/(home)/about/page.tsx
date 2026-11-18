import type { Metadata } from "next";
import { AboutPage } from "@/components/v7/about-page";

export const metadata: Metadata = {
  title: { absolute: "About Rocket Llama Labs | Phoenix Home Service Marketing" },
  description: "Rocket Llama Labs is a Phoenix marketing and technology team that builds and runs the whole marketing system for HVAC, plumbing and other home service trades.",
  alternates: { canonical: "https://rocketllamalabs.com/about" },
  openGraph: {
    type: "website",
    url: "https://rocketllamalabs.com/about",
    siteName: "Rocket Llama Labs",
    title: "About Rocket Llama Labs",
    description: "The Phoenix marketing and technology team for home service companies. Brian Greenberg, Branson Cobb and Madison Schantz build and run one system that gets you found, answers every lead in under a minute, and tracks every dollar to a paid job.",
    images: [{ url: "https://rocketllamalabs.com/v7/og.png", width: 1200, height: 630, alt: "Rocket Llama Labs: marketing and technology for home services" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "About Rocket Llama Labs", description: "The Phoenix marketing and technology team for home service companies.", images: ["https://rocketllamalabs.com/v7/og.png"] },
};

// About Us, on its own page. The story section is a placeholder until the owners supply their copy.
export default function Page() {
  return <AboutPage />;
}
