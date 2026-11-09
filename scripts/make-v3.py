import re
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
        ('export function SixtySecondCheck() {', 'export function SixtySecondCheck({ base = "/v2", cta = "Book a walkthrough", alt = { label: "Get the free scan", href: "#scan" } }: { base?: string; cta?: string; alt?: { label: string; href: string } }) {\n  const v7 = base === "/v7";'),  # already applied; kept for a fresh checkout
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
        t = t.replace('/brand/logo-stacked.svg', '/brand/logo-nav.svg').replace('width={137}', 'width={249}')
        if n == 7:  # a simple footer: the logo and the copyright line
            t = re.sub(r'        <span>\n          <b>Rocket Llama Labs</b>.*?</span>\n(        <span>\n.*?</span>\n)', '        <span className="copy">&copy; 2026 Rocket Llama Labs LLC</span>\n        <span className="legal"><Link href="/v7/privacy">Privacy Policy</Link> / <Link href="/v7/terms">Website Policy</Link> / <Link href="/v7/ai-policy">AI Policy</Link></span>\n', t, count=1, flags=re.S)
            t = t.replace('export function V7Footer({ note }: { note: string }) {', 'export function V7Footer({ note: _note }: { note: string }) {')
        open(fp, 'w').write(t)
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
    # copy edits that apply to every v7 page
    s = s.replace('four contractors; we never do.', 'four contractors. We never do.')
    # no Brian quote box on the book and qualify pages
    s = re.sub(r'\n\s*<div className="abox quote">.*?</blockquote>\n\s*</div>', '', s, flags=re.S)
    s = s.replace('If you send a truck to a house, this is built for you. We start in Phoenix and expand city by city. Every lead comes from your own site and your own ads, so it is yours alone, never sold to four other contractors.', 'If you send a truck to a house this is built for you. We start in your service area and expand city by city. Every lead comes from your own site and your own ads so it is yours alone, never sold to four other contractors.')
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
    # the instant audit section is gone, along with the buttons that pointed at it
    i = s.index('<section id="check" className="qzsec">'); j = s.index('</div></section>\n', i) + len('</div></section>\n')
    s = s[:i] + s[j:].lstrip('\n')
    s = s.replace('<a className="btn outline" href="#check">Run the instant audit</a>', f'<a className="btn outline" href="{base}/audit">Run the audit</a>').replace('<a className="btn ghost" href="#check">Run the instant audit</a>', '')
    s = s.replace('import { InstantAudit } from "@/components/v7/instant-audit";\n', '', 1)
    # the monthly report has its own page (/v7/report) and the exit switch tile is gone
    s = s.replace('import { ReportSection } from "@/components/v7/report-section";\n', '', 1).replace('import { LeaveSwitch } from "@/components/v7/leave-switch";\n', '', 1)
    k = s.index('<p className="kicker">The system on one page</p>'); e = s.index('</div></section>', k)
    s = s[:e] + f'  <p className="note"><a href="{base}/report">See a sample monthly report &rarr;</a></p>\n' + s[e:]
    # the trust line lives in the 'system on one page' section, under its intro
    k = s.index('<p className="kicker">The system on one page</p>'); m = s.index('</p>\n  <div className="list">', k) + len('</p>\n')
    s = s[:m] + '  <p className="trust"><b>Month to month.</b> No contracts. <b>You own everything:</b> the site, the data, the numbers and the ad accounts.</p>\n' + s[m:]
    # both 'you' in the section heading carry the yellow highlight
    a = '<h2>Everything points to a website you own. Everything lands in a CRM you own.</h2>'
    assert a in s; s = s.replace(a, '<h2>Everything points to a website <em>you</em> own. Everything lands in a CRM <em>you</em> own.</h2>', 1)
    # the 60-second check from version 8 sits right under the banner, ahead of the 'three ways' tile
    check = ('</header>\n\n<section id="quiz" className="qzsec quiz60"><div className="wrap">\n'
             '  <p className="kicker">The 60-second check</p>\n'
             '  <h2>How does your company show up online?</h2>\n'
             '  <p className="sub">Four questions, one click each. You&rsquo;ll get a score out of 100 and see where you stand on your company&rsquo;s visibility. Know where you perform well and learn where you need to improve.</p>\n'
             f'  <SixtySecondCheck base="{base}" cta="Schedule a call" alt={{{{ label: "Run an instant audit", href: "{base}/audit" }}}} />\n'
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


LESS_SCRIPT = "document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"
MENU_SCRIPT = "document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"
MENU_SCRIPT = MENU_SCRIPT + ';' + LESS_SCRIPT

V7_PROOF_BAND = '''<div className="band" id="proof" style={{"--img":"url(/v2/img/band-door.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Tracked to the job</p>
  <h2>We don&rsquo;t report clicks.</h2>
  <h3 className="bsub">We report booked jobs and what they were worth.</h3>
  <div className="bstats">
    <div><div className="b">$2 : $1</div><div className="l">Our floor: two dollars back for every dollar spent or we work free</div></div>
    <div><div className="b">&lt;60s</div><div className="l">Every new lead gets a text and an email in your voice</div></div>
    <div><div className="b">1 per source</div><div className="l">Tracked phone numbers, so we know which ad made it ring</div></div>
    <div><div className="b">100%</div><div className="l">Yours: the site, the data, the numbers, and the ad accounts</div></div>
  </div>
</div></div>'''



def v7_extras(s, f, is_home, base):
    s = v7_extras_core(s, f, is_home, base)
    # the book page: Arizona time
    s = s.replace('<BookFunnel />', '<BookFunnel tz="Arizona time" />', 1)
    # wording: every call to action schedules a call
    s = s.replace('Book a walkthrough', 'Schedule a call').replace('book a walkthrough', 'schedule a call').replace('Book your free walkthrough', 'Schedule your free call')
    s = s.replace(f'<SixtySecondCheck base="{base}" />', f'<SixtySecondCheck base="{base}" cta="Schedule a call" alt={{{{ label: "Run an instant audit", href: "{base}/audit" }}}} />')
    # nav: About Us first, then Services, Cities, Industries; a hamburger menu below 900px
    pfx = '' if is_home else base
    links = f'<a href="{base}/services">Services</a><a href="{base}/industries">Industries</a><a href="{base}/about">About</a>'
    s = re.sub(r'<div className="links"[^>]*>.*?</div>', '<div className="links">' + links + '</div>', s, count=1)
    btn = f'  <a className="btn sm" href="{base}/book">Schedule a call</a>\n</div></nav>'
    if btn not in s:  # layout.tsx has no nav
        return s
    menu = ('\n  <details className="menu">\n    <summary aria-label="Menu"><span></span></summary>\n    <div className="panel">\n      ' + links
            + f'\n      <a className="btn sm" href="{base}/book">Schedule a call</a>\n      <a className="btn sm ghost" href="{base}/audit">Run an instant audit</a>\n    </div>\n  </details>')
    s = s.replace(btn, f'  <div className="navbtns"><a className="btn sm" href="{base}/book">Schedule a call</a><a className="btn sm ghost" href="{base}/audit">Run an instant audit</a></div>{menu}\n</div></nav>\n<script dangerouslySetInnerHTML={{{{__html:"{MENU_SCRIPT}"}}}} />', 1)
    if f == 'page.tsx' and '<section id="what">' in s and '<Race />' not in s:
        # services page: a clear banner, a branded poster on the video, then the race after the service list
        s = s.replace('poster="/v2/video/poster.png"', 'poster="/v7/video-poster.png"', 1)
        # the industries block has its own page now
        n0 = s.find('<section id="industries">')
        if n0 >= 0:
            n1 = s.index('</div></section>\n', n0) + len('</div></section>\n'); s = s[:n0] + s[n1:].lstrip('\n')
        # no pricing link; the van band repeats the race's headline, so it goes
        s = s.replace('<a className="btn ghost" href="/v7#pricing">Pricing</a>', '', 1)
        b0 = s.find('<div className="band" style={{"--img":"url(/v2/img/band-van.jpg)"}')
        if b0 >= 0:
            b1 = s.index('</div></div>\n', b0) + len('</div></div>\n'); s = s[:b0] + s[b1:].lstrip('\n')
        a = '<header className="hero small" id="top">\n  <div className="slides" aria-hidden="true" style={{backgroundImage:"url(/v2/img/hero-roofing.jpg)"} as CSSProperties}></div>\n  <div className="wrap in">\n    <p className="kicker">Services</p>\n    <h1>Everything a local home services company needs to <em>get the call.</em></h1>\n    <p className="lede">The website, the phones, the CRM, the reviews and the ads, built as one system and run by one team. You own every piece.</p>\n  </div>\n</header>'
        assert a in s, 'services banner'
        s = s.replace(a, '<header className="pagehead with-badge" id="top">\n  <div className="wrap in">\n    <div className="copy">\n    <p className="kicker">Our services</p>\n    <h1>Everything your company needs to get the call.</h1>\n    <p className="lede">The website, the phones, the CRM, the reviews and the ads, built as one system, and run by one team. Here is every piece we run for you and how they fit together.</p>\n    <DreamBadge tone="blue" />\n    </div>\n  </div>\n</header>', 1)
        a = '<section id="map" className="feature">'
        if a in s:
            s = s.replace(a, '<Race />\n\n' + V7_PROOF_BAND + '\n\n' + a, 1)
            s = s.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { Race } from "@/components/v7/race";\nimport { DreamBadge } from "@/components/v7/dream-badge";\n', 1)
            # the walkthrough video is the Rocket Llama cut
            s = s.replace('/v2/video/bbm-local-full.mp4', '/v7/video/rocket-llama-full.mp4')
            s = s.replace('<span className="tag">90 seconds</span>', '', 1)
            s = s.replace('<h2>The full walkthrough.</h2>', '<h2>The overview.</h2>', 1)
            s = s.replace('<h2>Eight pieces. One system. Yours.</h2>', '<h2>Eight pieces. One system. All yours.</h2>', 1)
            s = s.replace('<p className="kicker">Ninety seconds</p>', '<p className="kicker">Under 90 seconds</p>', 1)
            s = s.replace('Traffic from Google, Meta and your reviews feeds a site', 'Traffic from Google, Meta, and your reviews feeds a site', 1)
            # under the video copy: one action button, no 30-second-cut link
            s = s.replace('<p><a className="lk" href="/v7/book">Schedule a call</a> &nbsp;·&nbsp; In a hurry? <a className="lk" href="/v2/video/bbm-local-30s.mp4" target="_blank" rel="noopener">The 30-second cut</a></p>', '<div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a></div>', 1)
            # website card: lead with the benefit, not the stack
            s = s.replace('<p>Next.js, the code in your GitHub, on Vercel. Preview every change before it goes live. Stop paying Wix or GoDaddy.</p>', '<p>Preview every change before it goes live. Stop paying Wix or GoDaddy.</p>', 1)
            s = s.replace('20 to 30% conversion against a 5% average', '20% to 30% conversion against a 5% average', 1)
            s = s.replace('closed-job value and the return-on-spend dashboard', 'closed-job value, and the return-on-spend dashboard', 1)
            s = s.replace('then a booking calendar or a call-back button', 'then a booking calendar, or a call-back button', 1)
            s = s.replace('Google, Local Services and Meta ads, in your name', 'Google, Local Services, and Meta ads in your name', 1)
            s = s.replace('<h3>Funnels, not contact forms</h3>', '<h3>Funnels not contact forms</h3>', 1)
            s = s.replace('<p>Your accounts, your card, our management. Budget up', '<p>Your accounts and your card with our management. Budget up', 1)
            s = s.replace('Budget up in busy months, down in slow ones, never a contract.', 'Budget up in busy months, budget down in slow ones. Never a contract.', 1)
            # phones box in the system diagram
            s = s.replace('<SystemDiagram />', '<SystemDiagram phones={["tracked numbers on Tier 1 carrier", "answers, transfers to you, returns", "to the AI to book, or take a message"]} website={["Hosted free", "schema for Google and AI search, stars per service", "funnels: questions, address autofill, offer, booking"]} crmTitle="Your CRM" googleSub="highest intent, you own account" metaSub="lead forms, you own account" websiteTextY={247} spendLabel="" centerSourcesLabel />', 1)
    if is_home:
        # banner: the tagline sits above the rotating headline, large
        a = '   <div>\n    <p className="kicker">Marketing and technology for local home services</p>\n'
        assert a in s; s = s.replace(a, '   <div>\n    <h1 className="tagline">Marketing and technology for home services</h1>\n', 1)
        # no trust line at the foot of the banner
        s = re.sub(r'    <p className="trust"><b>Month to month\.</b>.*?</p>\n', '', s, count=1)
        # the rotating lines stay, as h2 headings under the H1, each with its supporting paragraph; v7 has its own wording
        i0 = s.index('    <div className="rot">\n'); i1 = s.index('    </div>\n', i0) + len('    </div>\n')
        s = s[:i0] + V7_ROT + s[i1:]
        # no question box in the banner: single column, the check keeps its own section further down
        a = f'   <div className="hero-check"><SixtySecondCheck base="{base}" cta="Schedule a call" alt={{{{ label: "Run an instant audit", href: "{base}/audit" }}}} /></div>\n'
        assert a in s; s = s.replace(a, '', 1)
        s = s.replace('<div className="wrap in hero-grid">', '<div className="wrap in">', 1)
        if '<SixtySecondCheck' not in s:
            s = s.replace('import { SixtySecondCheck } from "@/components/v2/sixty-second-check";\n', '', 1)
        # the 'in' and 'vs' in the stat cards share one smaller royal blue style (v7.css .card .n .sm)
        s = s.replace('<span style={{fontSize:".5em",color:"var(--muted)"} as CSSProperties}>vs</span>', '<span className="sm">vs</span>', 1)
        s = s.replace('<div className="n">1 in 5</div>', '<div className="n">1 <span className="sm">in</span> 5</div>', 1)
        # banner: dashes are buttons, the carousel runs on a script, the two buttons sit side by side
        a = '  <div className="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>\n</header>\n'
        assert a in s; s = s.replace(a, '  <div className="dots"><button type="button" aria-label="Picture 1"></button><button type="button" aria-label="Picture 2"></button><button type="button" aria-label="Picture 3"></button><button type="button" aria-label="Picture 4"></button></div>\n</header>\n<HeroCarousel />\n', 1)
        s = s.replace('import { Race } from "@/components/v7/race";\n', 'import { Race } from "@/components/v7/race";\nimport { HeroCarousel } from "@/components/v7/hero-carousel";\n', 1)
        a = f'<div className="ctas"><a className="btn light" href="{base}/book">Schedule a call</a><a className="btn outline" href="{base}/audit">Run the audit</a></div>'
        assert a in s; s = s.replace(a, f'<div className="ctas"><a className="btn" href="{base}/book">Schedule a call</a><a className="btn light audit-btn" href="{base}/audit">Run an instant audit</a></div>', 1)
        # the monthly report and the 'who you are talking to' section live on their own pages
        s = s.replace('<ReportSection />\n', '', 1)
        w0 = s.index('<section id="who" className="feature">'); w1 = s.index('</div></section>\n', w0) + len('</div></section>\n')
        V7_WHO[0] = s[w0:w1]
        # the 'system on one page' section is gone; Industries lives on its own page
        k0 = s.index('<section id="system" className="feature">'); k1 = s.index('</div></section>\n', k0) + len('</div></section>\n')
        s = s[:k0] + s[k1:].lstrip('\n')
        n0 = s.index('<section id="industries">'); n1 = s.index('</div></section>\n', n0) + len('</div></section>\n')
        V7_IND[0] = s[n0:n1]; s = s[:n0] + s[n1:].lstrip('\n')
        # the race moves to the services page
        s = s.replace('<Race />\n', '', 1)
        s = s.replace('import { Race } from "@/components/v7/race";\n', '', 1)
        # after the carousel: the full system from version 8, then how it works, then nothing else
        t0 = s.index('\n<div className="band center"'); t1 = s.index('</main>')
        s = s[:t0] + f'\n<FullSystem base="{base}" id="fullsystem" photo={{{{ src: "/v2/img/band-van.jpg", alt: "A service van on a Phoenix street" }}}} detailed />\n<HowItWorks base="{base}" />\n' + s[t1:]
        s = s.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { FullSystem, HowItWorks } from "@/components/v8/full-system";\n', 1)
        for name, path in [('FreeScan', '@/components/v2/free-scan'), ('WhySwitch', '@/components/v7/why-switch'), ('Timeline', '@/components/v7/timeline'), ('CompareTable', '@/components/v7/compare-table')]:
            if f'<{name}' not in s:
                s = s.replace(f'import {{ {name} }} from "{path}";\n', '', 1)
    return s


V7_WHO = ['']
ABOUT_META = """export const metadata: Metadata = {
  title: { absolute: "About Rocket Llama Labs: the Phoenix marketing team for home service companies" },
  description: "Rocket Llama Labs is Brian Greenberg, Branson Cobb and Madison Schantz, a Phoenix, Arizona team that builds and runs the whole marketing system for home service companies: website, search and AI search, ads, reviews, phones, AI receptionist and CRM. Every lead answered in under a minute, every dollar tracked to a paid job, and you own all of it.",
  alternates: { canonical: "https://rocketllamalabs.com/v7/about" },
  openGraph: {
    type: "website",
    url: "https://rocketllamalabs.com/v7/about",
    siteName: "Rocket Llama Labs",
    title: "About Rocket Llama Labs",
    description: "The Phoenix marketing and technology team for home service companies. Brian Greenberg, Branson Cobb and Madison Schantz build and run one system that gets you found, answers every lead in under a minute, and tracks every dollar to a paid job.",
    images: [{ url: "https://rocketllamalabs.com/v7/og.png", width: 1200, height: 630, alt: "Rocket Llama Labs: marketing and technology for home services" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "About Rocket Llama Labs", description: "The Phoenix marketing and technology team for home service companies.", images: ["https://rocketllamalabs.com/v7/og.png"] },
};"""
V7_ROT = '''    <div className="rot">
      <div className="rslide"><h2>Your calendar should be <em>full.</em></h2><p className="lede">Built for HVAC companies, plumbers, electricians, roofers, and every home service trade. Every call, form submission, and estimate request gets a response in under 60 seconds and is booked directly onto your calendar. Track every marketing dollar all the way to a completed, paid job. You own the leads, the data, and the results.</p></div>
      <div className="rslide"><h2>Never miss a <em>call</em> again.</h2><p className="lede">When a new lead comes in, they get a text and email in under 60 seconds, written in your voice&mdash;even while at a job site. The system calls you first. If you can&rsquo;t answer, AI steps in to capture the customer&rsquo;s details, qualify the lead, and book the appointment directly on your calendar.</p></div>
      <div className="rslide"><h2>Show up where homeowners look <em>first.</em></h2><p className="lede">When they search Google, check Google Maps, or ask ChatGPT who to call, your business shows up. With a website you own that&rsquo;s built for search engines and AI, an optimized Google Business Profile, and ads running under your name, you&rsquo;re positioned to be the go-to home service company.</p></div>
      <div className="rslide"><h2>Know what every <em>dollar</em> brings in.</h2><p className="lede">No chasing clicks or digging through dashboards. Every call and form submission is tracked in a CRM you own, showing where each lead came from and how much revenue it generated. Real results&mdash;not guesswork&mdash;drive your marketing budget.</p></div>
    </div>
'''
V7_IND = ['']


V7_BRIAN_MAIN = '''<main>
<header className="hero small" id="top">
  <div className="slides" aria-hidden="true" style={{backgroundImage:"url(/v2/img/band-neighborhood.jpg)"} as CSSProperties}></div>
  <div className="wrap in">
    <p className="kicker">Brian Greenberg &middot; CEO</p>
    <h1>&ldquo;Nobody wakes up wanting to be sold to. So don&rsquo;t sell. <em>Get found.</em>&rdquo;</h1>
    <p className="lede">Brian has spent more than twenty years building businesses that get found online. He built True Blue Life Insurance into a fully digital agency that sold in all 50 states with no cold calls, generating over $50 million in revenue through inbound marketing, and he has delivered the same local SEO and inbound playbook to home services companies, including Phoenix pool service companies. He is the author of <em>The Salesman Who Doesn&rsquo;t Sell</em> and a Million Dollar Round Table member.</p>
  </div>
</header>

<section id="story" className="feature"><div className="wrap">
  <div className="story">
    <div className="story-text">
      <h2>Born into building businesses.</h2>
      <p className="sub">Entrepreneurship is the family trade. Brian learned it from his father, and it was everywhere around him: his grandfather ran his own business, and so did every one of his uncles. Growing up in Highland Park, Illinois, he never seriously considered working for anyone else. The University of Arizona&rsquo;s Eller College of Management gave him the formal version, entrepreneurship and marketing, sharpened by the McGuire Entrepreneurship Program. Then he settled in Scottsdale, Arizona, and got to work.</p>
      <h2>Selling while he slept.</h2>
      <p className="sub">In 2003 Brian started two companies at once: True Blue Life Insurance and Wholesale Warehouse Supply, an e-commerce business. At True Blue he pioneered selling life insurance fully online, in all 50 states. No cold calls. No kitchen-table pitches. Content, search, funnels and automation did the selling, and the results followed: more than $1 million in annual premium for ten consecutive years, over $50 million in total revenue, and membership in the Million Dollar Round Table, the top 1% of financial professionals worldwide.</p>
      <h2>The same machine, for other businesses.</h2>
      <p className="sub">The inbound system that sold policies also powered Wholesale Warehouse Supply&rsquo;s online stores, and Brian has been delivering it to other businesses ever since. He built SEO Services Internet Marketing LLC, a digital marketing and SEO company, and later BJG Digital, a local services marketing agency that helped Phoenix pool service companies win their local market through local SEO, reviews and inbound funnels. He also leads Quoteplicity, quoting software for insurance agents whose funnels have generated more than 200,000 leads.</p>
      <h2>Rocket Llama Labs.</h2>
      <p className="sub">Rocket Llama Labs brings that playbook to local home services companies, run with modern AI tools so a small team delivers what used to take an agency floor. Brian&rsquo;s job as CEO is to keep the company pointed at the only thing that matters to a client: being the business people find first, and the one they call.</p>
    </div>
    <div className="story-side">
      <img className="portrait" src="/v2/img/brian-greenberg.jpg" alt="Brian Greenberg" />
      <div className="stats">
        <div><b>20+</b><span>years building businesses that get found online</span></div>
        <div><b>$50M+</b><span>in revenue through automated inbound funnels</span></div>
        <div><b>200,000+</b><span>leads generated by funnels Brian built</span></div>
        <div><b>Top 1%</b><span>Million Dollar Round Table member</span></div>
      </div>
    </div>
  </div>
</div></section>

<section id="book"><div className="wrap">
  <div className="book">
    <img className="cover" src="/v2/img/book-salesman.jpg" alt="The Salesman Who Doesn&rsquo;t Sell, by Brian J. Greenberg" />
    <div>
      <p className="kicker">The book</p>
      <h2>The Salesman Who Doesn&rsquo;t Sell</h2>
      <p className="sub"><b>A Marketing Guide to Making Money While You Sleep.</b> Foreword by Marques Colston, Super Bowl champion wide receiver.</p>
      <p className="sub">The theory behind inbound marketing: build systems that work on their own to bring people in. Reviews, reputation, transparency, SEO: a passive sales system that brings in customers 24/7, even as you sleep. The book is the exact playbook Brian used to do it, and the one Rocket Llama Labs runs for its clients.</p>
      <div className="ctas"><a className="btn" href="https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ" target="_blank" rel="noopener">Buy on Amazon</a><a className="btn ghost" href="https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418" target="_blank" rel="noopener">Listen on Audible</a></div>
    </div>
  </div>
</div></section>

<section id="press" className="feature"><div className="wrap">
  <p className="kicker">Press and credentials</p>
  <h2>Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.</h2>
  <p className="sub">University of Arizona, Eller College of Management. McGuire Entrepreneurship Program. Million Dollar Round Table.</p>
  <div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a><a className="btn ghost" href="/v7/about">Back to About Us</a></div>
</div></section>
</main>'''


def write_v7_brian():
    """Brian's page, rewritten from the owner's copy, in the same shell as the other subpages."""
    p = os.path.join(root, 'src/app/v7/about-brian/page.tsx'); t = open(p).read()
    t = re.sub(r"  description: \"[^\"]*\",", "  description: \"Brian Greenberg, co-founder and CEO of Rocket Llama Labs: twenty years of building businesses that get found online, and the author of The Salesman Who Doesn't Sell.\",", t, count=1)
    i = t.index('<main>'); j = t.index('</main>') + len('</main>')
    open(p, 'w').write(t[:i] + V7_BRIAN_MAIN + t[j:])


def write_v7_report():
    """The monthly report card on its own page, built from the about page's shell."""
    t = open(os.path.join(root, 'src/app/v7/about-brian/page.tsx')).read()
    t = re.sub(r"  title: '[^']*',\n  description: \"[^\"]*\",", "  title: 'The monthly report',\n  description: \"What a Rocket Llama Labs monthly report looks like: booked jobs by source, what they were worth, what it cost and what we changed.\",", t, count=1)
    t = t.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { ReportSection } from "@/components/v7/report-section";\n', 1)
    t = re.sub(r'// Ported from the mockup.*?\n', '// The sample monthly report, moved off the home page on 4 November 2026.\n', t, count=1)
    i = t.index('<main>'); j = t.index('</main>') + len('</main>')
    t = t[:i] + '<main>\n<ReportSection />\n</main>' + t[j:]
    t = t.replace("note='Version 7, about page'", "note='Version 7, monthly report'")
    os.makedirs(os.path.join(root, 'src/app/v7/report'), exist_ok=True)
    open(os.path.join(root, 'src/app/v7/report/page.tsx'), 'w').write(t)


def write_v7_about():
    """About Us on its own page, laid out like the other subpages: a photo banner, then a
    section that holds a placeholder for the owners' own story."""
    t = open(os.path.join(root, 'src/app/v7/about-brian/page.tsx')).read()
    t = re.sub(r"export const metadata: Metadata = \{.*?\n\};", ABOUT_META, t, count=1, flags=re.S)
    t = t.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { AboutStructuredData, ABOUT_FAQ } from "@/components/v7/about-seo";\n', 1)
    t = re.sub(r'// Ported from the mockup.*?\n', '// About Us, on its own page. The story section is a placeholder until the owners supply their copy.\n', t, count=1)
    i = t.index('<main>'); j = t.index('</main>') + len('</main>')
    main = (
        '<main>\n'
        '<header className="pagehead about-head" id="top">\n'
        '  <div className="wrap in">\n'
        '    <p className="kicker">About us</p>\n'
        '    <h1>Built by people who have done this before.</h1>\n'
        '    <p className="lede">Rocket Llama Labs is a Phoenix, Arizona marketing and technology company for home service companies: HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, painting and every trade that goes to a customer&rsquo;s home. We build and run the whole system, and every piece of it is something we have done before.</p>\n'
        '  </div>\n'
        '</header>\n\n'
        '<section id="story" className="feature"><div className="wrap">\n'
        '  <p className="kicker">Our story</p>\n'
        '  <h2>Who we are and why we built this.</h2>\n'
        '  <div className="story">\n'
        '    <div className="story-text">\n'
        '      <p className="sub">Home service owners are some of the hardest-working people we know, and most are losing jobs they never hear about: the homeowner searched, found someone else, or called and got voicemail. The agencies pitching them sell one tactic at a time, and nobody is responsible for whether the phone rings.</p>\n'
        '      <p className="sub">We had each seen the other way work. Brian built and sold companies on an inbound system where customers found him online and booked themselves, including a fully digital insurance agency that passed $50 million in revenue with no cold calls, and he wrote the playbook down in <em>The Salesman Who Doesn&rsquo;t Sell</em>. Branson spent two decades growing businesses by tying every decision to a measurable result. Madison builds the brands, websites and AI tools that make a company one you want to call. We put the three together in Phoenix and built one system for home service companies.</p>\n'
        '      <p className="sub">Our goal is to be the marketing team you never have to think about. <a href="/v7/services">One system</a>, built and run by us, that answers every lead in under a minute, tracks every dollar to a paid job, and belongs to you. We run it for <a href="/v7/industries">every trade that goes to a customer&rsquo;s home</a>, across the Valley and beyond. If we do our job, you will not notice the marketing. You will notice the phone ringing and the calendar filling.</p>\n'
        '    </div>\n'

        '  </div>\n'
        '</div></section>\n\n'
        '<section id="team"><div className="wrap">\n'
        '  <p className="kicker">The team</p>\n'
        '  <h2>Three people. One system.</h2>\n'
        '  <div className="team">\n'
        '    <article className="card"><img className="headshot photo" src="/v7/brian-greenberg.jpg" alt="Brian Greenberg, CEO of Rocket Llama Labs" /><h3 id="brian-greenberg">Brian Greenberg</h3><p className="role">CEO</p>'
        '<p>Brian sets the strategy and the marketing playbook for every client. He has spent more than twenty years building businesses that get found online, including a fully digital insurance agency that generated $50M+ through inbound marketing, and he wrote <em>The Salesman Who Doesn&rsquo;t Sell</em>. He has run that same playbook for Phoenix home service companies.</p>'
        '<details className="bio"><summary>Read more</summary>'
        '<p>Entrepreneurship is the family trade. Brian learned it from his father, and it was everywhere around him: his grandfather ran his own business, and so did every one of his uncles. Growing up in Highland Park, Illinois, he never seriously considered working for anyone else. The University of Arizona&rsquo;s Eller College of Management gave him the formal version, entrepreneurship and marketing, sharpened by the McGuire Entrepreneurship Program. Then he settled in Scottsdale, Arizona, and got to work.</p>'
        '<p>In 2003 Brian started two companies at once: True Blue Life Insurance and Wholesale Warehouse Supply, an e-commerce business. At True Blue he pioneered selling life insurance fully online, in all 50 states. No cold calls. No kitchen-table pitches. Content, search, funnels and automation did the selling, and the results followed: more than $1 million in annual premium for ten consecutive years, over $50 million in total revenue, and membership in the Million Dollar Round Table, the top 1% of financial professionals worldwide.</p>'
        '<p>The inbound system that sold policies also powered Wholesale Warehouse Supply&rsquo;s online stores, and Brian has been delivering it to other businesses ever since. He built SEO Services Internet Marketing LLC, a digital marketing and SEO company, and later BJG Digital, a local services marketing agency that helped Phoenix pool service companies win their local market through local SEO, reviews and inbound funnels. He also leads Quoteplicity, quoting software for insurance agents whose funnels have generated more than 200,000 leads.</p>'
        '<p>Rocket Llama Labs brings that playbook to local home services companies, run with modern AI tools so a small team delivers what used to take an agency floor. Brian&rsquo;s job as CEO is to keep the company pointed at the only thing that matters to a client: being the business people find first, and the one they call.</p>'
        '<p>He is the author of <em>The Salesman Who Doesn&rsquo;t Sell: A Marketing Guide to Making Money While You Sleep</em>, with a foreword by Marques Colston, Super Bowl champion wide receiver. <a href="https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ" target="_blank" rel="noopener">Buy on Amazon</a> or <a href="https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418" target="_blank" rel="noopener">listen on Audible</a>. Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.</p>'
        '<button type="button" className="less">Read less</button></details></article>\n'
        '    <article className="card"><img className="headshot photo" src="/v7/branson-cobb.jpg" alt="Branson Cobb, President and COO of Rocket Llama Labs" /><h3 id="branson-cobb">Branson Cobb</h3><p className="role">President and COO</p>'
        '<p>Branson runs the business and every client relationship. He spent more than 23 years leading sales, business development and client strategy for some of the country&rsquo;s largest healthcare organizations, and he brings that growth discipline to home service companies that want more qualified leads and measurable results.</p>'
        '<details className="bio"><summary>Read more</summary>'
        '<p>Before launching Rocket Llama Labs, Branson served as Market President for CBIZ&rsquo;s Arizona and California offices, where he led market growth, business operations and client retention initiatives. Prior to CBIZ, he spent more than five years with Aetna, leading business development for Arizona&rsquo;s Public and Labor segment and helping organizations develop strategic growth initiatives.</p>'
        '<p>Branson began his career at Cigna, where he spent 13 years advancing from Medical and Dental Underwriter to Senior Account Executive. His background in underwriting, analytics, account management and sales gave him a unique ability to connect financial insights with business strategy, an approach he continues to bring to every client relationship today.</p>'
        '<p>At Rocket Llama Labs, Branson believes great marketing is not about chasing trends. It is about building systems that consistently generate leads, drive revenue and help business owners focus on what they do best. His forward-looking approach combines data-driven decision-making with innovative marketing strategies designed specifically for home service businesses.</p>'
        '<p>Outside of work, Branson enjoys traveling, scuba diving, skiing and fishing with his dad. He earned his Bachelor of Science in Finance from the University of Arizona.</p>'
        '<button type="button" className="less">Read less</button></details></article>\n'
        '    <article className="card"><img className="headshot photo" src="/v7/madison.jpg" alt="Madison Schantz, Chief Marketing Officer at Rocket Llama Labs" /><h3 id="madison-schantz">Madison Schantz</h3><p className="role">Chief Marketing Officer</p>'
        '<p>Madison designs the brand, the website and the AI-powered tools each client runs on. Her background spans branding, web design, AI content and digital strategy, and she builds every piece so a home service company looks strong online and turns visitors into booked jobs.</p>'
        '<details className="bio"><summary>Read more</summary>'
        '<p>Madison is a creative digital designer, branding specialist, AI content creator and digital architecture expert with a passion for transforming innovative ideas into meaningful digital experiences. With experience in website design, brand development, artificial intelligence and digital strategy, she specializes in creating visually compelling, functional and user-friendly solutions that help businesses establish a strong and memorable online presence.</p>'
        '<p>Her expertise combines creative design with emerging technology, allowing her to develop cohesive brand identities, modern websites and AI-powered digital solutions tailored to each client&rsquo;s unique vision. As a digital architect, Madison focuses on the balance between aesthetics, functionality and strategy, ensuring every project is thoughtfully designed to enhance user experience, strengthen brand recognition and support long-term growth.</p>'
        '<p>Driven by curiosity and a passion for innovation, Madison enjoys exploring new technologies, creative trends and opportunities to push the boundaries of traditional digital design. She values attention to detail, strategic thinking and bringing fresh perspectives to every project.</p>'
        '<p>Outside of her professional work, Madison enjoys working out, reading and traveling. She has a strong appreciation for personal growth, wellness and discovering new places and cultures. These interests inspire her creativity, broaden her perspective and encourage her to continuously learn, evolve and approach both life and work with an open mind.</p>'
        '<button type="button" className="less">Read less</button></details></article>\n'
        '  </div>\n'
        '</div></section>\n\n'
        '<section id="faq" className="feature"><div className="wrap">\n'
        '  <p className="kicker">Questions</p>\n'
        '  <h2>The short version.</h2>\n'
        '  <div className="faq">\n'
        '    {ABOUT_FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}\n'
        '  </div>\n'
        '</div></section>\n'
        '</main>'
    )
    t = t[:i] + main + t[j:]
    t = t.replace("note='Version 7, about page'", "note='Version 7, about us'")
    t = t.replace('<main>\n<header className="hero small" id="top">', '<main>\n<AboutStructuredData />\n<header className="hero small" id="top">', 1)
    os.makedirs(os.path.join(root, 'src/app/v7/about'), exist_ok=True)
    open(os.path.join(root, 'src/app/v7/about/page.tsx'), 'w').write(t)


def write_v7_audit():
    """The instant audit on its own page, linked from the 60-second check."""
    t = open(os.path.join(root, 'src/app/v7/about-brian/page.tsx')).read()
    t = re.sub(r"  title: '[^']*',\n  description: \"[^\"]*\",", "  title: 'Run an instant audit',\n  description: \"See how your company shows up online in 20 seconds: your Google profile, reviews, website, phone and what the AI engines say, next to the top company in your trade.\",", t, count=1)
    t = t.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { InstantAudit } from "@/components/v7/instant-audit";\n', 1)
    t = re.sub(r'// Ported from the mockup.*?\n', '// The instant audit, on its own page since 4 November 2026.\n', t, count=1)
    i = t.index('<main>'); j = t.index('</main>') + len('</main>')
    main = ('<main>\n<section id="check" className="qzsec"><div className="wrap">\n'
            '  <p className="kicker">The audit</p>\n'
            '  <h1>See how you show up online. In 20 seconds.</h1>\n'
            '  <p className="sub">Your Google profile, your reviews, your website, your phone and what the AI engines say about you, side by side with the top company in your trade in your area. No email, no call, no sales rep. Then decide.</p>\n'
            '  <InstantAudit base="/v7" />\n</div></section>\n</main>')
    t = t[:i] + main + t[j:]
    t = t.replace("note='Version 7, about page'", "note='Version 7, audit'")
    os.makedirs(os.path.join(root, 'src/app/v7/audit'), exist_ok=True)
    open(os.path.join(root, 'src/app/v7/audit/page.tsx'), 'w').write(t)


def write_v7_industries():
    """The Industries section on its own page."""
    t = open(os.path.join(root, 'src/app/v7/about-brian/page.tsx')).read()
    t = re.sub(r"  title: '[^']*',\n  description: \"[^\"]*\",", "  title: 'Industries',\n  description: \"Every trade that goes to a customer's home: HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping and more.\",", t, count=1)
    t = re.sub(r'// Ported from the mockup.*?\n', '// Industries, moved off the home page on 4 November 2026.\n', t, count=1)
    i = t.index('<main>'); j = t.index('</main>') + len('</main>')
    ind = V7_IND[0].replace('<h2>', '<h1>', 1).replace('</h2>', '</h1>', 1)
    t = t[:i] + '<main>\n' + ind + '</main>' + t[j:]
    t = t.replace("note='Version 7, about page'", "note='Version 7, industries'")
    os.makedirs(os.path.join(root, 'src/app/v7/industries'), exist_ok=True)
    open(os.path.join(root, 'src/app/v7/industries/page.tsx'), 'w').write(t)


def write_v7_legal():
    """The privacy policy, website policy and AI policy pages, built from the copy in
    src/components/v7/legal-copy.tsx and the same page shell as the other subpages."""
    shell = open(os.path.join(root, 'src/app/v7/about-brian/page.tsx')).read()
    for slug, title, const, desc, intro in [
        ('privacy', 'Privacy Policy', 'PRIVACY', 'How Rocket Llama Labs collects, uses, shares and protects personal information, including text-message consent, call recording and cookies.', 'What we collect, how we use it, who we share it with, and the choices you have.'),
        ('terms', 'Website Policy', 'TERMS', 'The conditions for using rocketllamalabs.com.', 'The conditions for using this website and the tools on it.'),
        ('ai-policy', 'AI Policy', 'AI', 'Where Rocket Llama Labs uses artificial intelligence, what it does, and where a person is responsible.', 'Where we use artificial intelligence, what it does, and where a person is responsible.'),
    ]:
        t = re.sub(r"export const metadata: Metadata = \{.*?\n\};", 'export const metadata: Metadata = {\n  title: "' + title + '",\n  description: "' + desc + '",\n  alternates: { canonical: "https://rocketllamalabs.com/v7/' + slug + '" },\n};', shell, count=1, flags=re.S)
        t = re.sub(r'// Ported from the mockup.*?\n', '// ' + title + ', built from src/components/v7/legal-copy.tsx.\n', t, count=1)
        t = t.replace('import { V7Footer } from "@/components/v7/footer";\n', 'import { V7Footer } from "@/components/v7/footer";\nimport { LegalBody, ' + const + ', EFFECTIVE } from "@/components/v7/legal-copy";\n', 1)
        i = t.index('<main>'); j = t.index('</main>') + len('</main>')
        t = t[:i] + ('<main>\n<header className="pagehead" id="top">\n  <div className="wrap in">\n'
                     '    <p className="kicker">Legal</p>\n    <h1>' + title + '</h1>\n'
                     '    <p className="lede">' + intro + '</p>\n  </div>\n</header>\n'
                     '<section className="feature"><div className="wrap">\n  <LegalBody sections={' + const + '} />\n  <p className="effective">Effective {EFFECTIVE}.</p>\n</div></section>\n</main>') + t[j:]
        t = t.replace("note='Version 7, about page'", "note='Version 7, " + title.lower() + "'")
        os.makedirs(os.path.join(root, 'src/app/v7/' + slug), exist_ok=True)
        open(os.path.join(root, 'src/app/v7/' + slug + '/page.tsx'), 'w').write(t)


def v8_extras(s, f, is_home, base):
    if is_home:
        return V8_PAGE
    # the call to action is 'Schedule a call' on every v8 page
    return s.replace('Book a walkthrough', 'Schedule a call').replace('book a walkthrough', 'schedule a call').replace('Book your free walkthrough', 'Schedule your free call')


if __name__ == '__main__':
    patch_shared()
    build('src/app/(home)', '', 3)
    build('src/app/v7', '/v7', 7, extras=v7_extras, extra_css_import='@/components/v7/v7.css', layout_note=' The custom elements and their styles live in src/components/v7.')
    write_v7_report()
    write_v7_about()
    write_v7_audit()
    write_v7_industries()
    write_v7_legal()
    shutil.rmtree(os.path.join(root, 'src/app/v7/about-brian'), ignore_errors=True)  # no separate page for Brian on v7
    build('src/app/v8', '/v8', 8, extras=v8_extras, extra_css_import='@/components/v8/v8.css', layout_note=' The home page itself is src/components/v8/home.tsx.')
