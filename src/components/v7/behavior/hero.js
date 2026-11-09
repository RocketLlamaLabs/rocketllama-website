// Behaviour for the banner carousel on version 7: a timer walks the photos
// and the rotating lines together, and the dashes jump to a slide while the
// timer keeps running from there.
export function mountHero() {
  var hero = document.querySelector('.v7 .hero#top'); if (!hero || hero.dataset.mounted) return;
  hero.dataset.mounted = '1';
  var imgs = hero.querySelectorAll('.slides img'), lines = hero.querySelectorAll('.rot .rslide'), dots = hero.querySelectorAll('.dots button');
  var n = imgs.length, i = 0, timer = null;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(k) {
    i = (k + n) % n;
    imgs.forEach(function (e, j) { e.classList.toggle('on', j === i); });
    lines.forEach(function (e, j) { e.classList.toggle('on', j === i); });
    dots.forEach(function (e, j) { e.classList.toggle('on', j === i); e.setAttribute('aria-current', j === i ? 'true' : 'false'); });
  }
  function start() { if (timer) clearInterval(timer); if (!still) timer = setInterval(function () { show(i + 1); }, 9000); }
  dots.forEach(function (d, j) { d.addEventListener('click', function () { show(j); start(); }); });
  show(0); start();
}
