// MT IMPORTS — Shared UI (header, footer, drawers)

const TAILWIND_CONFIG_SCRIPT = `<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#b8c3ff",
        "primary-container": "#2e5bff",
        "on-primary": "#0a0f42",
        "on-primary-container": "#dde1ff",
        background: "#0a0a0a",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2929",
        "surface-container-highest": "#353534",
        "outline-variant": "#434656",
        "on-surface-variant": "#c4c5d9",
        "on-surface": "#e5e2e1",
        error: "#ffb4ab",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Newsreader", "serif"],
        label: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
};
<\/script>`;

const ANNOUNCEMENT_HTML = `
<div id="announcement-bar">
  <span class="flex items-center gap-1.5"><span class="material-symbols-outlined" style="font-size:13px;color:#b8c3ff;">local_shipping</span> FRETE GRÁTIS acima de R$500</span>
  <span style="color:#434656;">·</span>
  <span class="flex items-center gap-1.5"><span class="material-symbols-outlined" style="font-size:13px;color:#b8c3ff;">credit_card</span> 12x SEM JUROS</span>
  <span style="color:#434656;">·</span>
  <span class="flex items-center gap-1.5"><span class="material-symbols-outlined" style="font-size:13px;color:#b8c3ff;">public</span> IMPORTADOS PREMIUM</span>
</div>`;

const HEADER_HTML = `
<header id="site-header" style="position:fixed;top:0;width:100%;z-index:500;background:rgba(10,10,10,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(67,70,86,0.4);height:64px;display:flex;align-items:center;">
  <div style="max-width:1280px;margin:0 auto;padding:0 20px;width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;">

    <!-- Left: Hamburger + Desktop Nav -->
    <div style="display:flex;align-items:center;gap:20px;">
      <button id="hamburger-btn" class="lg-hidden" style="padding:8px;color:#c4c5d9;background:none;border:none;cursor:pointer;display:none;" aria-label="Menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <nav id="desktop-nav" style="display:flex;align-items:center;gap:4px;">
        <a href="/" class="nav-link" data-path="/" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;">Drops</a>
        <div class="nav-item" style="position:relative;">
          <a href="/categoria.html?cat=tenis" class="nav-link" data-path="/categoria.html?cat=tenis" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;display:flex;align-items:center;gap:2px;">Archive <span class="material-symbols-outlined" style="font-size:14px;">expand_more</span></a>
          <div class="nav-dropdown">
            <a href="/categoria.html?cat=tenis&sub=air-force">Air Force</a>
            <a href="/categoria.html?cat=tenis&sub=dunk">Dunk</a>
            <a href="/categoria.html?cat=tenis&sub=air-jordan-1">Air Jordan 1</a>
            <a href="/categoria.html?cat=tenis&sub=air-jordan-3">Air Jordan 3</a>
            <a href="/categoria.html?cat=tenis&sub=air-jordan-4">Air Jordan 4</a>
          </div>
        </div>
        <a href="/categoria.html?cat=jaquetas" class="nav-link" data-path="/categoria.html?cat=jaquetas" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;">Jaquetas</a>
        <a href="/categoria.html?cat=roupas" class="nav-link" data-path="/categoria.html?cat=roupas" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;">Roupas</a>
        <a href="/categoria.html?cat=bolsas" class="nav-link" data-path="/categoria.html?cat=bolsas" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;">Bolsas</a>
        <a href="/contato.html" class="nav-link" data-path="/contato.html" style="padding:6px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:10px;transition:color 0.2s;">Contato</a>
      </nav>
    </div>

    <!-- Center: Logo -->
    <a href="/" style="position:absolute;left:50%;transform:translateX(-50%);font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;color:#e5e2e1;white-space:nowrap;text-decoration:none;">MT IMPORTS</a>

    <!-- Right: Actions -->
    <div style="display:flex;align-items:center;gap:4px;">
      <button id="search-toggle" style="padding:8px;color:#c4c5d9;background:none;border:none;cursor:pointer;border-radius:10px;transition:color 0.2s;" aria-label="Buscar">
        <span class="material-symbols-outlined">search</span>
      </button>
      <a href="/login.html" data-auth-link style="padding:8px;color:#c4c5d9;border-radius:10px;transition:color 0.2s;line-height:0;" aria-label="Conta">
        <span class="material-symbols-outlined">person</span>
      </a>
      <button id="cart-toggle" style="padding:8px;color:#c4c5d9;background:none;border:none;cursor:pointer;border-radius:10px;transition:color 0.2s;position:relative;" aria-label="Carrinho">
        <span class="material-symbols-outlined">shopping_bag</span>
        <span class="cart-count" style="display:none;position:absolute;top:2px;right:2px;min-width:16px;height:16px;background:#2e5bff;color:#fff;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;border-radius:999px;display:none;align-items:center;justify-content:center;padding:0 3px;">0</span>
      </button>
    </div>
  </div>

  <!-- Search Bar -->
  <div id="search-bar">
    <form style="max-width:640px;margin:0 auto;display:flex;align-items:center;gap:12px;" onsubmit="handleSearch(event)">
      <span class="material-symbols-outlined" style="color:#c4c5d9;">search</span>
      <input type="text" id="search-input" placeholder="Buscar produtos, marcas..." style="flex:1;background:transparent;border:none;outline:none;color:#e5e2e1;font-family:'Manrope',sans-serif;font-size:13px;letter-spacing:0.05em;" autocomplete="off">
      <button type="button" id="search-close" style="background:none;border:none;cursor:pointer;color:#c4c5d9;padding:4px;">
        <span class="material-symbols-outlined">close</span>
      </button>
    </form>
  </div>
</header>

<!-- Mobile Overlay -->
<div class="mobile-overlay" id="mobile-overlay"></div>
<div class="mobile-overlay" id="cart-overlay"></div>

<!-- Mobile Nav Drawer -->
<nav class="mobile-nav" id="mobile-nav">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid #434656;">
    <span style="font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:900;text-transform:uppercase;color:#e5e2e1;">MT IMPORTS</span>
    <button id="mobile-close" style="background:none;border:none;cursor:pointer;color:#c4c5d9;padding:4px;">
      <span class="material-symbols-outlined">close</span>
    </button>
  </div>
  <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:4px;">
    <a href="/" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;transition:background 0.2s;">
      <span class="material-symbols-outlined" style="font-size:18px;">home</span> Drops
    </a>
    <a href="/categoria.html?cat=tenis" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;transition:background 0.2s;">
      <span class="material-symbols-outlined" style="font-size:18px;">inventory_2</span> Tênis
    </a>
    <a href="/categoria.html?cat=tenis&sub=air-force" style="display:flex;padding:8px 12px 8px 40px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;opacity:0.65;border-radius:12px;">Air Force</a>
    <a href="/categoria.html?cat=tenis&sub=dunk" style="display:flex;padding:8px 12px 8px 40px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;opacity:0.65;border-radius:12px;">Dunk</a>
    <a href="/categoria.html?cat=tenis&sub=air-jordan-1" style="display:flex;padding:8px 12px 8px 40px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;opacity:0.65;border-radius:12px;">Air Jordan 1</a>
    <a href="/categoria.html?cat=jaquetas" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">dry_cleaning</span> Jaquetas
    </a>
    <a href="/categoria.html?cat=roupas" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">checkroom</span> Roupas
    </a>
    <a href="/categoria.html?cat=bolsas" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">shopping_bag</span> Bolsas
    </a>
    <a href="/contato.html" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">chat</span> Contato
    </a>
  </div>
  <div style="padding:16px;border-top:1px solid #434656;display:flex;flex-direction:column;gap:4px;">
    <a href="/carrinho.html" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">shopping_cart</span> Carrinho
    </a>
    <a href="/login.html" style="display:flex;align-items:center;gap:10px;padding:10px 12px;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;border-radius:12px;">
      <span class="material-symbols-outlined" style="font-size:18px;">person</span> Minha Conta
    </a>
  </div>
</nav>

<!-- Cart Drawer -->
<div class="cart-drawer" id="cart-drawer">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid #434656;">
    <h3 style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#e5e2e1;">Meu Carrinho</h3>
    <button id="cart-close" style="background:none;border:none;cursor:pointer;color:#c4c5d9;padding:4px;">
      <span class="material-symbols-outlined">close</span>
    </button>
  </div>
  <div id="cart-drawer-items" style="flex:1;overflow-y:auto;padding:16px;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:40px 20px;text-align:center;">
      <span class="material-symbols-outlined" style="font-size:48px;color:#434656;">shopping_bag</span>
      <p style="font-family:'Manrope',sans-serif;font-size:12px;color:#c4c5d9;">Carrinho vazio</p>
    </div>
  </div>
  <div style="padding:16px;border-top:1px solid #434656;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <span style="font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4c5d9;">Total</span>
      <span id="cart-drawer-total" style="font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:#b8c3ff;">R$ 0,00</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <a href="/carrinho.html" class="btn-prime" style="display:block;width:100%;padding:12px;background:#201f1f;border:1px solid #434656;border-radius:12px;color:#e5e2e1;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-align:center;text-decoration:none;">Ver Carrinho</a>
      <a href="/checkout.html" class="btn-prime" style="display:block;width:100%;padding:12px;background:#2e5bff;border-radius:12px;color:#fff;font-family:'Manrope',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-align:center;text-decoration:none;">Finalizar Compra</a>
    </div>
  </div>
</div>

<!-- Mobile Bottom Nav -->
<nav style="display:none;" id="mobile-bottom-nav">
  <a href="/" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px;color:#c4c5d9;text-decoration:none;">
    <span class="material-symbols-outlined" style="font-size:22px;">home</span>
    <span style="font-family:'Manrope',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Drops</span>
  </a>
  <a href="/categoria.html?cat=tenis" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px;color:#c4c5d9;text-decoration:none;">
    <span class="material-symbols-outlined" style="font-size:22px;">inventory_2</span>
    <span style="font-family:'Manrope',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Archive</span>
  </a>
  <a href="/carrinho.html" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px;color:#c4c5d9;text-decoration:none;">
    <span class="material-symbols-outlined" style="font-size:22px;">shopping_bag</span>
    <span style="font-family:'Manrope',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Cart</span>
  </a>
  <a href="/categoria.html?cat=bolsas" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px;color:#c4c5d9;text-decoration:none;">
    <span class="material-symbols-outlined" style="font-size:22px;">lock</span>
    <span style="font-family:'Manrope',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Vault</span>
  </a>
  <a href="/login.html" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px;color:#c4c5d9;text-decoration:none;">
    <span class="material-symbols-outlined" style="font-size:22px;">person</span>
    <span style="font-family:'Manrope',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Profile</span>
  </a>
</nav>`;

const FOOTER_HTML = `
<footer style="background:#0e0e0e;border-top:1px solid rgba(67,70,86,0.4);margin-top:0;">
  <div style="max-width:1280px;margin:0 auto;padding:64px 20px 40px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:48px;margin-bottom:48px;">
      <!-- Brand -->
      <div style="grid-column:span 2;" class="footer-brand-col">
        <a href="/" style="font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:900;text-transform:uppercase;color:#e5e2e1;text-decoration:none;display:block;margin-bottom:16px;">MT IMPORTS</a>
        <p style="font-family:'Newsreader',serif;font-style:italic;font-size:14px;color:#c4c5d9;line-height:1.7;max-width:280px;margin-bottom:20px;">Importados premium com a identidade do street. A intersecção do luxo e do urbano.</p>
        <div style="display:flex;gap:8px;">
          <a href="#" class="btn-prime" style="width:36px;height:36px;background:#201f1f;border:1px solid #434656;border-radius:10px;color:#c4c5d9;text-decoration:none;" aria-label="Instagram"><span class="material-symbols-outlined" style="font-size:17px;">photo_camera</span></a>
          <a href="https://wa.me/5511999999999" class="btn-prime" style="width:36px;height:36px;background:#201f1f;border:1px solid #434656;border-radius:10px;color:#c4c5d9;text-decoration:none;" target="_blank" aria-label="WhatsApp"><span class="material-symbols-outlined" style="font-size:17px;">chat</span></a>
        </div>
      </div>
      <!-- Archive -->
      <div>
        <h4 style="font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#e5e2e1;margin-bottom:16px;">Archive</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;">
          <li><a href="/categoria.html?cat=tenis" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Tênis</a></li>
          <li><a href="/categoria.html?cat=bolsas" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Bolsas</a></li>
          <li><a href="/categoria.html?cat=jaquetas" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Jaquetas</a></li>
          <li><a href="/categoria.html?cat=roupas" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Roupas</a></li>
        </ul>
      </div>
      <!-- Support + Newsletter -->
      <div>
        <h4 style="font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#e5e2e1;margin-bottom:16px;">Suporte</h4>
        <ul style="list-style:none;padding:0;margin:0 0 24px 0;display:flex;flex-direction:column;gap:10px;">
          <li><a href="/contato.html" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Contato</a></li>
          <li><a href="/contato.html" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Rastreamento</a></li>
          <li><a href="/contato.html" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Trocas e Dev.</a></li>
          <li><a href="/contato.html" style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;text-decoration:none;">Privacidade</a></li>
        </ul>
        <h4 style="font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#e5e2e1;margin-bottom:12px;">Newsletter</h4>
        <form onsubmit="subscribeNewsletter(event)" style="display:flex;flex-direction:column;gap:8px;">
          <input type="email" placeholder="seu@email.com" class="input-prime" style="background:#201f1f;border:1px solid #434656;border-radius:10px;padding:10px 12px;color:#e5e2e1;font-family:'Manrope',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;width:100%;" required>
          <button type="submit" class="btn-prime" style="padding:10px;background:#2e5bff;border:none;border-radius:10px;color:#fff;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;">Inscrever</button>
        </form>
      </div>
    </div>
    <div style="border-top:1px solid rgba(67,70,86,0.4);padding-top:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <p style="font-family:'Manrope',sans-serif;font-size:10px;color:#434656;">© 2026 MT IMPORTS. Todos os direitos reservados.</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <span style="background:#201f1f;border:1px solid #434656;border-radius:6px;padding:3px 8px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;">PIX</span>
        <span style="background:#201f1f;border:1px solid #434656;border-radius:6px;padding:3px 8px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;">VISA</span>
        <span style="background:#201f1f;border:1px solid #434656;border-radius:6px;padding:3px 8px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;">MASTER</span>
        <span style="background:#201f1f;border:1px solid #434656;border-radius:6px;padding:3px 8px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;">AMEX</span>
        <span style="background:#201f1f;border:1px solid #434656;border-radius:6px;padding:3px 8px;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c4c5d9;">BOLETO</span>
      </div>
    </div>
  </div>
</footer>
<div id="cookie-banner" style="display:none;position:fixed;bottom:0;left:0;right:0;z-index:9990;background:#0e0e0e;border-top:1px solid #434656;padding:14px 20px;align-items:center;justify-content:space-between;gap:16px;">
  <p style="font-family:'Manrope',sans-serif;font-size:11px;color:#c4c5d9;">Usamos cookies para melhorar sua experiência. <a href="#" style="color:#b8c3ff;text-decoration:underline;">Saiba mais</a></p>
  <button onclick="acceptCookies()" class="btn-prime" style="padding:8px 16px;background:#2e5bff;border:none;border-radius:8px;color:#fff;font-family:'Manrope',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap;">Entendi</button>
</div>`;

function injectHeader() {
  const ph = document.getElementById('header-placeholder');
  if (ph) ph.outerHTML = HEADER_HTML;
  const aph = document.getElementById('announcement-placeholder');
  if (aph) aph.outerHTML = ANNOUNCEMENT_HTML;
  setActiveNav();
  applyResponsiveNav();
}

function injectFooter() {
  const ph = document.getElementById('footer-placeholder');
  if (ph) ph.innerHTML = FOOTER_HTML;
}

function applyResponsiveNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const desktopNav = document.getElementById('desktop-nav');
  const bottomNav = document.getElementById('mobile-bottom-nav');
  function check() {
    const isMobile = window.innerWidth < 1024;
    if (hamburger) hamburger.style.display = isMobile ? 'flex' : 'none';
    if (desktopNav) desktopNav.style.display = isMobile ? 'none' : 'flex';
    if (bottomNav) {
      bottomNav.style.display = isMobile ? 'flex' : 'none';
      if (isMobile) {
        Object.assign(bottomNav.style, {
          position: 'fixed', bottom: '0', left: '0', right: '0',
          zIndex: '400', background: 'rgba(14,14,14,0.95)',
          backdropFilter: 'blur(20px)', borderTop: '1px solid #434656',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          padding: '6px 0'
        });
      }
    }
  }
  check();
  window.addEventListener('resize', check);
}

function setActiveNav() {
  const path = window.location.pathname;
  const search = window.location.search;
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = link.getAttribute('data-path') || link.getAttribute('href');
    if (!lp) return;
    if (lp.includes('?')) {
      const lq = new URLSearchParams(lp.split('?')[1]);
      const pq = new URLSearchParams(search);
      if (lq.get('cat') === pq.get('cat')) link.classList.add('active');
    } else if (lp === '/' && path === '/') {
      link.classList.add('active');
    } else if (lp !== '/' && path.includes(lp.replace('?', ''))) {
      link.classList.add('active');
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
  const original = btn.textContent;
  btn.textContent = '✓ Inscrito!';
  btn.style.background = '#1c1b1b';
  btn.style.border = '1px solid rgba(184,195,255,0.3)';
  btn.style.color = '#b8c3ff';
  input.value = '';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '#2e5bff';
    btn.style.border = '';
    btn.style.color = '#fff';
  }, 3000);
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
