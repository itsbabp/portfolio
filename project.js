/* project page template: reads the project whose slug matches this folder name (e.g. japan-2025/) */
let slug=new URLSearchParams(location.search).get('p');
if(!slug)slug=location.pathname.split('/').filter(x=>x&&x!=='index.html').pop();
let idx=PROJECTS.findIndex(p=>p.slug===slug);if(idx<0)idx=0;
const P=PROJECTS[idx],U=s=>!s||/^(https?:|\/|data:)/.test(s)?s:BASE+s;
/* landscape shapes for the empty slots: all close in size, a little variety */
const RATIOS=['3/2','4/3','3/2','16/10','5/3','4/3','3/2','7/5','16/10','3/2'];
let PH=[];
document.title=`${P.title.replace(/\*/g,'')} · ${ME.logo}`;

/* photos from a folder: asks GitHub which files are in P.folder, then sorts them by file name.
   Name files with the date first (e.g. 2025-04-12_IMG_0042.jpg) and they come out in date order. */
async function folderPhotos(){
  if(!P.folder||!ME.repo)return null;
  const key='ph:'+P.folder,read=()=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch(e){return null}};
  let c=read(),names=c&&Date.now()-c.t<6e5?c.l:null;
  if(!names){
    try{const r=await fetch(`https://api.github.com/repos/${ME.repo}/contents/${P.folder.replace(/\/$/,'')}`);if(!r.ok)throw 0;
      names=(await r.json()).filter(f=>f.type==='file'&&/\.(jpe?g|png|webp|avif)$/i.test(f.name)).map(f=>f.name);
      try{localStorage.setItem(key,JSON.stringify({t:Date.now(),l:names}))}catch(e){}
    }catch(e){names=c?c.l:null}}
  if(!names||!names.length)return null;
  names.sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));if(P.reverse)names.reverse();
  return names.map(n=>({src:P.folder.replace(/\/$/,'')+'/'+n,title:(P.captions||{})[n]||'',exif:''}));
}
const fallback=()=>P.photos&&P.photos.length?P.photos:Array.from({length:20},()=>({src:'',title:'Photo title'}));
const meta=[['date',P.tag],['place',P.location],['tags',(P.tags||[]).join(', ')]].filter(m=>m[1]);
$('#app').innerHTML=`
<section class="pj"><a class="back m" data-back href="${BASE}index.html">← back</a>
 <h1>${head(P.title)}</h1><p class="lede rv" style="--d:.5s">${P.desc}</p>
 <div class="meta m rv" style="--d:.65s">${meta.map(([k,v])=>`<span>${k} · ${v}</span>`).join('')}</div></section>
<section class="pg"><div class="ms" id="gl"></div></section>
<footer class="m"><span>© ${new Date().getFullYear()} ${ME.name}</span><span>photography</span></footer>`;
function fill(list){
  PH=list;
  $('#gl').innerHTML=PH.map((p,i)=>`<figure class="fr rv big" style="--d:${(i%3)*.1}s" onclick="lbOpen(PH,${i},U)">${p.src?`<img src="${U(p.src)}" alt="${p.title||''}" loading="lazy">`:`<div class="ph m" style="--r:${p.ratio||RATIOS[i%RATIOS.length]}">add photo</div>`}<div class="cp"><span>${p.title||''}</span><small>${p.exif||''}</small></div></figure>`).join('');
  const n=PH.filter(p=>p.src).length;if(n)$('.meta').insertAdjacentHTML('beforeend',`<span>frames · ${n}</span>`);
  if(document.body.classList.contains('go'))$$('.rv:not(.in)').forEach(el=>io.observe(el));
}
folderPhotos().then(l=>fill(l||fallback()),()=>fill(fallback()));
