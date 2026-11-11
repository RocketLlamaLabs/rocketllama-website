// The client's marketing system as a live flow: where customers come from,
// the website and phones they land on, the CRM everything ends up in, and the
// booked jobs that come out. Two drawings of the same system: a wide one for
// desktop and a tall one for phones (v7.css shows one or the other), so the
// text never shrinks below a readable size. The lines move with CSS and SMIL
// only, no client JavaScript, and stand still for prefers-reduced-motion.

const ICONS: Record<string, string[]> = {
  pin: ["M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z", "M12 13.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"],
  search: ["M10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z", "M14.6 14.6L20 20"],
  megaphone: ["M4 10v4h3l7 4V6l-7 4H4z", "M17 9.5a3.5 3.5 0 0 1 0 5", "M7 14l1 5h2.5"],
  play: ["M6 6h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z", "M10.5 9.5l4 2.5-4 2.5z"],
  phone: ["M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z"],
  globe: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z", "M3.5 12h17", "M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5S9.6 5.8 12 3.5z"],
  star: ["M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"],
  layers: ["M12 9.3c3.9 0 7-1.3 7-2.8s-3.1-2.8-7-2.8-7 1.3-7 2.8 3.1 2.8 7 2.8z", "M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5", "M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5"],
  calendar: ["M6.5 5.5h11a2.5 2.5 0 0 1 2.5 2.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V8a2.5 2.5 0 0 1 2.5-2.5z", "M4 10h16M8.5 3.5v4M15.5 3.5v4", "M9 14.5l2.2 2.2 4-4"],
  dollar: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z", "M14.5 9.3c-.5-.9-1.4-1.4-2.5-1.4-1.5 0-2.6.8-2.6 2 0 2.9 5.3 1.3 5.3 4.2 0 1.2-1.1 2-2.7 2-1.2 0-2.2-.5-2.7-1.4", "M12 6.3v1.6M12 16.1v1.6"],
  key: ["M8 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M10.6 11.4L19 3M15.5 6.5L18 9"],
};

// A rounded tile with a line icon in it. `x`,`y` is the tile's top-left.
function Tile({ icon, x, y, size = 34, tone = "" }: { icon: keyof typeof ICONS; x: number; y: number; size?: number; tone?: string }) {
  const s = (size - 12) / 24;
  return (
    <g className={`tile ${tone}`} transform={`translate(${x} ${y})`} aria-hidden="true">
      <rect width={size} height={size} rx={size * 0.28} />
      <g transform={`translate(6 6) scale(${s})`}>
        {ICONS[icon].map((d) => (<path key={d} d={d} />))}
      </g>
    </g>
  );
}

// A connector: a faint track, moving dashes on top, an arrowhead, and a dot
// that travels the path. `begin` starts each dot part-way along (a negative
// SMIL begin), so the dots are spread out and none waits at the corner.
function Line({ d, id, dur = 2.6, begin = 0, quiet = false, head = true }: { d: string; id: string; dur?: number; begin?: number; quiet?: boolean; head?: boolean }) {
  return (
    <g className={quiet ? "ln quiet" : "ln"} aria-hidden="true">
      <path d={d} className="track" />
      <path d={d} className="run" markerEnd={head ? `url(#${id})` : undefined} />
      {quiet ? null : (
        <circle r="4" className="dot">
          <animateMotion dur={`${dur}s`} begin={`-${begin}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
}

function Head({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="mk" />
      </marker>
    </defs>
  );
}

const LABEL = "How the Rocket Llama Labs marketing system connects: Google Business Profile, Google Ads and Local Services, Facebook and Instagram ads, and YouTube, social and AI search send customers to a website you own. The website, the phones with an AI receptionist, and reviews per service feed your CRM. The CRM turns them into booked calls and appointments, then closed jobs and revenue. You own all of it.";

const SOURCES: { icon: keyof typeof ICONS; a: string; b: string; one: string; sub: string }[] = [
  { icon: "pin", a: "Google Business", b: "Profile", one: "Google Business Profile", sub: "reviews, maps, free clicks" },
  { icon: "search", a: "Google Ads +", b: "Local Services", one: "Google Ads + Local Services", sub: "highest intent, you own" },
  { icon: "megaphone", a: "Facebook +", b: "Instagram ads", one: "Facebook + Instagram ads", sub: "lead forms, you own" },
  { icon: "play", a: "YouTube, social", b: "+ AI search", one: "YouTube + social + AI search", sub: "your channels, your name" },
];

function Wide() {
  const sx = [12, 260, 508, 756]; // source cards, 232 wide
  return (
    <svg className="flow wide" viewBox="0 0 1000 712" role="img" aria-label={LABEL}>
      <Head id="flowHeadW" />
      <text x="500" y="20" textAnchor="middle" className="lab">WHERE CUSTOMERS COME FROM</text>

      <Line id="flowHeadW" d="M128 146 L128 208" begin={0} />
      <Line id="flowHeadW" d="M376 146 C376 182 440 168 440 203" begin={0.5} />
      <Line id="flowHeadW" d="M624 146 C624 182 560 168 560 203" begin={1} />
      <Line id="flowHeadW" d="M872 146 C872 196 700 150 664 203" begin={1.5} />
      <Line id="flowHeadW" d="M262 280 L298 280" dur={1.6} begin={0.3} />
      <Line id="flowHeadW" d="M738 280 L702 280" dur={1.6} begin={0.9} />
      <Line id="flowHeadW" d="M137 350 L137 398 Q137 410 149 410 L248 410 Q260 410 260 422 L260 438" begin={0.2} />
      <Line id="flowHeadW" d="M500 355 L500 438" dur={1.8} begin={0.7} />
      <Line id="flowHeadW" d="M863 350 L863 398 Q863 410 851 410 L752 410 Q740 410 740 422 L740 438" begin={1.2} />
      <Line id="flowHeadW" d="M500 560 L500 618" dur={1.8} begin={0.4} />
      <Line id="flowHeadW" d="M645 661 L696 661" dur={1.6} begin={1} />
      <Line id="flowHeadW" d="M302 661 L353 661" quiet />
      <Line id="flowHeadW" d="M988 661 L996 661 L996 94 L990 94" quiet />

      {SOURCES.map((s, i) => (
        <g key={s.one}>
          <rect x={sx[i]} y="42" width="232" height="104" rx="14" className="fcard" />
          <Tile icon={s.icon} x={sx[i] + 99} y={54} />
          <text x={sx[i] + 116} y="112" textAnchor="middle" className="b">{s.one}</text>
          <text x={sx[i] + 116} y="132" textAnchor="middle" className="s">{s.sub}</text>
        </g>
      ))}

      <g>
        <rect x="12" y="210" width="250" height="140" rx="14" className="fcard" />
        <Tile icon="phone" x={28} y={226} />
        <text x="72" y="248" className="b">Phones + AI receptionist</text>
        <text x="28" y="284" className="s">tracked numbers on a Tier 1 carrier</text>
        <text x="28" y="304" className="s">answers, transfers to you, returns</text>
        <text x="28" y="324" className="s">to the AI to book, or take a message</text>
      </g>

      <g>
        <rect x="300" y="205" width="400" height="150" rx="18" className="fhub" />
        <rect x="300" y="205" width="400" height="150" rx="18" className="halo" />
        <Tile icon="globe" x={324} y={225} size={40} tone="on" />
        <text x="378" y="252" className="h">Your website: home base</text>
        <text x="324" y="292" className="s on">Hosted free, with schema for Google and AI search</text>
        <text x="324" y="312" className="s on">Stars per service</text>
        <text x="324" y="332" className="s on">Funnels: questions, address autofill, offer, booking</text>
      </g>

      <g>
        <rect x="738" y="210" width="250" height="140" rx="14" className="fcard" />
        <Tile icon="star" x={754} y={226} />
        <text x="798" y="248" className="b">Reviews per service</text>
        <text x="754" y="284" className="s">existing reviews cross-referenced</text>
        <text x="754" y="304" className="s">with your jobs; new ones collected</text>
        <text x="754" y="324" className="s">automatically after every job</text>
      </g>

      <g>
        <rect x="180" y="440" width="640" height="120" rx="18" className="fhub" />
        <rect x="180" y="440" width="640" height="120" rx="18" className="halo late" />
        <Tile icon="layers" x={204} y={460} size={40} tone="on" />
        <text x="258" y="487" className="h">Your CRM</text>
        <text x="204" y="522" className="s on">Pipelines, automations, AI text and email reply within 60 seconds</text>
        <text x="204" y="542" className="s on">Booking, call tracking, closed-job value, return on ad spend dashboard</text>
      </g>

      <g>
        <rect x="12" y="620" width="290" height="82" rx="14" className="fcard own" />
        <Tile icon="key" x={28} y={634} />
        <text x="72" y="656" className="b">You own all of it</text>
        <text x="28" y="688" className="s">export data, port numbers, take the code</text>
      </g>
      <g>
        <rect x="355" y="620" width="290" height="82" rx="14" className="fcard" />
        <Tile icon="calendar" x={371} y={634} />
        <text x="415" y="656" className="b">Booked calls and appointments</text>
        <text x="371" y="688" className="s">leads that already want to work with you</text>
      </g>
      <g>
        <rect x="698" y="620" width="290" height="82" rx="14" className="fcard" />
        <Tile icon="dollar" x={714} y={634} />
        <text x="758" y="656" className="b">Closed jobs and revenue</text>
        <text x="714" y="688" className="s">goal: at least $2 back per $1 spent</text>
      </g>
    </svg>
  );
}

function Tall() {
  const col = [12, 178]; // two source columns, 150 wide, around a centre spine at x=170
  const row = [30, 154];
  return (
    <svg className="flow tall" viewBox="0 0 340 1262" role="img" aria-label={LABEL}>
      <Head id="flowHeadT" />
      <text x="170" y="18" textAnchor="middle" className="lab">WHERE CUSTOMERS COME FROM</text>

      {/* the spine between the two columns of sources, down into the website */}
      <Line id="flowHeadT" d="M170 44 L170 308" dur={3} />
      <Line id="flowHeadT" d="M162 86 L170 86" quiet head={false} />
      <Line id="flowHeadT" d="M178 86 L170 86" quiet head={false} />
      <Line id="flowHeadT" d="M162 210 L170 210" quiet head={false} />
      <Line id="flowHeadT" d="M178 210 L170 210" quiet head={false} />
      {/* the rail from the website to the CRM, joined by the phones and the reviews */}
      <Line id="flowHeadT" d="M30 462 L30 762" dur={3.4} begin={0.6} />
      <Line id="flowHeadT" d="M52 545 L30 545" quiet head={false} />
      <Line id="flowHeadT" d="M52 679 L30 679" quiet head={false} />
      <Line id="flowHeadT" d="M170 916 L170 942" dur={1.4} begin={0.2} />
      <Line id="flowHeadT" d="M170 1030 L170 1056" dur={1.4} begin={0.8} />

      {SOURCES.map((s, i) => {
        const x = col[i % 2], y = row[i < 2 ? 0 : 1];
        return (
          <g key={s.one}>
            <rect x={x} y={y} width="150" height="112" rx="14" className="fcard" />
            <Tile icon={s.icon} x={x + 59} y={y + 12} size={32} />
            <text x={x + 75} y={y + 63} textAnchor="middle" className="b">{s.a}</text>
            <text x={x + 75} y={y + 79} textAnchor="middle" className="b">{s.b}</text>
            <text x={x + 75} y={y + 99} textAnchor="middle" className="s src">{s.sub}</text>
          </g>
        );
      })}

      <g>
        <rect x="12" y="312" width="316" height="150" rx="18" className="fhub" />
        <rect x="12" y="312" width="316" height="150" rx="18" className="halo" />
        <Tile icon="globe" x={28} y={328} size={38} tone="on" />
        <text x="78" y="353" className="h">Your website: home base</text>
        <text x="28" y="390" className="s on">Hosted free, with schema for Google</text>
        <text x="28" y="408" className="s on">and AI search. Stars per service.</text>
        <text x="28" y="426" className="s on">Funnels: questions, address autofill,</text>
        <text x="28" y="444" className="s on">offer, booking</text>
      </g>

      <circle cx="30" cy="545" r="3.5" className="node" />
      <g>
        <rect x="52" y="486" width="276" height="118" rx="14" className="fcard" />
        <Tile icon="phone" x={68} y={500} />
        <text x="112" y="522" className="b">Phones + AI receptionist</text>
        <text x="68" y="554" className="s">tracked numbers on a Tier 1 carrier</text>
        <text x="68" y="572" className="s">answers, transfers to you, returns</text>
        <text x="68" y="590" className="s">to the AI to book, or take a message</text>
      </g>

      <circle cx="30" cy="679" r="3.5" className="node" />
      <g>
        <rect x="52" y="620" width="276" height="118" rx="14" className="fcard" />
        <Tile icon="star" x={68} y={634} />
        <text x="112" y="656" className="b">Reviews per service</text>
        <text x="68" y="688" className="s">existing reviews cross-referenced</text>
        <text x="68" y="706" className="s">with your jobs; new ones collected</text>
        <text x="68" y="724" className="s">automatically after every job</text>
      </g>

      <g>
        <rect x="12" y="766" width="316" height="150" rx="18" className="fhub" />
        <rect x="12" y="766" width="316" height="150" rx="18" className="halo late" />
        <Tile icon="layers" x={28} y={782} size={38} tone="on" />
        <text x="78" y="807" className="h">Your CRM</text>
        <text x="28" y="844" className="s on">Pipelines, automations, AI text and email</text>
        <text x="28" y="862" className="s on">reply within 60 seconds. Booking, call</text>
        <text x="28" y="880" className="s on">tracking, closed-job value, return on</text>
        <text x="28" y="898" className="s on">ad spend dashboard</text>
      </g>

      <g>
        <rect x="12" y="946" width="316" height="84" rx="14" className="fcard" />
        <Tile icon="calendar" x={28} y={960} />
        <text x="72" y="982" className="b">Booked calls and appointments</text>
        <text x="28" y="1014" className="s">leads that already want to work with you</text>
      </g>
      <g>
        <rect x="12" y="1060" width="316" height="84" rx="14" className="fcard" />
        <Tile icon="dollar" x={28} y={1074} />
        <text x="72" y="1096" className="b">Closed jobs and revenue</text>
        <text x="28" y="1128" className="s">goal: at least $2 back per $1 spent</text>
      </g>
      <g>
        <rect x="12" y="1168" width="316" height="84" rx="14" className="fcard own" />
        <Tile icon="key" x={28} y={1182} />
        <text x="72" y="1204" className="b">You own all of it</text>
        <text x="28" y="1236" className="s">export data, port numbers, take the code</text>
      </g>
    </svg>
  );
}

export function SystemFlow() {
  return (
    <div className="flowwrap">
      <Wide />
      <Tall />
    </div>
  );
}
