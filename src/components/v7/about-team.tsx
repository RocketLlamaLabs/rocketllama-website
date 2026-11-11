/* eslint-disable @next/next/no-img-element -- same markup as the rest of the site */

import { TEAM } from "@/components/v7/team-data";

// The team cards on the About page. "Read more" goes to each person's own page.
export function TeamSection({ tone = "blue" }: { tone?: "blue" | "white" }) {
  return (
<section id="team" className={`tone-${tone}`}><div className="wrap">
  <p className="kicker">Leadership</p>
  <h2>Three people. One system.</h2>
  <div className="team">
    {TEAM.map((p) => (
      <article className="card" key={p.slug}>
        <img className="headshot photo" src={p.photo} alt={p.alt} />
        <h3 id={p.slug}>{p.name}</h3>
        <p className="role">{p.shortRole ?? p.role}</p>
        <p dangerouslySetInnerHTML={{ __html: p.summary }} />
        <a className="more" href={`/about/${p.slug}`}>Read more</a>
      </article>
    ))}
  </div>
</div></section>
  );
}
