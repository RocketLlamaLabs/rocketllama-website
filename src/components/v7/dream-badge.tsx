// A revolving circular badge: "If you can dream it · We can build it", set
// around a circle and turned slowly by CSS (v7.css .dream-badge). Decorative; the
// sentence is in the aria-label.
export function DreamBadge({ tone }: { tone?: "blue" }) {
  return (
    <div className={tone === "blue" ? "dream-badge blue" : "dream-badge"} aria-label="If you can dream it, we can build it" role="img">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="dream-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text textLength="490" lengthAdjust="spacing">
          <textPath href="#dream-ring" startOffset="0" textLength="490" lengthAdjust="spacing">
            {"IF YOU CAN DREAM IT \u00b7 WE CAN BUILD IT \u00b7\u00a0"}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
