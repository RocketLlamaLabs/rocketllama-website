#!/usr/bin/env python3
"""Port the BBM Local mockup C (bbm-plan repository) into the version 2 sample
site under src/app/v2 and src/components/v2.

The mockup is static HTML with inline scripts. This script turns each page body
into JSX, the shared partials (60-second check, free scan, booking funnel,
qualification quiz, system diagram) into client components, and the partials'
scripts into plain JS behaviours mounted from useEffect. Links, image paths and
the BBM Local name are rewritten for Rocket Llama Labs on the way through.

Run from the repository root with the bbm-plan checkout beside it:

    python3 scripts/port-v2-site.py ../rocketllamalabs/bbm-plan
"""
import pathlib, re, sys
from html.parser import HTMLParser

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/home/user/rocketllamalabs/bbm-plan")
ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "src/app/v2"
COMP = ROOT / "src/components/v2"

LINKS = {
    "bbm-local-c-services.html": "/v2/services",
    "bbm-local-c-about-brian.html": "/v2/about-brian",
    "bbm-local-c-qualify.html": "/v2/qualify",
    "bbm-local-c-book.html": "/v2/book",
    "bbm-local-c.html": "/v2",
    "<!--POSTER-->": "/v2/video/poster.png",
    "<!--VIDEO30-->": "/v2/video/bbm-local-30s.mp4",
    "<!--VIDEOFULL-->": "/v2/video/bbm-local-full.mp4",
    "<!--VIDEO-->": "/v2/video/bbm-local-45s.mp4",
}

WORDMARK = (
    '<a class="wm" href="/v2" aria-label="Rocket Llama Labs home">'
    '<img src="/brand/wordmark-horizontal-rocket-o.svg" alt="Rocket Llama Labs"></a>'
)


def rewrite(text):
    for old, new in LINKS.items():
        text = text.replace(old, new)
    text = text.replace('src="img/', 'src="/v2/img/').replace("url(img/", "url(/v2/img/")
    text = text.replace("BBM Local", "Rocket Llama Labs").replace("bbm_scan_seen", "rll_scan_seen")
    text = text.replace("bbm-sms-2026-09-20.v1", "rll-sms-2026-10-29.v2")
    return text


# ---------------------------------------------------------------- HTML -> JSX
ATTRS = {
    "class": "className", "for": "htmlFor", "autocomplete": "autoComplete",
    "autocapitalize": "autoCapitalize", "autocorrect": "autoCorrect", "inputmode": "inputMode",
    "maxlength": "maxLength", "spellcheck": "spellCheck", "tabindex": "tabIndex",
    "playsinline": "playsInline", "viewbox": "viewBox", "patternunits": "patternUnits",
    "refx": "refX", "refy": "refY", "markerwidth": "markerWidth", "markerheight": "markerHeight",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-dasharray": "strokeDasharray", "stroke-dashoffset": "strokeDashoffset",
    "stroke-opacity": "strokeOpacity", "fill-opacity": "fillOpacity", "text-anchor": "textAnchor",
    "marker-end": "markerEnd",
}
VOID = {"img", "input", "br", "source", "path", "rect", "circle"}


def css_prop(name):
    name = name.strip()
    if name.startswith("--"):
        return f'"{name}"'
    return re.sub(r"-([a-z])", lambda m: m.group(1).upper(), name)


def style_attr(value):
    decls = [d for d in value.split(";") if d.strip()]
    pairs = []
    for d in decls:
        k, v = d.split(":", 1)
        pairs.append(f'{css_prop(k)}:"{v.strip()}"')
    return "style={{" + ",".join(pairs) + "} as CSSProperties}"


class ToJSX(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []
        self.uses_style = False

    def attr(self, k, v):
        if k == "style":
            self.uses_style = True
            return style_attr(v)
        k = ATTRS.get(k, k)
        if v is None:
            return k
        if k in ("maxLength", "rows", "tabIndex"):
            return f"{k}={{{v}}}"
        if '"' in v:
            return f"{k}={{'{v}'}}"
        return f'{k}="{v}"'

    def open(self, tag, attrs, close):
        a = "".join(" " + self.attr(k, v) for k, v in attrs)
        self.out.append(f"<{tag}{a}{' /' if close else ''}>")

    def handle_starttag(self, tag, attrs):
        self.open(tag, attrs, tag in VOID)

    def handle_startendtag(self, tag, attrs):
        self.open(tag, attrs, True)

    def handle_endtag(self, tag):
        if tag not in VOID:
            self.out.append(f"</{tag}>")

    def handle_data(self, data):
        if "{" in data or "}" in data:
            data = data.replace("{", "{'{'}").replace("}", "{'}'}")
        self.out.append(data.replace("'", "&rsquo;").replace('"', "&quot;"))

    def handle_entityref(self, name):
        self.out.append(f"&{name};")

    def handle_charref(self, name):
        self.out.append(f"&#{name};")

    def handle_comment(self, data):
        pass


def to_jsx(html):
    p = ToJSX()
    p.feed(html)
    p.close()
    return "".join(p.out), p.uses_style


IMG_NOTE = (
    "/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup;"
    " swap for next/image during the redesign */\n"
)


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    print("wrote", path.relative_to(ROOT), len(text))


def header(jsx, uses_style, client=False, extra_imports=()):
    lines = []
    if client:
        lines.append('"use client";\n')
    if "<img" in jsx:
        lines.append(IMG_NOTE)
    if uses_style:
        lines.append('import type { CSSProperties } from "react";')
    lines.extend(extra_imports)
    return "\n".join(lines) + ("\n\n" if lines else "")


# ---------------------------------------------------------------- behaviours
def behaviour(name, script, fn):
    """Turn a partial's inline IIFE into an exported mount function that
    returns a cleanup for the listeners it put on document."""
    body = script.strip()
    body = re.sub(r"^\(function\(\)\{", "", body)
    body = re.sub(r"\}\)\(\);?$", "", body)
    body = rewrite(body)
    # Lint-driven touch-ups: no `this` aliasing, no unused catch bindings.
    body = body.replace("function(){ var el=this,", "function(e){ var el=e.target,")
    body = body.replace("catch(e){", "catch{")
    helpers, cleanup = "", []
    if "document.addEventListener(" in body:
        body = body.replace("document.addEventListener(", "onDoc(")
        helpers = (
            "  var offs=[];\n"
            "  function onDoc(type,fn){ document.addEventListener(type,fn); offs.push(function(){ document.removeEventListener(type,fn) }) }\n"
        )
        cleanup.append("offs.forEach(function(f){f()})")
    if "idle=" in body:
        cleanup.append("clearTimeout(idle)")
    ret = f"  return function(){{ {'; '.join(cleanup)} }};\n" if cleanup else ""
    text = (
        f"// Behaviour for the {name}, ported from the BBM Local mockup's inline script.\n"
        "// Plain JS on purpose: it drives the server-rendered markup by id and class the\n"
        "// way the mockup did, and is mounted once from a useEffect. Rewrite as React\n"
        "// state when the redesign settles.\n"
        f"export function {fn}() {{\n{helpers}{body}\n{ret}}}\n"
    )
    return text


def partial(file, component, fn, behaviour_file, root_sel):
    src = (SRC / file).read_text()
    markup = re.sub(r"<style>.*?</style>", "", src, flags=re.S)
    script = re.search(r"<script>(.*?)</script>", markup, re.S).group(1)
    markup = re.sub(r"<script>.*?</script>", "", markup, flags=re.S).strip()
    jsx, uses_style = to_jsx(rewrite(markup))
    write(COMP / "behavior" / f"{behaviour_file}.js", behaviour(component, script, fn))
    text = header(jsx, uses_style, client=True, extra_imports=[
        'import { useEffect } from "react";',
        f'import {{ {fn} }} from "./behavior/{behaviour_file}";',
    ])
    text += (
        f"// {component}: markup from the mockup's {file}, behaviour mounted on the client.\n"
        f"export function {component}() {{\n"
        f"  useEffect({fn}, []);\n"
        f"  return (\n    <>\n{jsx}\n    </>\n  );\n}}\n"
    )
    write(COMP / f"{root_sel}.tsx", text)


partial("_check.html", "SixtySecondCheck", "mountSixtySecondCheck", "sixty-second-check", "sixty-second-check")
partial("_scan.html", "FreeScan", "mountFreeScan", "free-scan", "free-scan")
partial("_book.html", "BookFunnel", "mountBookFunnel", "book-funnel", "book-funnel")
partial("_quiz.html", "QualifyQuiz", "mountQualifyQuiz", "qualify-quiz", "qualify-quiz")

# ---------------------------------------------------------------- diagram
mapdoc = (SRC / "system-map.html").read_text()
svg = re.search(r'(<svg class="diag" viewBox="0 0 1000 680".*?</svg>)', mapdoc, re.S).group(1)
jsx, uses_style = to_jsx(svg)
write(
    COMP / "system-diagram.tsx",
    header(jsx, uses_style)
    + "// The client's marketing system on one page, from the mockup's system-map.html.\n"
    "export function SystemDiagram() {\n  return (\n" + jsx + "\n  );\n}\n",
)

# ---------------------------------------------------------------- pages
PAGES = [
    ("src-c.html", APP / "page.tsx", "Home", "Version 2 sample · built from the BBM Local mockup C"),
    ("src-c-services.html", APP / "services/page.tsx", "Services", "Version 2 sample, services page"),
    ("src-c-book.html", APP / "book/page.tsx", "Book your free walkthrough", "Version 2 sample, booking funnel"),
    ("src-c-qualify.html", APP / "qualify/page.tsx", "See if you qualify", "Version 2 sample, qualify funnel"),
    ("src-c-about-brian.html", APP / "about-brian/page.tsx", "Brian Greenberg", "Version 2 sample, about page"),
]
PLACEHOLDERS = {
    "<!--CHECK-->": ("SixtySecondCheck", "sixty-second-check"),
    "<!--SCAN-->": ("FreeScan", "free-scan"),
    "<!--BOOK-->": ("BookFunnel", "book-funnel"),
    "<!--QUIZ-->": ("QualifyQuiz", "qualify-quiz"),
    "<!--DIAG-->": ("SystemDiagram", "system-diagram"),
}

for file, out, title, note in PAGES:
    src = (SRC / file).read_text()
    desc = re.search(r'<meta name="description" content="([^"]*)"', src).group(1)
    body = src[src.index("<nav") :]
    body = re.sub(r"<footer>.*?</footer>", "", body, flags=re.S).strip()
    body = re.sub(r'<a class="wm" href="[^"]*" aria-label="[^"]*">BBM<span>\.</span></a>', WORDMARK, body)
    # The funnel pages show the nav links at every width (the mockup did it per page in CSS).
    if file in ("src-c-book.html", "src-c-qualify.html"):
        body = body.replace('<div class="links">', '<div class="links" style="display:flex">')
    used = []
    for marker, (comp, mod) in PLACEHOLDERS.items():
        if marker in body:
            body = body.replace(marker, f"@@{comp}@@")
            used.append((comp, mod))
    body = body.replace("</nav>", "</nav>\n<main>", 1) + "\n</main>"
    jsx, uses_style = to_jsx(rewrite(body))
    for comp, _ in used:
        jsx = jsx.replace(f"@@{comp}@@", f"<{comp} />")
    imports = ['import type { Metadata } from "next";', 'import { V2Footer } from "@/components/v2/footer";']
    imports += [f'import {{ {comp} }} from "@/components/v2/{mod}";' for comp, mod in used]
    desc = rewrite(desc).replace("mockup C", "version 2 sample").replace("(version 2 sample)", "")
    text = header(jsx, uses_style, extra_imports=imports)
    text += (
        f"export const metadata: Metadata = {{\n  title: {title!r},\n  description: {desc!r},\n}};\n\n"
        f"// Ported from the mockup's {file}.\n"
        f"export default function Page() {{\n  return (\n    <>\n{jsx}\n      <V2Footer note={note!r} />\n    </>\n  );\n}}\n"
    ).replace("'", '"', 0)
    write(out, text)
