#!/usr/bin/env python3
"""Collect the BBM mockup C stylesheets and scope every rule under .v2 so the
sample site can live inside the Rocket Llama Labs Next.js app without leaking
into the admin or the v1 homepage."""
import pathlib, re, sys

SRC = pathlib.Path("/home/user/rocketllamalabs/bbm-plan")
OUT = pathlib.Path("/home/user/rocketllama-website/src/app/v2/v2.css")


def styles(text):
    return "\n".join(re.findall(r"<style>(.*?)</style>", text, re.S))


def clean(css):
    """Drop comments and point relative image URLs at the files under public/v2."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    # The funnel pages showed the nav links at every width; the port does that
    # inline on those pages so the rule cannot leak onto the home page.
    css = css.replace(".nav .links{display:flex}", "")
    # The two typefaces come from next/font in the v2 layout.
    css = css.replace('"Libre Franklin"', "var(--font-libre-franklin)").replace(
        '"Source Serif 4"', "var(--font-source-serif)"
    )
    return css.replace("url(img/", "url(/v2/img/")


def read(name):
    return (SRC / name).read_text()


mapdoc = read("system-map.html")
diagcss = re.search(r"(  \.diag\{.*?\.diag \.mk\{fill:var\(--muted\)\}\n)", mapdoc, re.S).group(1)

parts = [
    ("shared (_c-shared.html)", styles(read("_c-shared.html"))),
    ("system diagram (system-map.html)", diagcss),
    ("60-second check (_check.html)", styles(read("_check.html"))),
    ("free scan (_scan.html)", styles(read("_scan.html"))),
    ("funnel and quiz (_book.html, superset of _quiz.html)", styles(read("_book.html"))),
    ("services page (src-c-services.html)", styles(read("src-c-services.html"))),
    ("funnel pages (src-c-book.html)", styles(read("src-c-book.html"))),
]


def split_blocks(css):
    """Yield (prelude, body) for each top-level block, brace-balanced."""
    i, n = 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 0, j
        while k < n:
            if css[k] == "{":
                depth += 1
            elif css[k] == "}":
                depth -= 1
                if depth == 0:
                    break
            k += 1
        yield prelude, css[j + 1 : k]
        i = k + 1


def scope_selector(sel):
    sel = sel.strip()
    if not sel:
        return None
    if sel in (":root", "body"):
        return ".v2"
    if sel == "html":
        return None
    return ".v2 " + sel


def scope(css, indent="  "):
    out = []
    for prelude, body in split_blocks(css):
        if prelude.startswith("@keyframes"):
            out.append(f"{indent}{prelude}{{{body}}}")
        elif prelude.startswith("@media"):
            out.append(f"{indent}{prelude}{{\n{scope(body, indent + '  ')}\n{indent}}}")
        else:
            sels = [scope_selector(s) for s in prelude.split(",")]
            sels = [s for s in sels if s]
            if not sels:
                continue
            out.append(f"{indent}{','.join(sels)}{{{body.strip()}}}")
    return "\n".join(out)


header = """/*
 * Version 2 sample site: the BBM Local mockup C stylesheet, scoped under .v2.
 * Generated from the bbm-plan repository (_c-shared.html, _check.html,
 * _scan.html, _book.html, system-map.html and the per-page <style> blocks)
 * by scripts/build-v2-css.py. Edit the tokens in :root-equivalent `.v2 {}` to
 * restyle the whole sample; the design is expected to change a lot.
 */
"""

chunks = [header]
for label, css in parts:
    chunks.append(f"\n/* ---- {label} ---- */\n{scope(clean(css))}")

# The sample uses its own two typefaces, loaded with next/font in the v2 layout.
chunks.append(
    """
/* ---- Next.js integration ---- */
.v2{min-height:100%;display:flex;flex-direction:column}
.v2 main{flex:1}
.v2 .slides img{color:transparent}
.v2 .nav .wm img{display:block;height:22px;width:auto}
.v2 footer .wm img{height:16px}
"""
)

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("\n".join(chunks) + "\n")
print("wrote", OUT, OUT.stat().st_size)
