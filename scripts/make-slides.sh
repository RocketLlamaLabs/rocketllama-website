#!/usr/bin/env bash
# Turn a PowerPoint (or PDF) into a presentation version at /slides/<id>.
#
#   scripts/make-slides.sh v2 path/to/deck.pptx
#
# Writes public/slides/<id>/slide-NN.webp (1920x1080) plus a copy of the
# file, then prints the entry to add to src/lib/slide-versions.ts.
# Needs LibreOffice (soffice), Poppler (pdftoppm) and cwebp. Montserrat and
# Inter must be installed, or the slides render in fallback fonts.
set -euo pipefail

id="${1:?version id, e.g. v2}"
src="${2:?path to a .pptx or .pdf}"
[[ "$id" =~ ^v[0-9]+$ ]] || { echo "Version id must look like v2" >&2; exit 1; }

root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/public/slides/$id"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$out"

case "$src" in
  *.pdf) cp "$src" "$tmp/deck.pdf" ;;
  *) soffice --headless --convert-to pdf --outdir "$tmp" "$src" >/dev/null
     mv "$tmp"/*.pdf "$tmp/deck.pdf" ;;
esac

rm -f "$out"/slide-*.webp
pdftoppm -png -scale-to-x 1920 -scale-to-y -1 "$tmp/deck.pdf" "$tmp/s"
n=0
for png in "$tmp"/s-*.png; do
  n=$((n + 1))
  cwebp -quiet -q 86 "$png" -o "$out/slide-$(printf '%02d' "$n").webp"
done

file="rocket-llama-labs-presentation-$id.${src##*.}"
cp "$src" "$out/$file"

echo "Wrote $n slides to public/slides/$id. Add this to src/lib/slide-versions.ts:"
echo
echo "  {"
echo "    id: \"$id\","
echo "    name: \"Sales presentation\","
echo "    author: \"\","
echo "    added: \"$(date +%F)\","
echo "    summary: \"\","
echo "    file: \"$file\","
echo "    slides: [ /* $n titles, one per slide, in order */ ],"
echo "  },"
