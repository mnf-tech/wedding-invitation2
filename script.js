// ===================== PETAL AMBIENCE =====================
(function initPetals(){
  const field = document.getElementById('petalField');
  if(!field) return;
  const count = window.innerWidth < 600 ? 10 : 18;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (8 + Math.random()*8) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.opacity = (0.35 + Math.random()*0.35).toFixed(2);
    p.style.width = p.style.height = (6 + Math.random()*8) + 'px';
    field.appendChild(p);
  }
})();

// ===================== TORAN LEAVES =====================
(function initToranLeaves(){
  const wrap = document.getElementById('toranLeaves');
  if(!wrap) return;
  const leafCount = 14;
  for(let i=0;i<leafCount;i++){
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.animationDelay = (i*0.06) + 's, ' + (1.2 + Math.random()) + 's';
    wrap.appendChild(leaf);
  }
})();

// ===================== SCROLL REVEAL =====================
(function initReveal(){
  const targets = document.querySelectorAll('.reveal-in, [data-reveal]');
  targets.forEach((el,i)=> el.style.setProperty('--i', i % 8));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el=> io.observe(el));

  // timeline connecting line draws in once its section is in view
  const timeline = document.getElementById('timeline');
  if(timeline){
    const tlIo = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          timeline.classList.add('visible');
          tlIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    tlIo.observe(timeline);
  }

  // Hero elements reveal immediately on load rather than waiting for scroll
  window.addEventListener('load', ()=>{
    document.querySelectorAll('.hero .reveal-in').forEach((el,i)=>{
      setTimeout(()=> el.classList.add('visible'), i*120);
    });
  });
})();

// ===================== SMOOTH ACCORDION =====================
(function initAccordion(){
  const items = document.querySelectorAll('.accordion details');
  items.forEach(details=>{
    const content = details.querySelector('.acc-content');
    if(!content) return;

    // set initial height based on starting open/closed state
    if(details.open){
      content.style.height = 'auto';
    } else {
      content.style.height = '0px';
    }

    const summary = details.querySelector('summary');
    summary.addEventListener('click', (e)=>{
      e.preventDefault();

      if(details.open){
        // closing: animate from current height down to 0
        const startHeight = content.scrollHeight + 'px';
        content.style.height = startHeight;
        requestAnimationFrame(()=>{
          content.style.height = '0px';
        });
        content.addEventListener('transitionend', function handler(){
          details.open = false;
          content.removeEventListener('transitionend', handler);
        }, { once:true });
      } else {
        // opening: set display via open attribute first, then animate to full height
        details.open = true;
        const fullHeight = content.scrollHeight + 'px';
        content.style.height = '0px';
        requestAnimationFrame(()=>{
          content.style.height = fullHeight;
        });
        content.addEventListener('transitionend', function handler(){
          content.style.height = 'auto';
          content.removeEventListener('transitionend', handler);
        }, { once:true });
      }
    });
  });
})();

// ===================== COUNTDOWN =====================
(function initCountdown(){
  const target = new Date('2026-07-24T18:00:00+05:30').getTime();
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  if(!els.d) return;

  function pad(n){ return String(n).padStart(2,'0'); }

  function setWithPulse(el, value){
    if(el.textContent !== value){
      el.textContent = value;
      el.classList.remove('pulse');
      // force reflow so the animation can restart every second
      void el.offsetWidth;
      el.classList.add('pulse');
    }
  }

  function tick(){
    const now = Date.now();
    let diff = target - now;
    if(diff <= 0){
      [els.d, els.h, els.m, els.s].forEach(el=> el.textContent = '00');
      const label = document.querySelector('.countdown-label');
      if(label) label.textContent = 'शुभविवाह मंगलमय होवो! 🎉';
      clearInterval(timer);
      return;
    }
    const day = Math.floor(diff / 86400000);
    const hr  = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    setWithPulse(els.s, pad(sec));
    setWithPulse(els.m, pad(min));
    setWithPulse(els.h, pad(hr));
    setWithPulse(els.d, pad(day));
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
