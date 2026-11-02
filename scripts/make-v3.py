# Generates src/app/v3 (and src/components/v3/footer.tsx) from the version 2
# source: same pages, rescoped under .v3, recolored to the Rocket Llama brand,
# stacked logo, pricing replaced by the custom-plan section. Re-run after
# editing version 2 to carry changes forward:  python3 scripts/make-v3.py
import os, re, shutil
root=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
src=os.path.join(root,'src/app/v2'); dst=os.path.join(root,'src/app/v3')
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src,dst)
os.rename(os.path.join(dst,'v2.css'),os.path.join(dst,'v3.css'))

# ---------- shared components: colors become CSS variables (identical in v2), links take a base
comp=os.path.join(root,'src/components/v2')
def edit(path,pairs):
    s=open(path).read()
    for a,b in pairs:
        if a not in s:
            if b in s: continue  # already applied on an earlier run
            raise SystemExit(f'MISSING in {path}: {a[:60]}')
        s=s.replace(a,b)
    open(path,'w').write(s)
for f in ['book-funnel.tsx','qualify-quiz.tsx']:
    edit(os.path.join(comp,f),[('stroke="#dfe7e1"','stroke="var(--line)"'),('fill="#f4f8f5"','fill="var(--bg)"'),('fill="#16a34a"','fill="var(--accent)"')])
edit(os.path.join(comp,'sixty-second-check.tsx'),[
 ('stroke="#e5ece7"','stroke="var(--line)"'),('stroke="#16a34a"','stroke="var(--accent)"'),
 ('export function SixtySecondCheck() {','export function SixtySecondCheck({ base = "/v2" }: { base?: string }) {'),
 ('href="/v2/book">Book a walkthrough</a>','href={`${base}/book`}>Book a walkthrough</a>'),
])
edit(os.path.join(comp,'behavior/sixty-second-check.js'),[
 ("document.getElementById('chk_book').href='/v2/book?score='+s;","var bk=document.getElementById('chk_book'); bk.href=bk.getAttribute('href').split('?')[0]+'?score='+s;"),
])
edit(os.path.join(comp,'free-scan.tsx'),[
 ('export function FreeScan() {','export function FreeScan({ base = "/v2" }: { base?: string }) {'),
 ('href="/v2/book">Book a walkthrough</a>','href={`${base}/book`}>Book a walkthrough</a>'),
])

# ---------- v3 footer
os.makedirs(os.path.join(root,'src/components/v3'),exist_ok=True)
open(os.path.join(root,'src/components/v3/footer.tsx'),'w').write('''import Image from "next/image";
import Link from "next/link";

// Footer for the version 3 pages: the version 2 layout in the Rocket Llama
// colors, with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V3Footer({ note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="/v3" aria-label="Rocket Llama Labs home">
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
''')

# ---------- pages
plan_section='''<section id="plan" className="feature"><div className="wrap">
  <p className="kicker">Your plan</p>
  <h2>No price list. A marketing plan written for your company.</h2>
  <p className="sub">Every company is quoted on its own. On the walkthrough we look at your trade, your area, your calendar and what you already have, then write the plan with a number on it. You see the plan before you pay for anything, and you keep it either way.</p>
  <div className="ctas"><a className="btn" href="/v3/book">Book a call</a><a className="btn ghost" href="#check">Take the 60-second check</a></div>
</div></section>'''
for dirpath,_,files in os.walk(dst):
    for f in files:
        if not f.endswith('.tsx'): continue
        p=os.path.join(dirpath,f); s=open(p).read()
        if f=='page.tsx' and dirpath==dst:
            s=re.sub(r'<section id="pricing">.*?</section>\n',plan_section+'\n',s,flags=re.S)
            s=s.replace('<a href="#pricing">Pricing</a>','<a href="#plan">Your plan</a>')
            s=s.replace('A site or ad account that is already set up simply lowers your setup fee, because there is less to build.','A site or ad account that is already set up means there is less to build, and your plan reflects that.')
            s=s.replace("<SixtySecondCheck />",'<SixtySecondCheck base="/v3" />').replace("<FreeScan />",'<FreeScan base="/v3" />')
        # links: /v2 -> /v3 except the shared assets under /v2/img and /v2/video
        s=re.sub(r'(?<!components)/v2(?!/img|/video)(?=[/#"?\'`\s)])','/v3',s)
        s=s.replace('/v3#pricing">Pricing</a>','/v3#plan">Your plan</a>').replace('<a href="/v3#pricing">Pricing</a>','<a href="/v3#plan">Your plan</a>')
        s=s.replace('./v2.css','./v3.css')
        s=s.replace('@/components/v2/footer','@/components/v3/footer').replace('V2Footer','V3Footer')
        s=s.replace('src="/brand/wordmark-horizontal-rocket-o.svg"','src="/brand/logo-stacked.svg"')
        s=s.replace('Rocket Llama Labs v2','Rocket Llama Labs v3').replace('Version 2 sample','Version 3').replace('Version 2','Version 3').replace('version 2','version 3').replace('v2 ·','v3 ·')
        s=s.replace('className={`v2 ${','className={`v3 ${').replace('V2Layout','V3Layout').replace('LayoutProps<"/v2">','LayoutProps<"/v3">')
        s=s.replace('background:"var(--accent-soft)",borderColor:"#bbf7d0"','background:"var(--accent-soft)",borderColor:"#BFD8FF"')
        s=s.replace('Website version 3 sample for Rocket Llama Labs: version 3 of the light design.','Website version 3 for Rocket Llama Labs: the version 2 layout in the Rocket Llama colors.')
        open(p,'w').write(s)

# layout comment + scoping note
lp=os.path.join(dst,'layout.tsx'); s=open(lp).read()
s=s.replace('// The version 3 keeps the mockup','// Version 3 keeps the version 2 mockup').replace('// Every page under /v3 renders inside .v2','// Every page under /v3 renders inside .v3')
s=s.replace('(src/app/v3/v3.css) away from the admin and the v1 homepage.','(src/app/v3/v3.css) away from the admin, the v1 homepage and /v2.')
open(lp,'w').write(s)

# ---------- stylesheet: rescope and recolor
cp=os.path.join(dst,'v3.css'); c=open(cp).read()
c=c.replace('.v2','.v3')
c=c.replace('Version 2 sample site: the BBM Local mockup C stylesheet, scoped under .v3.','Version 3: the version 2 stylesheet rescoped under .v3 and recolored to the Rocket Llama brand (navy, blue, mist) by scripts/make-v3.py.')
cmap=[
 ('#f6f8f6','#ffffff'),('#0e1512','#022c6a'),('#4b5a52','#45587a'),('#87958d','#6b7c98'),('#dde5df','#c9d8e6'),
 ('#16a34a','#006eff'),('#4ade80','#4da3ff'),('#eefbf1','#eaf2ff'),('#15803d','#0057d9'),('#0b1f16','#04173a'),
 ('rgba(11,31,22,','rgba(4,23,58,'),('rgba(22,163,74,','rgba(0,110,255,'),
 ('#bbf7d0','#bfd8ff'),('#b9cfc3','#b7cbe8'),('#cde7dc','#cfe0f7'),('#dce9e1','#dce7f7'),('#e4efe8','#e3ecfa'),('#e6ede8','#e6edf7'),('#eef3ef','#eef3fa'),
 ("%234b5a52","%2345587a"),
]
for a,b in cmap:
    assert a in c, a
    c=c.replace(a,b)
c=c.replace('--deep:#04173a;','--deep:#04173a;--mint-line:#bfd8ff;')
c+='''
/* ---- Version 3 adjustments ---- */
.v3 .feature{background:#f4f8fd}
.v3 .nav .wm img{height:54px}
.v3 footer .wm img{height:40px}
.v3 .hero::after{background:linear-gradient(180deg,rgba(4,23,58,.22) 0%,rgba(4,23,58,.12) 35%,rgba(4,23,58,.82) 100%)}
.v3 .band::before{background:linear-gradient(90deg,rgba(4,23,58,.78) 0%,rgba(4,23,58,.48) 55%,rgba(4,23,58,.12) 100%)}
.v3 .band.center::before{background:linear-gradient(180deg,rgba(4,23,58,.3),rgba(4,23,58,.7))}
'''
open(cp,'w').write(c)
print('v3 written')
