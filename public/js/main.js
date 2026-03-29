// MP IMPORTS — Shared UI (header, footer, drawers)

const ANNOUNCEMENT_HTML = `
<div id="announcement-bar">
  <div class="announcement-inner">
    <span><i class="ph-bold ph-crown"></i> FRETE GRÁTIS acima de R$500</span>
    <span class="sep">|</span>
    <span><i class="ph-bold ph-lightning"></i> PARCELAMENTO em até 12x sem juros</span>
    <span class="sep">|</span>
    <span><i class="ph-bold ph-star"></i> IMPORTADOS PREMIUM</span>
  </div>
</div>`;

const HEADER_HTML = `
<header class="site-header">
  <div class="header-inner container">
    <div class="header-left">
      <button class="icon-btn hamburger" id="hamburger-btn" aria-label="Menu">
        <i class="ph-bold ph-list"></i>
      </button>
      <button class="icon-btn" id="search-toggle" aria-label="Buscar">
        <i class="ph-bold ph-magnifying-glass"></i>
      </button>
    </div>
    <a href="/" class="logo">
      <span class="logo-main">MP IMPORTS</span>
      <span class="logo-sub">STREET STYLE &amp; IMPORTS</span>
    </a>
    <nav class="main-nav">
      <a href="/" class="nav-link" data-path="/">HOME</a>
      <div class="nav-item has-dropdown">
        <a href="/categoria.html?cat=tenis" class="nav-link" data-path="/categoria.html?cat=tenis">TÊNIS</a>
        <div class="nav-dropdown">
          <a href="/categoria.html?cat=tenis&sub=air-force">Air Force</a>
          <a href="/categoria.html?cat=tenis&sub=dunk">Dunk</a>
          <a href="/categoria.html?cat=tenis&sub=air-jordan-1">Air Jordan 1</a>
          <a href="/categoria.html?cat=tenis&sub=air-jordan-3">Air Jordan 3</a>
          <a href="/categoria.html?cat=tenis&sub=air-jordan-4">Air Jordan 4</a>
        </div>
      </div>
      <a href="/categoria.html?cat=jaquetas" class="nav-link" data-path="/categoria.html?cat=jaquetas">JAQUETAS</a>
      <a href="/categoria.html?cat=roupas" class="nav-link" data-path="/categoria.html?cat=roupas">ROUPAS</a>
      <a href="/categoria.html?cat=bolsas" class="nav-link" data-path="/categoria.html?cat=bolsas">BOLSAS</a>
      <a href="/contato.html" class="nav-link" data-path="/contato.html">CONTATO</a>
    </nav>
    <div class="header-right">
      <a href="/login.html" class="icon-btn" data-auth-link aria-label="Conta">
        <i class="ph-bold ph-user"></i>
      </a>
      <button class="icon-btn cart-btn" id="cart-toggle" aria-label="Carrinho">
        <i class="ph-bold ph-shopping-cart"></i>
        <span class="cart-count" style="display:none;">0</span>
      </button>
    </div>
  </div>
  <div class="search-bar" id="search-bar">
    <div class="container">
      <form class="search-form" onsubmit="handleSearch(event)">
        <i class="ph-bold ph-magnifying-glass"></i>
        <input type="text" id="search-input" placeholder="Buscar produtos, marcas..." autocomplete="off">
        <button type="button" id="search-close"><i class="ph-bold ph-x"></i></button>
      </form>
    </div>
  </div>
</header>
<!-- Mobile Nav -->
<div class="mobile-overlay" id="mobile-overlay"></div>
<nav class="mobile-nav" id="mobile-nav">
  <div class="mobile-nav-header">
    <span class="logo-main" style="font-size:24px;">MP IMPORTS</span>
    <button class="icon-btn" id="mobile-close"><i class="ph-bold ph-x"></i></button>
  </div>
  <div class="mobile-nav-links">
    <a href="/"><i class="ph-bold ph-house"></i> Home</a>
    <div class="mobile-nav-parent">
      <a href="/categoria.html?cat=tenis"><i class="ph-bold ph-sneaker"></i> Tênis</a>
      <div class="mobile-sub">
        <a href="/categoria.html?cat=tenis&sub=air-force">Air Force</a>
        <a href="/categoria.html?cat=tenis&sub=dunk">Dunk</a>
        <a href="/categoria.html?cat=tenis&sub=air-jordan-1">Air Jordan 1</a>
        <a href="/categoria.html?cat=tenis&sub=air-jordan-3">Air Jordan 3</a>
        <a href="/categoria.html?cat=tenis&sub=air-jordan-4">Air Jordan 4</a>
      </div>
    </div>
    <a href="/categoria.html?cat=jaquetas"><i class="ph-bold ph-jacket"></i> Jaquetas</a>
    <a href="/categoria.html?cat=roupas"><i class="ph-bold ph-t-shirt"></i> Roupas</a>
    <a href="/categoria.html?cat=bolsas"><i class="ph-bold ph-handbag"></i> Bolsas</a>
    <a href="/contato.html"><i class="ph-bold ph-chat-circle"></i> Contato</a>
    <a href="/carrinho.html"><i class="ph-bold ph-shopping-cart"></i> Carrinho</a>
    <a href="/login.html"><i class="ph-bold ph-user"></i> Minha Conta</a>
  </div>
</nav>
<!-- Cart Drawer -->
<div class="mobile-overlay" id="cart-overlay"></div>
<div class="cart-drawer" id="cart-drawer">
  <div class="cart-drawer-header">
    <h3 class="cart-drawer-title">MEU CARRINHO</h3>
    <button class="icon-btn" id="cart-close"><i class="ph-bold ph-x"></i></button>
  </div>
  <div class="cart-drawer-items" id="cart-drawer-items">
    <div style="text-align:center;padding:40px 20px;">
      <i class="ph-bold ph-shopping-cart" style="font-size:48px;color:#2a2a3a;"></i>
      <p style="color:#555;margin-top:12px;">Carrinho vazio</p>
    </div>
  </div>
  <div class="cart-drawer-footer">
    <div class="cart-drawer-total-row">
      <span>TOTAL:</span>
      <span id="cart-drawer-total" style="font-family:'Bangers',cursive;font-size:22px;color:#FFD700;">R$ 0,00</span>
    </div>
    <a href="/carrinho.html" class="cart-drawer-btn">VER CARRINHO</a>
    <a href="/checkout.html" class="cart-drawer-btn" style="background:linear-gradient(135deg,#7B2FBE,#FF1493);">FINALIZAR COMPRA</a>
  </div>
</div>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-drip"></div>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="logo-main footer-logo">MP IMPORTS</div>
        <p class="footer-desc">Importados premium com a pegada do street. A intersecção do luxo e do urbano.</p>
        <div class="social-links">
          <a href="#" class="social-btn instagram" aria-label="Instagram"><i class="ph-bold ph-instagram-logo"></i></a>
          <a href="#" class="social-btn whatsapp" aria-label="WhatsApp"><i class="ph-bold ph-whatsapp-logo"></i></a>
          <a href="#" class="social-btn facebook" aria-label="Facebook"><i class="ph-bold ph-facebook-logo"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">LOJA</h4>
        <ul class="footer-links">
          <li><a href="/categoria.html?cat=tenis">Tênis</a></li>
          <li><a href="/categoria.html?cat=bolsas">Bolsas</a></li>
          <li><a href="/categoria.html?cat=jaquetas">Jaquetas</a></li>
          <li><a href="/categoria.html?cat=roupas">Roupas</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">SUPORTE</h4>
        <ul class="footer-links">
          <li><a href="/contato.html">Contato</a></li>
          <li><a href="/contato.html">Rastreamento</a></li>
          <li><a href="/contato.html">Trocas e Devoluções</a></li>
          <li><a href="/contato.html">Política de Privacidade</a></li>
          <li><a href="/contato.html">Guia de Tamanhos</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">NEWSLETTER</h4>
        <p style="color:#666;font-size:14px;margin-bottom:16px;">Fique por dentro dos drops exclusivos.</p>
        <form class="newsletter-form" onsubmit="subscribeNewsletter(event)">
          <input type="email" placeholder="seu@email.com" class="newsletter-input" required>
          <button type="submit" class="newsletter-btn">ENTRAR</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p style="color:#333;font-size:13px;">© 2026 MP IMPORTS. Todos os direitos reservados.</p>
      <div class="payment-methods">
        <span class="pay-chip">PIX</span>
        <span class="pay-chip">VISA</span>
        <span class="pay-chip">MASTER</span>
        <span class="pay-chip">AMEX</span>
        <span class="pay-chip">BOLETO</span>
      </div>
    </div>
  </div>
</footer>
<div id="cookie-banner" style="display:none;">
  <div class="cookie-inner">
    <p>Usamos cookies para melhorar sua experiência. <a href="#" style="color:#FFD700;">Saiba mais</a></p>
    <button onclick="acceptCookies()" class="cookie-btn">ENTENDI</button>
  </div>
</div>`;

function injectHeader() {
  const ph = document.getElementById('header-placeholder');
  if (ph) ph.outerHTML = HEADER_HTML;
  const aph = document.getElementById('announcement-placeholder');
  if (aph) aph.outerHTML = ANNOUNCEMENT_HTML;
  setActiveNav();
}

function injectFooter() {
  const ph = document.getElementById('footer-placeholder');
  if (ph) ph.innerHTML = FOOTER_HTML;
}

function setActiveNav() {
  const path = window.location.pathname;
  const search = window.location.search;
  const full = path + search;
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = link.getAttribute('data-path') || link.getAttribute('href');
    if (lp === '/' ? path === '/' : full.includes(lp.split('?')[0]) || (link.closest('.nav-item') && full.includes('cat='))) {
      // Check query param match
      if (lp.includes('?')) {
        const lq = new URLSearchParams(lp.split('?')[1]);
        const pq = new URLSearchParams(search);
        if (lq.get('cat') === pq.get('cat')) link.classList.add('active');
      } else if (lp === '/' && path === '/') {
        link.classList.add('active');
      } else if (lp !== '/' && path.includes(lp.replace('?',''))) {
        link.classList.add('active');
      }
    }
  });
}

function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-close');
  function openNav() { mobileNav?.classList.add('open'); overlay?.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeNav() { mobileNav?.classList.remove('open'); overlay?.classList.remove('active'); document.body.style.overflow = ''; }
  hamburger?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);
}

function initCartDrawer() {
  const cartBtn = document.getElementById('cart-toggle');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const closeBtn = document.getElementById('cart-close');
  function openCart() { drawer?.classList.add('open'); overlay?.classList.add('active'); document.body.style.overflow = 'hidden'; CartState.updateCartDrawer(); }
  function closeCart() { drawer?.classList.remove('open'); overlay?.classList.remove('active'); document.body.style.overflow = ''; }
  cartBtn?.addEventListener('click', openCart);
  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
}

function initSearch() {
  const toggle = document.getElementById('search-toggle');
  const bar = document.getElementById('search-bar');
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');
  toggle?.addEventListener('click', () => { bar?.classList.toggle('open'); if (bar?.classList.contains('open')) input?.focus(); });
  closeBtn?.addEventListener('click', () => bar?.classList.remove('open'));
}

function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById('search-input')?.value.trim();
  if (q) window.location.href = '/categoria.html?search=' + encodeURIComponent(q);
}

function initCookieBanner() {
  if (!localStorage.getItem('mpimports_cookies')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'flex';
  }
}

function acceptCookies() {
  localStorage.setItem('mpimports_cookies', '1');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = '✓';
  btn.style.background = '#39FF14';
  btn.style.color = '#0a0a0a';
  input.value = '';
  setTimeout(() => { btn.textContent = 'ENTRAR'; btn.style.background = ''; btn.style.color = ''; }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  injectHeader();
  injectFooter();
  initMobileNav();
  initCartDrawer();
  initSearch();
  initCookieBanner();
  await AuthState.init();
  await CartState.init();
});
