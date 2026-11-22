import { V7Footer } from "@/components/v7/footer";
import { AboutStructuredData } from "@/components/v7/about-seo";
import { TeamSection } from "@/components/v7/about-team";
import { Nav, Stats, GOAL, LEDE, PULL_1, PULL_2, BLOCKS } from "@/components/v7/about-mockups";

// The page's one heading names who we are and what we do; the slogan sits above it.
const H1 = "The marketing team for home service companies.";

// The About page: mockup F, chosen on 11 November 2026. Light blue header and
// two-column section (quotes and proof numbers on the left, the seven points as
// dropdowns on the right), the team on white, the light blue footer.
export function AboutPage() {
  return (
    <>
      <Nav />
      <main className="am am-f about-live">
        <AboutStructuredData />
        <header className="pagehead" id="top"><div className="wrap in">
          <p className="kicker">About Rocket Llama Labs</p>
          <h1>{H1}</h1>
          <p className="goal">{GOAL}</p>
          <p className="lede">{LEDE}</p>
        </div></header>
        <section className="am-split"><div className="wrap">
          <div className="am-cols">
            <div className="left">
              <p className="pull">{PULL_1}</p>
              <Stats />
              <p className="pull">{PULL_2}</p>
            </div>
            <div className="right">
              {BLOCKS.map(([h, ps], i) => (
                <details className="pt" key={h} open={i === 0}><summary>{h}</summary>{ps.map((p) => <p key={p}>{p}</p>)}</details>
              ))}
            </div>
          </div>
        </div></section>
        <TeamSection tone="white" />
      </main>
      <V7Footer note="Version 7, about us" />
    </>
  );
}
