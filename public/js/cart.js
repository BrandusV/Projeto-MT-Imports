// MP IMPORTS — Cart State Manager
const CartState = {
  items: [],
  count: 0,
  total: 0,

  async init() {
    try {
      this.items = await CartAPI.get();
      this.updateCount();
      this.updateUI();
    } catch (e) { this.items = []; }
  },

  async add(productId, size, quantity = 1) {
    try {
      await CartAPI.add(productId, size, quantity);
      this.items = await CartAPI.get();
      this.updateCount();
      this.updateUI();
      this.showToast('Produto adicionado ao carrinho! 🛒');
      this.updateCartDrawer();
    } catch (e) {
      this.showToast('Erro ao adicionar produto.', 'error');
    }
  },

  async update(itemId, quantity) {
    try {
      await CartAPI.update(itemId, quantity);
      this.items = await CartAPI.get();
      this.updateCount();
    } catch (e) {}
  },

  async remove(itemId) {
    try {
      await CartAPI.remove(itemId);
      this.items = await CartAPI.get();
      this.updateCount();
      this.updateUI();
      this.updateCartDrawer();
    } catch (e) {}
  },

  async clear() {
    try {
      await CartAPI.clear();
      this.items = [];
      this.count = 0;
      this.total = 0;
      this.updateCount();
    } catch (e) {}
  },

  updateCount() {
    this.count = this.items.reduce((s, i) => s + i.quantity, 0);
    this.total = this.items.reduce((s, i) => s + i.price * i.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.count;
      el.style.display = this.count > 0 ? 'flex' : 'none';
    });
  },

  updateUI() { /* Called externally on cart page */ },

  updateCartDrawer() {
    const drawer = document.getElementById('cart-drawer-items');
    if (!drawer) return;
    if (this.items.length === 0) {
      drawer.innerHTML = `
        <div style="text-align:center;padding:40px 20px;">
          <i class="ph-bold ph-shopping-cart" style="font-size:48px;color:#2a2a3a;"></i>
          <p style="color:#555;margin-top:12px;">Carrinho vazio</p>
          <a href="/" style="color:#FFD700;font-family:'Boogaloo',cursive;font-size:16px;">Ver Produtos</a>
        </div>`;
      return;
    }
    drawer.innerHTML = this.items.map(i => `
      <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #1a1a2e;">
        <img src="${i.image_url}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;border:1px solid #2a2a3a;" onerror="this.src='https://via.placeholder.com/60x60/14141f/7B2FBE?text=MP'">
        <div style="flex:1;min-width:0;">
          <div style="font-size:11px;color:#FF1493;font-family:'Boogaloo',cursive;">${i.brand}</div>
          <div style="font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${i.name}</div>
          <div style="font-size:12px;color:#666;">${i.size ? 'Tam: ' + i.size : ''} × ${i.quantity}</div>
        </div>
        <div style="font-family:'Bangers',cursive;font-size:18px;color:#FFD700;white-space:nowrap;">${formatCartPrice(i.price * i.quantity)}</div>
      </div>`).join('');
    const total = document.getElementById('cart-drawer-total');
    if (total) total.textContent = formatCartPrice(this.total);
  },

  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'error' ? 'rgba(255,20,147,0.95)' : 'rgba(57,255,20,0.95)';
    const color = type === 'error' ? '#fff' : '#0a0a0a';
    toast.style.cssText = `background:${bg};color:${color};padding:14px 20px;border-radius:10px;font-family:'Boogaloo',cursive;font-size:16px;box-shadow:0 4px 20px rgba(0,0,0,0.5);transform:translateX(100%);transition:transform 0.3s;max-width:300px;`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

function formatCartPrice(v) {
  return 'R$ ' + Number(v).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
