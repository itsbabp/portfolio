/* shared by every page: header, reveal animations, page transitions, lightbox, loader */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],pad=(n,l=2)=>String(n).padStart(l,'0');
const BASE=new URL('.',document.currentScript.src).href;   /* the site's root, wherever it is hosted */
const HOME=document.body.dataset.page==='home',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* optional colours from content.js */
if(ME.highlight)document.documentElement.style.setProperty('--hl',ME.highlight);
if(ME.accent)document.documentElement.style.setProperty('--red',ME.accent);
const L=h=>(HOME?'':BASE+'index.html')+h;
const tg=u=>/^mailto/.test(u)?'':' target="_blank" rel="noopener"';
const hl=t=>t.split('*').map((s,k)=>k%2?`<span class="hl">${s}</span>`:s).join('');
/* words between *stars* turn crimson; each word fades in from blur */
function head(t){let on=false,o=[];t.split('*').forEach((seg,k)=>{if(k)on=!on;seg.split(/\s+/).filter(Boolean).forEach(w=>o.push([w,on]))});
 return o.map(([w,h],i)=>`<span class="w${h?' hl':''}" style="--i:${i}">${w}</span>`).join(' ')}
$('#hd').innerHTML=`<a class="logo" href="${L('#top')}">${ME.logo}</a><nav>${['about','work','gallery','contact'].map(a=>`<a href="${L('#'+a)}" data-s="${a}">${a}</a>`).join('')}<a href="${CLIENTS}"${tg(CLIENTS)}>clients</a></nav>`;

/* reveal on scroll (starts once the intro is done) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
function intro(){document.body.classList.add('go');$$('.rv').forEach(el=>io.observe(el))}

/* page transition: the page softly blurs out, the next one blurs in */
document.addEventListener('click',e=>{
  /* back button: go back to where you were (no #work added to the address) */
  const bk=e.target.closest('[data-back]');
  if(bk&&history.length>1&&document.referrer&&new URL(document.referrer).origin===location.origin){
    e.preventDefault();if(reduce){history.back();return}
    try{sessionStorage.setItem('pt','1')}catch(x){}document.documentElement.classList.add('leaving');setTimeout(()=>history.back(),220);return}
  const a=e.target.closest('a[href]');
  if(reduce||!a||a.target==='_blank'||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button)return;
  const u=new URL(a.href,location.href),n=p=>p.replace(/index\.html$/,'');
  if(u.origin!==location.origin||(n(u.pathname)===n(location.pathname)&&u.search===location.search))return;
  e.preventDefault();try{sessionStorage.setItem('pt','1')}catch(x){}
  document.documentElement.classList.add('leaving');setTimeout(()=>{location.href=a.href},220)});
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('leaving')});
try{sessionStorage.removeItem('pt')}catch(e){}

/* lightbox: lbOpen(listOfPhotos, index, optionalPathFixer) */
const LB={items:[],cur:0,u:s=>s};
{const d=document.createElement('div');d.id='lb';
 d.innerHTML='<div class="stg"><img id="lbi" alt=""></div><div class="bar"><span class="m" id="lbc"></span><span><button data-a="p">← prev</button> <button data-a="n">next →</button> <button data-a="c">close ✕</button></span></div>';
 document.body.appendChild(d);
 d.addEventListener('click',e=>{const b=e.target.closest('button');if(b){if(b.dataset.a==='p')lbStep(-1);if(b.dataset.a==='n')lbStep(1);if(b.dataset.a==='c')lbClose();return}
  if(e.target.id!=='lbi'&&!e.target.closest('.bar'))lbClose()})}
function lbOpen(items,i,u){LB.items=items;LB.u=u||(s=>s);const p=items[i];if(!p||!p.src)return;LB.cur=i;
  $('#lbi').src=LB.u(p.src);$('#lbc').textContent=`${pad(i+1)}/${pad(items.length)} · ${p.title||''}${p.exif?' · '+p.exif:''}`;
  document.body.style.overflow='hidden';$('#lb').classList.add('on')}
function lbClose(){document.body.style.overflow='';$('#lb').classList.remove('on')}
function lbStep(d){const n=LB.items.length;let i=LB.cur;for(let k=0;k<n;k++){i=(i+d+n)%n;if(LB.items[i].src){lbOpen(LB.items,i,LB.u);return}}}
addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key==='Escape')lbClose();if(e.key==='ArrowRight')lbStep(1);if(e.key==='ArrowLeft')lbStep(-1)});

/* loading screen (home page, first visit only): the name fades in from blur while a thin line draws,
   then the name glides up into the header corner as the screen fades away */
const ld=$('#ld');let seen=false;try{seen=sessionStorage.getItem('ld')}catch(e){}
if(!ld||seen||reduce){if(ld)ld.remove();setTimeout(intro,60)}
else{
  const lt=$('#lt'),bar=$('#lbar'),num=$('#lnum'),t0=performance.now(),D=ME.loadMs||3000;lt.textContent=ME.logo;
  function glide(){
    const a=lt.getBoundingClientRect(),b=$('.logo').getBoundingClientRect(),H=document.documentElement;
    H.classList.add('morph');ld.classList.add('off');
    lt.style.transformOrigin='0 0';lt.style.transition='transform .85s cubic-bezier(.65,0,.2,1)';
    lt.style.transform=`translate(${b.left-a.left}px,${b.top-a.top}px) scale(${b.width/a.width})`;
    setTimeout(intro,380);
    setTimeout(()=>{H.classList.remove('morph');ld.remove()},900);
    try{sessionStorage.setItem('ld','1')}catch(x){}}
  (function tick(t){const p=Math.min(1,(t-t0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;bar.style.transform=`scaleX(${e})`;num.textContent=pad(Math.round(e*100),3);
    if(p<1)requestAnimationFrame(tick);else setTimeout(glide,120)})(t0);
}
