/* project page template: reads the project whose slug matches this folder name (e.g. japan-2025/) */
let slug=new URLSearchParams(location.search).get('p');
if(!slug)slug=location.pathname.split('/').filter(x=>x&&x!=='index.html').pop();
let idx=PROJECTS.findIndex(p=>p.slug===slug);if(idx<0)idx=0;
const P=PROJECTS[idx],U=s=>!s||/^(https?:|\/|data:)/.test(s)?s:BASE+s;
/* landscape shapes for the empty slots: all close in size, a little variety */
const RATIOS=['3/2','4/3','3/2','16/10','5/3','4/3','3/2','7/5','16/10','3/2'];
const PH=P.photos&&P.photos.length?P.photos:Array.from({length:20},()=>({src:'',title:'Photo title'}));
document.title=`${P.title.replace(/\*/g,'')} · ${ME.logo}`;
const meta=[['date',P.tag],['place',P.location],['frames',PH.filter(p=>p.src).length||''],['tags',(P.tags||[]).join(', ')]].filter(m=>m[1]);
$('#app').innerHTML=`
<section class="pj"><a class="back m" href="${BASE}index.html#work">← back</a>
 <h1>${head(P.title)}</h1><p class="lede rv" style="--d:.5s">${P.desc}</p>
 <div class="meta m rv" style="--d:.65s">${meta.map(([k,v])=>`<span>${k} · ${v}</span>`).join('')}</div></section>
<section class="pg"><div class="ms">${PH.map((p,i)=>`<figure class="fr rv big" style="--d:${(i%3)*.1}s" onclick="lbOpen(PH,${i},U)">${p.src?`<img src="${U(p.src)}" alt="${p.title||''}" loading="lazy">`:`<div class="ph m" style="--r:${p.ratio||RATIOS[i%RATIOS.length]}">add photo</div>`}<div class="cp"><span>${p.title||''}</span><small>${p.exif||''}</small></div></figure>`).join('')}</div></section>
<footer class="m"><span>© ${new Date().getFullYear()} ${ME.name}</span><span>photography</span></footer>`;
