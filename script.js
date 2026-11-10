const $=i=>document.getElementById(i);
$('pj').innerHTML=PROJECTS.map(p=>`<article class="card"><div class="img">${p.img?`<img src="${p.img}" alt="${p.title}">`:'add image'}<i>${p.tag}</i></div><h3>${p.link?`<a href="${p.link}" target="_blank">${p.title}</a>`:p.title}</h3><p>${p.desc}</p></article>`).join('');
$('gl').innerHTML=PHOTOS.map((p,i)=>`<figure class="ph" onclick="lb(${i})">${p.src?`<img src="${p.src}" alt="${p.title}" loading="lazy">`:'add photo'}<span>${p.title}</span></figure>`).join('');
function lb(i){const p=PHOTOS[i];if(!p.src)return;$('lbi').src=p.src;$('lbc').textContent=p.title;$('lb').classList.add('on')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('lb').classList.remove('on')});

const T=['jungle','projects','gallery','blog'];
function go(t){T.forEach(k=>{$('v-'+k).classList.toggle('on',k===t);$('n-'+k).classList.toggle('on',k===t)});document.body.classList.toggle('home',t==='jungle')}
if(T.includes(location.hash.slice(1)))go(location.hash.slice(1));

/* ============ JUNGLE ============ */
const C=$('c'),x=C.getContext('2d'),R=Math.random,S=Math.sin,Co=Math.cos,rr=(a,b)=>a+R()*(b-a);
let W,H,dpr=Math.min(devicePixelRatio||1,2),dark=true,sky,L=[],px=0,tick=0;
const M={x:-999,y:-999};
const PD={sky:['#04070a','#07150f','#0b2016'],tree:d=>`rgba(${3+d*3},${12+d*10},${10+d*5},${.55+d*.2})`,sun:['#e6ecf0','#b9c3cc'],mist:'rgba(190,210,200,.06)',hud:'#cfd8c8'};
const PL={sky:['#9ad8c8','#7fc48a','#4f9a62'],tree:d=>`rgba(${30-d*8},${95-d*15},${55-d*10},${.45+d*.2})`,sun:['#fffbe6','#f0e2a8'],mist:'rgba(255,255,255,.14)',hud:'#0a7d6e'};
let P=PD;
function mk(w,h){const c=document.createElement('canvas');c.width=w*dpr;c.height=h*dpr;const g=c.getContext('2d');g.scale(dpr,dpr);return[c,g]}
function frond(g,fx,fy,len,rot,n=3){for(let k=-n;k<=n;k++){g.save();g.translate(fx,fy);g.rotate(rot+k*.34);g.beginPath();g.ellipse(len/2,0,len/2,len*.065,0,0,7);g.fill();g.restore()}}
function layer(d){
  const w=W+160,[c,g]=mk(w,H),s=.6+d*.5,fl=dark?['#c9a0b8','#a8c4b0','#d9a066']:['#e0307a','#f2a900','#ff6a2a'];
  g.fillStyle=g.strokeStyle=P.tree(d);
  for(let i=0;i<4+d*2;i++)g.fillRect(R()*w,0,(16+R()*22)*s,H);
  for(let i=0;i<10+d*4;i++)frond(g,R()*w,R()*H*(.16+d*.05),(50+R()*70)*s,Math.PI/2+rr(-.8,.8));
  g.lineWidth=2*s;
  for(let i=0;i<8+d*3;i++){
    const vx=R()*w,l=H*(.15+R()*.35),ex=vx+rr(-20,20);
    g.beginPath();g.moveTo(vx,0);g.bezierCurveTo(vx+rr(-30,30),l*.4,vx+rr(-40,40),l*.7,ex,l);g.stroke();
    if(d>0&&R()<.55){g.save();g.fillStyle=g.shadowColor=fl[i%3];g.shadowBlur=0;g.beginPath();g.arc(ex,l,3+d,0,7);g.fill();g.restore()}
  }
  if(d===2)for(let i=0;i<16;i++)frond(g,R()*w,H+4,rr(90,170),-Math.PI/2);
  return c;
}
function build(){
  const[c,g]=mk(W,H),gr=g.createLinearGradient(0,0,0,H);
  P.sky.forEach((s,i)=>gr.addColorStop([0,.6,1][i],s));
  g.fillStyle=gr;g.fillRect(0,0,W,H);
  const sx=W*.72,sy=H*.28,r=Math.min(W,H)*.1,hg=g.createRadialGradient(sx,sy,r*.8,sx,sy,r*3.2);
  hg.addColorStop(0,dark?'rgba(210,225,235,.16)':'rgba(255,250,220,.4)');hg.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=hg;g.fillRect(sx-r*3.2,sy-r*3.2,r*6.4,r*6.4);
  g.fillStyle=P.sun[0];g.beginPath();g.arc(sx,sy,r,0,7);g.fill();
  g.fillStyle=P.sun[1];g.globalAlpha=.55;[[-.3,-.25,.22],[.3,.1,.3],[-.1,.45,.16],[.45,-.4,.12],[-.5,.2,.12]].forEach(([a,b,c])=>{g.beginPath();g.arc(sx+a*r,sy+b*r,c*r,0,7);g.fill()});g.globalAlpha=1;
  sky=c;L=[0,1,2].map(layer);
}
function resize(){old=null;fade=1;W=innerWidth;H=innerHeight;C.width=W*dpr;C.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);build()}
let old=null,fade=1;
function toggleTheme(){old={sky,L};fade=0;dark=!dark;P=dark?PD:PL;document.body.classList.toggle('day',!dark);$('theme').textContent=dark?'day':'night';build()}
addEventListener('resize',()=>{clearTimeout(resize.t);resize.t=setTimeout(resize,150)});
addEventListener('pointermove',e=>{M.x=e.clientX;M.y=e.clientY;$('sx').textContent=(e.clientX/10|0).toString().padStart(2,'0');$('sy').textContent=(e.clientY/10|0).toString().padStart(2,'0')});

/* helpers */
const lk=(o,d=1,oy=0)=>Math.atan2(M.y-(o.y+oy),(M.x-o.x)*d);
function eye(a,b,r,l,col='#f4f4f0'){x.beginPath();x.arc(a,b,r,0,7);x.fillStyle=col;x.fill();x.beginPath();x.arc(a+Co(l)*r*.35,b+S(l)*r*.35,r*.52,0,7);x.fillStyle='#050505';x.fill();x.beginPath();x.arc(a-r*.2,b-r*.25,r*.2,0,7);x.fillStyle='#fff';x.fill()}
const GY=()=>H-24;
function flee(o,d,sp){const dx=o.x-M.x,dy=o.y-M.y;return Math.hypot(dx,dy)<d?Math.atan2(dy,dx):null}

/* --- Scarlet macaw --- */
class Macaw{name='SCARLET MACAW';oy=0;constructor(){this.s=rr(16,21);this.t=R()*9;this.go()}
go(){this.dir=R()<.5?1:-1;this.x=this.dir>0?-90:W+90;this.y0=rr(H*.1,H*.5);this.sp=rr(1.1,1.8);this.y=this.y0}
up(){this.t+=.14;this.x+=this.dir*this.sp;this.y=this.y0+S(this.t*.4)*16;if(this.x<-110||this.x>W+110)this.go()}
dr(){const s=this.s,f=S(this.t*1.6);x.save();x.translate(this.x,this.y);x.scale(this.dir,1);x.lineCap='round';x.lineWidth=4;
 [['#e8202a',0],['#1e6bff',7]].forEach(([c,o])=>{x.strokeStyle=c;x.beginPath();x.moveTo(-s*.6,0);x.quadraticCurveTo(-s*1.5,s*.1+o*.2,-s*2.5,s*.4+o+f*3);x.stroke()});
 x.fillStyle='#e8202a';x.beginPath();x.ellipse(0,0,s*.9,s*.42,-.1,0,7);x.fill();
 const wt=-f*s*1.5-s*.2,wt2=-f*s+s*.1;
 x.beginPath();x.moveTo(s*.3,-s*.1);x.lineTo(-s*.2,wt);x.lineTo(-s,wt2);x.lineTo(-s*.5,s*.25);x.closePath();x.fillStyle='#c9121c';x.fill();
 x.beginPath();x.moveTo(-s*.2,wt);x.lineTo(-s,wt2);x.lineTo(-s*.6,(wt+wt2)/2+s*.35);x.closePath();x.fillStyle='#1e6bff';x.fill();
 x.beginPath();x.arc(s*.8,-s*.25,s*.34,0,7);x.fillStyle='#e8202a';x.fill();
 x.beginPath();x.ellipse(s*.9,-s*.22,s*.2,s*.17,0,0,7);x.fillStyle='#f2efe6';x.fill();
 eye(s*.92,-s*.27,s*.1,lk(this,this.dir));
 x.beginPath();x.moveTo(s*1.02,-s*.42);x.quadraticCurveTo(s*1.5,-s*.38,s*1.35,s*.02);x.quadraticCurveTo(s*1.2,-s*.12,s*1.05,-s*.05);x.closePath();x.fillStyle='#efe6cf';x.fill();
 x.beginPath();x.moveTo(s*1.2,-s*.12);x.quadraticCurveTo(s*1.4,-s*.1,s*1.35,s*.02);x.lineTo(s*1.1,-s*.02);x.fillStyle='#2a2522';x.fill();
 x.restore()}}

/* --- Bat --- */
class Bat{name='FRUIT BAT';oy=0;constructor(){this.x=R()*W;this.y=R()*H*.5;this.a=R()*6;this.s=rr(8,12);this.t=R()*9}
up(){this.t+=.42;this.a+=(R()-.5)*.22;let v=1.5;const f=flee(this,120);if(f!==null){this.a=f;v=2.6}
 if(this.y>H*.55)this.a=-1.1;if(this.y<20)this.a=1.1;
 this.x+=Co(this.a)*v;this.y+=S(this.a)*v*.7;if(this.x<-30)this.x=W+30;if(this.x>W+30)this.x=-30}
dr(){const s=this.s,f=S(this.t);x.save();x.translate(this.x,this.y);
 [-1,1].forEach(g=>{x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(g*s*.9,-f*s*.9-s*.3,g*s*1.8,-f*s*.6+s*.2);x.lineTo(g*s*1.2,s*.2);x.lineTo(g*s*.9,s*.55);x.lineTo(g*s*.5,s*.3);x.closePath();x.fillStyle='#0a0e13';x.fill();x.strokeStyle='rgba(120,130,150,.5)';x.lineWidth=1;x.stroke()});
 x.fillStyle='#0a0e13';x.beginPath();x.ellipse(0,0,s*.3,s*.5,0,0,7);x.fill();x.beginPath();x.arc(0,-s*.5,s*.28,0,7);x.fill();
 x.beginPath();x.moveTo(-s*.25,-s*.65);x.lineTo(-s*.3,-s*1.0);x.lineTo(-s*.05,-s*.75);x.moveTo(s*.25,-s*.65);x.lineTo(s*.3,-s*1.0);x.lineTo(s*.05,-s*.75);x.fill();
 x.fillStyle='#e8d070';
 x.beginPath();x.arc(-s*.1,-s*.52,1.5,0,7);x.arc(s*.1,-s*.52,1.5,0,7);x.fill();x.restore()}}

/* --- Morpho butterfly --- */
class Fly{name='MORPHO BUTTERFLY';oy=0;constructor(){this.x=R()*W;this.y=rr(H*.3,H*.85);this.a=R()*6;this.t=R()*9;this.s=rr(7,11);[this.c,this.c2]=[['#4a8fd8','#1f4fa8'],['#e08a3a','#8a3a14'],['#6aa0c8','#2a5a8a']][R()*3|0]}
up(){this.t+=.28;this.a+=(R()-.5)*.3;let v=.8;const f=flee(this,110);if(f!==null){this.a=f;v=2.2}
 if(this.y>H-60)this.a=-1.2;if(this.y<30)this.a=1.2;
 this.x+=Co(this.a)*v;this.y+=S(this.a)*v+S(this.t*.7)*.5;if(this.x<-20)this.x=W+20;if(this.x>W+20)this.x=-20}
dr(){const s=this.s,f=.3+.7*Math.abs(S(this.t));x.save();x.translate(this.x,this.y);x.rotate(this.a+Math.PI/2);
 x.globalAlpha=.88;
 [-1,1].forEach(g=>{x.save();x.scale(g*f,1);x.fillStyle=this.c;x.beginPath();x.ellipse(s*.7,-s*.4,s*.8,s*.45,-.5,0,7);x.fill();x.fillStyle=this.c2;x.beginPath();x.ellipse(s*.5,s*.45,s*.5,s*.35,.4,0,7);x.fill();x.restore()});
 x.globalAlpha=1;x.shadowBlur=0;x.strokeStyle='#0a0a0a';x.lineWidth=2;x.beginPath();x.moveTo(0,-s*.6);x.lineTo(0,s*.7);x.stroke();x.restore()}}

/* --- Jaguar --- */
class Jag{name='JAGUAR';constructor(){this.s=26;this.oy=-this.s*.75;this.x=R()*W;this.y=GY();this.d=R()<.5?1:-1;this.t=0;this.pause=0;this.sp=Array.from({length:13},()=>[rr(-.8,.8),rr(-.28,.28)])}
up(){this.y=GY();if(this.pause>0){this.pause--;return}this.t+=.05;this.x+=this.d*.8;if(R()<.0015)this.pause=150+R()*200|0;if(this.x>W+160)this.x=-160;if(this.x<-160)this.x=W+160}
dr(){const s=this.s,m=this.pause>0?0:1;x.save();x.translate(this.x,this.y);x.scale(this.d,1);x.lineCap='round';x.lineWidth=s*.26;
 [[-.62,0],[.55,Math.PI],[-.45,Math.PI*.5],[.7,Math.PI*1.5]].forEach(([h,ph],i)=>{const a=this.t*3+ph,sw=S(a)*s*.35*m,lf=Math.max(0,Co(a))*s*.25*m;x.strokeStyle=i>1?'#6e4510':'#9a6618';x.beginPath();x.moveTo(h*s,-s*.55);x.lineTo(h*s+sw,-lf);x.stroke()});
 x.lineWidth=s*.17;x.strokeStyle='#b87a1c';x.beginPath();x.moveTo(-s*.9,-s*.85);x.quadraticCurveTo(-s*1.6,-s*.95+S(this.t*2)*4,-s*1.7,-s*1.7);x.stroke();
 x.beginPath();x.ellipse(0,-s*.75,s*.95,s*.42,0,0,7);x.fillStyle='#c98a1d';x.fill();x.strokeStyle='rgba(220,180,110,.35)';x.lineWidth=1.2;x.stroke();
 x.strokeStyle='#2a1500';x.lineWidth=1.4;this.sp.forEach(([a,b])=>{x.beginPath();x.arc(a*s,-s*.75+b*s,s*.08,0,7);x.stroke()});
 x.fillStyle='#c98a1d';x.beginPath();x.arc(s*1.05,-s*.95,s*.36,0,7);x.arc(s*.9,-s*1.28,s*.13,0,7);x.arc(s*1.2,-s*1.25,s*.13,0,7);x.fill();
 x.beginPath();x.ellipse(s*1.38,-s*.85,s*.2,s*.15,0,0,7);x.fillStyle='#e8c88a';x.fill();x.fillStyle='#2a1500';x.beginPath();x.arc(s*1.55,-s*.9,2,0,7);x.fill();
 x.save();x.fillStyle='#ffc233';x.beginPath();x.arc(s*1.2,-s,s*.1,0,7);x.fill();x.restore();
 x.fillStyle='#120a00';x.fillRect(s*1.2-.6,-s-s*.07,1.2,s*.14);x.restore()}}

/* --- Tree boa (slithers along the floor) --- */
class Snake{name='EMERALD BOA';constructor(){this.s=11;this.oy=0;this.x=-60;this.y=GY();this.h=[];this.t=0}
up(){this.t+=.05;this.x+=1.2;if(this.x>W+250){this.x=-60;this.h=[]}this.y=H-20+S(this.x*.045)*9;this.h.unshift({x:this.x,y:this.y});if(this.h.length>150)this.h.pop()}
dr(){const h=this.h,n=Math.min(44,h.length/3|0);if(n<4)return;x.lineCap='round';
 for(let i=n-1;i>0;i--){const a=h[i*3],b=h[(i-1)*3];x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.lineWidth=3+8*(1-i/n);x.strokeStyle=i%4<2?'#1c8a4a':'#136a38';x.stroke()}
 x.beginPath();for(let i=0;i<n;i++){const p=h[i*3];i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y)}x.strokeStyle='rgba(150,230,170,.35)';x.lineWidth=1.2;x.stroke();
 const p=h[0],a=Math.atan2(p.y-h[3].y,p.x-h[3].x);x.save();x.translate(p.x,p.y);x.rotate(a);
 x.beginPath();x.ellipse(4,0,10,6.5,0,0,7);x.fillStyle='#23a85a';x.fill();eye(6,-3,2.3,0,'#ffe84a');
 if(S(this.t*2.5)>.9){x.strokeStyle='#ff2e55';x.lineWidth=1.2;x.beginPath();x.moveTo(13,0);x.lineTo(21,0);x.moveTo(19,0);x.lineTo(23,-3);x.moveTo(19,0);x.lineTo(23,3);x.stroke()}x.restore()}}

/* --- Poison dart frog --- */
class Frog{name='DART FROG';constructor(){this.s=9;this.oy=-this.s*.6;this.x=R()*W;this.y=GY();this.j=0;this.wait=R()*200;this.t=R()*9;this.dir=1;this.col=['#2a5fc0','#e0701a','#2f9a6a'][R()*3|0]}
up(){this.t+=.09;if(this.j>0){this.j+=.035;if(this.j>=1){this.j=0;this.wait=140+R()*300;this.x=this.tx;this.y=GY()}else{this.x=this.sx+(this.tx-this.sx)*this.j;this.y=GY()-S(this.j*Math.PI)*60}return}
 this.y=GY();const near=Math.hypot(this.x-M.x,this.y-M.y)<90;
 if(near||--this.wait<=0){this.sx=this.x;this.tx=Math.max(30,Math.min(W-30,this.x+(near?(this.x>M.x?1:-1)*rr(80,150):rr(-160,160))));this.dir=this.tx>this.x?1:-1;this.j=.001}}
dr(){const s=this.s,jm=this.j>0;x.save();x.translate(this.x,this.y);x.scale(this.dir,1);
 x.fillStyle='#0b1410';x.beginPath();x.ellipse(-s*.5,-s*.2,s*.6,jm?s*.15:s*.3,jm?-.4:0,0,7);x.fill();
 x.beginPath();x.ellipse(0,-s*.6,s,s*.7,0,0,7);x.fillStyle=this.col;x.fill();x.shadowBlur=0;
 x.fillStyle='rgba(5,5,5,.55)';[[-.4,-.8],[0,-.5],[.3,-.9]].forEach(([a,b])=>{x.beginPath();x.arc(a*s,b*s,s*.13,0,7);x.fill()});
 x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(s*.75,-s*.3,s*.2+S(this.t*2)*s*.06,s*.17+S(this.t*2)*s*.06,0,0,7);x.fill();
 eye(s*.45,-s*1.2,3.2,lk(this,this.dir,-s*1.2),'#ffe9a0');x.restore()}}

/* --- Spider monkey swinging from a vine --- */
class Monkey{name='SPIDER MONKEY';constructor(){this.s=15;this.oy=this.s*1.6;this.px=rr(.08,.9)*W;this.len=rr(H*.28,H*.42);this.t=R()*9;this.A=.35;this.x=this.px;this.y=this.len}
up(){this.t+=.022;const d=Math.hypot(this.x-M.x,this.y-M.y);this.A+=((d<160?.85:.35)-this.A)*.02;const a=S(this.t)*this.A;this.ang=a;this.x=this.px+S(a)*this.len;this.y=Co(a)*this.len}
dr(){const s=this.s,a=this.ang;x.strokeStyle=dark?'#1f6a45':'#2a6a3a';x.lineWidth=2.5;x.beginPath();x.moveTo(this.px,0);x.lineTo(this.x,this.y);x.stroke();
 x.save();x.translate(this.x,this.y);x.rotate(-a*.4);x.lineCap='round';
 x.strokeStyle='#5a3920';x.lineWidth=s*.22;x.beginPath();x.moveTo(-s*.42,s*.7);x.lineTo(-s*.1,0);x.moveTo(s*.42,s*.7);x.lineTo(s*.1,0);x.moveTo(-s*.25,s*2.4);x.lineTo(-s*.35,s*3.1);x.moveTo(s*.25,s*2.4);x.lineTo(s*.4,s*3);x.stroke();
 x.lineWidth=s*.15;x.beginPath();x.moveTo(s*.1,s*2.4);x.bezierCurveTo(s*1.3,s*2.8,s*1.6,s*3.6,s*.9,s*3.9);x.stroke();
 x.fillStyle='#6b4426';x.beginPath();x.ellipse(0,s*1.7,s*.5,s*.9,0,0,7);x.fill();
 x.beginPath();x.arc(0,s*.6,s*.42,0,7);x.arc(-s*.42,s*.55,s*.14,0,7);x.arc(s*.42,s*.55,s*.14,0,7);x.fill();
 x.fillStyle='#e0b890';x.beginPath();x.ellipse(0,s*.68,s*.3,s*.27,0,0,7);x.fill();
 const l=lk(this,1,s*.6);eye(-s*.13,s*.6,s*.09+1,l);eye(s*.13,s*.6,s*.09+1,l);
 x.strokeStyle='#4a2a14';x.lineWidth=1;x.beginPath();x.arc(0,s*.75,s*.1,.2,Math.PI-.2);x.stroke();x.restore()}}

/* --- fireflies --- */
const ff=Array.from({length:42},()=>({x:R()*innerWidth,y:R()*innerHeight,a:R()*6,p:R()*6,l:-1,m:R()<.2}));
function burst(px_,py_){for(let i=0;i<10;i++)ff.push({x:px_,y:py_,a:R()*6.28,p:R()*6,l:220,m:R()<.5})}
addEventListener('pointerdown',e=>{if(!e.target.closest('a,button,.card,.ph,#lb'))burst(e.clientX,e.clientY)});

resize();
const mac=Array.from({length:3},()=>new Macaw),bats=Array.from({length:5},()=>new Bat),flies=Array.from({length:7},()=>new Fly),
 jag=[new Jag],snk=[new Snake],frogs=Array.from({length:4},()=>new Frog),mon=Array.from({length:2},()=>new Monkey);
const A=[...mac,...bats,...flies,...jag,...snk,...frogs,...mon];

function lay(i){const o=-80-px*(i+1)*16;if(old){x.globalAlpha=1-fade;x.drawImage(old.L[i],o,0,W+160,H);x.globalAlpha=fade}x.drawImage(L[i],o,0,W+160,H);x.globalAlpha=1}
function loop(){
  tick++;px+=((M.x<0?0:(M.x/W-.5))-px)*.05;
  A.forEach(a=>a.up());
  if(fade<1){fade=Math.min(1,fade+.018);if(fade>=1)old=null}
  if(old){x.drawImage(old.sky,0,0,W,H);x.globalAlpha=fade}
  x.drawImage(sky,0,0,W,H);x.globalAlpha=1;
  lay(0);bats.forEach(a=>a.dr());mac.forEach(a=>a.dr());
  lay(1);mon.forEach(a=>a.dr());flies.forEach(a=>a.dr());
  snk.forEach(a=>a.dr());frogs.forEach(a=>a.dr());jag.forEach(a=>a.dr());
  lay(2);
  for(let i=ff.length-1;i>=0;i--){const f=ff[i];f.p+=.04;f.a+=(R()-.5)*.2;f.x+=Co(f.a)*.4;f.y+=S(f.a)*.4-.05;
   if(f.l>0&&--f.l===0){ff.splice(i,1);continue}if(f.x<0)f.x=W;if(f.x>W)f.x=0;if(f.y<0)f.y=H;if(f.y>H)f.y=0;
   const al=Math.pow(Math.max(0,S(f.p)),2)*(f.l>0?Math.min(1,f.l/60):1)*(dark?1:.45);
   x.save();x.globalAlpha=al;x.fillStyle=x.shadowColor='#e6dc8a';x.shadowBlur=dark?6:2;x.beginPath();x.arc(f.x,f.y,1.8,0,7);x.fill();x.restore()}
  for(let i=0;i<3;i++){const mx=((tick*.15+i*W/3)%(W+400))-200,my=H*(.55+i*.15),g=x.createRadialGradient(mx,my,0,mx,my,260);g.addColorStop(0,P.mist);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(mx-260,my-260,520,520)}
  let hit=null,hd=75;A.forEach(a=>{const d=Math.hypot(a.x-M.x,a.y+a.oy-M.y);if(d<hd){hd=d;hit=a}});
  if(hit&&$('v-jungle').classList.contains('on')){const b=Math.max(18,hit.s*1.4),cx=hit.x,cy=hit.y+hit.oy;x.strokeStyle=P.hud;x.lineWidth=1.5;
   [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([u,v])=>{x.beginPath();x.moveTo(cx+u*b-u*8,cy+v*b);x.lineTo(cx+u*b,cy+v*b);x.lineTo(cx+u*b,cy+v*b-v*8);x.stroke()});
   $('hud').textContent='SCAN: '+hit.name}else $('hud').textContent='SCAN: no signal';
  requestAnimationFrame(loop)}
loop();
