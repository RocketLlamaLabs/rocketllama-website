// Behaviour for the QualifyQuiz, ported from the BBM Local mockup's inline script.
// Plain JS on purpose: it drives the server-rendered markup by id and class the
// way the mockup did, and is mounted once from a useEffect. Rewrite as React
// state when the redesign settles.
export function mountQualifyQuiz() {

  var root=document.getElementById('qz'); if(!root) return;
  var steps=[].slice.call(root.querySelectorAll('.step')), i=0;
  var bar=document.getElementById('qzbar'), cnt=document.getElementById('qzcnt'), title=document.getElementById('qztitle'), err=document.getElementById('qzerr');
  var back=document.getElementById('qzback'), next=document.getElementById('qznext'), nav=document.getElementById('qznav');
  function $(id){return document.getElementById(id)}
  function val(name){var el=root.querySelector('input[name="'+name+'"]:checked');return el?el.value:''}
  function vals(name){return [].map.call(root.querySelectorAll('input[name="'+name+'"]:checked'),function(e){return e.value})}
  function live(){return steps.filter(function(s){return !s.classList.contains('skip')})}
  function pos(){var l=live();return {n:l.indexOf(steps[i])+1,N:l.length}}
  function isLast(){var l=live();return l[l.length-1]===steps[i]}
  function move(dir){var k=i+dir;while(k>=0&&k<steps.length&&steps[k].classList.contains('skip'))k+=dir;if(k>=0&&k<steps.length){i=k;return true}return false}
  function clearBad(){root.querySelectorAll('.bad').forEach(function(e){e.classList.remove('bad')}); err.style.display='none'}
  function show(scroll){
    steps.forEach(function(s,k){s.classList.toggle('on',k===i)});
    var p=pos(); bar.style.width=(p.n/p.N*100)+'%'; cnt.textContent='Question '+p.n+' of '+p.N;
    title.textContent=p.n===1?'About 2 minutes':(p.N-p.n<=1?'Almost done':(p.N-p.n<=4?'Nearly there':Math.round((1-p.n/p.N)*2)+' minute'+(Math.round((1-p.n/p.N)*2)===1?'':'s')+' to go'));
    back.disabled=p.n===1; next.textContent=isLast()?'See if you qualify':'Next'; clearBad();
    if(scroll)root.scrollIntoView({behavior:'smooth',block:'start'});
    var f=steps[i].querySelector('input[type=text],input[type=tel],input[type=email]'); if(f&&scroll&&window.matchMedia('(min-width:900px)').matches) setTimeout(function(){f.focus({preventScroll:true})},320);
  }
  root.addEventListener('change',function(e){
    var t=e.target; if(t.type==='radio'){root.querySelectorAll('input[name="'+t.name+'"]').forEach(function(r){r.closest('.opt').classList.toggle('sel',r.checked)})}
    if(t.type==='checkbox'&&t.closest('.opt')){t.closest('.opt').classList.toggle('sel',t.checked)}
    var src=vals('q_src'); $('c_marketplace').hidden=!(src.indexOf('angi')>-1||src.indexOf('thumbtack')>-1||src.indexOf('yelp')>-1);
    $('c_agency').hidden=src.indexOf('agency')===-1;
    var site=val('q_site'); $('c_site').hidden=!(site==='diy'||site==='agency'||site==='unsure');
    $('c_other').hidden=val('q_trade')!=='other';
    $('c_multi').hidden=val('q_radius')!=='multi'; if(t.name==='q_radius') ringLabel();
    if(t.closest('.bad')){t.closest('.bad').classList.remove('bad'); err.style.display='none'}
    // one-tap questions advance on their own, unless the tap opened a follow-up
    if(t.type==='radio'&&steps[i].dataset.auto&&!steps[i].querySelector('.cond:not([hidden])')&&!isLast()){setTimeout(function(){if(valid().ok&&move(1))show(true)},280)}
  });
  root.addEventListener('input',function(e){ var b=e.target.closest('.bad'); if(b){b.classList.remove('bad'); err.style.display='none'} });
  root.addEventListener('keydown',function(e){ if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='BUTTON'){e.preventDefault();next.click()} });
  function need(ok,el,msg){ if(ok) return null; return {el:el,msg:msg} }
  var PLACES=["Aberdeen, SD","Akron, OH","Albany, NY","Albuquerque, NM","Alexandria, VA","Allentown, PA","Alpharetta, GA","Ames, IA","Anaheim, CA","Anchorage, AK","Ann Arbor, MI","Annapolis, MD","Appleton, WI","Arlington, TX","Arlington, VA","Arvada, CO","Asheville, NC","Athens, GA","Atlanta, GA","Auburn, AL","Auburn, ME","Augusta, GA","Augusta, ME","Aurora, CO","Aurora, IL","Austin, TX","Bakersfield, CA","Baltimore, MD","Bangor, ME","Baton Rouge, LA","Beaverton, OR","Bellevue, NE","Bellevue, WA","Bend, OR","Bennington, VT","Bentonville, AR","Bethlehem, PA","Biddeford, ME","Billings, MT","Biloxi, MS","Birmingham, AL","Bismarck, ND","Bloomington, IN","Bloomington, MN","Boise, ID","Bossier City, LA","Boston, MA","Boulder, CO","Bowling Green, KY","Bozeman, MT","Brattleboro, VT","Bridgeport, CT","Brockton, MA","Broken Arrow, OK","Brookings, SD","Brooklyn Park, MN","Buffalo, NY","Burlington, VT","Butte, MT","Caldwell, ID","Cambridge, MA","Canton, OH","Cape Coral, FL","Carmel, IN","Carson City, NV","Cary, NC","Casper, WY","Cedar Rapids, IA","Champaign, IL","Chandler, AZ","Charleston, SC","Charleston, WV","Charlotte, NC","Chattanooga, TN","Chesapeake, VA","Cheyenne, WY","Chicago, IL","Cincinnati, OH","Clarksville, TN","Cleveland, OH","Clifton, NJ","Clovis, NM","Coeur d'Alene, ID","Colchester, VT","Colorado Springs, CO","Columbia, MD","Columbia, MO","Columbia, SC","Columbus, GA","Columbus, OH","Concord, NH","Conway, AR","Corpus Christi, TX","Coventry, RI","Covington, KY","Cranston, RI","Cumberland, RI","Dallas, TX","Danbury, CT","Davenport, IA","Dayton, OH","Dearborn, MI","Denver, CO","Derry, NH","Des Moines, IA","Detroit, MI","Dickinson, ND","Dothan, AL","Dover, DE","Dover, NH","Duluth, MN","Durham, NC","East Providence, RI","Eau Claire, WI","Edison, NJ","Edmond, OK","El Paso, TX","Elgin, IL","Elizabeth, NJ","Elko, NV","Ellicott City, MD","Erie, PA","Essex, VT","Eugene, OR","Evanston, WY","Evansville, IN","Everett, WA","Fairbanks, AK","Fairfax, VA","Fairmont, WV","Fargo, ND","Farmington, NM","Fayetteville, AR","Fayetteville, NC","Fishers, IN","Flagstaff, AZ","Florence, KY","Fort Collins, CO","Fort Lauderdale, FL","Fort Smith, AR","Fort Wayne, IN","Fort Worth, TX","Franklin, TN","Frederick, MD","Fremont, NE","Fresno, CA","Frisco, TX","Georgetown, DE","Georgetown, KY","Germantown, MD","Gilbert, AZ","Gillette, WY","Glen Burnie, MD","Glendale, AZ","Goodyear, AZ","Grand Forks, ND","Grand Island, NE","Grand Rapids, MI","Great Falls, MT","Green Bay, WI","Green River, WY","Greensboro, NC","Greenville, SC","Gresham, OR","Gulfport, MS","Hammond, IN","Hampton, VA","Harrisburg, PA","Hartford, CT","Hastings, NE","Hattiesburg, MS","Havre, MT","Helena, MT","Henderson, NV","Hialeah, FL","High Point, NC","Hillsboro, OR","Hilo, HI","Hobbs, NM","Honolulu, HI","Hoover, AL","Houston, TX","Huntington, WV","Huntsville, AL","Idaho Falls, ID","Independence, MO","Indianapolis, IN","Iowa City, IA","Irvine, CA","Irving, TX","Jackson, MS","Jackson, TN","Jacksonville, FL","Jersey City, NJ","Joliet, IL","Jonesboro, AR","Juneau, AK","Kahului, HI","Kailua, HI","Kalamazoo, MI","Kalispell, MT","Kaneohe, HI","Kansas City, KS","Kansas City, MO","Kapolei, HI","Kearney, NE","Kenai, AK","Kenner, LA","Kenosha, WI","Kent, WA","Ketchikan, AK","Knoxville, TN","Lafayette, LA","Lake Charles, LA","Lakewood, CO","Lakewood, NJ","Lancaster, PA","Lansing, MI","Laramie, WY","Las Cruces, NM","Las Vegas, NV","Lawrence, KS","Lawton, OK","Lee's Summit, MO","Lehi, UT","Lenexa, KS","Lewiston, ME","Lexington, KY","Lincoln, NE","Little Rock, AR","Livonia, MI","Long Beach, CA","Long Island, NY","Lorain, OH","Los Angeles, CA","Louisville, KY","Lowell, MA","Lubbock, TX","Lynn, MA","Macon, GA","Madison, WI","Manchester, NH","Mandan, ND","Marietta, GA","Martinsburg, WV","Medford, OR","Memphis, TN","Meridian, ID","Meridian, MS","Merrimack, NH","Mesa, AZ","Mesquite, NV","Miami, FL","Middletown, DE","Midwest City, OK","Milford, DE","Milwaukee, WI","Minneapolis, MN","Minot, ND","Missoula, MT","Mitchell, SD","Mobile, AL","Monroe, LA","Montgomery, AL","Montpelier, VT","Moore, OK","Morgantown, WV","Mount Pleasant, SC","Mount Vernon, NY","Murfreesboro, TN","Nampa, ID","Naperville, IL","Nashua, NH","Nashville, TN","New Bedford, MA","New Britain, CT","New Haven, CT","New Orleans, LA","New Rochelle, NY","New York City, NY","Newark, DE","Newark, NJ","Newport News, VA","Newton, MA","Norfolk, NE","Norfolk, VA","Norman, OK","North Charleston, SC","North Las Vegas, NV","Norwalk, CT","O'Fallon, MO","Oakland, CA","Ogden, UT","Oklahoma City, OK","Olathe, KS","Olive Branch, MS","Olympia, WA","Omaha, NE","Orem, UT","Orlando, FL","Overland Park, KS","Owensboro, KY","Palmer, AK","Parkersburg, WV","Parma, OH","Paterson, NJ","Pawtucket, RI","Pearl City, HI","Peoria, AZ","Peoria, IL","Philadelphia, PA","Phoenix, AZ","Pierre, SD","Pittsburgh, PA","Plano, TX","Plymouth, MN","Pocatello, ID","Port St. Lucie, FL","Portland, ME","Portland, OR","Providence, RI","Provo, UT","Pueblo, CO","Quincy, MA","Racine, WI","Raleigh, NC","Rapid City, SD","Reading, PA","Reno, NV","Renton, WA","Richmond, KY","Richmond, VA","Rio Rancho, NM","Riverside, CA","Roanoke, VA","Rochester, MN","Rochester, NH","Rochester, NY","Rock Hill, SC","Rock Springs, WY","Rockford, IL","Rockville, MD","Rogers, AR","Roswell, GA","Roswell, NM","Rutland, VT","Saco, ME","Sacramento, CA","Salem, NH","Salem, OR","Salt Lake City, UT","San Antonio, TX","San Diego, CA","San Francisco, CA","San Jose, CA","Sandy Springs, GA","Sandy, UT","Santa Fe, NM","Sarasota, FL","Savannah, GA","Schenectady, NY","Scottsdale, AZ","Scranton, PA","Seaford, DE","Seattle, WA","Shawnee, KS","Sheridan, WY","Shreveport, LA","Silver Spring, MD","Sioux City, IA","Sioux Falls, SD","Sitka, AK","Smyrna, DE","South Bend, IN","South Burlington, VT","South Portland, ME","Southaven, MS","Sparks, NV","Spartanburg, SC","Spokane Valley, WA","Spokane, WA","Springdale, AR","Springfield, IL","Springfield, MA","Springfield, MO","St. Charles, MO","St. George, UT","St. Louis, MO","St. Paul, MN","St. Petersburg, FL","Stamford, CT","Sterling Heights, MI","Summerville, SC","Surprise, AZ","Syracuse, NY","Tacoma, WA","Tallahassee, FL","Tampa, FL","Tempe, AZ","Thornton, CO","Toledo, OH","Toms River, NJ","Topeka, KS","Trenton, NJ","Troy, MI","Tucson, AZ","Tulsa, OK","Tupelo, MS","Tuscaloosa, AL","Twin Falls, ID","Vancouver, WA","Virginia Beach, VA","Waipahu, HI","Waldorf, MD","Warren, MI","Warwick, RI","Washington, DC","Wasilla, AK","Waterbury, CT","Waterloo, IA","Watertown, SD","Waukegan, IL","Waukesha, WI","Weirton, WV","West Des Moines, IA","West Fargo, ND","West Jordan, UT","West Palm Beach, FL","West Valley City, UT","Westminster, CO","Wheeling, WV","Wichita, KS","Williston, ND","Wilmington, DE","Wilmington, NC","Winston-Salem, NC","Woodbridge, NJ","Woodbury, MN","Woonsocket, RI","Worcester, MA","Yankton, SD","Yonkers, NY","York, PA","Youngstown, OH"];
  var homeIn=$('q_home'), sug=$('q_homesug');
  function suggest(){ var q=homeIn.value.trim().toLowerCase(); sug.innerHTML=''; if(q.length<2){sug.hidden=true;return} var hits=PLACES.filter(function(p){return p.toLowerCase().indexOf(q)===0}).concat(PLACES.filter(function(p){return p.toLowerCase().indexOf(q)>0})).slice(0,6); hits.forEach(function(h){var d=document.createElement('div'); d.textContent=h; d.addEventListener('mousedown',function(e){e.preventDefault(); homeIn.value=h; sug.hidden=true; ringLabel()}); sug.appendChild(d)}); sug.hidden=hits.length===0; ringLabel() }
  homeIn.addEventListener('input',suggest); homeIn.addEventListener('blur',function(){ setTimeout(function(){sug.hidden=true},120) });
  homeIn.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!sug.hidden&&sug.firstChild){ homeIn.value=sug.firstChild.textContent; sug.hidden=true; ringLabel(); e.stopPropagation(); e.preventDefault() } });
  function ringLabel(){ var ring=root.querySelector('.ring'), r=val('q_radius'); ring.className.baseVal='ring'+(r?' k'+r:''); var home=homeIn.value.trim()||'Pick a home base'; var t={15:'about 15 miles around ',30:'about 30 miles around ',50:'50+ miles around ',multi:'several areas, from '}[r]||''; $('q_ringlbl').textContent=(r?t+home:home).slice(0,44) }
  function cityLabel(){ var r=val('q_radius'); var t={15:'about 15 mi',30:'about 30 mi',50:'50+ mi',multi:'several areas'}[r]||''; var o=$('q_areas').value.trim(); return homeIn.value.trim()+(t?' ('+t+')':'')+(r==='multi'&&o?' plus '+o:'') }
  // Phone: a real US or Canadian mobile. Ten digits (a leading 1 is fine), area code and exchange
  // that cannot start with 0 or 1, not the same digit repeated, not a run like 123-456-7890.
  function digits(v){ var d=String(v||'').replace(/\D/g,''); if(d[0]==='1') d=d.slice(1); return d }
  function phoneMsg(v){ var d=digits(v); if(!d) return 'Add your mobile number.'; if(d.length!==10) return 'A mobile number has ten digits, like (602) 555-0142.'; if(/^(\d)\1{9}$/.test(d)) return 'That number repeats one digit. Use the mobile you actually answer.'; if(sequential(d)) return 'That looks like a made-up number. Use the mobile you actually answer.'; if(!/^[2-9]\d{2}[2-9]\d{6}$/.test(d)) return 'That area code or prefix is not valid in the US or Canada.'; return '' }
  function phoneOk(v){ return phoneMsg(v)==='' }
  function sequential(d){ var up=true,down=true; for(var k=1;k<d.length;k++){ var a=+d[k-1],b=+d[k]; if(b!==(a+1)%10) up=false; if(b!==(a+9)%10) down=false } return up||down }
  function fmtPhone(v){ var d=String(v).replace(/\D/g,''); if(d[0]==='1') d=d.slice(1); d=d.slice(0,10); if(d.length<4) return d; if(d.length<7) return '('+d.slice(0,3)+') '+d.slice(3); return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6) }
  // Email: one @, a real-looking domain with a dot and a 2+ letter ending, no spaces or double dots.
  function emailOk(v){ v=String(v||'').trim(); return /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/.test(v) && !/\.\./.test(v) && !/^\.|\.@|@\./.test(v) }
  $('q_mobile').addEventListener('input',function(e){ var el=e.target, end=el.selectionEnd===el.value.length; el.value=fmtPhone(el.value); if(end) el.setSelectionRange(el.value.length,el.value.length) });
  // Check the two contact fields as soon as the person leaves them, not only on Next.
  function checkField(el,okFn,msg){ el.addEventListener('blur',function(){ var v=el.value.trim(); if(!v) return; if(okFn(v)){el.classList.remove('bad'); if(err.textContent===el.dataset.err) err.style.display='none'} else {el.classList.add('bad'); el.dataset.err=err.textContent=msg(); err.style.display='block'} }) }
  checkField($('q_mobile'),phoneOk,function(){return phoneMsg($('q_mobile').value)});
  checkField($('q_email'),emailOk,function(){return 'Add a working email address, like name@company.com.'});
  function grpOf(name){ return root.querySelector('[data-single="'+name+'"],[data-multi="'+name+'"]') }
  function valid(){
    var p=null;
    switch(steps[i].dataset.q){
      case 'years': p=need(val('q_years'),grpOf('q_years'),'Pick how long you have been in business.'); break;
      case 'trade': p=need(val('q_trade'),grpOf('q_trade'),'Pick your trade.')||need(val('q_trade')!=='other'||$('q_other').value.trim(),$('q_other'),'Tell us what kind of business it is.'); break;
      case 'city': p=need(homeIn.value.trim(),homeIn,'Add your home base, like Phoenix, AZ.')||need(val('q_radius'),grpOf('q_radius'),'Pick how far you go.')||need(val('q_radius')!=='multi'||$('q_areas').value.trim(),$('q_areas'),'List the other metros or states you serve.'); break;
      case 'rev': p=need(val('q_rev'),grpOf('q_rev'),'Pick a revenue range.'); break;
      case 'crew': p=need(val('q_crew'),grpOf('q_crew'),'Pick your crew size.'); break;
      case 'ticket': p=need(val('q_ticket'),grpOf('q_ticket'),'Pick an average job size.'); break;
      case 'pain': p=need(val('q_pain'),grpOf('q_pain'),'Pick your biggest pain point.'); break;
      case 'src': p=need(vals('q_src').length>0,grpOf('q_src'),'Pick at least one source.'); break;
      case 'site': p=need(val('q_site'),grpOf('q_site'),'Tell us about your website.'); break;
      case 'reviews': p=need(val('q_reviews'),grpOf('q_reviews'),'Pick a review count.'); break;
      case 'spend': p=need(val('q_spend'),grpOf('q_spend'),'Pick your marketing spend.'); break;
      case 'cap': p=need(val('q_cap'),grpOf('q_cap'),'Pick one.'); break;
      case 'dm': p=need(val('q_dm'),grpOf('q_dm'),'Tell us your role.'); break;
      case 'contact': p=need($('q_company').value.trim(),$('q_company'),'Add your company name.')||need($('q_name').value.trim(),$('q_name'),'Add your name.')||need(phoneOk($('q_mobile').value),$('q_mobile'),phoneMsg($('q_mobile').value))||need(emailOk($('q_email').value),$('q_email'),'Add a working email address, like name@company.com.'); break;
    }
    return p?{ok:false,el:p.el,msg:p.msg}:{ok:true};
  }
  function qualifies(){
    var rev=val('q_rev'), crew=val('q_crew'), cap=val('q_cap'), dm=val('q_dm'), trade=val('q_trade');
    var sizeOk = (rev!=='lt250' && rev!=='unsure') || crew==='5-9' || crew==='10+';
    if(rev==='unsure' && (crew==='2-4')) sizeOk=true;
    var decides = dm==='owner'||dm==='partner';
    var canTake = cap!=='no';
    var tradeOk = trade && trade!=='other';
    return sizeOk && decides && canTake && tradeOk;
  }
  function finish(){
    steps.forEach(function(s){s.classList.remove('on')}); nav.style.display='none'; bar.style.width='100%'; cnt.textContent='Done'; title.textContent='';
    var ok=qualifies(); var r=ok?$('r_yes'):$('r_review'); r.classList.add('on');
    var s=(ok?$('sum_yes'):$('sum_review'));
    var src=vals('q_src').join(', ')||'not given';
    var tradeLabel=val('q_trade')==='other'?($('q_other').value.trim()||'other'):val('q_trade');
    s.textContent='On file for the call: '+$('q_company').value+' ('+tradeLabel+'; '+cityLabel()+'), '+(val('q_years')||'?')+' years, revenue band '+(val('q_rev')||'not given')+', crew '+(val('q_crew')||'?')+', leads from '+src+', biggest pain point: '+(val('q_pain')||'?')+'. Reach '+$('q_name').value+' at '+$('q_mobile').value+' / '+$('q_email').value.trim()+'. Texting: '+($('q_consent').checked?'agreed':'no')+'.';
    root.scrollIntoView({behavior:'smooth',block:'start'});
  }
  next.addEventListener('click',function(){ var v=valid(); if(!v.ok){err.textContent=v.msg;err.style.display='block';v.el.classList.add('bad');(v.el.querySelector&&v.el.querySelector('input,select')||v.el).focus({preventScroll:false});return} if(!isLast()){move(1);show(true)} else finish() });
  back.addEventListener('click',function(){ if(move(-1))show(true) });
  try{
    var qs=new URLSearchParams(location.search), pt=qs.get('trade'), ps=qs.get('src');
    if(pt){var hit=[].filter.call(root.querySelectorAll('input[name="q_trade"]'),function(r){return r.value.toLowerCase()===pt.toLowerCase()})[0]||root.querySelector('input[name="q_trade"][value="other"]');
      hit.checked=true; hit.closest('.opt').classList.add('sel'); if(hit.value==='other'){$('c_other').hidden=false} else {hit.closest('.step').classList.add('skip')}
      var note=document.getElementById('qzstart'); if(note){note.hidden=false; note.querySelector('b').textContent=hit.value==='other'?pt:hit.value}}
    if(ps){ps.split(',').forEach(function(v){var c=root.querySelector('input[name="q_src"][value="'+v+'"]'); if(c){c.checked=true; c.closest('.opt').classList.add('sel')}});
      root.dispatchEvent(new Event('change',{bubbles:true}))}
  }catch{}
  show(false);

}
