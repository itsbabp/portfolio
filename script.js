/* ============ SITE ============ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],pad=(n,l=2)=>String(n).padStart(l,'0');
function rnd(seed){let a=[...seed].reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619),2166136261)>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
/* traditional barcode, a different pattern for every seed */
function bar(seed){const r=rnd(seed),U=2,W=200;let x=0,s='';
 const run=(n,on)=>{if(on)s+=`<rect x="${x}" width="${n*U}" height="24"/>`;x+=n*U};
 [1,1,1,1,1].forEach((n,i)=>run(n,i%2===0));
 let on=false;while(x<W-12){run([1,1,2,2,3,4][r()*6|0],on);on=!on}
 if(!on)run(1,false);[1,1,1,1,1].forEach((n,i)=>run(n,i%2===0));
 const id=(r()*65535|0).toString(16).toUpperCase().padStart(4,'0'),k=['▮▮▯▯','▮▯▮▯','▮▮▮▯','▯▮▮▯'][r()*4|0];
 return `<div class="bcw"><div class="bc"><svg viewBox="0 0 ${W} 24" preserveAspectRatio="none" shape-rendering="crispEdges" fill="currentColor">${s}</svg></div><div class="bl"><span>ID ${id}-${pad(r()*9999|0,4)}</span><span><i>${k}</i></span></div></div>`}
const img=(s,t)=>s?`<img src="${s}" alt="${t}" loading="lazy">`:'add image';
$('#lg').innerHTML=ME.logo+'<i>_</i>';
$('#nv').innerHTML=[['about','紹介'],['work','作品'],['gallery','写真'],['blog','日記']].map(([a,j])=>`<a href="#${a}" data-s="${a}">${a}<small>${j}</small></a>`).join('')+`<a href="${CLIENTS}" target="_blank">clients ↗<small>顧客</small></a>`;
const half=ME.words.map(w=>w+' // ').join('').repeat(6);
function head(t){let hi=false,o=[];t.split('*').forEach((seg,k)=>{if(k)hi=!hi;seg.split(/\s+/).filter(Boolean).forEach(w=>o.push([w,hi]))});
 return o.map(([w,h],i)=>`<span class="w"><i${h?' class="hl"':''} style="--d:${i*.05}">${w}</i></span>`).join(' ')}
$('#app').innerHTML=`
<section id="top" class="hero">
 <div><h1>${head(ME.headline||`${ME.tag} *${ME.tag2}*`)}</h1>
  <div class="rv" style="--d:.5s">${ME.bio.map(b=>`<p>${b}</p>`).join('')}<div class="lk">${ME.links.map(([n,u])=>`<a href="${u}" target="_blank">${n}</a>`).join('')}</div></div></div>
 <div class="cd rv" style="--d:.3s"><div class="idh"><span>DOSSIER // 身分証</span><span>No. 0001</span></div>
  <div class="ph" style="--r:4/5">${ME.portrait?`<img src="${ME.portrait}" alt="${ME.name}">`:'add portrait<br>(set portrait in content.js)'}</div>
  <div class="idc"><dl><dt>NAME</dt><dd>${ME.name}</dd><dt>ROLE</dt><dd>${ME.role}</dd><dt>BASE</dt><dd>${ME.base}</dd><dt>STATUS</dt><dd><span class="st">ACTIVE</span></dd></dl></div>${bar('hero')}</div>
</section>
<div class="mq"><div>${half}${half}</div></div>
<section id="about"><div class="sh rv"><b>01</b><h2>About</h2><span>紹介</span></div>
 <div class="ab"><p class="stm rv">${ME.statement}</p><div class="sheet rv" style="--d:.15s">${ABOUT.map(([k,v,d])=>`<div><b>${k}</b><span>${v}${d?`<small style="display:block;color:var(--mut);font-size:12px;margin-top:4px">${d}</small>`:''}</span></div>`).join('')}</div></div></section>
<section id="work"><div class="sh rv"><b>02</b><h2>Work</h2><span>作品</span><em>${PROJECTS.length} files</em></div>
 <div class="gr">${PROJECTS.map((p,i)=>`<article class="cd cf rv" style="--d:${(i%3)*.12}s"><div class="top"><span>CASE FILE ${pad(i+1,4)}</span><span class="st">DECLASSIFIED</span></div><div class="ph">${img(p.img,p.title)}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="tg">${p.tags.map(t=>`<span>${t}</span>`).join('')}<span style="color:var(--mut)">${p.tag}</span></div>${p.link?`<a class="o" href="${p.link}" target="_blank">[ open file ]</a>`:''}${bar('case'+i)}</article>`).join('')}</div></section>
<section id="gallery"><div class="sh rv"><b>03</b><h2>Gallery</h2><span>写真</span><em>${PHOTOS.length} frames</em></div>
 <div class="ms">${PHOTOS.map((p,i)=>`<figure class="fr rv" style="--d:${(i%4)*.1}s" onclick="lb(${i})">${p.src?img(p.src,p.title):`<div class="ph" style="--r:${p.ratio||'4/5'}">add photo</div>`}<div class="ov"><span>▸ ${pad(i+1)}A</span><span>${p.title}<small>${p.exif||''}</small></span></div></figure>`).join('')}</div></section>
<section id="blog"><div class="sh rv"><b>04</b><h2>Blog</h2><span>日記</span></div>
 <div class="cd rv" style="max-width:40rem"><div class="cf"><div class="top"><span>ENTRY 0001</span><span class="st">PENDING</span></div></div><p>SUBJECT: <span class="rd">not ready yet</span></p><p>CONTENTS: <span class="rd">classified text goes here ok</span></p><p style="color:var(--mut);margin-top:10px">coming soon. clearance not yet granted.</p></div></section>
<section id="contact"><div class="sh rv"><b>05</b><h2>Contact</h2><span>連絡</span></div>
 <a class="big rv" href="mailto:${(ME.links.find(l=>l[0]==='email')||['','#'])[1].replace('mailto:','')}">Say hello →</a><a class="big rv" href="${CLIENTS}" target="_blank" style="--d:.1s">Client galleries ↗</a>
 <footer><span>FILE 0001 // ${ME.name}</span><span>©${new Date().getFullYear()} · 閉</span></footer></section>`;

/* reveal on scroll + current section */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
const SEC=['top','about','work','gallery','blog','contact'];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;$('#sec').textContent=pad(SEC.indexOf(id))+' / '+(id==='top'?'INDEX':id.toUpperCase());$$('#nv a[data-s]').forEach(a=>a.classList.toggle('on',a.dataset.s===id))}}),{rootMargin:'-45% 0px -50% 0px'});
$$('section').forEach(s=>so.observe(s));

/* status bar */
function sc(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0;$('#pg').style.width=p*100+'%';$('#sp').textContent=pad(Math.round(p*100),3)}
addEventListener('scroll',sc,{passive:true});sc();
addEventListener('pointermove',e=>{$('#xy').textContent=`X ${pad(e.clientX|0,4)} Y ${pad(e.clientY|0,4)}`});
const tk=()=>{$('#ck').textContent=new Date().toLocaleTimeString('en-GB',{timeZoneName:'short'})};tk();setInterval(tk,1000);

/* lightbox */
let cur=0;
function lb(i){const p=PHOTOS[i];if(!p.src)return;cur=i;$('#lbi').src=p.src;$('#lbc').textContent=`${pad(i+1)}/${pad(PHOTOS.length)} · ${p.title}${p.exif?' · '+p.exif:''}`;document.body.style.overflow='hidden';$('#lb').classList.add('on')}
function cl(){document.body.style.overflow='';$('#lb').classList.remove('on')}
function step(d){let n=cur;for(let k=0;k<PHOTOS.length;k++){n=(n+d+PHOTOS.length)%PHOTOS.length;if(PHOTOS[n].src){lb(n);return}}}
$('#lb').addEventListener('click',e=>{if(!e.target.closest('button')&&e.target.id!=='lbi'&&!e.target.closest('.bar'))cl()});
addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key==='Escape')cl();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});

/* loader (counts up once per visit) */
function go(){$('#ld').classList.add('off');document.body.classList.add('go')}
let seen=false;try{seen=sessionStorage.getItem('ld')}catch(e){}
if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches){$('#ld').remove();document.body.classList.add('go')}
else{let n=0;const t=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*9));$('#cn').textContent=pad(n,3);$('#lt').textContent=n<60?'hold tight':'almost ready';if(n>=100){clearInterval(t);try{sessionStorage.setItem('ld','1')}catch(e){}setTimeout(go,250)}},45)}
