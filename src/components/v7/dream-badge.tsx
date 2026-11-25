// A revolving circular badge: "If you can dream it · We can build it", set
// around a circle and turned slowly by CSS (v7.css .dream-badge). Decorative; the
// sentence is in the aria-label.
export function DreamBadge({ tone }: { tone?: "blue" }) {
  return (
    <div className={tone === "blue" ? "dream-badge blue" : "dream-badge"} aria-label="If you can dream it, we can build it" role="img">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="dream-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text textLength="490" lengthAdjust="spacing">
          <textPath href="#dream-ring" startOffset="0" textLength="490" lengthAdjust="spacing">
            {"IF YOU CAN DREAM IT \u00b7 WE CAN BUILD IT \u00b7\u00a0"}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

// Industries banner, desktop: sizes the badge so the ring's letters run from the top of the
// headline's capitals to the baseline of the paragraph's last line. The ring's letters sit on a
// circle of radius 78 (of 200) and rise outward by their capital height, so the badge is the
// text span divided by the ring's outer diameter. Runs on load, resize and when fonts are ready.
export const BADGE_FIT = "(function(){function cap(e,t){var s=getComputedStyle(e),c=document.createElement('canvas').getContext('2d');c.font=s.fontWeight+' '+s.fontSize+' '+s.fontFamily;return c.measureText(t||'H').actualBoundingBoxAscent}function base(e,end){var m=document.createElement('span');m.style.cssText='display:inline-block;width:0;height:0';end?e.appendChild(m):e.insertBefore(m,e.firstChild);var y=m.getBoundingClientRect().top;m.remove();return y}function fit(){var w=document.querySelector('.indhero .indhead');if(!w)return;var b=w.querySelector('.dream-badge'),h=w.querySelector('h1'),l=w.querySelector('.lede');if(!b||!h||!l)return;b.style.top=b.style.height=b.style.width=b.style.bottom=b.style.transform='';if(!matchMedia('(min-width:1100px)').matches)return;var t=b.querySelector('text');var asc=t?cap(t,'H'):11;var outer=(78+asc)/100;var r=w.getBoundingClientRect();var top=base(h)-cap(h)-r.top,bot=base(l,1)-r.top,span=bot-top,size=span/outer;b.style.top=(top-(size-span)/2)+'px';b.style.bottom='auto';b.style.height=size+'px';b.style.width=size+'px';b.style.transform='translateX(50%)'}fit();addEventListener('resize',fit);addEventListener('load',fit);if(document.fonts)document.fonts.ready.then(fit)})()";
