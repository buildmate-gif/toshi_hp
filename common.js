// =============================================
// COMMON NAV + FOOTER INJECTION
// =============================================

(function() {
  // Determine current page for active nav state
  const page = location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'about.html',    label: 'プロフィール' },
    { href: 'services.html', label: 'サービス' },
    { href: 'results.html',  label: '実績' },
    { href: 'message.html',  label: '想い' },
    { href: 'media.html',    label: 'メディア' },
    { href: 'blog.html',     label: '発信' },
  ];

  const logoSVG = `<svg class="nav-logo-mark" viewBox="0 0 40 40" fill="none">
    <!-- アイボリー側（下半） -->
    <circle cx="20" cy="20" r="16" fill="#EAE4D6"/>
    <!-- ネイビー側（上半） S字曲線で勾玉の二分割 -->
    <path d="M 20 4 A 16 16 0 0 1 20 36 A 8 8 0 0 0 20 20 A 8 8 0 0 1 20 4 Z" fill="#2D3A64"/>
    <!-- ゴールドの目（ネイビー側） -->
    <circle cx="20" cy="12" r="3.8" fill="#C2A46D"/>
    <!-- ネイビーの目（アイボリー側） -->
    <circle cx="20" cy="28" r="3.8" fill="#2D3A64"/>
    <!-- ゴールドの外輪 -->
    <circle cx="20" cy="20" r="17" stroke="#C2A46D" stroke-width="0.9" fill="none"/>
  </svg>`;

  // Build nav links HTML
  const linksHTML = navLinks.map(l => {
    const isActive = page === l.href ? ' active' : '';
    return `<li><a href="${l.href}" class="${isActive.trim()}">${l.label}</a></li>`;
  }).join('');

  // Mobile menu links
  const mobileLinksHTML = navLinks.map(l =>
    `<a href="${l.href}">${l.label}</a>`
  ).join('');

  // Inject nav
  const navEl = document.getElementById('main-nav');
  if (navEl) {
    navEl.id = 'main-nav';
    if (document.querySelector('.page-hero')) {
      navEl.classList.add('nav-light-text');
    }
    navEl.innerHTML = `
      <a href="index.html" class="nav-logo">
        ${logoSVG}
        <div class="nav-logo-text">
          小畑 寿哉
          <span>TOSHIYA OBATA</span>
        </div>
      </a>
      <ul class="nav-links">
        ${linksHTML}
        <li><a href="contact.html" class="nav-cta">ご相談はこちら</a></li>
      </ul>
      <button class="nav-hamburger" id="hamburger" aria-label="メニュー">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  // Inject mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav-mobile';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.innerHTML = `
    ${mobileLinksHTML}
    <a href="contact.html" class="mobile-cta">ご相談はこちら</a>
  `;
  document.body.insertBefore(mobileMenu, document.body.firstChild);

  // Hamburger toggle
  document.addEventListener('click', function(e) {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    if (btn.contains(e.target)) {
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    } else if (menu.classList.contains('open') && !menu.contains(e.target)) {
      btn.classList.remove('open');
      menu.classList.remove('open');
    }
  });

  // Inject footer
  const footerEl = document.querySelector('footer#main-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="footer-inner">
        <div>
          <div class="footer-logo-text">小畑 寿哉</div>
          <div class="footer-logo-en">TOSHIYA OBATA</div>

        </div>
        <nav class="footer-nav">
          ${navLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        </nav>
        <div>
          <div class="footer-contact-label">CONTACT</div>
          <a href="mailto:contact@toshiya-obata.jp" class="footer-contact-email">contact@toshiya-obata.jp</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© ${new Date().getFullYear()} Toshiya Obata. All rights reserved.</div>
        <div class="footer-copy">静かな変容の場</div>
      </div>
    `;
  }

  // Keep reveal-marked sections visible without scroll animation.
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });

  // Page fade-in on load
  document.body.classList.add('page-fade-in');

  // Page transition: fade out on link click
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Only intercept internal .html links
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('tel:')) return;
    e.preventDefault();
    document.body.classList.add('page-fade-out');
    setTimeout(() => { window.location.href = href; }, 300);
  });

  // Back-to-top button
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.setAttribute('aria-label', 'ページトップへ戻る');
  topBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M2 6l5-5 5 5" stroke="currentColor" stroke-width="1.2"/></svg>';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Limit scroll work to nav state and back-to-top visibility only.
  const nav = document.getElementById('main-nav');
  let latestScrollY = window.scrollY;
  let scrollTicking = false;

  const applyScrollEffects = () => {
    if (nav) nav.classList.toggle('scrolled', latestScrollY > 60);
    topBtn.classList.toggle('visible', latestScrollY > 400);
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    latestScrollY = window.scrollY;
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(applyScrollEffects);
  }, { passive: true });

  applyScrollEffects();

})();
