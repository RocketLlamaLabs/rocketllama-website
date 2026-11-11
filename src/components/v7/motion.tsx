"use client";

import { useEffect } from "react";

// Site-wide motion for version 7: sections and cards rise in as they scroll
// into view, the big numbers count up, the nav gets a shadow once the page
// scrolls. Everything is off when the visitor prefers reduced motion. Elements
// are picked by class here so the generated pages need no markup changes.

const RISE = ".v7 main section > .wrap > .kicker, .v7 main section > .wrap > h1, .v7 main section > .wrap > h2, .v7 main section > .wrap > .sub, .v7 main section > .wrap > .lede, .v7 .pagehead .in > *, .v7 .card, .v7 .trade, .v7 .svc > .card, .v7 .team .card, .v7 .step, .v7 .sysgroup, .v7 .evolve, .v7 .band .in, .v7 .diagwrap, .v7 .race, .v7 .chk, .v7 .am-cols > *, .v7 .starter a, .v7 .faq details, .v7 .tradecopy > div, .v7 #industries .trade, .v7 .svc .card, .v7 .what .card";

export function Motion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.querySelector(".v7");
    if (!root || still) return;
    root.classList.add("motion");

    // rise in
    const items = Array.from(document.querySelectorAll<HTMLElement>(RISE)).filter((el) => !el.closest(".hero") && !el.closest(".nav") && !el.classList.contains("copy") && !el.classList.contains("dream-badge"));
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) { el.classList.add("in"); return; } // above the fold: already visible
      el.classList.add("rise");
    });
    // stagger siblings that share a parent
    const groups = new Map<Element, number>();
    items.forEach((el) => {
      if (!el.classList.contains("rise") || !el.parentElement) return;
      const n = groups.get(el.parentElement) ?? 0;
      el.style.transitionDelay = `${Math.min(n, 6) * 70}ms`;
      groups.set(el.parentElement, n + 1);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // reveal when it enters the viewport, or once the viewport has scrolled past it
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => { if (el.classList.contains("rise")) io.observe(el); });
    // safety net: anything still hidden after a fast scroll is shown
    const sweep = () => { items.forEach((el) => { if (el.classList.contains("rise") && !el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in"); }); };
    window.addEventListener("scroll", sweep, { passive: true });

    // count up: numbers that are a plain figure with an optional prefix/suffix
    const nums = Array.from(document.querySelectorAll<HTMLElement>(".v7 .bstats .b, .v7 .am-stats .n, .v7 .card .n"));
    const counters = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        counters.unobserve(e.target);
        const el = e.target as HTMLElement;
        const text = el.textContent ?? "";
        const m = text.match(/^(\D*)(\d[\d,.]*)([\s\S]*)$/);
        if (!m || el.querySelector("*")) return; // leave mixed markup (62% vs 28%) alone
        const [, pre, numStr, post] = m;
        const target = parseFloat(numStr.replace(/,/g, ""));
        if (!isFinite(target) || target === 0) return;
        const decimals = (numStr.split(".")[1] || "").length;
        const t0 = performance.now(); const dur = 900;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur); const eased = 1 - Math.pow(1 - k, 3);
          const v = target * eased;
          el.textContent = pre + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + post;
          if (k < 1) requestAnimationFrame(tick); else el.textContent = text;
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach((el) => counters.observe(el));

    // nav shadow on scroll
    const nav = document.querySelector(".v7 .nav");
    const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); counters.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("scroll", sweep); };
  }, []);
  return null;
}
