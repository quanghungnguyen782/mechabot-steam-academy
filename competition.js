/*
 * MechaBot Competition Academy — rendering & interactions
 * Dữ liệu: competition-data.js (window.MECHABOT_COMPETITION)
 * Dùng cho competition.html và challenge.html. Phải được nạp TRƯỚC script.js
 * để các phần tử .reveal sinh ra ở đây cũng được hiệu ứng cuộn của script.js xử lý.
 */
(() => {
  const DATA = window.MECHABOT_COMPETITION;
  if (!DATA) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const diffLabel = (n) => DATA.difficultyLabels[n] || '';
  const challengeUrl = (c) => `challenge.html?id=${encodeURIComponent(c.id)}`;

  /* ---------- Arena illustrations (inline SVG, không cần ảnh) ---------- */
  let svgSeq = 0;
  function arenaSVG(type, { animate = true } = {}) {
    const anim = animate && !reduceMotion;
    const uid = `${type}-${++svgSeq}`;
    const grid = `
      <defs>
        <pattern id="g-${uid}" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(91,141,239,.14)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="320" height="200" fill="#0E1729"/>
      <rect width="320" height="200" fill="url(#g-${uid})"/>`;
    const robot = (pathId, dur) =>
      anim
        ? `<g><circle r="7" fill="#F97316"/><circle r="12" fill="none" stroke="#F97316" stroke-opacity=".35" stroke-width="2"/>
             <animateMotion dur="${dur}s" repeatCount="indefinite" rotate="auto"><mpath href="#${pathId}"/></animateMotion></g>`
        : '';
    const flag = (x, y, label, color) =>
      `<g transform="translate(${x} ${y})"><rect x="-16" y="-9" width="32" height="18" rx="4" fill="${color}"/>
         <text x="0" y="4" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Be Vietnam Pro, sans-serif">${label}</text></g>`;

    let body = '';
    if (type === 'line') {
      const d = 'M30 160 C 70 160, 70 60, 120 60 S 170 150, 210 140 S 260 40, 290 50';
      body = `
        <path id="p-line-${uid}" d="${d}" fill="none" stroke="#E8EEF9" stroke-width="12" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="#0B1220" stroke-width="5" stroke-linecap="round"/>
        ${flag(30, 182, 'START', '#2563EB')}${flag(290, 28, 'FINISH', '#22C55E')}
        ${robot(`p-line-${uid}`, 6)}`;
    } else if (type === 'delivery') {
      const d = 'M40 100 H 150 V 40 H 270 V 160 H 150';
      body = `
        <path d="M20 100H300M150 20V180M270 20V180M20 40H300M20 160H300" stroke="#2A3A5C" stroke-width="16" stroke-linecap="round"/>
        <path id="p-del-${uid}" d="${d}" fill="none" stroke="#5B8DEF" stroke-width="2.5" stroke-dasharray="6 6"/>
        <rect x="22" y="84" width="34" height="32" rx="6" fill="#2563EB"/><text x="39" y="104" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Be Vietnam Pro, sans-serif">KHO</text>
        ${[[150, 40, 1], [270, 160, 2], [150, 160, 3]]
          .map(
            ([x, y, n]) =>
              `<circle cx="${x}" cy="${y}" r="13" fill="#22C55E"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="Be Vietnam Pro, sans-serif">${n}</text>`
          )
          .join('')}
        ${robot(`p-del-${uid}`, 7)}`;
    } else if (type === 'obstacle') {
      const d = 'M30 100 C 70 100, 80 50, 120 50 S 160 150, 200 150 S 250 60, 295 100';
      body = `
        ${[[100, 100], [160, 70], [170, 120], [235, 125], [250, 55]]
          .map(([x, y]) => `<rect x="${x - 12}" y="${y - 12}" width="24" height="24" rx="5" fill="#EF4444" fill-opacity=".85"/><path d="M${x - 6} ${y - 6}L${x + 6} ${y + 6}M${x + 6} ${y - 6}L${x - 6} ${y + 6}" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`)
          .join('')}
        <path id="p-obs-${uid}" d="${d}" fill="none" stroke="#5B8DEF" stroke-width="2.5" stroke-dasharray="6 6"/>
        ${flag(30, 125, 'START', '#2563EB')}${flag(292, 125, 'FINISH', '#22C55E')}
        ${robot(`p-obs-${uid}`, 7)}`;
    } else {
      const d = 'M30 170 H 110 V 100 H 210 V 40 H 290';
      body = `
        <path d="M10 170H310M10 100H310M110 10V190M210 10V190M10 40H310" stroke="#2A3A5C" stroke-width="18"/>
        <path d="M10 170H310M10 100H310M110 10V190M210 10V190M10 40H310" stroke="#E8EEF9" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="6 6"/>
        ${[[30, 58, 60, 28], [130, 58, 60, 28], [230, 58, 70, 28], [30, 118, 60, 38], [130, 118, 60, 38], [230, 118, 70, 38]]
          .map(([x, y, w, h], i) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${i % 2 ? '#1E3A8A' : '#22314F'}"/>`)
          .join('')}
        <rect x="236" y="124" width="22" height="26" rx="3" fill="none" stroke="#5B8DEF" stroke-width="2"/><text x="247" y="142" text-anchor="middle" font-size="12" font-weight="800" fill="#5B8DEF" font-family="Be Vietnam Pro, sans-serif">P</text>
        <rect x="98" y="72" width="10" height="24" rx="3" fill="#0B1220"/><circle cx="103" cy="78" r="3" fill="#EF4444"/><circle cx="103" cy="85" r="3" fill="#FACC15"/><circle cx="103" cy="92" r="3" fill="#22C55E"/>
        <path id="p-city-${uid}" d="${d}" fill="none" stroke="#F97316" stroke-width="2.5" stroke-dasharray="6 6"/>
        ${robot(`p-city-${uid}`, 8)}`;
    }
    return `<svg viewBox="0 0 320 200" role="img" aria-label="Hình minh họa sa bàn" preserveAspectRatio="xMidYMid slice">${grid}${body}</svg>`;
  }

  const difficultyMeter = (n) =>
    `<span class="comp-diff" aria-label="Độ khó: ${esc(diffLabel(n))}">${[1, 2, 3, 4]
      .map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`)
      .join('')}<b>${esc(diffLabel(n))}</b></span>`;

  /* ---------- 2. Programs ---------- */
  function renderPrograms() {
    const el = $('#programGrid');
    if (!el) return;
    el.innerHTML = DATA.programs
      .map(
        (p, i) => `
      <article class="comp-program-card accent-${esc(p.accent)} reveal" style="--d:${i * 70}ms">
        <a class="comp-program-link" href="${esc(p.href)}" aria-label="${esc(p.name)} – Khám phá lộ trình">
          <div class="comp-program-media">
            <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async" />
            ${p.age ? `<span class="comp-program-age">${esc(p.age)}</span>` : ''}
          </div>
          <div class="comp-program-body">
            <span class="comp-program-ico" aria-hidden="true">${p.icon}</span>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.intro)}</p>
            <ul class="comp-skill-list">${p.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
            <span class="comp-card-cta">Khám phá lộ trình <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </article>`
      )
      .join('');
  }

  /* ---------- 3. Challenge cards ---------- */
  const challengeCard = (c, i = 0) => `
    <article class="comp-challenge-card reveal" style="--d:${i * 80}ms">
      <a href="${challengeUrl(c)}" class="comp-challenge-link" aria-label="${esc(c.name)} – Xem thử thách">
        <div class="comp-challenge-media">
          ${arenaSVG(c.arena)}
          <span class="comp-challenge-code">CHALLENGE ${esc(c.code)}</span>
        </div>
        <div class="comp-challenge-body">
          <span class="comp-challenge-num" aria-hidden="true">${esc(c.code)}</span>
          ${difficultyMeter(c.difficulty)}
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.objective)}</p>
          <ul class="comp-chip-list" aria-label="Kỹ năng cần có">${c.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          ${c.duration ? `<p class="comp-challenge-time">⏱ ${esc(c.duration)}</p>` : ''}
          <span class="comp-card-cta">Xem thử thách <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </article>`;

  function renderChallenges() {
    const el = $('#challengeGrid');
    if (!el) return;
    el.innerHTML = DATA.challenges.map(challengeCard).join('');
    idleArenas(el);
  }

  // Robot trên sa bàn chỉ chạy khi rê chuột / focus vào thẻ — tránh chuyển động liên tục gây rối mắt
  function idleArenas(root) {
    root.querySelectorAll('.comp-challenge-link').forEach((card) => {
      const svg = card.querySelector('svg');
      if (!svg || !svg.pauseAnimations) return;
      svg.pauseAnimations();
      const play = () => svg.unpauseAnimations();
      const stop = () => svg.pauseAnimations();
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focus', play);
      card.addEventListener('blur', stop);
    });
  }

  /* ---------- 4. Roadmap ---------- */
  // Bộ icon nét đồng nhất cho 4 giai đoạn (thay emoji trong dữ liệu)
  const svgIcon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const STAGE_ICONS = [
    svgIcon('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),
    svgIcon('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
    svgIcon('<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>'),
    svgIcon('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M16 5h3a3 3 0 0 1-3 4M8 5H5a3 3 0 0 0 3 4"/><path d="M12 13v4M8 20h8M10 17h4"/>'),
  ];
  function renderRoadmap() {
    const wrap = $('#roadStages');
    const road = $('#compRoadmap');
    if (!wrap || !road) return;
    const stages = DATA.roadmap;
    wrap.innerHTML = stages
      .map(
        (s, i) => `
      <div class="comp-stage" data-index="${i}">
        <button type="button" class="comp-stage-node" aria-pressed="${i === 0}" aria-label="Giai đoạn ${i + 1}: ${esc(s.title)}">
          <span class="comp-stage-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="comp-stage-ico" aria-hidden="true">${STAGE_ICONS[i] || s.icon}</span>
        </button>
        <div class="comp-stage-card">
          <span class="comp-stage-key" lang="en">Stage ${i + 1} · ${esc(s.key)}</span>
          <h3>${esc(s.title)}</h3>
          <ul>${s.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
      </div>`
      )
      .join('');

    const nodes = [...wrap.querySelectorAll('.comp-stage')];
    const setActive = (idx) => {
      nodes.forEach((n, i) => {
        n.classList.toggle('active', i === idx);
        n.classList.toggle('done', i < idx);
        n.querySelector('.comp-stage-node').setAttribute('aria-pressed', String(i === idx));
      });
      road.style.setProperty('--progress', stages.length > 1 ? idx / (stages.length - 1) : 1);
    };
    nodes.forEach((n, i) => {
      n.querySelector('.comp-stage-node').addEventListener('click', () => setActive(i));
      n.addEventListener('mouseenter', () => window.matchMedia('(hover:hover)').matches && setActive(i));
    });
    setActive(0);

    // Lần đầu cuộn tới: chạy qua các giai đoạn để thể hiện tiến trình
    if (!reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          stages.forEach((_, i) => setTimeout(() => setActive(i), 350 + i * 450));
        },
        { threshold: 0.4 }
      );
      io.observe(road);
    } else {
      setActive(stages.length - 1);
    }
  }

  /* ---------- 5. Events ---------- */
  const STATUS = {
    open: ['Đang mở đăng ký', 'open'],
    soon: ['Sắp mở đăng ký', 'soon'],
    full: ['Đã đủ chỗ', 'full'],
    closed: ['Đã đóng đăng ký', 'closed'],
  };
  function renderEvents() {
    const el = $('#eventList');
    if (!el) return;
    const today = new Date().toISOString().slice(0, 10);
    const events = (DATA.events || []).filter((e) => !e.date || e.date >= today).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    if (!events.length) {
      el.innerHTML = `
        <div class="comp-empty">
          <div class="comp-empty-ico" aria-hidden="true">${svgIcon('<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 14h2M13.5 14h2M8.5 17h2"/>')}</div>
          <p>Các sự kiện và thử thách mới đang được MechaBot chuẩn bị. Hãy theo dõi để không bỏ lỡ!</p>
          <a href="#dang-ky" class="btn btn-ghost" data-goal="Tư vấn lộ trình luyện thi">Để lại thông tin để nhận lịch sớm nhất</a>
        </div>`;
      return;
    }
    el.innerHTML = `<div class="comp-event-grid">${events
      .map((e) => {
        const [label, cls] = STATUS[e.status] || STATUS.soon;
        const d = e.date ? new Date(e.date + 'T00:00:00') : null;
        const canRegister = e.status === 'open' && e.ctaHref;
        return `
        <article class="comp-event-card">
          <div class="comp-event-date">${d ? `<b>${String(d.getDate()).padStart(2, '0')}</b><span>Th${d.getMonth() + 1}/${d.getFullYear()}</span>` : '<b>—</b><span>Sắp công bố</span>'}</div>
          <div class="comp-event-body">
            <span class="comp-event-type">${esc(e.type)}</span>
            <h3>${esc(e.name)}</h3>
            <ul class="comp-event-meta">
              ${e.time ? `<li>🕘 ${esc(e.time)}</li>` : ''}
              ${e.location ? `<li>📍 ${esc(e.location)}</li>` : ''}
            </ul>
            <div class="comp-event-foot">
              <span class="comp-status comp-status-${cls}">${label}</span>
              ${canRegister ? `<a class="btn btn-primary btn-sm" href="${esc(e.ctaHref)}">${esc(e.ctaLabel || 'Đăng ký')}</a>` : ''}
            </div>
          </div>
        </article>`;
      })
      .join('')}</div>`;
  }

  /* ---------- 6. Gallery ---------- */
  function renderGallery() {
    const el = $('#gallery');
    if (!el) return;
    // Ô đầu tiên chiếm 2x2; nếu số ô còn lại lẻ, ô media cuối được kéo rộng để lưới không bị hở
    const gallery = DATA.gallery || [];
    const wideIndex = gallery.length > 1 && (gallery.length - 1) % 2 === 1 ? gallery.length - 1 : -1;
    const items = gallery.map((g, i) => {
      const media =
        g.type === 'video'
          ? `<video src="${esc(g.src)}" poster="${esc(g.poster)}" preload="none" muted playsinline loop aria-label="${esc(g.alt)}"></video>
             <button type="button" class="comp-gal-play" aria-label="Phát video: ${esc(g.caption)}">▶</button>`
          : `<img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" />`;
      return `<figure class="comp-gal-item comp-gal-${g.type}${i === wideIndex ? ' comp-gal-wide' : ''}">${media}
        <figcaption><span>${esc(g.tag)}</span>${esc(g.caption)}</figcaption></figure>`;
    });
    const pendingList = DATA.galleryPending || [];
    const pending = pendingList.map(
      (t, i) => `<div class="comp-gal-item comp-gal-pending${pendingList.length % 2 && i === pendingList.length - 1 ? ' comp-gal-full' : ''}"><span aria-hidden="true">✦</span><b>${esc(t)}</b><small>Sẽ được cập nhật khi học sinh hoàn thành</small></div>`
    );
    el.innerHTML = items.concat(pending).join('');
    el.querySelectorAll('.comp-gal-video').forEach((fig) => {
      const v = fig.querySelector('video');
      fig.querySelector('.comp-gal-play').addEventListener('click', () => {
        fig.classList.add('playing');
        v.setAttribute('controls', '');
        v.play();
      });
    });
  }

  /* ---------- CTA → form đăng ký (chọn sẵn nhu cầu) ---------- */
  function wireGoalCtas() {
    const form = $('#registerForm');
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-goal]');
      if (!btn || !form) return;
      const goal = form.querySelector('[name="goal"]');
      if (goal) goal.value = btn.dataset.goal;
      if (btn.tagName === 'BUTTON') {
        $('#dang-ky').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
      setTimeout(() => form.querySelector('[name="name"]')?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
    });
  }

  /* ---------- Challenge detail page (challenge.html?id=...) ---------- */
  function renderChallengeDetail() {
    const el = $('#challengeDetail');
    if (!el) return;
    const id = new URLSearchParams(location.search).get('id');
    const c = DATA.challenges.find((x) => x.id === id);

    if (!c) {
      el.innerHTML = `
        <section class="comp-detail-hero comp-detail-missing">
          <div class="container">
            <h1>Không tìm thấy thử thách</h1>
            <p>Thử thách bạn tìm có thể đã đổi tên hoặc chưa được công bố.</p>
            <a class="btn btn-primary" href="competition.html#arena">← Về MechaBot Challenge Arena</a>
          </div>
        </section>`;
      return;
    }

    document.title = `${c.name} | MechaBot Challenge Arena`;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute('content', `${c.name} – ${c.objective} Thử thách sa bàn tại MechaBot Challenge Arena.`);

    const pending = (what) => `
      <div class="comp-pending">
        <span class="comp-badge-dev">Đang hoàn thiện</span>
        <p>${what} chính thức đang được đội ngũ giảng viên MechaBot xây dựng và sẽ được công bố khi sa bàn hoàn thiện.</p>
      </div>`;
    const list = (arr) => `<ul class="comp-check-list">${arr.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
    const idx = DATA.challenges.indexOf(c);
    const related = DATA.challenges.filter((x) => x !== c);

    el.innerHTML = `
      <section class="comp-detail-hero">
        <div class="comp-hero-grid-bg" aria-hidden="true"></div>
        <div class="container comp-detail-hero-inner">
          <div>
            <nav class="comp-breadcrumb" aria-label="Breadcrumb">
              <a href="competition.html">Competition Academy</a><span aria-hidden="true">/</span>
              <a href="competition.html#arena">Challenge Arena</a><span aria-hidden="true">/</span>
              <span aria-current="page">Challenge ${esc(c.code)}</span>
            </nav>
            <span class="comp-eyebrow comp-eyebrow-light"><span class="comp-eyebrow-dot"></span>CHALLENGE ${esc(c.code)}</span>
            <h1>${esc(c.name)}</h1>
            <p class="comp-detail-obj">${esc(c.objective)}</p>
            <div class="comp-detail-meta">
              ${difficultyMeter(c.difficulty)}
              <span>⏱ ${c.duration ? esc(c.duration) : 'Thời gian: đang cập nhật'}</span>
            </div>
            <div class="comp-hero-ctas">
              <a class="btn btn-primary" href="competition.html#dang-ky">Đăng ký đánh giá năng lực</a>
              <a class="btn comp-btn-ghost" href="competition.html#arena">← Tất cả thử thách</a>
            </div>
          </div>
          <figure class="comp-detail-arena">
            ${arenaSVG(c.arena)}
            <figcaption>Hình minh họa sa bàn — bố cục thực tế có thể khác.</figcaption>
          </figure>
        </div>
      </section>

      <section class="section-pad comp-detail-body">
        <div class="container comp-detail-grid">
          <div class="comp-detail-main">
            <article class="comp-block">
              <h2><span aria-hidden="true">🎯</span> Mô tả nhiệm vụ</h2>
              <p>${esc(c.mission)}</p>
            </article>
            <article class="comp-block">
              <h2><span aria-hidden="true">📜</span> Luật thi đấu</h2>
              ${c.rules.length ? list(c.rules) : pending('Luật thi đấu')}
            </article>
            <article class="comp-block">
              <h2><span aria-hidden="true">🧮</span> Hệ thống tính điểm</h2>
              ${c.scoring.length ? list(c.scoring) : pending('Thang điểm')}
            </article>
            <article class="comp-block">
              <h2><span aria-hidden="true">🎬</span> Video demo</h2>
              ${
                c.video
                  ? `<figure class="comp-detail-video"><video controls preload="none" playsinline poster="${esc(c.video.poster)}" src="${esc(c.video.src)}"></video>
                     <figcaption>${esc(c.video.caption)}</figcaption></figure>`
                  : pending('Video demo của thử thách')
              }
            </article>
          </div>
          <aside class="comp-detail-side">
            <div class="comp-block">
              <h2><span aria-hidden="true">⚙️</span> Yêu cầu kỹ thuật</h2>
              ${list(c.technical)}
              <p class="comp-note">Yêu cầu định hướng — có thể điều chỉnh theo cấp độ học sinh.</p>
            </div>
            <div class="comp-block">
              <h2><span aria-hidden="true">🧠</span> Kỹ năng rèn luyện</h2>
              <ul class="comp-chip-list">${c.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
            </div>
            <div class="comp-block comp-side-cta">
              <h2>Con đã sẵn sàng?</h2>
              <p>Đánh giá năng lực để biết con nên bắt đầu từ thử thách nào.</p>
              <a class="btn btn-primary" href="competition.html#dang-ky">Đăng ký đánh giá</a>
            </div>
          </aside>
        </div>
      </section>

      <section class="section-pad comp-arena comp-related">
        <div class="container">
          <div class="comp-arena-head reveal" style="margin-bottom:36px">
            <div>
              <span class="comp-eyebrow">Tiếp tục thử thách</span>
              <h2>Thử thách liên quan</h2>
            </div>
          </div>
          <div class="comp-challenge-grid comp-challenge-grid-3" id="relatedGrid">${related.map(challengeCard).join('')}</div>
          ${idx < DATA.challenges.length - 1 ? `<p class="comp-next comp-next-dark"><a href="${challengeUrl(DATA.challenges[idx + 1])}">Thử thách tiếp theo: ${esc(DATA.challenges[idx + 1].name)} →</a></p>` : ''}
        </div>
      </section>`;
  }

  renderPrograms();
  renderChallenges();
  renderRoadmap();
  renderEvents();
  renderGallery();
  renderChallengeDetail();
  if ($('#relatedGrid')) idleArenas($('#relatedGrid'));
  wireGoalCtas();
})();
