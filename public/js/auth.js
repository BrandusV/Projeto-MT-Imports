// MP IMPORTS — Auth State Manager
const AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  callbacks: [],

  async init() {
    const token = localStorage.getItem('mpimports_token');
    const userStr = localStorage.getItem('mpimports_user');
    if (token && userStr) {
      try {
        this.token = token;
        this.user = JSON.parse(userStr);
        this.isAuthenticated = true;
        // Verify token is still valid
        const data = await AuthAPI.me();
        this.user = data.user || this.user;
        localStorage.setItem('mpimports_user', JSON.stringify(this.user));
      } catch (e) {
        this.logout();
      }
    }
    this.updateUI();
    this.callbacks.forEach(cb => cb(this.isAuthenticated, this.user));
  },

  login(token, user) {
    this.token = token;
    this.user = user;
    this.isAuthenticated = true;
    localStorage.setItem('mpimports_token', token);
    localStorage.setItem('mpimports_user', JSON.stringify(user));
    this.updateUI();
    this.callbacks.forEach(cb => cb(true, user));
  },

  logout() {
    this.token = null;
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem('mpimports_token');
    localStorage.removeItem('mpimports_user');
    AuthAPI.logout().catch(() => {});
    this.updateUI();
    this.callbacks.forEach(cb => cb(false, null));
  },

  onAuthChange(callback) {
    this.callbacks.push(callback);
  },

  updateUI() {
    const userLinks = document.querySelectorAll('[data-auth-link]');
    userLinks.forEach(el => {
      if (this.isAuthenticated) {
        el.href = '#';
        el.title = this.user?.name || 'Minha Conta';
        const icon = el.querySelector('i');
        if (icon) icon.style.color = '#39FF14';
      } else {
        el.href = '/login.html';
        el.title = 'Entrar';
        const icon = el.querySelector('i');
        if (icon) icon.style.color = '';
      }
    });
    const logoutBtns = document.querySelectorAll('[data-logout]');
    logoutBtns.forEach(btn => {
      btn.style.display = this.isAuthenticated ? 'block' : 'none';
      btn.addEventListener('click', (e) => { e.preventDefault(); this.logout(); window.location.href = '/'; });
    });
  },

  requireAuth(redirectPath) {
    if (!this.isAuthenticated) {
      window.location.href = '/login.html?redirect=' + encodeURIComponent(redirectPath || window.location.pathname);
    }
  }
};
