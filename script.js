/* Note « Attends, j'ai une idée… » */
const idees=["« Attends, j'ai une idée… »","Curieuse de nature.","Impliquée par choix.","Et soucieuse du travail bien fait."];
let iI=0;const noteTxt=document.getElementById('note-txt');
document.getElementById('note').addEventListener('click',()=>{iI=(iI+1)%idees.length;noteTxt.textContent=idees[iI]});

/* Vous recrutez pour… */
const BRIEF={
  marketing:{t:"Des campagnes pilotées de bout en bout.",l:["Pilotage de campagnes publicitaires sur Google Ads et Meta Ads.","Déploiement d'actions de communication multicanales.","Suivi des performances et coordination avec les équipes régionales."],o:["Google Ads","Meta Ads Manager","Google Analytics","Marketing Cloud","Canva","TikTok Ads","LinkedIn Ads"],m:"m-afpa",lm:"Lire la mission Afpa",f:"marketing coordination"},
  client:{t:"Une relation client attentive, du premier contact au suivi.",l:["Gestion du SAV et traitement des litiges en e-commerce.","Accompagnement des clients sur tout le parcours d'achat.","Suivi de la satisfaction et reporting de l'activité."],o:["Zendesk","SurveyMonkey","Salesforce","Salesforce Inspector"],m:"m-apc",lm:"Lire la mission AwesomePetCo",f:"client"},
  commercial:{t:"Ouvrir la conversation et garder le fil.",l:["Prospection physique et téléphonique.","Création et publication d'annonces sur les marketplaces.","Suivi des prospects et conception de supports commerciaux."],o:["Salesforce","Canva","Microsoft Office"],m:"m-camson",lm:"Lire la mission CAMSON GROUP",f:"commercial"},
  coordination:{t:"Faire avancer un projet, ensemble.",l:["Coordination des campagnes avec les équipes régionales à l'Afpa.","Participation à l'animation de projets à la Mission locale.","Une méthode : organiser l'action, faire circuler l'information, suivre."],o:["Salesforce","Google Analytics","Microsoft Office"],m:"m-afpa",lm:"Lire la mission Afpa",f:"marketing coordination"}
};
const rep=document.getElementById('reponse');
function brief(k,filtrer){const b=BRIEF[k];
  rep.innerHTML=`<span class="rub">Ce que j'apporte</span><h3>${b.t}</h3><ul>${b.l.map(x=>`<li>${x}</li>`).join('')}</ul><div class="puces" style="margin-bottom:22px">${b.o.map(x=>`<span>${x}</span>`).join('')}</div><a class="lien" href="#${b.m}" data-ouvre="${b.m}">${b.lm} ↘</a>`;
  rep.classList.remove('fondu');void rep.offsetWidth;rep.classList.add('fondu');
  if(filtrer)filtrerMissions(b.f);
}
document.querySelectorAll('.choix button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.choix button').forEach(x=>x.setAttribute('aria-pressed',x===b));brief(b.dataset.b,true)}));
rep.addEventListener('click',e=>{const a=e.target.closest('[data-ouvre]');if(a){e.preventDefault();ouvrirMission(document.getElementById(a.dataset.ouvre))}});
brief('marketing',false);

/* Missions : tiroir */
const XP={
  afpa:{meta:"Afpa · Direction Nationale · Montreuil · 2024–2026",titre:"Donner vie aux campagnes",ctx:"Déployer des actions de communication multicanales au sein d'un organisme de formation et assurer la coordination des campagnes et de leur suivi.",
    actions:["Piloter les campagnes sur Google Ads et Meta Ads.","Déployer les actions de communication et coordonner les échanges avec les équipes régionales.","Suivre les performances des actions."],
    lab:"Outils",comp:["Google Ads","Meta Ads Manager","Salesforce","Marketing Cloud","Google Analytics"],
    trans:"Une méthode qui se transpose à d'autres projets : organiser l'action, faire circuler l'information et maintenir un suivi."},
  apc:{meta:"AwesomePetCo · Paris 2e · 2022–2023",titre:"Prendre soin du parcours client",ctx:"Accompagner les clients, prendre en charge leurs demandes et suivre leur satisfaction.",
    actions:["Traiter les demandes de service après-vente et les litiges.","Accompagner les clients sur leur parcours d'achat.","Suivre la satisfaction et produire le reporting de l'activité."],
    lab:"Compétences",comp:["Écoute","Relation client","Résolution de problèmes","Rigueur","Reporting"],
    trans:"Comprendre un besoin et apporter une réponse adaptée : une base utile en relation client, en coordination et en accompagnement."},
  camson:{meta:"CAMSON GROUP · Saint-Denis · 2021–2022",titre:"Ouvrir la conversation",ctx:"Contribuer au développement commercial et soutenir les démarches de prise de contact.",
    actions:["Prospecter par téléphone et sur le terrain.","Créer et publier des annonces sur les marketplaces.","Suivre les prospects et concevoir des supports commerciaux."],
    lab:"Compétences",comp:["Prospection","Aisance relationnelle","Suivi commercial","Rédaction","Création de supports"],
    trans:"Savoir entrer en relation, présenter une offre et garder le fil des échanges, dans des environnements commerciaux variés."},
  ml:{meta:"Mission locale intercommunale · Villepinte, Sevran, Tremblay · 2021",titre:"Accompagner chaque usager",ctx:"Un service civique sur les trois antennes de la Mission locale.",
    actions:["Accueil, information et accompagnement dans les démarches.","Identification des besoins et proposition de solutions adaptées.","Participation à l'animation de projets et création de supports de communication."],
    lab:"Ce que j'y mobilise",comp:["Écoute","Adaptabilité","Communication","Travail en équipe"],
    trans:"Accueillir chaque personne là où elle en est et trouver avec elle la bonne solution."}
};
const tiroir=document.getElementById('tiroir'),voile=document.getElementById('voile'),tz=document.getElementById('t-contenu');
let dernierXP=null;
function ouvrirMission(el){if(!el)return;const x=XP[el.dataset.xp];dernierXP=el;
  tz.innerHTML=`<span class="t-meta">${x.meta}</span><h2 id="t-titre">${x.titre}.</h2><p style="margin:0">${x.ctx}</p>
  <h4>Mes actions</h4><ul>${x.actions.map(a=>`<li>${a}</li>`).join('')}</ul>
  <h4>${x.lab}</h4><div class="puces">${x.comp.map(c=>`<span>${c}</span>`).join('')}</div>
  <div class="transpose">${x.trans}</div>`;
  tiroir.hidden=voile.hidden=false;document.getElementById('fermer').focus({preventScroll:true})}
function fermerTiroir(){const y=scrollY;tiroir.hidden=voile.hidden=true;if(dernierXP)dernierXP.focus({preventScroll:true});scrollTo({top:y,behavior:'instant'})}
document.querySelectorAll('.xp').forEach(t=>{t.addEventListener('click',()=>ouvrirMission(t));t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();ouvrirMission(t)}})});
document.getElementById('fermer').onclick=fermerTiroir;voile.onclick=fermerTiroir;
addEventListener('keydown',e=>{if(e.key==='Escape'&&!tiroir.hidden)fermerTiroir()});
function filtrerMissions(f){
  document.querySelectorAll('.filtres button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.f===f));
  const cles=f.split(' ');
  document.querySelectorAll('#missions [data-t]').forEach(m=>m.classList.toggle('estompe',f!=='tout'&&!m.dataset.t.split(' ').some(t=>cles.includes(t))));
}
document.querySelectorAll('.filtres button').forEach(b=>b.addEventListener('click',()=>filtrerMissions(b.dataset.f)));

/* Compétences */
const COMP=[
  {n:"Coordination & organisation",t:"Faire avancer un projet, ensemble.",d:"Organiser des actions, coordonner les interlocuteurs et garder une vue d'ensemble sur le suivi.",l:["Coordination des campagnes avec les équipes régionales à l'Afpa.","Participation à l'animation de projets à la Mission locale."],m:"m-afpa",lm:"Voir l'expérience Afpa"},
  {n:"Écoute & relation client",t:"Comprendre avant de répondre.",d:"Prendre en charge une demande, identifier le besoin et apporter une réponse adaptée.",l:["Traitement du SAV et des litiges chez AwesomePetCo.","Accueil et orientation des usagers à la Mission locale."],m:"m-apc",lm:"Voir l'expérience AwesomePetCo"},
  {n:"Analyse & suivi",t:"Mesurer pour ajuster.",d:"Suivre les résultats, rendre compte de l'activité et garder le fil.",l:["Suivi des performances des actions marketing à l'Afpa.","Suivi de la satisfaction et reporting chez AwesomePetCo.","Suivi des prospects chez CAMSON GROUP."],m:"m-afpa",lm:"Voir l'expérience Afpa"},
  {n:"Communication & créativité",t:"Trouver la bonne façon de raconter.",d:"Adapter le message au canal et à la personne qui le reçoit.",l:["Actions de communication multicanales à l'Afpa.","Annonces sur les marketplaces et supports commerciaux chez CAMSON GROUP.","Supports de communication à la Mission locale."],m:"m-camson",lm:"Voir l'expérience CAMSON GROUP"},
  {n:"Adaptabilité & implication",t:"Passer d'un univers à l'autre.",d:"Formation professionnelle, e-commerce, commerce, accompagnement des publics : quatre environnements, une même implication.",l:["Trois alternances menées en parallèle de mes études.","Un service civique sur trois antennes à la fois."],m:"m-ml",lm:"Voir l'expérience Mission locale"}
];
const cl=document.getElementById('comp-liste'),sit=document.getElementById('situation');
cl.innerHTML=COMP.map((c,i)=>`<li><button role="tab" id="ct${i}" aria-selected="${i===0}" data-i="${i}"><small>0${i+1}</small><span>${c.n}</span><span>↗</span></button></li>`).join('');
function comp(i){const c=COMP[i];
  cl.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.i==i));
  sit.setAttribute('aria-labelledby','ct'+i);
  sit.innerHTML=`<span class="rub">En situation</span><h3>${c.t}</h3><p style="margin:0">${c.d}</p><ul>${c.l.map(x=>`<li>${x}</li>`).join('')}</ul><a href="#${c.m}" data-ouvre="${c.m}">${c.lm} ↗</a>`;
  sit.classList.remove('fondu');void sit.offsetWidth;sit.classList.add('fondu');placerPointe()}
function placerPointe(){const b=cl.querySelector('[aria-selected="true"]');if(!b)return;
  const y=b.getBoundingClientRect().top+b.offsetHeight/2-sit.getBoundingClientRect().top-12;
  sit.style.setProperty('--pointe',Math.max(18,Math.min(y,sit.offsetHeight-42))+'px')}
addEventListener('resize',placerPointe);
cl.addEventListener('click',e=>{const b=e.target.closest('button');if(b)comp(+b.dataset.i)});
cl.addEventListener('keydown',e=>{const b=e.target.closest('button');if(!b)return;let i=+b.dataset.i;
  if(e.key==='ArrowDown'||e.key==='ArrowRight'){i=(i+1)%COMP.length}else if(e.key==='ArrowUp'||e.key==='ArrowLeft'){i=(i+COMP.length-1)%COMP.length}else return;
  e.preventDefault();comp(i);document.getElementById('ct'+i).focus()});
sit.addEventListener('click',e=>{const a=e.target.closest('[data-ouvre]');if(a){e.preventDefault();filtrerMissions('tout');ouvrirMission(document.getElementById(a.dataset.ouvre))}});
comp(0);

/* Outils */
document.querySelectorAll('.ong button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.ong button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const o=b.dataset.o;
  document.querySelectorAll('.outil').forEach(m=>m.classList.toggle('estompe',o!=='tous'&&m.dataset.c!==o))}));

/* Albums */
const ALBUMS={
  londres:[["lon-cabine","La cabine rouge"],["lon-oxford","Oxford Circus"],["lon-camden","Camden Lock"],["lon-towerbridge","Tower Bridge de nuit"],["lon-townhouse","London townhouse"],["lon-bigben-moi","Un souvenir devant Big Ben"],["lon-bigben-eye","Big Ben"],["lon-abbaye","Abbaye de Westminster"],["lon-victoria","Le mémorial Victoria"],["lon-telepherique","Une vue depuis le téléphérique",1],["lon-drapeau","Balade dans Londres",1],["lon-metro","Le métro londonien",1],["lon-piccadilly","Piccadilly Circus by night",1]],
  coree:[["kor-palais","Changdeokgung Palace"],["kor-seoul-nuit","Seoul by night"],["kor-boutique","Pause gourmande à Myeongdong"],["kor-gangnam","Gangnam"],["kor-starfield","La Starfield Library, à COEX"],["kor-musee","Musée national de Corée"],["kor-garde","Palais de Gyeongbokgung",1],["kor-hanok","Jeonju Hanok Maeul",1],["kor-haedong-mer","Le temple Haedong Yonggungsa face à la mer, à Busan"],["kor-haedong","Haedong Yonggungsa, à Busan",1],["kor-lanternes","Sous les lanternes du temple Haedong Yonggungsa, à Busan",1,1]]
};
const src=d=>d[2]?`voyages/${d[0]}.jpg`:`voyages/${d[0]}.webp`, vign=d=>d[2]?`voyages/${d[0]}-v.jpg`:`voyages/${d[0]}-v.webp`;
const loupe=document.getElementById('loupe'),loupeMedia=document.getElementById('loupe-media'),loupeLeg=document.getElementById('loupe-leg');
document.querySelectorAll('.album').forEach(al=>{
  const data=ALBUMS[al.dataset.album];let i=0;
  const img=al.querySelector('.polaroid img'),vid=al.querySelector('.polaroid video'),cap=al.querySelector('figcaption'),fond=al.querySelector('.fond'),pol=al.querySelector('.polaroid'),
        cpt=al.querySelector('.compte'),leg=al.querySelector('.legende'),vig=al.querySelector('.vignettes'),cnt=al.querySelector('.compteur');
  const nv=data.filter(d=>d[2]).length;cnt.textContent=`${data.length-nv} photos · ${nv} vidéos`;
  vig.innerHTML=data.map(d=>`<button aria-label="${d[1]}${d[2]?' (vidéo)':''}"><img src="${vign(d)}" alt="" loading="lazy">${d[2]?'<span>Vidéo</span>':''}</button>`).join('');
  function voir(k){i=(k+data.length)%data.length;const d=data[i];
    vid.pause();
    if(d[2]){img.hidden=true;vid.hidden=false;vid.poster=src(d);vid.src=`voyages/${d[0]}.mp4`;vid.setAttribute('aria-label',d[1]);const pr=vid.play();if(pr)pr.catch(()=>{})}
    else{vid.hidden=true;vid.removeAttribute('src');vid.load();img.hidden=false;img.src=src(d);img.alt=d[1]}
    cap.textContent=d[3]?'':d[1];fond.style.backgroundImage=`url(${src(d)})`;
    cpt.textContent=`Souvenir ${i+1} sur ${data.length}`;leg.textContent=d[1];
    vig.querySelectorAll('button').forEach((b,n)=>{b.setAttribute('aria-current',n===i);if(n===i){const v=b.parentElement;const l=b.offsetLeft-v.offsetLeft;if(l<v.scrollLeft||l+b.offsetWidth>v.scrollLeft+v.clientWidth)v.scrollTo({left:l-v.clientWidth/2+b.offsetWidth/2,behavior:'smooth'})}});
    pol.classList.remove('anim');void pol.offsetWidth;pol.classList.add('anim')}
  al.querySelector('.prec').onclick=()=>voir(i-1);al.querySelector('.suiv').onclick=()=>voir(i+1);
  vig.addEventListener('click',e=>{const b=e.target.closest('button');if(b)voir([...vig.children].indexOf(b))});
  al.querySelector('.grand').onclick=()=>{const d=data[i];vid.pause();
    loupeMedia.innerHTML=d[2]?`<video src="voyages/${d[0]}.mp4" poster="${src(d)}" controls playsinline autoplay muted loop aria-label="${d[1]}"></video>`:`<img src="${src(d)}" alt="${d[1]}">`;
    loupeLeg.textContent=d[1];loupe.hidden=false;document.getElementById('loupe-fermer').focus()};
  let x0=null;const ec=al.querySelector('.ecran');
  ec.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  ec.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)voir(i+(dx<0?1:-1));x0=null});
  al.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowRight')voir(i+1);if(e.key==='ArrowLeft')voir(i-1)});
  voir(0);
});
function fermerLoupe(){loupe.hidden=true;loupeMedia.innerHTML=''}
document.getElementById('loupe-fermer').onclick=fermerLoupe;
loupe.addEventListener('click',e=>{if(e.target===loupe)fermerLoupe()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!loupe.hidden)fermerLoupe()});

/* Bibliothèque */
const LIVRES=[
  ["La charmante librairie des jours heureux","Jenny Colgan","J'aime son ambiance chaleureuse et les rencontres que les livres rendent possibles.","#8FBBA0","#1F2D26"],
  ["La vie est un roman","Guillaume Musso","J'aime les histoires qui brouillent les pistes et donnent envie de tourner encore une page.","#40564A","#EEF4F0"],
  ["L'avenue de la louange","Don Gosset","J'aime son invitation à faire une place à la louange et à la reconnaissance au quotidien.","#E6DCCB","#34443B"],
  ["Les Carnets de l'apothicaire","Hyuganatsu · Itsuki Nanao · Nekokurage","J'aime le mélange d'enquêtes, de curiosité et de sens de l'observation.","#A8754A","#FFFFFF"],
  ["Frieren","Kanehito Yamada · Tsukasa Abe","J'aime sa douceur et sa façon de parler du temps, des souvenirs et des liens.","#C9DCD0","#34443B"],
  ["One Piece","Eiichiro Oda","J'aime la richesse de son univers et les thèmes qu'il explore, comme la liberté, les injustices et la quête d'identité.","#2F3F36","#E8B24A"]
];
const hauteurs=[100,88,94,82,96,90];
const et=document.getElementById('etagere'),lv=document.getElementById('livre');
et.innerHTML=LIVRES.map((l,k)=>`<button class="dos" style="height:${hauteurs[k]}%;background:${l[3]};color:${l[4]}" aria-pressed="${k===0}" data-k="${k}" aria-label="${l[0]}">${l[0]}</button>`).join('');
function livre(k){const l=LIVRES[k];
  et.querySelectorAll('.dos').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k==k));
  lv.innerHTML=`<h4>${l[0]}</h4><small>${l[1]}</small><p>${l[2]}</p>`;lv.classList.remove('fondu');void lv.offsetWidth;lv.classList.add('fondu')}
et.addEventListener('click',e=>{const b=e.target.closest('.dos');if(b)livre(+b.dataset.k)});
livre(0);

/* Palette déco */
document.querySelectorAll('#palette button').forEach(b=>{b.setAttribute('aria-label',b.dataset.n);b.addEventListener('click',()=>{
  document.querySelectorAll('#palette button').forEach(x=>x.setAttribute('aria-pressed',x===b));document.getElementById('palette-nom').textContent=b.dataset.n})});
/* Douceurs */
document.querySelectorAll('#douceurs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#douceurs button').forEach(x=>x.setAttribute('aria-pressed',x===b));document.getElementById('douceur-txt').textContent=b.dataset.d}));

/* Copier */
document.querySelectorAll('[data-copie]').forEach(b=>b.addEventListener('click',()=>{
  const v=b.dataset.copie,o=b.textContent;const ok=()=>{b.textContent='Copié ✓';setTimeout(()=>b.textContent=o,1600)};
  try{navigator.clipboard.writeText(v).then(ok,()=>{b.textContent=v})}catch(e){b.textContent=v}}));


/* CV ATS : téléchargement direct */
document.querySelectorAll('.cv-btn').forEach(b=>b.addEventListener('click',()=>{
  const a=document.createElement('a');a.href='docs/CV_Jennyfer_Bassinet_ATS.pdf';a.download='CV_Jennyfer_Bassinet_ATS.pdf';
  document.body.appendChild(a);a.click();a.remove();}));


/* Loupe de détective */
(function(){const d=document.getElementById('devise'),l=document.getElementById('detective');if(!d)return;
  const mots=[...d.querySelectorAll('.mot')];let cur=-1,auto=null,dedans=false;
  const calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function sur(i){if(i===cur)return;cur=i;mots.forEach((m,k)=>m.classList.toggle('vu',k===i));
    requestAnimationFrame(()=>{const r=mots[i].getBoundingClientRect(),b=d.getBoundingClientRect();
      const big=mots[i].dataset.t.length*11+26,dia=Math.max(54,Math.min(118,big));l.style.setProperty('--ld',dia+'px');l.style.setProperty('--lx',(r.left-b.left+r.width/2-dia/2)+'px');l.style.setProperty('--ly',(r.top-b.top+r.height/2-dia/2)+'px')})}
  function proche(x,y){let best=0,dist=1e9;mots.forEach((m,k)=>{const r=m.getBoundingClientRect();const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom),dd=dx*dx+dy*dy;if(dd<dist){dist=dd;best=k}});return best}
  function demarrer(){if(calme||auto)return;auto=setInterval(()=>{if(!dedans)sur((cur+1)%mots.length)},1600)}
  d.addEventListener('pointerenter',()=>{dedans=true});
  d.addEventListener('pointerleave',()=>{dedans=false});
  d.addEventListener('pointermove',e=>sur(proche(e.clientX,e.clientY)));
  d.addEventListener('pointerdown',e=>{dedans=true;sur(proche(e.clientX,e.clientY));setTimeout(()=>dedans=false,2500)});
  addEventListener('resize',()=>{const i=cur;cur=-1;sur(i<0?0:i)});
  sur(0);
})();


/* Texte tapé à la machine */
(function(){const el=document.getElementById('frappe-txt');if(!el)return;
  const morceaux=[["De la relation client ",0],["à la coordination de projets",1],[", avec le sens du détail.",0]];
  const total=morceaux.map(m=>m[0]).join('');
  function rendu(n){let reste=n,h='';for(const [t,it] of morceaux){if(reste<=0)break;const part=t.slice(0,reste);reste-=t.length;
    const safe=part.replace(/&/g,'&amp;').replace(/</g,'&lt;');h+=it?'<span class="it">'+safe+'</span>':safe}el.innerHTML=h}
  rendu(total.length);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const bande=el.closest('.defile');let visible=false,joue=false,enCours=false,geste=false;
  function essai(){if(geste&&visible&&!joue&&!enCours){joue=true;taper()}}
  new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;if(!visible)joue=false;else essai()}),{threshold:.6}).observe(bande);
  function taper(){enCours=true;let n=0;rendu(0);
    (function pas(){n++;rendu(n);if(n>=total.length){enCours=false;return}setTimeout(pas,45+Math.random()*60)})()}
  ['wheel','touchmove','keydown','pointerdown'].forEach(t=>addEventListener(t,()=>{geste=true},{passive:true}));
  addEventListener('scroll',essai,{passive:true});
})();

/* Progression + rubrique active */
const p=document.getElementById('prog');
addEventListener('scroll',()=>{const h=document.documentElement;p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100||0)+'%'},{passive:true});
const liens=[...document.querySelectorAll('.rubriques a')];
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)liens.forEach(l=>l.classList.toggle('actif',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['recrutez','missions','competences','cursus','dehors'].forEach(id=>obs.observe(document.getElementById(id)));
