// The presentation versions served at /slides/<id> and listed in the admin
// under Assets › Presentation. Each version is a folder of slide images in
// /public/slides/<id>, made from a PowerPoint file by scripts/make-slides.sh,
// which prints the entry to add here.

export type SlideVersion = {
  id: string; // "v1", "v2", ... also the URL segment and the folder name
  name: string;
  author: string;
  added: string; // ISO date
  summary: string;
  // The PowerPoint the slides were made from, under /public/slides/<id>/.
  file: string;
  // One title per slide, in order. The count sets how many slides there are.
  slides: string[];
};

export const slideVersions: SlideVersion[] = [
  {
    id: "v1",
    name: "Sales presentation",
    author: "Rocket Llama Labs",
    added: "2026-11-13",
    summary:
      "The home services sales deck, written from the live site: the three ways good companies lose jobs, the full system, answering every call, getting found, tracking, ownership, the team and how to start.",
    file: "rocket-llama-labs-sales-presentation-v1.pptx",
    slides: [
      "Your calendar should be full.",
      "Three ways good companies lose jobs",
      "Most agencies sell you one tactic. We run the whole thing.",
      "One system, from the first search to the booked job",
      "Never miss a call again",
      "Show up where homeowners look first",
      "We report booked jobs and what they were worth",
      "Never locked in",
      "Every trade that goes to a customer’s home",
      "Three people, one system",
      "Getting started is simple",
      "Your calendar should be full. Schedule a call.",
    ],
  },
];

export function getSlideVersion(id: string) {
  return slideVersions.find((v) => v.id === id);
}

export function slideImage(version: SlideVersion, index: number) {
  return `/slides/${version.id}/slide-${String(index + 1).padStart(2, "0")}.webp`;
}

export function slideFile(version: SlideVersion) {
  return `/slides/${version.id}/${version.file}`;
}
