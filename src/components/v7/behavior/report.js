// Behaviour for the sample monthly report, ported from Madison's mockup.
export function mountReport() {
  var rep = document.querySelector('.rep'); if (!rep || rep.dataset.mounted) return;
  rep.dataset.mounted = '1';
  var money = function (x) { return '$' + Math.round(x).toLocaleString('en-US'); };
  var MONTHS = [
    { m: 'Mar', jobs: 8, rev: 9400, spend: 4250, reply: '41 s', src: [3, 2, 1, 1, 0, 1], notes: ['First full month live. Local Services Ads on from the 3rd.', 'Two city pages published: Chandler and Gilbert.', 'Review requests started; 14 new reviews.'] },
    { m: 'Apr', jobs: 10, rev: 12600, spend: 4250, reply: '38 s', src: [3, 3, 1, 1, 1, 1], notes: ['Search ads tightened to repair terms; cost per booked call down 18%.', 'First AI search mention: ChatGPT cites the Chandler page.', 'Profile posts weekly. 19 new reviews.'] },
    { m: 'May', jobs: 13, rev: 17100, spend: 4900, reply: '36 s', src: [4, 3, 2, 1, 2, 1], notes: ['Ad spend up $650 ahead of the heat. Your call, our recommendation.', 'Meta offer: $59 tune-up, 3 funnels, 27% conversion.', 'Gemini now lists the company for "ac repair chandler".'] },
    { m: 'Jun', jobs: 9, rev: 10900, spend: 5100, reply: '44 s', src: [3, 2, 1, 1, 1, 1], notes: ['Two techs out sick week 3; 4 booked jobs pushed to July. Reply time slipped to 44 s on the 19th, fixed by the 20th.', 'Return for the month is $2.14 per $1. The quarter is still above the floor.', 'Peoria page published.'] },
    { m: 'Jul', jobs: 16, rev: 19800, spend: 5100, reply: '35 s', src: [5, 4, 2, 1, 2, 2], notes: ['Pushed jobs landed. Best month so far.', 'Local Services Ads guaranteed badge live; cost per booked call $38.', 'Perplexity cites the company in 2 of 5 test questions.'] },
    { m: 'Aug', jobs: 15, rev: 17600, spend: 4800, reply: '37 s', src: [5, 4, 2, 1, 2, 1], notes: ['Spend eased $300 as the season turns. The dashboard sets September.', 'Review count passes 400. Every one answered.', 'Return for the quarter: $3.22 per $1.'] }
  ];
  var cur = 4, honest = false, mbar = rep.querySelector('.months'), hb = rep.querySelector('.honest');
  MONTHS.forEach(function (mo, i) { var b = document.createElement('button'); b.type = 'button'; b.textContent = mo.m; b.addEventListener('click', function () { cur = i; honest = false; hb.setAttribute('aria-pressed', 'false'); hb.textContent = hb.getAttribute('data-label'); draw(); }); mbar.appendChild(b); });
  hb.setAttribute('data-label', hb.textContent);
  function draw() {
    var i = honest ? 3 : cur, mo = MONTHS[i], prev = MONTHS[i - 1] || mo;
    mbar.querySelectorAll('button').forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    var q = function (sel) { return rep.querySelector(sel); };
    q('.k-jobs').textContent = mo.jobs; q('.k-jobs-d').textContent = (mo.jobs >= prev.jobs ? '+' : '−') + Math.abs(mo.jobs - prev.jobs) + ' vs ' + prev.m; q('.k-jobs-d').classList.toggle('up', mo.jobs >= prev.jobs);
    q('.k-rev').textContent = money(mo.rev); q('.k-rev-d').textContent = (mo.rev >= prev.rev ? '+' : '−') + money(Math.abs(mo.rev - prev.rev)) + ' vs ' + prev.m; q('.k-rev-d').classList.toggle('up', mo.rev >= prev.rev);
    q('.k-spend').textContent = money(mo.spend); var roi = mo.rev / mo.spend; q('.k-roi').textContent = '$' + roi.toFixed(2); q('.k-roi-d').classList.toggle('up', roi >= 2);
    var max = Math.max.apply(null, mo.src); rep.querySelectorAll('.chart .row').forEach(function (r, k) { r.querySelector('i').style.width = (mo.src[k] / max * 100) + '%'; r.querySelector('.n').textContent = mo.src[k] + ' jobs'; });
    q('.k-notes').innerHTML = mo.notes.map(function (n) { return '<li>' + n + '</li>'; }).join(''); q('.k-reply').textContent = mo.reply;
    var qs = MONTHS.slice(Math.max(0, i - 2), i + 1), qr = qs.reduce(function (a, m) { return a + m.rev; }, 0) / qs.reduce(function (a, m) { return a + m.spend; }, 0);
    q('.k-floor').textContent = 'quarter at $' + qr.toFixed(2) + ' per $1' + (qr >= 2 ? ', above the floor' : ', below the floor, we work free');
  }
  hb.addEventListener('click', function () { honest = !honest; hb.setAttribute('aria-pressed', honest ? 'true' : 'false'); hb.textContent = honest ? 'That is June. Back to the month I picked' : hb.getAttribute('data-label'); draw(); });
  draw();
}
