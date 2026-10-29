// Behaviour for the FreeScan, ported from the BBM Local mockup's inline script.
// Plain JS on purpose: it drives the server-rendered markup by id and class the
// way the mockup did, and is mounted once from a useEffect. Rewrite as React
// state when the redesign settles.
export function mountFreeScan() {

  var f=document.getElementById('scanform'); if(!f) return;
  function emailOk(v){ v=String(v||'').trim(); return /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/.test(v) && !/\.\./.test(v) }
  var err=document.getElementById('sc_err');
  document.getElementById('sc_go').addEventListener('click',function(){
    var c=document.getElementById('sc_company'), e=document.getElementById('sc_email'); c.classList.remove('bad'); e.classList.remove('bad');
    if(!c.value.trim()){ err.textContent='Add your company name.'; err.style.display='block'; c.classList.add('bad'); c.focus(); return }
    if(!emailOk(e.value)){ err.textContent='Add a working email address, like name@company.com.'; err.style.display='block'; e.classList.add('bad'); e.focus(); return }
    err.style.display='none'; document.getElementById('scan_f').hidden=true; document.getElementById('scan_d').classList.add('on');
  });
  f.addEventListener('input',function(e){ if(e.target.classList.contains('bad')){ e.target.classList.remove('bad'); err.style.display='none' } });
  f.addEventListener('keydown',function(e){ if(e.key==='Enter'&&e.target.tagName==='INPUT'){ e.preventDefault(); document.getElementById('sc_go').click() } });

}
