This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind) in `src/`
- **Supabase** — clients in `src/lib/supabase/` (`client.ts` for the browser, `server.ts` for Server Components/Actions). `src/proxy.ts` refreshes the auth session on each request.
- **Vercel** — import the GitHub repo in Vercel; Next.js is auto-detected. Set the env vars from `.env.example` in the Vercel project settings.

## Website versions

- **Version 3** is the live site at `/` (`src/app/(home)`: home, `/services`, `/book`, `/qualify`, `/about-brian`; footer in `src/components/v3`). It is version 2 in the Rocket Llama colors with the stacked logo, rotating hero headlines and no price list, generated from the version 2 source: after editing version 2, run `python3 scripts/make-v3.py` to carry the change forward. The shared components in `src/components/v2` take a `base` prop so both versions can use them. `/v3` redirects to `/`.
- **Version 1**, the software and AI studio homepage, moved to `/v1` (`src/app/v1/page.tsx`).
- **Version 2** is the sample site under `/v2` (`src/app/v2`, components in `src/components/v2`), ported from the BBM Local mockup C in [RocketLlamaLabs/bbm-plan](https://github.com/RocketLlamaLabs/bbm-plan). Its photos, video cuts and the logo rounds are in `public/v2`. `/admin/website/v2` is the version 2 kit: pages, quizzes, calendar, design tokens and every asset.
- **Version 7** is version 3 with the custom elements from Madison's mockups folded in (`src/app/v7`, components and styles in `src/components/v7`): the instant audit in the hero, the Valley map with open and taken spots per trade, the per-trade tuning and photo band, the speed-to-lead race, the monthly report card, the exit checklist, the 90-day timeline and the agency comparison. The same generator writes it, so edits to version 2 carry forward to both 3 and 7.
- **Versions 4, 5 and 6** are the three homepage directions (Ignition, Sunrise Valley, Signal): single static pages in `public/mockups`, served at `/v4`, `/v5` and `/v6` by rewrites in `next.config.ts`, with a side-by-side index at `/mockups`. The stacked and horizontal logo lockups they use are in `public/brand/logo-*.svg`.

The admin lists every version under **Website**.

To re-port after editing the mockup sources, with a checkout of `bbm-plan` beside this repository:

```bash
python3 scripts/build-v2-css.py
python3 scripts/port-v2-site.py ../rocketllamalabs/bbm-plan
```

## Local setup

```bash
cp .env.example .env.local   # then fill in your Supabase URL and publishable key
npm install
npm run dev
```
