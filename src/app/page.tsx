import Image from "next/image";
import Link from "next/link";
import { Bot, Code2, Gauge } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Custom AI agents",
    body: "Agents that read your tickets, your docs and your data, and do the next step without being asked. Scoped in a week, live in four.",
  },
  {
    icon: Code2,
    title: "Software, built to ship",
    body: "Web apps, internal tools and integrations with fixed scope and two-week sprints. Production from day one.",
  },
  {
    icon: Gauge,
    title: "Fix what's slow",
    body: "We take the spreadsheet, the manual step or the flaky script and replace it with something that works by Friday.",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 h-[72px] bg-white shadow-sm">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/wordmark-horizontal-rocket-o.svg"
              alt="Rocket Llama Labs"
              width={160}
              height={16}
              priority
              className="h-5 w-auto"
            />
          </Link>
          <nav className="hidden items-center gap-6 text-[15px] font-medium sm:flex">
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#work" className="hover:underline">
              Work
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
            <Link
              href="/admin"
              target="_blank"
              rel="noopener"
              className="rounded-md border-[1.5px] border-navy px-3 py-1.5 hover:bg-mist"
            >
              Admin
            </Link>
          </nav>
          <a
            href="#contact"
            className="rounded-md bg-blue px-5 py-3 text-base font-semibold text-white hover:bg-action-hover"
          >
            Start a project
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="max-w-[68ch]">
            <h1 className="text-[40px] leading-[44px] font-bold sm:text-[56px] sm:leading-[60px]">
              Build fast. <span className="text-blue">Launch faster.</span>
            </h1>
            <p className="mt-6 text-lg leading-7">
              Rocket Llama Labs designs and ships custom software and AI agents
              for teams that are done waiting. Fixed scope, two-week sprints,
              production from day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-md bg-blue px-5 py-3 text-base font-semibold text-white hover:bg-action-hover"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="rounded-md border-[1.5px] border-navy px-5 py-3 text-base font-semibold hover:bg-mist"
              >
                See our work
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/brand/mascot.svg"
              alt="Rocket Llama Labs mascot: a llama in sunglasses riding a rocket"
              width={420}
              height={316}
              priority
              className="h-auto w-[280px] sm:w-[420px]"
            />
          </div>
        </section>

        <section id="services" className="bg-mist">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase">
              What we do
            </p>
            <h2 className="mt-2 text-[26px] leading-8 font-bold sm:text-[32px] sm:leading-10">
              What does Rocket Llama Labs build?
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md"
                >
                  <Icon className="size-6 text-blue" strokeWidth={2} />
                  <h3 className="mt-4 text-2xl leading-8 font-semibold">
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase">
            Case study
          </p>
          <h2 className="mt-2 max-w-[28ch] text-[26px] leading-8 font-bold sm:text-[32px] sm:leading-10">
            How much does a custom agent cost?
          </h2>
          <p className="mt-4 max-w-[68ch] text-lg leading-7">
            Northwind&rsquo;s dispatch team was re-keying 300 orders a day. We
            replaced the spreadsheet with an agent that reads the inbound PDFs,
            validates them against inventory and books the carrier. Re-keying is
            now zero; the team handles 2&times; the volume.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["300", "orders a day, re-keyed by hand before"],
              ["0", "orders re-keyed after"],
              ["4 weeks", "from kickoff to production"],
            ].map(([stat, label]) => (
              <div key={label} className="border-t-4 border-blue pt-4">
                <dt className="text-[40px] leading-none font-bold font-display">
                  {stat}
                </dt>
                <dd className="mt-2 text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="bg-navy text-white">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="max-w-[24ch] text-[26px] leading-8 font-bold sm:text-[32px] sm:leading-10">
              Tell us what&rsquo;s slow. We&rsquo;ll tell you what it costs and
              how long it takes.
            </h2>
            <a
              href="mailto:hello@rocketllamalabs.com"
              className="mt-8 inline-block rounded-md bg-blue px-5 py-3 text-base font-semibold text-white hover:bg-action-hover"
            >
              Start a project
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 border-t border-white/15 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Image
            src="/brand/wordmark-horizontal-rocket-o.svg"
            alt="Rocket Llama Labs"
            width={160}
            height={16}
            className="h-4 w-auto brightness-0 invert"
          />
          <p className="text-sm text-mist">
            Software &amp; AI studio. We build the thing, then we ship it.
          </p>
          <Link
            href="/admin"
            target="_blank"
            rel="noopener"
            className="text-sm text-mist hover:underline"
          >
            Admin
          </Link>
        </div>
      </footer>
    </>
  );
}
