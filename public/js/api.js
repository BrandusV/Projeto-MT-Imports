// MP IMPORTS — API Helper
const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('mpimports_token');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, { ...options, headers, credentials: 'include' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Erro na requisição');
  return data;
}

const ProductsAPI = {
  getAll: (params = {}) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== null && v !== undefined && v !== '') q.set(k, v); });
    return apiFetch('/products?' + q.toString());
  },
  getFeatured: () => apiFetch('/products/featured'),
  getById: (id) => apiFetch('/products/' + id),
  getByCategory: (category, params = {}) => ProductsAPI.getAll({ ...params, category })
};

const AuthAPI = {
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  me: () => apiFetch('/auth/me')
};

const CartAPI = {
  get: () => apiFetch('/cart'),
  add: (productId, size, quantity = 1) => apiFetch('/cart/add', { method: 'POST', body: JSON.stringify({ product_id: productId, size, quantity }) }),
  update: (itemId, quantity) => apiFetch('/cart/' + itemId, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  remove: (itemId) => apiFetch('/cart/' + itemId, { method: 'DELETE' }),
  clear: () => apiFetch('/cart', { method: 'DELETE' })
};

const OrdersAPI = {
  create: (data) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiFetch('/orders'),
  getById: (id) => apiFetch('/orders/' + id)
};
