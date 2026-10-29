// Behaviour for the SixtySecondCheck, ported from the BBM Local mockup's inline script.
// Plain JS on purpose: it drives the server-rendered markup by id and class the
// way the mockup did, and is mounted once from a useEffect. Rewrite as React
// state when the redesign settles.
export function mountSixtySecondCheck() {

  var root=document.getElementById('chk'); if(!root) return;
  var qs=[].slice.call(root.querySelectorAll('.q')), i=0, n=document.getElementById('chk_n'), bar=document.getElementById('chk_bar');
  function show(){ qs.forEach(function(q,k){q.classList.toggle('on',k===i)}); n.textContent='Question '+(i+1)+' of '+qs.length; bar.style.width=(i/qs.length*100)+'%' }
  root.addEventListener('change',function(e){ var t=e.target; if(t.type!=='radio') return;
    root.querySelectorAll('input[name="'+t.name+'"]').forEach(function(r){r.closest('.opt').classList.toggle('sel',r.checked)});
    setTimeout(function(){ if(i<qs.length-1){i++;show()} else finish() },260) });
  function finish(){
    var s=0; qs.forEach(function(q){ var r=q.querySelector('input:checked'); if(r) s+=parseInt(r.value,10) });
    qs.forEach(function(q){q.classList.remove('on')}); bar.style.width='100%'; n.textContent='Done';
    var v,p; if(s<40){v='The town cannot find you yet.'; p='Under 40 means the customers who are searching right now are landing on someone else. The fix is the foundation: the Google profile, the reviews, a site that books, and a phone that always answers. All of it is on the walkthrough.'}
    else if(s<70){v='Getting found, losing jobs.'; p='Between 40 and 70 means the work is coming in, and a chunk of it is leaking: slow answers, a site that does not book, leads you are sharing with four other companies. The walkthrough shows you where, with your own numbers.'}
    else {v='Strong. Now make it exclusive.'; p='Over 70 puts you ahead of most companies in your trade. The question is whether the spot for your trade in your area is still open, because we limit how many companies we take per trade per area.'}
    document.getElementById('chk_v').textContent=v; document.getElementById('chk_p').textContent=p;
    var res=document.getElementById('chk_res'); res.classList.add('on');
    var sc=document.getElementById('chk_score'), arc=document.getElementById('chk_arc'); var t0=null;
    requestAnimationFrame(function step(ts){ if(!t0) t0=ts; var k=Math.min(1,(ts-t0)/900); sc.textContent=Math.round(s*k); if(k<1) requestAnimationFrame(step) });
    setTimeout(function(){ arc.style.strokeDashoffset=String(326.7*(1-s/100)) },50);
    document.getElementById('chk_book').href='/v2/book?score='+s;
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  document.getElementById('chk_again').addEventListener('click',function(){ root.querySelectorAll('input').forEach(function(r){r.checked=false; r.closest('.opt').classList.remove('sel')}); document.getElementById('chk_res').classList.remove('on'); document.getElementById('chk_arc').style.strokeDashoffset='326.7'; i=0; show() });
  show();

}
