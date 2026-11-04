# Generates the versions that derive from the version 2 source:
#
#   version 3  ->  src/app/(home)  (the live site: /, /services, /book, /qualify, /about-brian)
#   version 7  ->  src/app/v7      (version 3 plus the custom elements from Madison's mockups)
#   version 8  ->  src/app/v8      (the simplified homepage; its home lives in src/components/v8/home.tsx,
#                                   the sub-pages come from version 2 like the others)
#
# Both keep version 2's pages, quizzes, funnel and photos, rescoped under their
# own class (.v3 / .v7), recolored to the Rocket Llama brand, with the stacked
# logo, no price list (the custom-plan section instead) and rotating hero
# headlines. Version 7 also splices in the instant audit, the Valley city map
# with per-trade tuning, the speed-to-lead race, the monthly report card, the
# exit checklist, the 90-day timeline and the agency comparison, whose
# components live in src/components/v7 (hand-written, not generated).
#
# Re-run after editing version 2 to carry changes forward:
#     python3 scripts/make-v3.py
import os, re, shutil

root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
src = os.path.join(root, 'src/app/v2')


def edit(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        if a not in s:
            if b in s:
                continue  # already applied on an earlier run
            raise SystemExit(f'MISSING in {path}: {a[:60]}')
        s = s.replace(a, b)
    open(path, 'w').write(s)


# ---------- shared components (src/components/v2): colors become CSS variables
# (identical in v2), links take a base. Idempotent.
def patch_shared():
    comp = os.path.join(root, 'src/components/v2')
    for f in ['book-funnel.tsx', 'qualify-quiz.tsx']:
        edit(os.path.join(comp, f), [('stroke="#dfe7e1"', 'stroke="var(--line)"'), ('fill="#f4f8f5"', 'fill="var(--bg)"'), ('fill="#16a34a"', 'fill="var(--accent)"')])
    edit(os.path.join(comp, 'sixty-second-check.tsx'), [
        ('stroke="#e5ece7"', 'stroke="var(--line)"'), ('stroke="#16a34a"', 'stroke="var(--accent)"'),
        ('export function SixtySecondCheck() {', 'export function SixtySecondCheck({ base = "/v2", cta = "Book a walkthrough" }: { base?: string; cta?: string }) {'),
        ('href="/v2/book">Book a walkthrough</a>', 'href={`${base}/book`}>{cta}</a>'),
    ])
    edit(os.path.join(comp, 'behavior/sixty-second-check.js'), [
        ("document.getElementById('chk_book').href='/v2/book?score='+s;", "var bk=document.getElementById('chk_book'); bk.href=bk.getAttribute('href').split('?')[0]+'?score='+s;"),
    ])
    edit(os.path.join(comp, 'free-scan.tsx'), [
        ('export function FreeScan() {', 'export function FreeScan({ base = "/v2" }: { base?: string }) {'),
        ('href="/v2/book">Book a walkthrough</a>', 'href={`${base}/book`}>Book a walkthrough</a>'),
    ])


FOOTER = '''import Image from "next/image";
import Link from "next/link";

// Footer for version {N}: the version 2 layout in the Rocket Llama colors,
// with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V{N}Footer({ note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="{HOME}" aria-label="Rocket Llama Labs home">
          <Image
            src="/brand/logo-stacked.svg"
            alt="Rocket Llama Labs"
            width={137}
            height={40}
          />
        </Link>
        <span>
          <b>Rocket Llama Labs</b> · Phoenix, Arizona · Branson, Brian and
          Madison
        </span>
        <span>
          {note} · not indexed ·{" "}
          <Link href="/admin/website">Website versions</Link>
        </span>
      </div>
    </footer>
  );
}
'''

PLAN_SECTION = '''<section id="plan" className="feature"><div className="wrap">
  <p className="kicker">Your plan</p>
  <h2>No price list. A marketing plan written for your company.</h2>
  <p className="sub">Every company is quoted on its own. On the walkthrough we look at your trade, your area, your calendar and what you already have, then write the plan with a number on it. You see the plan before you pay for anything, and you keep it either way.</p>
  <div className="ctas"><a className="btn" href="{BASE}/book">Book a call</a><a className="btn ghost" href="#check">Take the 60-second check</a></div>
</div></section>'''

ROT = '''    <div className="rot">
      <div className="rslide"><h1>Your calendar should be <em>full.</em></h1><p className="lede">{LEDE}</p></div>
      <div className="rslide"><h1>Every call <em>answered</em> in under a minute.</h1><p className="lede">Calls, forms and estimate requests get a text and an email back in under a minute, in your voice, even when you are on a job. The phone still rings you first. If nobody can pick up, the AI books the appointment.</p></div>
      <div className="rslide"><h1>Be the company Google and AI <em>recommend.</em></h1><p className="lede">When a homeowner searches, or asks ChatGPT, for someone in your trade in your city, the answer should be you. A website you own that search engines and AI can read, your Google profile and reviews worked hard, and ads in your name.</p></div>
      <div className="rslide"><h1>Every dollar tracked to a <em>paid job.</em></h1><p className="lede">We do not report clicks. Every call and form lands in a CRM you own with its source and what the job was worth, and that number sets next month&rsquo;s spend. You see exactly what the marketing brought in.</p></div>
    </div>
'''

COLOR_MAP = [
    ('#f6f8f6', '#ffffff'), ('#0e1512', '#022c6a'), ('#4b5a52', '#45587a'), ('#87958d', '#6b7c98'), ('#dde5df', '#c9d8e6'),
    ('#16a34a', '#006eff'), ('#4ade80', '#4da3ff'), ('#eefbf1', '#eaf2ff'), ('#15803d', '#0057d9'), ('#0b1f16', '#04173a'),
    ('rgba(11,31,22,', 'rgba(4,23,58,'), ('rgba(22,163,74,', 'rgba(0,110,255,'),
    ('#bbf7d0', '#bfd8ff'), ('#b9cfc3', '#b7cbe8'), ('#cde7dc', '#cfe0f7'), ('#dce9e1', '#dce7f7'), ('#e4efe8', '#e3ecfa'), ('#e6ede8', '#e6edf7'), ('#eef3ef', '#eef3fa'),
    ('%234b5a52', '%2345587a'),
]

ADJUST_CSS = '''
/* ---- Version {N} adjustments ---- */
.{S} .feature{background:#f4f8fd}
.{S} .nav .wm img{height:54px}
.{S} footer .wm img{height:40px}
.{S} .hero::after{background:linear-gradient(180deg,rgba(4,23,58,.22) 0%,rgba(4,23,58,.12) 35%,rgba(4,23,58,.82) 100%)}
.{S} .band::before{background:linear-gradient(90deg,rgba(4,23,58,.78) 0%,rgba(4,23,58,.48) 55%,rgba(4,23,58,.12) 100%)}
.{S} .band.center::before{background:linear-gradient(180deg,rgba(4,23,58,.3),rgba(4,23,58,.7))}
/* Kickers over photos and dark bands are white, not blue, so they read on any image. */
.{S} .hero .kicker,.{S} .band .kicker,.{S} .watch .kicker,.{S} .fhero .kicker{color:#fff;text-shadow:0 1px 10px rgba(0,0,0,.35)}
.{S} .hero .kicker::before,.{S} .band .kicker::before,.{S} .watch .kicker::before,.{S} .fhero .kicker::before{background:#fff}
.{S} .abox.rule .k{color:#fff}
/* The emphasised word sits on a blue highlight so it reads on any photo. */
.{S} .hero h1 em{color:#fff;background:linear-gradient(transparent 10%,var(--accent) 10%,var(--accent) 92%,transparent 92%);padding:0 .08em;margin:0 -.02em;-webkit-box-decoration-break:clone;box-decoration-break:clone;white-space:nowrap}
/* Rotating headlines: four text slides on the same 28s cycle as the photos (7s each). */
.{S} .rot{display:grid}
.{S} .rot .rslide{grid-area:1/1;opacity:0;animation:{S}txt 28s linear infinite;will-change:opacity,transform}
.{S} .rot .rslide:nth-child(2){animation-delay:7s}
.{S} .rot .rslide:nth-child(3){animation-delay:14s}
.{S} .rot .rslide:nth-child(4){animation-delay:21s}
.{S} .rot .rslide:not(:first-child){pointer-events:none}
@keyframes {S}txt{0%{opacity:0;transform:translateY(14px)}3%{opacity:1;transform:none}24.5%{opacity:1;transform:none}27.5%{opacity:0;transform:translateY(-10px)}100%{opacity:0;transform:translateY(14px)}}
@media (prefers-reduced-motion:reduce){
  .{S} .rot .rslide{animation:none;display:none}
  .{S} .rot .rslide:first-child{display:block;opacity:1}
}
'''


def transform_page(s, f, is_home, base, n, scope, extras):
    """Apply the version 2 -> version N transforms to one .tsx file."""
    home = base or '/'
    if is_home:
        s = re.sub(r'<section id="pricing">.*?</section>\n', PLAN_SECTION.replace('{BASE}', base) + '\n', s, flags=re.S)
        s = s.replace('<a href="#pricing">Pricing</a>', '<a href="#plan">Your plan</a>')
        s = s.replace('A site or ad account that is already set up simply lowers your setup fee, because there is less to build.', 'A site or ad account that is already set up means there is less to build, and your plan reflects that.')
        s = s.replace("<SixtySecondCheck />", f'<SixtySecondCheck base="{base}" />').replace("<FreeScan />", f'<FreeScan base="{base}" />')
        m = re.search(r'    <h1>Your calendar should be <em>full\.</em></h1>\n    <p className="lede">(.*?)</p>\n', s, flags=re.S)
        assert m, 'hero headline not found'
        s = s[:m.start()] + ROT.replace('{LEDE}', m.group(1)) + s[m.end():]
        s = s.replace("  title: 'Home',", '  title: { absolute: "Rocket Llama Labs · Marketing and technology for local home services" },')
    # links: /v2/... -> base/..., except the shared assets under /v2/img and /v2/video
    s = re.sub(r'(?<!components)/v2(?!/img|/video)(?=[/#"?\'`\s)])', base, s)
    s = s.replace('href=""', 'href="/"')
    s = s.replace(f'<a href="{base}#pricing">Pricing</a>', f'<a href="{base}#plan">Your plan</a>')
    s = s.replace('./v2.css', f'./v{n}.css')
    s = s.replace('@/components/v2/footer', f'@/components/v{n}/footer').replace('V2Footer', f'V{n}Footer')
    s = s.replace('src="/brand/wordmark-horizontal-rocket-o.svg"', 'src="/brand/logo-stacked.svg"')
    s = s.replace('Rocket Llama Labs v2', f'Rocket Llama Labs v{n}').replace('Version 2 sample', f'Version {n}').replace('Version 2', f'Version {n}').replace('version 2', f'version {n}').replace('v2 ·', f'v{n} ·')
    s = s.replace('className={`v2 ${', f'className={{`{scope} ${{').replace('V2Layout', f'V{n}Layout').replace('LayoutProps<"/v2">', f'LayoutProps<"{home}">').replace('LayoutProps<"">', 'LayoutProps<"/">')
    if base == '':
        s = s.replace(f'    default: "Rocket Llama Labs · Version {n}",\n    template: "%s · Rocket Llama Labs v{n}",', '    default: "Rocket Llama Labs",\n    template: "%s · Rocket Llama Labs",')
    s = s.replace('background:"var(--accent-soft)",borderColor:"#bbf7d0"', 'background:"var(--accent-soft)",borderColor:"#BFD8FF"')
    s = s.replace(f'Website version {n} sample for Rocket Llama Labs: version {n} of the light design.', 'Marketing and technology for local home services in Phoenix: a website you own, every lead answered in under a minute, every dollar tracked to a paid job.')
    s = scrub_exclusivity(s)
    if extras:
        s = extras(s, f, is_home, base)
    return s


# The version 2 source advertises a cap on clients per trade per area. The
# generated versions do not: leads are exclusive (never shared), but we do not
# promise one company per city.
SCRUB = [
    ('<p><b>Limited spots per trade per area.</b> We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p>', '<p><b>Exclusive leads, never shared.</b> Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors; we never do.</p>'),
    ('<p className="k">The rule</p>', '<p className="k">Your leads</p>'),
    ('<b>Limited spots per trade per area.</b> ', '<b>Exclusive leads, never shared.</b> '),
    (' We start in Phoenix and limit how many clients we take per trade per service area, so our clients are never fighting each other for the same calls. Leads outside your area go to a trusted provider you approve, who sends you theirs.', ' We start in Phoenix and expand city by city. Every lead comes from your own site and your own ads, so it is yours alone, never sold to four other contractors.'),
    ('<p className="kicker" style={{justifyContent:"center"} as CSSProperties}>The rule</p>\n  <h2>We limit how many companies we take per trade per area. When the spots are gone, they&rsquo;re gone.</h2>\n  <p>We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p>\n  <div className="ctas" style={{justifyContent:"center"} as CSSProperties}><a className="btn light" href="BASE/book">Claim your spot</a></div>',
     '<p className="kicker" style={{justifyContent:"center"} as CSSProperties}>Your leads, yours alone</p>\n  <h2>Leads from your own site and your own ads. Never shared, never resold.</h2>\n  <p>A marketplace sells the same homeowner to four contractors. Ours come from a website you own and ads in your name, so every call is yours and the cost per booked job is about a third.</p>\n  <div className="ctas" style={{justifyContent:"center"} as CSSProperties}><a className="btn light" href="BASE/book">Book a walkthrough</a></div>'),
    (' A few optional questions after, so the call is about you from the first minute. We limit how many companies we take per trade per area.', ' A few optional questions after, so the call is about you from the first minute.'),
    (' No obligation, and we limit how many companies we take per trade per area.', ' No obligation.'),
    ('<p><b>Limited spots per trade per area.</b> We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p>', '<p><b>Exclusive leads, never shared.</b> Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors; we never do.</p>'),
    ('<span className="k">The rule</span><h3>Limited spots per trade per area</h3><p>We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p><p style={{marginTop:"14px"} as CSSProperties}><a className="btn sm" href="BASE/book">Claim your spot</a></p>',
     '<span className="k">Your leads</span><h3>Exclusive, never shared</h3><p>Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors; we never do.</p><p style={{marginTop:"14px"} as CSSProperties}><a className="btn sm" href="BASE/book">Book a walkthrough</a></p>'),
    ('If you send a truck to a house, this is built for you. We limit how many clients we take per trade per service area.', 'If you send a truck to a house, this is built for you.'),
    ('We limit how many companies we take per trade per area, and we like to know the business before we talk, so t', 'We like to know the business before we talk, so t'),
]


def scrub_exclusivity(s):
    for a, b in SCRUB:
        for base in ('', '/v7', '/v8', '/v2', '/v3'):
            s = s.replace(a.replace('BASE', base), b.replace('BASE', base))
    for bad in ('per trade per area', 'per trade per city', 'one company per', 'limit how many', 'cap how many', 'Claim your spot', 'spots are gone'):
        assert bad.lower() not in s.lower(), f'exclusivity claim left: {bad}'
    return s


def build(dst_rel, base, n, extras=None, extra_css_import=None, layout_note=''):
    scope = f'v{n}'
    dst = os.path.join(root, dst_rel)
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    os.rename(os.path.join(dst, 'v2.css'), os.path.join(dst, f'v{n}.css'))
    # footer
    os.makedirs(os.path.join(root, f'src/components/v{n}'), exist_ok=True)
    open(os.path.join(root, f'src/components/v{n}/footer.tsx'), 'w').write(FOOTER.replace('{N}', str(n)).replace('{HOME}', base or '/'))
    if n in (7, 8):  # v7 and v8 footers carry the one-line nav logo
        fp = os.path.join(root, f'src/components/v{n}/footer.tsx'); t = open(fp).read()
        open(fp, 'w').write(t.replace('/brand/logo-stacked.svg', '/brand/logo-nav.svg').replace('width={137}', 'width={249}'))
    # pages
    for dirpath, _, files in os.walk(dst):
        for f in files:
            if not f.endswith('.tsx'):
                continue
            p = os.path.join(dirpath, f)
            s = open(p).read()
            s = transform_page(s, f, f == 'page.tsx' and dirpath == dst, base, n, scope, extras)
            open(p, 'w').write(s)
    lp = os.path.join(dst, 'layout.tsx')
    s = open(lp).read()
    s = s.replace(f'// The version {n} keeps the mockup', f'// Version {n} keeps the version 2 mockup')
    s = s.replace(f'// Every page under /v{n} renders inside .v2', f'// Every page of version {n} renders inside .{scope}')
    s = s.replace('// Every page under /v2 renders inside .v2', f'// Every page of version {n} renders inside .{scope}')
    s = s.replace(f'(src/app/v{n}/v2.css) away from the admin and the v1 homepage.', f'({dst_rel}/v{n}.css) away from the admin and the other versions.{layout_note}')
    if extra_css_import:
        s = s.replace(f'import "./v{n}.css";', f'import "./v{n}.css";\nimport "{extra_css_import}";')
    open(lp, 'w').write(s)
    # stylesheet: rescope and recolor
    cp = os.path.join(dst, f'v{n}.css')
    c = open(cp).read()
    c = c.replace('.v2', f'.{scope}')
    c = c.replace(f'Version 2 sample site: the BBM Local mockup C stylesheet, scoped under .{scope}.', f'Version {n}: the version 2 stylesheet rescoped under .{scope} and recolored to the Rocket Llama brand (navy, blue, mist) by scripts/make-v3.py.')
    for a, b in COLOR_MAP:
        assert a in c, a
        c = c.replace(a, b)
    c = c.replace('--deep:#04173a;', '--deep:#04173a;--mint-line:#bfd8ff;')
    c += ADJUST_CSS.replace('{N}', str(n)).replace('{S}', scope)
    open(cp, 'w').write(c)
    print(f'v{n} written to {dst_rel}')


# ---------- version 7: splice in the custom elements from Madison's mockups
V7_IMPORTS = '''import { InstantAudit } from "@/components/v7/instant-audit";
import { WhySwitch } from "@/components/v7/why-switch";
import { Valley } from "@/components/v7/valley";
import { Race } from "@/components/v7/race";
import { ReportSection } from "@/components/v7/report-section";
import { LeaveSwitch } from "@/components/v7/leave-switch";
import { Timeline } from "@/components/v7/timeline";
import { CompareTable } from "@/components/v7/compare-table";
'''


def v7_extras_core(s, f, is_home, base):
    # the one-line nav logo (public/brand/logo-nav.svg) on every v7 page
    s = s.replace('src="/brand/logo-stacked.svg"', 'src="/brand/logo-nav.svg"')
    if not is_home:
        return s
    # imports
    s = s.replace('import { FreeScan } from "@/components/v2/free-scan";\n', 'import { FreeScan } from "@/components/v2/free-scan";\n' + V7_IMPORTS)
    # nav: a Cities link
    s = s.replace('<a href="#industries">Industries</a>', '<a href="#cities">Cities</a><a href="#industries">Industries</a>', 1)
    s = s.replace(f'<a href="{base}/services#video">The video</a>', '')
    # hero: two columns, the instant audit on the right
    a = '  <div className="wrap in">\n    <p className="kicker">Marketing and technology for local home services</p>\n'
    assert a in s, 'hero open'
    s = s.replace(a, '  <div className="wrap in hero-grid">\n   <div>\n    <p className="kicker">Marketing and technology for local home services</p>\n')
    a = '  </div>\n  <div className="dots" aria-hidden="true">'
    assert a in s, 'hero close'
    s = s.replace(a, f'   </div>\n   <div className="hero-check"><SixtySecondCheck base="{base}" /></div>\n  </div>\n  <div className="dots" aria-hidden="true">')
    # the former 60-second-check section becomes the instant audit
    a = '  <p className="kicker">The 60-second check</p>\n  <h2>How does your company show up online?</h2>\n  <p className="sub">Four questions, one tap each. You get a score out of 100 and the honest read on where the jobs are leaking. No email needed to see it.</p>\n  <SixtySecondCheck base="' + base + '" />'
    assert a in s, 'check section'
    s = s.replace(a, '  <p className="kicker">The instant audit</p>\n  <h2>See how you show up online. In 20 seconds.</h2>\n  <p className="sub">Your Google profile, your reviews, your website, your phone and what the AI engines say about you, side by side with the top company in your trade in your area. No email, no call, no sales rep. Then decide.</p>\n  <InstantAudit base="' + base + '" />')
    s = s.replace('<a className="btn outline" href="#check">Take the 60-second check</a>', '<a className="btn outline" href="#check">Run the instant audit</a>')
    s = s.replace('<a href="#check">60-second check</a>', '<a href="#check">Instant audit</a>')
    s = s.replace('<a className="btn ghost" href="#check">Take the 60-second check</a>', '<a className="btn ghost" href="#check">Run the instant audit</a>')
    # trust strip under the hero
    # the 60-second check from version 8 sits right under the banner, ahead of the 'three ways' tile
    check = ('</header>\n\n<section id="quiz" className="qzsec quiz60"><div className="wrap">\n'
             '  <p className="kicker">The 60-second check</p>\n'
             '  <h2>How does your company show up online?</h2>\n'
             '  <p className="sub">Four questions, one tap each. You get a score out of 100 and the honest read on where the jobs are leaking. No email needed to see it.</p>\n'
             f'  <SixtySecondCheck base="{base}" cta="Schedule a call" />\n'
             '</div></section>\n\n<section id="problem">')
    a = '</header>\n\n<section id="problem">'
    assert a in s; s = s.replace(a, check, 1)
    # why owners switch, before the 60-second check
    s = s.replace('\n<section id="check" className="qzsec">', '\n<WhySwitch />\n\n<section id="check" className="qzsec">')
    # the speed-to-lead band becomes the Valley map, the per-trade photo band and tuning, then the race
    s, k = re.subn(r'<div className="band" style=\{\{"--img":"url\(/v2/img/band-van\.jpg\)"\} as CSSProperties\}>.*?</div></div>\n', f'<Valley base="{base}" />\n<Race />\n', s, flags=re.S)
    assert k == 1, 'speed band'
    # the tracked-to-the-job band becomes the monthly report section
    s, k = re.subn(r'<div className="band" id="proof".*?\n  </div>\n</div></div>\n', '<ReportSection />\n', s, flags=re.S)
    assert k == 1, 'proof band'
    # leaving, the 90 days and the comparison, before "who you are talking to"
    s = s.replace('\n<section id="who" className="feature">', '\n<LeaveSwitch />\n<Timeline />\n<CompareTable />\n\n<section id="who" className="feature">')
    s = s.replace('  title: { absolute: "Rocket Llama Labs · Marketing and technology for local home services" },', '  title: { absolute: "Rocket Llama Labs · Version 7" },')
    return s


# ---------- version 8: the home page is hand-written in src/components/v8/home.tsx
V8_PAGE = '''import type { Metadata } from "next";
import { V8Home } from "@/components/v8/home";

export const metadata: Metadata = {
  title: { absolute: "Rocket Llama Labs · Version 8" },
  description: "The simplest version of the homepage: the 60-second check under the banner, the full system as one list, how it works, and the trade picker.",
};

// Version 8's home is hand-written; see src/components/v8/home.tsx. The
// sub-pages (/services, /book, /qualify, /about-brian) come from version 2
// through scripts/make-v3.py like the other versions.
export default function Page() {
  return <V8Home base="/v8" />;
}
'''


MENU_SCRIPT = "document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"


def v7_extras(s, f, is_home, base):
    s = v7_extras_core(s, f, is_home, base)
    # wording: every call to action schedules a call
    s = s.replace('Book a walkthrough', 'Schedule a call').replace('book a walkthrough', 'schedule a call').replace('Book your free walkthrough', 'Schedule your free call')
    s = s.replace(f'<SixtySecondCheck base="{base}" />', f'<SixtySecondCheck base="{base}" cta="Schedule a call" />')
    # nav: About Us first, then Services, Cities, Industries; a hamburger menu below 900px
    pfx = '' if is_home else base
    links = f'<a href="{pfx}#who">About Us</a><a href="{base}/services">Services</a><a href="{pfx}#cities">Cities</a><a href="{pfx}#industries">Industries</a>'
    s = re.sub(r'<div className="links">.*?</div>', '<div className="links">' + links + '</div>', s, count=1)
    btn = f'  <a className="btn sm" href="{base}/book">Schedule a call</a>\n</div></nav>'
    if btn not in s:  # layout.tsx has no nav
        return s
    menu = ('\n  <details className="menu">\n    <summary aria-label="Menu"><span></span></summary>\n    <div className="panel">\n      ' + links
            + f'\n      <a className="btn sm" href="{base}/book">Schedule a call</a>\n    </div>\n  </details>')
    s = s.replace(btn, f'  <a className="btn sm" href="{base}/book">Schedule a call</a>{menu}\n</div></nav>\n<script dangerouslySetInnerHTML={{{{__html:"{MENU_SCRIPT}"}}}} />', 1)
    if is_home:
        # banner: the tagline sits above the rotating headline, large
        a = '   <div>\n    <p className="kicker">Marketing and technology for local home services</p>\n'
        assert a in s; s = s.replace(a, '   <div>\n    <h1 className="tagline">Marketing and technology for local home services</h1>\n', 1)
        # no trust line at the foot of the banner
        s = re.sub(r'    <p className="trust"><b>Month to month\.</b>.*?</p>\n', '', s, count=1)
        # the rotating lines stay, as h2 headings under the H1, each with its supporting paragraph
        s = s.replace('<div className="rslide"><h1>', '<div className="rslide"><h2>').replace('</h1><p className="lede">', '</h2><p className="lede">')
        # no question box in the banner: single column, the check keeps its own section further down
        a = f'   <div className="hero-check"><SixtySecondCheck base="{base}" cta="Schedule a call" /></div>\n'
        assert a in s; s = s.replace(a, '', 1)
        s = s.replace('<div className="wrap in hero-grid">', '<div className="wrap in">', 1)
        if '<SixtySecondCheck' not in s:
            s = s.replace('import { SixtySecondCheck } from "@/components/v2/sixty-second-check";\n', '', 1)
    return s


def v8_extras(s, f, is_home, base):
    if is_home:
        return V8_PAGE
    # the call to action is 'Schedule a call' on every v8 page
    return s.replace('Book a walkthrough', 'Schedule a call').replace('book a walkthrough', 'schedule a call').replace('Book your free walkthrough', 'Schedule your free call')


if __name__ == '__main__':
    patch_shared()
    build('src/app/(home)', '', 3)
    build('src/app/v7', '/v7', 7, extras=v7_extras, extra_css_import='@/components/v7/v7.css', layout_note=' The custom elements and their styles live in src/components/v7.')
    build('src/app/v8', '/v8', 8, extras=v8_extras, extra_css_import='@/components/v8/v8.css', layout_note=' The home page itself is src/components/v8/home.tsx.')
