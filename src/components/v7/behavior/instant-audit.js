// Behaviour for the InstantAudit, ported from Madison's scan mockup. Plain JS
// mounted once from a useEffect, the way the version 2 components work.
export function mountInstantAudit() {
  var run = document.getElementById('a-run'); if (!run || run.dataset.mounted) return;
  run.dataset.mounted = '1';
  var TOPREV = { 'HVAC': 1240, 'Plumbing': 412, 'Electrical': 380, 'Roofing': 610, 'Garage door': 290, 'Pest control': 2100, 'Landscaping': 210, 'Painting': 180, 'Window and pressure washing': 160, 'Handyman': 240, 'Mobile mechanic': 130, 'Windows and doors': 320, 'Solar': 540, 'Flooring': 270, 'Remodeling': 190, 'Other home service': 300 };
  var LC = function (t) { return t === 'HVAC' ? 'HVAC company' : t === 'Plumbing' ? 'plumber' : t === 'Electrical' ? 'electrician' : t === 'Roofing' ? 'roofer' : t.toLowerCase() + ' company'; };
  var checks = document.getElementById('a-checks'), result = document.getElementById('a-result'), items = [].slice.call(checks.querySelectorAll('.arow')), timer = null;
  run.addEventListener('click', function () {
    var name = document.getElementById('a-co').value.trim() || 'Your company', trade = document.getElementById('a-tr').value;
    document.getElementById('a-name').textContent = name; document.getElementById('a-trade').textContent = trade === 'HVAC' ? 'HVAC' : trade.toLowerCase();
    document.querySelectorAll('.a-trade-lc').forEach(function (e) { e.textContent = LC(trade); });
    document.getElementById('a-toprev').textContent = TOPREV[trade].toLocaleString('en-US');
    run.disabled = true; run.textContent = 'Running…'; checks.classList.add('on'); result.classList.remove('on');
    items.forEach(function (c) { c.classList.remove('on', 'done'); c.querySelector('.val').textContent = '…'; });
    var i = 0;
    function step() {
      if (i > 0) { var prev = items[i - 1]; prev.classList.add('done'); prev.querySelector('.val').textContent = prev.querySelector('.val').getAttribute('data-val'); }
      if (i < items.length) { items[i].classList.add('on'); i++; timer = setTimeout(step, 900 + Math.random() * 700); } else finish();
    }
    clearTimeout(timer); timer = setTimeout(step, 300);
    function finish() {
      run.disabled = false; run.textContent = 'Run it again →';
      result.classList.add('on'); var s = 46, sc = document.getElementById('a-score'), t0 = null;
      requestAnimationFrame(function tick(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 900); sc.textContent = Math.round(s * k); if (k < 1) requestAnimationFrame(tick); });
      setTimeout(function () { document.getElementById('a-arc').style.strokeDashoffset = String(326.7 * (1 - s / 100)); result.querySelectorAll('.trk i').forEach(function (b) { b.style.width = b.getAttribute('data-w') + '%'; }); }, 80);
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
