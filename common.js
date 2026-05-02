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
    <circle cx="20" cy="20" r="18" stroke="var(--gold)" stroke-width="1"/>
    <path class="logo-path-main" d="M10 26 Q15 14 20 18 Q25 22 30 14" stroke-width="1.2" fill="none"/>
    <path class="logo-path-sub" d="M8 30 Q14 22 20 26 Q26 30 32 22" stroke-width="0.8" fill="none" opacity="0.6"/>
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

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
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

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Immediately reveal above-fold elements
  document.querySelectorAll('.above-fold .reveal, .page-hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 150);
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
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 400);
  });

})();
