// Behaviour for the Race, ported from Madison's mockup. Our lane follows the
// clock: AI answers at 0:30, text and email at 1:00, booked at 1:45.
export function mountRace() {
  var go = document.getElementById('race-go'); if (!go || go.dataset.mounted) return;
  go.dataset.mounted = '1';
  var raf = null, t0 = null, $ = function (id) { return document.getElementById(id); };
  function fmtClock(s) { var m = Math.floor(s / 60), r = Math.floor(s % 60); return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  // The falling number is green above 49, yellow at 49 and red below it, like the 60-second check score.
  function setOdds(n) { var el = $('odds-them'); el.textContent = n + '%'; el.setAttribute('data-band', n > 49 ? 'high' : n === 49 ? 'mid' : 'low'); }
  var reset = $('race-reset');
  if (reset) reset.addEventListener('click', function () {
    if (raf) cancelAnimationFrame(raf); raf = null; t0 = null;
    $('clock').textContent = '00:00'; $('us-fill').style.width = '0%'; $('us-flag').style.left = 'calc(0% - 0px)'; $('us-wm').style.clipPath = 'inset(0 100% 0 0)'; $('them-fill').style.width = '0%';
    $('us-t').textContent = '\u2014'; $('them-t').textContent = '\u2014'; setOdds(28); 
    $('us-done').textContent = ''; $('them-done').textContent = ''; go.disabled = false; go.textContent = 'A customer calls';
  });
  go.addEventListener('click', function () {
    if (raf) cancelAnimationFrame(raf); t0 = null; go.disabled = true; go.textContent = 'Ringing…'; $('us-done').textContent = ''; $('them-done').textContent = '';
    function frame(ts) {
      if (!t0) t0 = ts; var sim = (ts - t0) / 1000 * 45; $('clock').textContent = fmtClock(sim);
      var usP = Math.min(1, sim / 105), themP = Math.min(1, sim / 2520);
      $('us-fill').style.width = (usP * 100) + '%'; $('us-wm').style.clipPath = 'inset(0 ' + (100 - usP * 100) + '% 0 0)'; $('us-flag').style.left = 'calc(' + (usP * 100) + '% - ' + (usP * 56) + 'px)'; $('them-fill').style.width = (themP * 100) + '%';
      $('us-t').textContent = sim < 30 ? 'ringing · AI picking up' : sim < 60 ? 'AI answered at 30 s · taking details' : sim < 105 ? 'text and email sent at 1:00' : 'booked at 1:45, Thursday 10:30';
      $('them-t').textContent = sim < 20 ? 'ringing' : sim < 2520 ? 'voicemail' : 'calling back';
      setOdds(Math.max(28, Math.round(62 - 34 * Math.min(1, Math.max(0, (sim - 120) / 2400)))));
      if (sim >= 105 && !$('us-done').textContent) $('us-done').textContent = 'Booked. The homeowner has a name, a time and a text to prove it.';
      if (sim < 2520) raf = requestAnimationFrame(frame); else { $('them-done').textContent = 'Callback at 42 minutes. The job was booked 40 minutes ago.'; go.disabled = false; go.textContent = 'Run it again'; }
    }
    raf = requestAnimationFrame(frame);
  });
}
