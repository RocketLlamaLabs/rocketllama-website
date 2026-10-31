"""Build self-contained mockup HTML: inline shared CSS, shared fragments (@@TOKEN@@ from site-shared.html) and base64 assets.
Usage: python3 -I build.py <template.html> <out.html>"""
import base64, pathlib, re, sys
repo = pathlib.Path('/home/user/rocketllama-website')
here = pathlib.Path(sys.argv[1]).parent
tpl = pathlib.Path(sys.argv[1]).read_text()
# fragments
frag_src = (here/'site-shared.html').read_text()
frags = {}
for m in re.finditer(r'<!-- @@([A-Z_]+)@@ -->\n(.*?)\n(?:<!-- @@END@@ -->|/\* @@END@@ -->)', frag_src, re.S):
    frags[m.group(1)] = m.group(2)
for k, v in frags.items():
    tpl = tpl.replace('@@%s@@' % k, v)
assert '@@' not in tpl, re.findall(r'@@[A-Z_]+@@', tpl)
if '__CSS__' in tpl:
    tpl = tpl.replace('__CSS__', (here/'base.css').read_text())
ASSETS = {
 '__MASCOT__': ('public/brand/mascot.svg', 'image/svg+xml'),
 '__MASCOT_SHORT__': ('public/brand/mascot-rocket-llama.svg', 'image/svg+xml'),
 '__WORDMARK__': ('public/brand/wordmark-horizontal-rocket-o.svg', 'image/svg+xml'),
 '__LOCKUP__': ('public/brand/lockup-horizontal.svg', 'image/svg+xml'),
 '__LOCKUP3__': ('public/brand/lockup-horizontal-3line.svg', 'image/svg+xml'),
 '__BAND_VAN__': ('public/v2/img/band-van.jpg', 'image/jpeg'),
 '__BAND_DOOR__': ('public/v2/img/band-door.jpg', 'image/jpeg'),
 '__BAND_NEIGHBORHOOD__': ('public/v2/img/band-neighborhood.jpg', 'image/jpeg'),
 '__HERO_HVAC__': ('public/v2/img/hero-hvac.jpg', 'image/jpeg'),
 '__HERO_PLUMBING__': ('public/v2/img/hero-plumbing.jpg', 'image/jpeg'),
 '__HERO_ELECTRICAL__': ('public/v2/img/hero-electrical.jpg', 'image/jpeg'),
 '__HERO_ROOFING__': ('public/v2/img/hero-roofing.jpg', 'image/jpeg'),
 '__BRIAN__': ('public/v2/img/brian-greenberg.jpg', 'image/jpeg'),
 '__POSTER__': ('public/v2/video/poster.png', 'image/png'),
}
for k, (f, mime) in ASSETS.items():
    if k in tpl:
        tpl = tpl.replace(k, 'data:%s;base64,%s' % (mime, base64.b64encode((repo/f).read_bytes()).decode()))
left = [x for x in re.findall(r'__[A-Z_]+__', tpl) if x not in ('__VERSION_LABEL__',)]
assert not left, left
if len(sys.argv) > 3: tpl = tpl.replace('__VERSION_LABEL__', sys.argv[3])
out = pathlib.Path(sys.argv[2]); out.write_text(tpl)
print(out, round(len(tpl)/1024), 'KB')
