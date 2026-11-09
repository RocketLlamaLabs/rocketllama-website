import base64, pathlib, sys
repo = pathlib.Path('/home/user/rocketllama-website')
tpl = pathlib.Path(sys.argv[1]).read_text()
m = {
 '__MASCOT__': 'public/brand/mascot.svg',
 '__MASCOT_SHORT__': 'public/brand/mascot-rocket-llama.svg',
 '__WORDMARK__': 'public/brand/wordmark-horizontal-rocket-o.svg',
 '__LOCKUP__': 'public/brand/lockup-horizontal.svg',
 '__LOCKUP3__': 'public/brand/lockup-horizontal-3line.svg',
 '__BAND_VAN__': 'public/v2/img/band-van.jpg',
 '__BRIAN__': 'public/v2/img/brian-greenberg.jpg',
 '__POSTER__': 'public/v2/video/poster.png',
}
for k, f in m.items():
    assert k in tpl, k
    tpl = tpl.replace(k, base64.b64encode((repo/f).read_bytes()).decode())
import re
left = re.findall(r'__[A-Z_]+__', tpl)
assert not left, left
out = repo/'mockups/v1-rocketllama-brand-mockup.html'
out.write_text(tpl)
print(out, round(len(tpl)/1024), 'KB')
