// Behaviour for the Race, ported from Madison's mockup.
export function mountRace() {
  var go = document.getElementById('race-go'); if (!go || go.dataset.mounted) return;
  go.dataset.mounted = '1';
  var raf = null, t0 = null, $ = function (id) { return document.getElementById(id); };
  function fmtClock(s) { var m = Math.floor(s / 60), r = Math.floor(s % 60); return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  go.addEventListener('click', function () {
    if (raf) cancelAnimationFrame(raf); t0 = null; go.disabled = true; go.textContent = 'Ringing…'; $('us-done').textContent = ''; $('them-done').textContent = '';
    function frame(ts) {
      if (!t0) t0 = ts; var sim = (ts - t0) / 1000 * 60; $('clock').textContent = fmtClock(sim);
      var usP = Math.min(1, sim / 60), themP = Math.min(1, sim / 2520);
      $('us-fill').style.width = (usP * 100) + '%'; $('us-flag').style.left = (4 + usP * 92) + '%'; $('them-fill').style.width = (themP * 100) + '%';
      $('us-t').textContent = sim < 4 ? 'ringing' : sim < 38 ? 'AI answered in 4 s · taking details' : sim < 60 ? 'text and email sent at 38 s' : 'booked Thursday 10:30';
      $('them-t').textContent = sim < 20 ? 'ringing' : sim < 2520 ? 'voicemail' : 'calling back';
      $('odds-them').textContent = Math.max(28, Math.round(62 - 34 * Math.min(1, Math.max(0, (sim - 120) / 2400)))) + '%';
      if (sim >= 60 && !$('us-done').textContent) $('us-done').textContent = 'Booked. The homeowner has a name, a time and a text to prove it.';
      if (sim < 2520) raf = requestAnimationFrame(frame); else { $('them-done').textContent = 'Callback at 42 minutes. The job was booked 41 minutes ago.'; go.disabled = false; go.textContent = 'Run it again'; }
    }
    raf = requestAnimationFrame(frame);
  });
}
