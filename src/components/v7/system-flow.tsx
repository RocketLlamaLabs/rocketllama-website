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
  key: ["M6.5 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M10 12h11", "M16.5 12v2.5", "M20 12v3.5"],
};

import { MARKS } from "@/components/v7/brand-marks";

// A white tile holding one or two brand marks, centred on `cx`. `y` is the top.
function BrandTile({ marks, cx, y, size = 34 }: { marks: string[]; cx: number; y: number; size?: number }) {
  const glyph = size - 12, gap = 8;
  const w = marks.length * glyph + (marks.length - 1) * gap + 12;
  const x = cx - w / 2;
  return (
    <g className="tile brand" transform={`translate(${x} ${y})`} aria-hidden="true">
      <rect width={w} height={size} rx={size * 0.28} />
      {marks.map((m, i) => (
        <g key={m} transform={`translate(${6 + i * (glyph + gap)} 6) scale(${glyph / 24})`}>
          {MARKS[m].paths.map((p) => (<path key={p.d} d={p.d} style={{ color: p.fill }} />))}
        </g>
      ))}
    </g>
  );
}

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

// A connector: a still dashed line and a small triangle that travels it, pointing the way
// that travels the path. `begin` starts each dot part-way along (a negative
// SMIL begin), so the dots are spread out and none waits at the corner.
function Line({ d, id, dur = 2.6, begin = 0, quiet = false, head = true }: { d: string; id: string; dur?: number; begin?: number; quiet?: boolean; head?: boolean }) {
  return (
    <g className={quiet ? "ln quiet" : "ln"} aria-hidden="true">
      <path d={d} className="track" />
      <path d={d} className="run" />
      {quiet ? null : (
        <path d="M-6 -5 L6 0 L-6 5 Z" className="dot">
          <animateMotion dur={`${dur}s`} begin={`-${begin}s`} repeatCount="indefinite" path={d} rotate="auto" />
        </path>
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

const LABEL = "How the Rocket Llama Labs marketing system connects: Google Business Profile, Google Ads and Local Services, social media and ads (Facebook, Instagram, YouTube, TikTok), and AI search (ChatGPT, Gemini, Perplexity) send customers to a website you own. The website, the phones with an AI receptionist, and reviews per service feed your CRM. Your CRM, your data and management system, turns them into booked calls and appointments, then closed jobs and revenue. You own all of it.";

const SOURCES: { icon: keyof typeof ICONS; marks: string[]; a: string; b: string; one: string; sub: string; subTall?: string }[] = [
  { icon: "pin", marks: ["google"], a: "Google Business", b: "Profile", one: "Google Business Profile", sub: "reviews, maps, free clicks", subTall: "reviews, maps, free clicks" },
  { icon: "search", marks: ["googleads"], a: "Google Ads +", b: "Local Services", one: "Google Ads + Local Services", sub: "highest intent, you own", subTall: "highest intent, you own" },
  { icon: "megaphone", marks: ["facebook", "instagram", "youtube", "tiktok"], a: "Social media", b: "and ads", one: "Social media and ads", sub: "your channels, lead forms you own", subTall: "your channels, you own" },
  { icon: "search", marks: ["gemini", "perplexity"], a: "AI search", b: "", one: "AI search", sub: "ChatGPT, Gemini, Perplexity", subTall: "ChatGPT, Gemini and more" },
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

      {SOURCES.map((s, i) => (
        <g key={s.one}>
          <rect x={sx[i]} y="42" width="232" height="104" rx="14" className="fcard" />
          <BrandTile marks={s.marks} cx={sx[i] + 116} y={54} />
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
        <Tile icon="globe" x={480} y={218} size={40} tone="on" />
        <text x="500" y="282" textAnchor="middle" className="h">Your website: home base</text>
        <text x="500" y="304" textAnchor="middle" className="s on">Hosted free, with schema for Google and AI search</text>
        <text x="500" y="322" textAnchor="middle" className="s on">Stars per service</text>
        <text x="500" y="340" textAnchor="middle" className="s on">Funnels: questions, address autofill, offer, booking</text>
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
        <g className="tile on" transform="translate(480 452)" aria-hidden="true"><rect width="40" height="40" rx="11" /><image href="/brand/llama-lab.png" x="3" y="3" width="34" height="34" /></g>
        <text x="500" y="514" textAnchor="middle" className="h">Your CRM: your data and management system</text>
        <text x="500" y="534" textAnchor="middle" className="s on">Pipelines, automations, AI text and email reply within 60 seconds</text>
        <text x="500" y="552" textAnchor="middle" className="s on">Booking, call tracking, closed-job value, return on ad spend dashboard</text>
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
  const row = [30, 150];
  return (
    <svg className="flow tall" viewBox="0 0 340 1232" role="img" aria-label={LABEL}>
      <Head id="flowHeadT" />
      <text x="170" y="18" textAnchor="middle" className="lab">WHERE CUSTOMERS COME FROM</text>

      {/* the spine between the two columns of sources, down into the website */}
      <Line id="flowHeadT" d="M170 44 L170 278" dur={3} />
      <Line id="flowHeadT" d="M162 86 L170 86" quiet head={false} />
      <Line id="flowHeadT" d="M178 86 L170 86" quiet head={false} />
      <Line id="flowHeadT" d="M162 210 L170 210" quiet head={false} />
      <Line id="flowHeadT" d="M178 210 L170 210" quiet head={false} />
      {/* the rail from the website to the CRM, joined by the phones and the reviews */}
      <Line id="flowHeadT" d="M30 432 L30 732" dur={3.4} begin={0.6} />
      <Line id="flowHeadT" d="M52 515 L30 515" quiet head={false} />
      <Line id="flowHeadT" d="M52 649 L30 649" quiet head={false} />
      <Line id="flowHeadT" d="M170 886 L170 912" dur={1.4} begin={0.2} />
      <Line id="flowHeadT" d="M170 1000 L170 1026" dur={1.4} begin={0.8} />

      {SOURCES.map((s, i) => {
        const x = col[i % 2], y = row[i < 2 ? 0 : 1];
        return (
          <g key={s.one}>
            <rect x={x} y={y} width="150" height="112" rx="14" className="fcard" />
            <BrandTile marks={s.marks} cx={x + 75} y={y + 12} size={32} />
            <text x={x + 75} y={y + 63} textAnchor="middle" className="b">{s.a}</text>
            <text x={x + 75} y={y + 79} textAnchor="middle" className="b">{s.b}</text>
            <text x={x + 75} y={y + 99} textAnchor="middle" className="s src">{s.subTall ?? s.sub}</text>
          </g>
        );
      })}

      <g>
        <rect x="12" y="282" width="316" height="150" rx="18" className="fhub" />
        <Tile icon="globe" x={151} y={292} size={38} tone="on" />
        <text x="170" y="353" textAnchor="middle" className="h">Your website: home base</text>
        <text x="170" y="376" textAnchor="middle" className="s on">Hosted free, with schema for Google</text>
        <text x="170" y="394" textAnchor="middle" className="s on">and AI search. Stars per service.</text>
        <text x="170" y="412" textAnchor="middle" className="s on">Funnels: questions, autofill, offer, booking</text>
      </g>

      <circle cx="30" cy="515" r="3.5" className="node" />
      <g>
        <rect x="52" y="456" width="276" height="118" rx="14" className="fcard" />
        <Tile icon="phone" x={68} y={470} />
        <text x="112" y="492" className="b">Phones + AI receptionist</text>
        <text x="68" y="524" className="s">tracked numbers on a Tier 1 carrier</text>
        <text x="68" y="542" className="s">answers, transfers to you, returns</text>
        <text x="68" y="560" className="s">to the AI to book, or take a message</text>
      </g>

      <circle cx="30" cy="649" r="3.5" className="node" />
      <g>
        <rect x="52" y="590" width="276" height="118" rx="14" className="fcard" />
        <Tile icon="star" x={68} y={604} />
        <text x="112" y="626" className="b">Reviews per service</text>
        <text x="68" y="658" className="s">existing reviews cross-referenced</text>
        <text x="68" y="676" className="s">with your jobs; new ones collected</text>
        <text x="68" y="694" className="s">automatically after every job</text>
      </g>

      <g>
        <rect x="12" y="736" width="316" height="150" rx="18" className="fhub" />
        <g className="tile on" transform="translate(151 746)" aria-hidden="true"><rect width="38" height="38" rx="10.5" /><image href="/brand/llama-lab.png" x="3" y="3" width="32" height="32" /></g>
        <text x="170" y="806" textAnchor="middle" className="h">Your CRM: your data</text>
        <text x="170" y="826" textAnchor="middle" className="h">and management system</text>
        <text x="170" y="848" textAnchor="middle" className="s on">Pipelines, automations, AI text and email</text>
        <text x="170" y="866" textAnchor="middle" className="s on">reply within 60 seconds. Booking, call tracking,</text>
        <text x="170" y="884" textAnchor="middle" className="s on">closed-job value, return on ad spend dashboard</text>
      </g>

      <g>
        <rect x="12" y="916" width="316" height="84" rx="14" className="fcard" />
        <Tile icon="calendar" x={28} y={930} />
        <text x="72" y="952" className="b">Booked calls and appointments</text>
        <text x="28" y="984" className="s">leads that already want to work with you</text>
      </g>
      <g>
        <rect x="12" y="1030" width="316" height="84" rx="14" className="fcard" />
        <Tile icon="dollar" x={28} y={1044} />
        <text x="72" y="1066" className="b">Closed jobs and revenue</text>
        <text x="28" y="1098" className="s">goal: at least $2 back per $1 spent</text>
      </g>
      <g>
        <rect x="12" y="1138" width="316" height="84" rx="14" className="fcard own" />
        <Tile icon="key" x={28} y={1152} />
        <text x="72" y="1174" className="b">You own all of it</text>
        <text x="28" y="1206" className="s">export data, port numbers, take the code</text>
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
