// The website versions the admin tracks, and the kit behind version 2.
// Everything here is served from /public: the v2 photos, video cuts and the
// brand mark rounds live under /public/v2, copied from the bbm-plan repository.

export type SiteVersion = {
  id: "v1" | "v2";
  name: string;
  status: "live" | "sample";
  href: string;
  kitHref?: string;
  summary: string;
  origin: string;
};

export const siteVersions: SiteVersion[] = [
  {
    id: "v1",
    name: "Version 1",
    status: "live",
    href: "/",
    summary:
      "The software and AI studio homepage, mocked. Brand book v1.0: navy, blue, mist, Montserrat and Inter.",
    origin: "Built in this repository, October 2026.",
  },
  {
    id: "v2",
    name: "Version 2",
    status: "sample",
    href: "/v2",
    kitHref: "/admin/website/v2",
    summary:
      "The local home-services marketing site: slideshow hero, the video, the 60-second check, the booking funnel and the qualify quiz. A sample to redesign from.",
    origin:
      "Ported from the BBM Local mockup C (RocketLlamaLabs/bbm-plan), October 2026.",
  },
];

export type V2Page = { title: string; path: string; source: string; body: string };

export const v2Pages: V2Page[] = [
  {
    title: "Home",
    path: "/v2",
    source: "src-c.html",
    body: "Four-image hero that zooms and crossfades, the three ways companies lose jobs, the 60-second check, image bands, the system list, pricing, industries, the free scan and the FAQ.",
  },
  {
    title: "Services",
    path: "/v2/services",
    source: "src-c-services.html",
    body: "The full 90-second video, the eight pieces of the system as cards, the system diagram and every trade.",
  },
  {
    title: "Book a walkthrough",
    path: "/v2/book",
    source: "src-c-book.html + _book.html",
    body: "Funnel v2, book first: pick a day and a time, confirm, then optional questions. The free scan is the exit-intent offer. Trade tiles link here with ?trade=.",
  },
  {
    title: "See if you qualify",
    path: "/v2/qualify",
    source: "src-c-qualify.html + _quiz.html",
    body: "Funnel v1, qualify first: fourteen one-tap questions, then a calendar if the business qualifies.",
  },
  {
    title: "About Brian",
    path: "/v2/about-brian",
    source: "src-c-about-brian.html",
    body: "Portrait, the book, the bio and the three numbers.",
  },
];

export type V2Component = {
  title: string;
  path: string;
  file: string;
  body: string;
};

export const v2Components: V2Component[] = [
  {
    title: "60-second check",
    path: "/v2#check",
    file: "sixty-second-check.tsx",
    body: "Four one-tap questions, a score out of 100 drawn as a ring, a verdict and the two doors: book or get the scan.",
  },
  {
    title: "Booking funnel with calendar",
    path: "/v2/book",
    file: "book-funnel.tsx",
    body: "Day and time tiles (next five weekdays, five slots), contact step with real phone and email validation, texting consent, confirmation, then twelve optional questions with conditional follow-ups and a service-area ring.",
  },
  {
    title: "Qualification quiz",
    path: "/v2/qualify",
    file: "qualify-quiz.tsx",
    body: "One question per screen, tiles that advance on tap, a qualifies() rule on revenue, crew, capacity and role, then the calendar or a thank-you.",
  },
  {
    title: "Free scan form",
    path: "/v2#scan",
    file: "free-scan.tsx",
    body: "Company, email, website. Email only, so no texting consent. Also appears as the exit-intent card in the booking funnel.",
  },
  {
    title: "System diagram",
    path: "/v2/services#map",
    file: "system-diagram.tsx",
    body: "The client's marketing system as one SVG: traffic sources, the website, phones, reviews, the CRM, booked jobs and the spend loop.",
  },
  {
    title: "Hero slideshow and image bands",
    path: "/v2",
    file: "page.tsx + v2.css",
    body: "Ken Burns crossfade over four trade photos, dots that keep time, and full-bleed photo bands with a gradient for the copy.",
  },
];

export type V2Token = { token: string; hex: string; job: string };

export const v2Palette: V2Token[] = [
  { token: "--bg", hex: "#f6f8f6", job: "Page background." },
  { token: "--surface", hex: "#ffffff", job: "Cards, forms, the nav." },
  { token: "--ink", hex: "#0e1512", job: "Text." },
  { token: "--muted", hex: "#4b5a52", job: "Secondary text." },
  { token: "--faint", hex: "#87958d", job: "Captions, fine print." },
  { token: "--line", hex: "#dde5df", job: "Borders and rules." },
  { token: "--accent", hex: "#16a34a", job: "Buttons, dots, the kicker rule." },
  { token: "--accent-2", hex: "#4ade80", job: "Accent on dark: hero kickers, the highlighted word." },
  { token: "--accent-soft", hex: "#eefbf1", job: "Tinted panels and selected tiles." },
  { token: "--accent-ink", hex: "#15803d", job: "Accent as text, AA on white." },
  { token: "--deep", hex: "#0b1f16", job: "Dark bands, the video section, image overlays." },
];

export const v2Type = [
  {
    family: "Libre Franklin",
    role: "Headings, nav, buttons, labels",
    weights: "500 to 900, variable",
    sample: "Your calendar should be full.",
    className: "font-black tracking-tight",
    style: { fontFamily: "var(--font-libre-franklin), system-ui, sans-serif" },
  },
  {
    family: "Source Serif 4",
    role: "Body copy",
    weights: "400 to 600, variable, optical sizes",
    sample: "Calls, forms and free-estimate requests, every one answered in under a minute.",
    className: "",
    style: { fontFamily: "var(--font-source-serif), Georgia, serif" },
  },
];

export type V2Image = { file: string; alt: string; role?: string; size?: string };

export const v2Photos: V2Image[] = [
  { file: "hero-hvac.jpg", alt: "HVAC technician at a condenser", role: "Hero slide 1", size: "1920×1080" },
  { file: "hero-plumbing.jpg", alt: "Plumber under a sink", role: "Hero slide 2", size: "1920×1080" },
  { file: "hero-electrical.jpg", alt: "Electrician at a panel", role: "Hero slide 3", size: "1920×1080" },
  { file: "hero-roofing.jpg", alt: "Roofer on a roof", role: "Hero slide 4; services hero", size: "1920×1080" },
  { file: "band-van.jpg", alt: "Service van in a driveway", role: "Speed-to-lead band", size: "1920×1080" },
  { file: "band-door.jpg", alt: "Technician at a front door", role: "Tracked-to-the-job band; funnel hero", size: "1920×1080" },
  { file: "band-landscaper.jpg", alt: "Landscaper at work", role: "The rule band", size: "1920×1080" },
  { file: "band-neighborhood.jpg", alt: "Phoenix neighborhood", role: "Phoenix-first band", size: "1920×1080" },
  { file: "brian-greenberg.jpg", alt: "Brian Greenberg", role: "About page portrait; funnel quote", size: "800×968" },
  { file: "book-salesman.jpg", alt: "The Salesman Who Doesn't Sell, book cover", role: "About page", size: "323×500" },
];

export type V2Video = { file: string; label: string; body: string };

export const v2Videos: V2Video[] = [
  { file: "bbm-local-30s.mp4", label: "30-second cut", body: "Linked from the services page for people in a hurry. 1.7 MB." },
  { file: "bbm-local-45s.mp4", label: "45-second cut", body: "The cut the mockup embedded on the home page. 2.6 MB." },
  { file: "bbm-local-full.mp4", label: "Full walkthrough, 90 seconds", body: "Embedded on the services page. 4.3 MB." },
];

export const v2Poster = "poster.png";

export type V2BrandRound = {
  name: string;
  body: string;
  favicon?: string;
  images: V2Image[];
};

// The logo rounds, newest first, as the bbm-plan brand sheets recorded them.
export const v2BrandRounds: V2BrandRound[] = [
  {
    name: "Rocket Llama from Peru",
    body: "The round that carried forward. The partners chose Rocket Llama on 2026-10-04; the white llama in shades on blue indigo is the mark to redraw as vector.",
    favicon: "rocket-llama-favicon",
    images: [
      { file: "llama-shades-1.jpg", alt: "White llama in shades, blue indigo circle, take 1" },
      { file: "llama-shades-2.jpg", alt: "White llama in shades, take 2" },
      { file: "llama-shades-3.jpg", alt: "With rocket flame, take 1" },
      { file: "llama-shades-4.jpg", alt: "With rocket flame, take 2" },
      { file: "llama-indigo-flat-1.jpg", alt: "Indigo header logo, take 1" },
      { file: "llama-indigo-flat-2.jpg", alt: "Indigo header logo, take 2" },
      { file: "llama-indigo-icon-1.jpg", alt: "Indigo app icon, take 1" },
      { file: "llama-indigo-icon-2.jpg", alt: "Indigo app icon, take 2" },
      { file: "llama-real-ride-1.jpg", alt: "Drawn from the real Peru llama, take 1" },
      { file: "llama-real-ride-2.jpg", alt: "Drawn from the real Peru llama, take 2" },
      { file: "llama-real-flat-1.jpg", alt: "Horizontal, real llama, take 1" },
      { file: "llama-real-flat-2.jpg", alt: "Horizontal, real llama, take 2" },
      { file: "llama-rocket-simple-1.jpg", alt: "Simplified rocket ride, take 1" },
      { file: "llama-rocket-simple-2.jpg", alt: "Simplified rocket ride, take 2" },
      { file: "llama-rocket-flat-1.jpg", alt: "Horizontal logo, take 1" },
      { file: "llama-rocket-flat-2.jpg", alt: "Horizontal logo, take 2" },
      { file: "llama-rocket-peru-white.jpg", alt: "Full version on white" },
      { file: "llama-rocket-peru-1.jpg", alt: "On black, take 1" },
      { file: "llama-rocket-peru-2.jpg", alt: "On black, take 2" },
      { file: "llama-rocket-peru-3.jpg", alt: "On black, astronaut take" },
      { file: "llama-peru-1.jpg", alt: "Llama from Peru badge, take 1" },
      { file: "llama-peru-2.jpg", alt: "Llama from Peru badge, take 2" },
      { file: "llama-peru-neon-1.jpg", alt: "Neon llama from Peru, take 1" },
      { file: "llama-peru-neon-2.jpg", alt: "Neon llama from Peru, take 2" },
    ],
  },
  {
    name: "Neon Koala",
    body: "Hot pink, electric cyan, night blue and a koala in shades. The strongest favicon of any round; it still reads at 16 pixels.",
    favicon: "neon-koala-favicon",
    images: [
      { file: "neon-koala-app-1.jpg", alt: "Dark app-icon lockup, cyan lenses" },
      { file: "neon-koala-app-2.jpg", alt: "Dark app-icon lockup, black lenses" },
      { file: "neon-koala-circle-1.jpg", alt: "Pink circle, take 1" },
      { file: "neon-koala-circle-2.jpg", alt: "Pink circle, take 2" },
      { file: "neon-koala-sign-1.jpg", alt: "Neon sign, take 1" },
      { file: "neon-koala-sign-2.jpg", alt: "Neon sign, take 2" },
      { file: "neon-koala-favicon-test.jpg", alt: "Favicon test at 16 to 96 pixels" },
    ],
  },
  {
    name: "Electric Llama",
    body: "The Neon Llama's attitude in electric blue, with a lightning-bolt ear.",
    favicon: "electric-llama-favicon",
    images: [
      { file: "electric-llama-cool-1.jpg", alt: "Cool llama in shades with a bolt ear, take 1" },
      { file: "electric-llama-cool-2.jpg", alt: "Cool llama in shades, take 2" },
      { file: "electric-llama-shades-3.jpg", alt: "First sunglasses pass, black lenses" },
      { file: "electric-llama-shades-1.jpg", alt: "First sunglasses pass, yellow lenses" },
      { file: "electric-llama-circle-1.jpg", alt: "Yellow circle with a bolt stripe" },
      { file: "electric-llama-bolt-1.jpg", alt: "Llama-shaped lightning bolt icon" },
      { file: "electric-llama-app-1.jpg", alt: "App icon lockup" },
      { file: "llama-electric-1.jpg", alt: "Earlier illustrated logo, take 1" },
      { file: "llama-electric-2.jpg", alt: "Earlier illustrated logo, take 2" },
      { file: "electric-llama-favicon-test.jpg", alt: "Favicon test" },
    ],
  },
  {
    name: "Neon Llama",
    body: "White llama in shades in a hot pink circle; the dark app-icon square with a pink neon edge was the team pick of this round.",
    favicon: "neon-llama-favicon",
    images: [
      { file: "neon-llama-circle-1.jpg", alt: "Pink circle, take 1" },
      { file: "neon-llama-circle-2.jpg", alt: "Pink circle, take 2" },
      { file: "neon-llama-app-1.jpg", alt: "Dark app-icon square beside the wordmark, take 1" },
      { file: "neon-llama-app-2.jpg", alt: "Dark app icon lockup, take 2" },
      { file: "neon-llama-sign-1.jpg", alt: "Minimal neon sign, take 1" },
      { file: "neon-llama-sign-2.jpg", alt: "Minimal neon sign, take 2" },
      { file: "llama-neon-1.jpg", alt: "Earlier illustrated logo, take 1" },
      { file: "llama-neon-2.jpg", alt: "Earlier illustrated logo, take 2" },
      { file: "neon-llama-favicon-test.png", alt: "Favicon test" },
    ],
  },
  {
    name: "Rocket Llama, first illustrated takes",
    body: "The first illustrated passes at the rocket ride, before the Peru round.",
    images: [
      { file: "llama-rocket-1.jpg", alt: "Illustrated logo, take 1" },
      { file: "llama-rocket-2.jpg", alt: "Illustrated logo, take 2" },
    ],
  },
  {
    name: "Paper Route",
    body: "The earlier name. A newsprint paper plane in six colors, the paperboy toss in a circle, and the paperboy mascot.",
    images: [
      { file: "paper-route-plane-green.jpg", alt: "Newsprint plane in green" },
      { file: "paper-route-plane-blue.jpg", alt: "Newsprint plane in blue" },
      { file: "paper-route-plane-indigo.jpg", alt: "Newsprint plane in blue indigo" },
      { file: "paper-route-plane-navy-orange.jpg", alt: "Newsprint plane in navy and orange" },
      { file: "paper-route-plane-teal.jpg", alt: "Newsprint plane in teal" },
      { file: "paper-route-plane-red.jpg", alt: "Newsprint plane in newsprint red" },
      { file: "paper-route-toss-1.jpg", alt: "Paperboy toss in a blue indigo circle, take 1" },
      { file: "paper-route-toss-2.jpg", alt: "Paperboy toss, take 2" },
      { file: "paper-route-plane-1.jpg", alt: "Newsprint paper airplane, take 1" },
      { file: "paper-route-plane-2.jpg", alt: "Newsprint paper airplane, take 2" },
      { file: "paperboy.jpg", alt: "Paperboy mascot on a bicycle" },
      { file: "paperboy-alt.jpg", alt: "Alternate paperboy pose, open line style" },
      { file: "paperboy-alt2.jpg", alt: "Alternate paperboy pose, solid style" },
      { file: "paper-route-plane-favicon-test.png", alt: "Favicon test" },
    ],
  },
];

export const faviconSizes = ["16", "32", "48", "192", "512"] as const;
