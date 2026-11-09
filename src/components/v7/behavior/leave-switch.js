// Behaviour for the LeaveSwitch, ported from Madison's mockup.
export function mountLeaveSwitch() {
  var sw = document.getElementById('leave-sw'); if (!sw || sw.dataset.mounted) return;
  sw.dataset.mounted = '1';
  sw.addEventListener('change', function () {
    var on = this.checked, items = [].slice.call(document.querySelectorAll('#assets .asset'));
    document.getElementById('leave-lbl').textContent = on ? 'Leaving. Running the exit' : 'I am leaving Rocket Llama Labs';
    document.getElementById('leave-note').textContent = on ? 'Six items, about an afternoon. No negotiation, no exit fee, no hostage website.' : 'Flip it to run the exit.';
    items.forEach(function (a, k) { a.classList.remove('on'); if (on) setTimeout(function () { a.classList.add('on'); a.querySelector('.st').textContent = k === 5 ? 'scheduled' : 'transferred'; }, 250 * (k + 1)); else a.querySelector('.st').textContent = k === 5 ? 'included' : 'yours now'; });
  });
}
