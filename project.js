/* ============ PROJECT PAGE TEMPLATE ============
   Opens as project.html?p=SLUG and reads the matching project from content.js */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],pad=(n,l=2)=>String(n).padStart(l,'0');
function rnd(seed){let a=[...seed].reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619),2166136261)>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function bar(seed){const r=rnd(seed),U=2,W=200;let x=0,s='';
 const run=(n,on)=>{if(on)s+=`<rect x="${x}" width="${n*U}" height="24"/>`;x+=n*U};
 [1,1,1,1,1].forEach((n,i)=>run(n,i%2===0));
 let on=false;while(x<W-12){run([1,1,2,2,3,4][r()*6|0],on);on=!on}
 if(!on)run(1,false);[1,1,1,1,1].forEach((n,i)=>run(n,i%2===0));
 const id=(r()*65535|0).toString(16).toUpperCase().padStart(4,'0'),k=['▮▮▯▯','▮▯▮▯','▮▮▮▯','▯▮▮▯'][r()*4|0];
 return `<div class="bcw"><div class="bc"><svg viewBox="0 0 ${W} 24" preserveAspectRatio="none" shape-rendering="crispEdges" fill="currentColor">${s}</svg></div><div class="bl"><span>ID ${id}-${pad(r()*9999|0,4)}</span><span><i>${k}</i></span></div></div>`}
/* words between *stars* turn crimson */
function head(t){let hi=false,o=[];t.split('*').forEach((seg,k)=>{if(k)hi=!hi;seg.split(/\s+/).filter(Boolean).forEach(w=>o.push([w,hi]))});
 return o.map(([w,h],i)=>`<span class="w"><i${h?' class="hl"':''} style="--d:${i*.05}">${w}</i></span>`).join(' ')}

let idx=PROJECTS.findIndex(p=>p.slug===new URLSearchParams(location.search).get('p'));if(idx<0)idx=0;
const P=PROJECTS[idx],N=PROJECTS[(idx+1)%PROJECTS.length],PH=P.photos||[];
document.title=`${P.title.replace(/\*/g,'')} · ${ME.name}`;
$('#lg').innerHTML=ME.logo+'<i>_</i>';
$('#nv').innerHTML=[['about','紹介'],['work','作品'],['gallery','写真'],['blog','日記']].map(([a,j])=>`<a href="index.html#${a}">${a}<small>${j}</small></a>`).join('')+`<a href="${CLIENTS}" target="_blank">clients ↗<small>顧客</small></a>`;
$('#sec').textContent='CASE FILE '+pad(idx+1,4);
const meta=[['DATE',P.tag],['PLACE',P.location||'—'],['FRAMES',PH.length],['TAGS',(P.tags||[]).map(t=>'#'+t).join(' ')]];
$('#app').innerHTML=`
<section class="hero pj">
 <div><a class="back" href="index.html#work">← back to work</a><h1>${head(P.title)}</h1><p class="lede rv" style="--d:.5s">${P.desc}</p></div>
 <div class="cd rv" style="--d:.3s"><div class="idh"><span>CASE FILE ${pad(idx+1,4)}</span><span class="st">DECLASSIFIED</span></div>
  <div class="ph cv">${P.img?`<img src="${P.img}" alt="${P.title.replace(/\*/g,'')}">`:'add cover'}</div>
  <dl>${meta.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>${bar('case'+idx)}</div>
</section>
<section class="story"><div class="sh rv"><b>01</b><h2>Story</h2><span>物語</span></div>
 ${(P.story||[P.desc]).map((t,i)=>`<p class="rv" style="--d:${i*.1}s">${t}</p>`).join('')}</section>
<section><div class="sh rv"><b>02</b><h2>Frames</h2><span>写真</span><em>${PH.length} frames</em></div>
 <div class="ms">${PH.map((p,i)=>`<figure class="fr rv" style="--d:${(i%4)*.1}s" onclick="lb(${i})">${p.src?`<img src="${p.src}" alt="${p.title||''}" loading="lazy">`:`<div class="ph" style="--r:${p.ratio||'4/5'}">add photo</div>`}<div class="ov"><span>▸ ${pad(i+1)}A</span><span>${p.title||''}<small>${p.exif||''}</small></span></div></figure>`).join('')}</div></section>
<section class="nx"><div class="sh rv"><b>03</b><h2>Next</h2><span>次</span></div>
 ${PROJECTS.length>1&&N.slug?`<a class="big rv" href="project.html?p=${N.slug}">${N.title.replace(/\*/g,'')} →</a>`:''}<a class="big rv" href="index.html#work" style="--d:.1s">← All work</a>
 <footer><span>FILE 0001 // ${ME.name}</span><span>©${new Date().getFullYear()} · 閉</span></footer></section>`;
document.body.classList.add('go');

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
/* status bar */
function sc(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0;$('#pg').style.width=p*100+'%';$('#sp').textContent=pad(Math.round(p*100),3)}
addEventListener('scroll',sc,{passive:true});sc();
addEventListener('pointermove',e=>{$('#xy').textContent=`X ${pad(e.clientX|0,4)} Y ${pad(e.clientY|0,4)}`});
const tk=()=>{$('#ck').textContent=new Date().toLocaleTimeString('en-GB',{timeZoneName:'short'})};tk();setInterval(tk,1000);
/* lightbox */
let cur=0;
function lb(i){const p=PH[i];if(!p.src)return;cur=i;$('#lbi').src=p.src;$('#lbc').textContent=`${pad(i+1)}/${pad(PH.length)} · ${p.title||''}${p.exif?' · '+p.exif:''}`;document.body.style.overflow='hidden';$('#lb').classList.add('on')}
function cl(){document.body.style.overflow='';$('#lb').classList.remove('on')}
function step(d){let n=cur;for(let k=0;k<PH.length;k++){n=(n+d+PH.length)%PH.length;if(PH[n].src){lb(n);return}}}
$('#lb').addEventListener('click',e=>{if(!e.target.closest('button')&&e.target.id!=='lbi'&&!e.target.closest('.bar'))cl()});
addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key==='Escape')cl();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
