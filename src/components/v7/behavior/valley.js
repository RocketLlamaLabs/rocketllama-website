// Behaviour for the "Built for" carousel: a timer walks the photo band
// through the trades on the banner's timing. Photos point at the version 2 set.
export function mountValley() {
  var band = document.getElementById('tradeband'); if (!band || band.dataset.mounted) return;
  band.dataset.mounted = '1';
  var P = { hvac: '/v2/img/hero-hvac.jpg', plumbing: '/v2/img/hero-plumbing.jpg', electrical: '/v2/img/hero-electrical.jpg', roofing: '/v2/img/hero-roofing.jpg', door: '/v2/img/band-door.jpg', nb: '/v2/img/band-neighborhood.jpg' };
  var MON = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  var TRADES = {
    'HVAC': { kw: ['ac repair phoenix','emergency ac repair near me','hvac company chandler','ac replacement cost mesa','heat pump install gilbert'], season: 'June to September', seasonP: 'Peak cooling season in the Valley. Local Services Ads and search budgets rise with the temperature and come down in October.', curve: [40,38,45,55,75,100,100,95,80,55,40,42], job: '$6,800', jobP: 'Illustrative average for a replacement in the Phoenix market. The CRM records the real number per job, and that sets next month’s spend.', photo: P.hvac, h2: 'When the AC dies in July, the first company to answer gets the job.', p: 'Every new lead gets a text and an email in under a minute, in your voice, even when your techs are on a roof in 112° degrees. Your phone will still ring first and if nobody can pick up, the AI books an appointment.' },
    'Plumbing': { kw: ['plumber near me','water heater replacement phoenix','slab leak repair chandler','drain cleaning scottsdale','emergency plumber gilbert'], season: 'All year, spikes in winter', seasonP: 'Water heaters fail when the first cold snap hits. Budgets hold steady with a December and January lift.', curve: [85,80,70,65,65,70,75,75,70,70,85,100], job: '$1,900', jobP: 'Illustrative average across repairs and water heater replacements. The CRM records the real number per job.', photo: P.plumbing, h2: 'A burst water line does not wait for a callback.', p: 'The homeowner is standing in water. The company that answers in less than a minute gets the job, and the review.' },
    'Electrical': { kw: ['electrician near me','ev charger installation phoenix','panel upgrade scottsdale','electrician mesa az','ceiling fan install gilbert'], season: 'Spring, plus EV demand all year', seasonP: 'Panel upgrades and EV chargers run steadily. Monsoon season brings surge and outage calls in July and August.', curve: [60,62,75,80,78,70,90,92,70,65,60,58], job: '$2,400', jobP: 'Illustrative average across panel upgrades, EV chargers and repairs.', photo: P.electrical, h2: 'The homeowner wants a charger installed before the car arrives Friday.', p: 'They searched, they asked ChatGPT, they called two companies. The one with the structured site and the 38-second reply gets the Friday slot.' },
    'Roofing': { kw: ['roof repair phoenix','roofing company near me','monsoon roof damage mesa','tile roof replacement scottsdale','roof inspection chandler'], season: 'July to September, after monsoon', seasonP: 'Monsoon damage drives the busiest weeks of the year. Budgets rise in July and the review pipeline runs hot through September.', curve: [45,45,55,60,55,60,100,100,90,65,50,45], job: '$14,500', jobP: 'Illustrative average for a replacement. Repairs are smaller and more frequent.', photo: P.roofing, h2: 'After the monsoon, every roofer in the Valley is busy. The first one to answer wins.', p: 'Storm season is a race. Tracked numbers, an AI receptionist, and a text in under a minute means the inspection is booked before the competitor hears the voicemail.' },
    'Garage door': { kw: ['garage door repair near me','garage door spring replacement phoenix','garage door opener install mesa','garage door company chandler'], season: 'All year', seasonP: 'Springs break on their own schedule. Spend stays level with a small lift around the holidays.', curve: [70,70,70,68,70,72,70,70,70,72,80,85], job: '$900', jobP: 'Illustrative average across spring, opener and panel jobs.', photo: P.door, h2: 'The car is stuck in the garage. They are calling right now.', p: 'Same-day is the whole sale. Answer first, book the slot, send the text with the tech’s name.' },
    'Pest control': { kw: ['pest control phoenix','scorpion control scottsdale','termite inspection mesa','pest control near me'], season: 'March to October', seasonP: 'Scorpion and termite season. Recurring plans mean the first job is worth a year of jobs.', curve: [40,45,70,85,95,100,100,95,85,70,45,40], job: '$480 per year', jobP: 'Illustrative annual value of a quarterly plan. Recurring revenue changes the math on every lead.', photo: P.nb, h2: 'One scorpion in the bathtub and they are searching tonight.', p: 'Recurring plans are won on the first reply. The AI books the inspection, the CRM runs the renewal.' },
    'Painting': { kw: ['house painters near me','exterior painting phoenix','cabinet painting scottsdale','interior painter gilbert'], season: 'October to April', seasonP: 'Exterior work runs in the cool months; interiors fill the summer.', curve: [95,90,85,70,55,40,35,35,45,80,95,100], job: '$3,800', jobP: 'Illustrative average for an exterior repaint.', photo: P.nb, h2: 'The paint is peeling and the listing photos are on Saturday.', p: 'A homeowner with a deadline calls three painters. The one who answers, quotes and books the walkthrough tonight gets the house, and the neighbor who asks for a card.' },
    'Landscaping': { kw: ['landscaper near me','desert landscaping phoenix','artificial turf install gilbert','irrigation repair chandler'], season: 'February to May, and October', seasonP: 'Planting and installs run spring and fall. Maintenance plans carry the summer.', curve: [60,80,95,100,85,55,45,45,60,90,75,55], job: '$3,200', jobP: 'Illustrative average for an install. Maintenance plans are recurring.', photo: P.nb, h2: 'They want the yard done before the party in April.', p: 'Spring is a race for installs. The first company with a design slot wins the project and the maintenance plan after it.' }
  };
  var ORDER = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Painting', 'Garage door', 'Pest control', 'Landscaping'];
  var state = { trade: 'HVAC' };
  var T = function () { return TRADES[state.trade]; };
  var lc = function () { return state.trade === 'HVAC' ? 'HVAC' : state.trade.toLowerCase(); };
  function fill(sel, text) { document.querySelectorAll('[data-t="' + sel + '"]').forEach(function (el) { el.textContent = text; }); }
  var layers = band.querySelectorAll('.bg'), onLayer = 0;
  function paint() {
    var t = T();
    fill('trade', state.trade); fill('trade-lc', lc());
    band.querySelector('.photo-h2').textContent = t.h2; band.querySelector('.photo-p').textContent = t.p;
  }
  function photo() {
    if (layers.length < 2) { band.style.setProperty('--img', 'url(' + T().photo + ')'); return; }
    var next = 1 - onLayer; layers[next].style.backgroundImage = 'url(' + T().photo + ')';
    layers[next].classList.add('on'); layers[onLayer].classList.remove('on'); onLayer = next;
  }
  function show(trade, animate) {
    state.trade = trade;
    if (!animate) { paint(); photo(); return; }
    photo(); band.classList.add('swap');
    setTimeout(function () { paint(); band.classList.remove('swap'); }, 420);
  }
  var i = 0, timer = null, still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dotsBox = document.getElementById('trade-dots'), dots = [];
  if (dotsBox) { ORDER.forEach(function (name, j) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', name); b.addEventListener('click', function () { go(j, true); start(); }); dotsBox.appendChild(b); dots.push(b); }); }
  function go(j, animate) { i = j; show(ORDER[i], animate); dots.forEach(function (d, k) { d.classList.toggle('on', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); }); }
  function start() { if (timer) clearInterval(timer); if (!still) timer = setInterval(function () { go((i + 1) % ORDER.length, true); }, 8000); }
  go(0, false); start();
}
