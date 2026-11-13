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
    fit();
  }
  // The rotating lines are stacked, so their box is as tall as the longest one. Size it to the line on show, so the
  // button always sits the same distance under the paragraph and the group stays centred on the photo.
  var rot = lines.length ? lines[0].parentElement : null;
  function fit() { if (rot && lines[i]) rot.style.height = lines[i].offsetHeight + 'px'; }
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  function start() { if (timer) clearInterval(timer); if (!still) timer = setInterval(function () { show(i + 1); }, 9000); }
  dots.forEach(function (d, j) { d.addEventListener('click', function () { show(j); start(); }); });
  show(0); start();
}
