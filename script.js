/* home page */
const im=(s,t)=>s?`<img src="${s}" alt="${t}" loading="lazy">`:'';
$('#app').innerHTML=`
<section class="hero" id="top">${ME.hero?`<div class="hbg"><img src="${ME.hero}" alt=""></div>`:''}<h1>${head(ME.headline)}</h1>
 <div class="hm rv" style="--d:.6s"><div>${ME.bio.map(b=>`<p>${b}</p>`).join('')}</div><div class="lk">${ME.links.map(([n,u])=>`<a href="${u}"${tg(u)}>${n}</a>`).join('')}</div></div></section>
<section id="about"><div class="sh rv"><span class="m">01</span><h2>About</h2></div>
 <div class="ab">${ME.portrait?`<img class="rv big" src="${ME.portrait}" alt="${ME.name}" loading="lazy">`:'<div class="pbox m" style="display:grid;place-items:center;background:#121211">add portrait</div>'}
  <div><p class="stm rv">${ME.statement}</p><div class="rows rv" style="--d:.15s">${ABOUT.map(([k,v,d])=>`<div><span class="m">${k}</span><span>${v}${d?`<small>${d}</small>`:''}</span></div>`).join('')}</div></div></div></section>
<section id="work"><div class="sh rv"><span class="m">02</span><h2>Work</h2></div>
 <div class="gr">${PROJECTS.map((p,i)=>`<a class="pc rv big" style="--d:${(i%2)*.12}s" href="${p.slug?p.slug+'/':p.link||'#'}"${p.slug?'':tg(p.link||'')}><div class="pi${p.img?'':' e'}">${p.img?im(p.img,p.title.replace(/\*/g,'')):'<span class="m">add cover</span>'}</div><div class="mt m"><span>${pad(i+1)} · ${p.tags.join(', ')}</span><span>${p.tag}</span></div><h3>${hl(p.title)}</h3><p>${p.desc}</p></a>`).join('')}</div></section>
<section id="gallery"><div class="sh rv"><span class="m">03</span><h2>Gallery</h2></div>
 <div class="ms">${PHOTOS.map((p,i)=>`<figure class="fr rv big" style="--d:${(i%3)*.1}s" onclick="lbOpen(PHOTOS,${i})">${p.src?im(p.src,p.title):`<div class="ph m" style="--r:${p.ratio||'4/5'}">add photo</div>`}<div class="cp"><span>${p.title}</span><small>${p.exif||''}</small></div></figure>`).join('')}</div></section>
<section id="contact"><div class="sh rv"><span class="m">04</span><h2>Contact</h2></div>
 <div class="rows rv" style="max-width:44rem">${[ME.links.find(l=>l[0]==='email'),['clients',CLIENTS]].filter(Boolean).map(([n,u])=>`<div><span class="m">${n}</span><a href="${u}"${tg(u)}>${u.replace(/^mailto:|^https?:\/\//,'')}</a></div>`).join('')}</div></section>
<footer class="m"><span>© ${new Date().getFullYear()} ${ME.name}</span><span>photography</span></footer>`;

/* highlight the section you are in */
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('nav a[data-s]').forEach(a=>a.classList.toggle('on',a.dataset.s===e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
