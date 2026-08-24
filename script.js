// mobile nav
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

// gallery filter
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.gal-item').forEach(item=>{
      item.classList.toggle('hide', f!=='all' && item.dataset.cat!==f);
    });
  });
});

// faq accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});

// scroll reveal
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// hero video popup
const playBadge = document.querySelector('.play-badge');
const videoModal = document.getElementById('videoModal');
if(playBadge && videoModal){
  const openModal = ()=>{ videoModal.classList.add('open'); videoModal.setAttribute('aria-hidden','false'); };
  const closeModal = ()=>{ videoModal.classList.remove('open'); videoModal.setAttribute('aria-hidden','true'); };
  playBadge.addEventListener('click', openModal);
  videoModal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
}

// inline play for per-project video cards
document.querySelectorAll('.project-video-wrap').forEach(wrap=>{
  const video = wrap.querySelector('.project-video');
  const playBtn = wrap.querySelector('.project-play');
  if(!video || !playBtn) return;
  playBtn.addEventListener('click', ()=>{
    wrap.classList.add('playing');
    video.setAttribute('controls', '');
    video.play();
  });
  video.addEventListener('pause', ()=>{ if(video.currentTime === 0) wrap.classList.remove('playing'); });
  video.addEventListener('ended', ()=>{ wrap.classList.remove('playing'); video.removeAttribute('controls'); });
});

// testimonials carousel
const testTrack = document.getElementById('testTrack');
if(testTrack){
  const slides = [...testTrack.children];
  const dotsWrap = document.getElementById('testDots');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  let index = 0;

  slides.forEach((_, i)=>{
    const dot = document.createElement('button');
    dot.className = 'test-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Xem đánh giá ${i+1}`);
    dot.addEventListener('click', ()=>goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function goTo(i){
    index = (i + slides.length) % slides.length;
    testTrack.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di)=>d.classList.toggle('active', di===index));
  }
  prevBtn.addEventListener('click', ()=>goTo(index - 1));
  nextBtn.addEventListener('click', ()=>goTo(index + 1));
  goTo(0);
}

// header shrink + shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY>10);
});

// active nav link on scroll (only relevant on pages with matching in-page sections, e.g. the home page)
const navAnchors = [...navLinks.querySelectorAll('a[href^="#"]')];
const navSections = navAnchors.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
if(navSections.length){
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navAnchors.forEach(a=>a.classList.remove('active'));
        const link = navAnchors.find(a=>a.getAttribute('href')===`#${entry.target.id}`);
        if(link) link.classList.add('active');
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  navSections.forEach(section=>spy.observe(section));
}

// footer: copy email/phone to clipboard
document.querySelectorAll('.foot-copy').forEach(item=>{
  const link = item.querySelector('a');
  if(!link) return;
  link.addEventListener('click', e=>{
    e.preventDefault();
    const text = item.dataset.copy || link.textContent.trim();
    navigator.clipboard?.writeText(text).catch(()=>{});
    item.classList.add('copied');
    setTimeout(()=>item.classList.remove('copied'), 1600);
  });
});

// scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if(scrollTopBtn){
  window.addEventListener('scroll', ()=>{
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// count-up animation for hero highlight numbers
document.querySelectorAll('.hl-num').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  if (Number.isNaN(target)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(el);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: .4 });
  io.observe(el);
});

// timeline progress fill (module list vertical line)
(() => {
  const lists = document.querySelectorAll('.module-list');
  if (!lists.length) return;
  let ticking = false;
  function update() {
    lists.forEach(list => {
      const track = list.querySelector('.module-timeline-track');
      const fill = list.querySelector('.module-timeline-fill');
      if (!track || !fill) return;
      const rect = track.getBoundingClientRect();
      const anchor = window.innerHeight * 0.65;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      fill.style.height = (progress * track.offsetHeight) + 'px';
    });
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
