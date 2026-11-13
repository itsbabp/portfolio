/* Page transition: a dark panel wipes up between pages.
   Load this file in the <head> of EVERY page (index.html and project.html). */
(function(){
const H=document.documentElement;
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const st=document.createElement('style');
st.textContent=`html::before{content:'LOADING FILE…  読み込み中';position:fixed;inset:0;z-index:200;background:#111;border-top:2px solid #a4133c;color:#8f8a80;font:11px/1 'IBM Plex Mono',monospace;letter-spacing:.14em;display:flex;align-items:flex-end;padding:0 clamp(20px,4vw,72px) 28px;transform:translateY(100%);transition:transform .55s cubic-bezier(.77,0,.18,1);pointer-events:none}
html.pt-go::before{transform:none}
html.pt-in::before{transform:none;transition:none}
html.pt-rev::before{transform:translateY(-100%)}
html.pt-rs::before{transform:translateY(100%);transition:none}`;
document.head.appendChild(st);
try{if(sessionStorage.getItem('pt'))H.classList.add('pt-in')}catch(e){}
function leave(href){
  try{sessionStorage.setItem('pt','1')}catch(e){}
  H.classList.remove('pt-rev');H.classList.add('pt-rs');H.offsetHeight;H.classList.remove('pt-rs');H.classList.add('pt-go');
  setTimeout(()=>{location.href=href},560)}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||a.target==='_blank'||a.hasAttribute('download')||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button)return;
  const u=new URL(a.href,location.href),norm=p=>p.replace(/index\.html$/,'');
  if(u.origin!==location.origin||(norm(u.pathname)===norm(location.pathname)&&u.search===location.search))return;
  e.preventDefault();leave(a.href)});
/* arrive: the panel keeps moving up and reveals the new page */
let done=0;
function reveal(){if(done||!H.classList.contains('pt-in'))return;done=1;H.classList.remove('pt-in');H.classList.add('pt-rev');try{sessionStorage.removeItem('pt')}catch(e){}}
document.addEventListener('DOMContentLoaded',()=>setTimeout(reveal,120));
setTimeout(reveal,2500);
addEventListener('pageshow',e=>{if(e.persisted)H.classList.remove('pt-go','pt-rev','pt-in')});
})();
