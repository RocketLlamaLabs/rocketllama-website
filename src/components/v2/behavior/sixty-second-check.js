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
    var v,p; var v7=!!root.closest('.v7'); if(s<40){v=v7?'Homeowners cannot find you yet.':'The town cannot find you yet.'; p='Under 40 means the customers who are searching right now are landing on someone else. The fix is the foundation: the Google profile, the reviews, a site that books, and a phone that always answers. All of it is on the walkthrough.'}
    else if(s<(v7?81:70)){v='Getting found, losing jobs.'; p=(v7?'Between 40 and 80 means':'Between 40 and 70 means')+' the work is coming in, and a chunk of it is leaking: slow answers, a site that does not book, leads you are sharing with four other companies. The walkthrough shows you where, with your own numbers.'}
    else {v='Strong. Now make it compound.'; p=(v7?'81 and above puts you':'Over 70 puts you')+' ahead of most companies in your trade. The walkthrough shows where the next jobs come from: the searches you are not on yet, the reviews you are not asking for, and the leads that still go to voicemail.'}
    document.getElementById('chk_v').textContent=v; document.getElementById('chk_p').textContent=p;
    var res=document.getElementById('chk_res'); res.classList.add('on');
    var sc=document.getElementById('chk_score'), arc=document.getElementById('chk_arc'); var t0=null;
    if(v7){ var band=s<40?'low':s<81?'mid':'high'; sc.setAttribute('data-band', band); arc.setAttribute('data-band', band); }
    requestAnimationFrame(function step(ts){ if(!t0) t0=ts; var k=Math.min(1,(ts-t0)/900); sc.textContent=Math.round(s*k); if(k<1) requestAnimationFrame(step) });
    setTimeout(function(){ arc.style.strokeDashoffset=String(326.7*(1-s/100)) },50);
    var bk=document.getElementById('chk_book'); bk.href=bk.getAttribute('href').split('?')[0]+'?score='+s;
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  document.getElementById('chk_again').addEventListener('click',function(){ root.querySelectorAll('input').forEach(function(r){r.checked=false; r.closest('.opt').classList.remove('sel')}); document.getElementById('chk_res').classList.remove('on'); document.getElementById('chk_arc').style.strokeDashoffset='326.7'; i=0; show() });
  show();

}
