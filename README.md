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

- **Version 1** is the homepage at `/` (`src/app/page.tsx`).
- **Version 2** is the sample site under `/v2` (`src/app/v2`, components in `src/components/v2`), ported from the BBM Local mockup C in [RocketLlamaLabs/bbm-plan](https://github.com/RocketLlamaLabs/bbm-plan). Its photos, video cuts and the logo rounds are in `public/v2`. The admin lists both under **Website**, and `/admin/website/v2` is the version 2 kit: pages, quizzes, calendar, design tokens and every asset.

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
