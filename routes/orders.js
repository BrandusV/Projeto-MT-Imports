const express = require('express');
const router = express.Router();
const { db, nextId } = require('../db/setup');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// POST /api/orders
router.post('/', optionalAuth, (req, res) => {
  const { payment_method, payment_data = {}, shipping_data = {} } = req.body;
  if (!payment_method) return res.status(400).json({ error: 'Método de pagamento obrigatório.' });

  const key = req.user ? { user_id: req.user.userId } : { session_id: req.session.id };
  const cartItems = db.get('cart_items').filter(key).value();
  if (cartItems.length === 0) return res.status(400).json({ error: 'Carrinho vazio.' });

  const enriched = cartItems.map(item => {
    const product = db.get('products').find({ id: item.product_id }).value();
    return product ? { product, item } : null;
  }).filter(Boolean);

  const subtotal = enriched.reduce((s, r) => s + r.product.price * r.item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 29.90;
  const pixDiscount = payment_method === 'pix' ? subtotal * 0.05 : 0;
  const total = parseFloat((subtotal + shipping - pixDiscount).toFixed(2));

  const orderId = nextId('orders');
  db.get('orders').push({
    id: orderId,
    user_id: req.user ? req.user.userId : null,
    session_id: req.session.id,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    total,
    status: payment_method === 'pix' ? 'awaiting_payment' : 'confirmed',
    payment_method,
    payment_data: JSON.stringify(payment_data),
    shipping_data: JSON.stringify(shipping_data),
    created_at: new Date().toISOString()
  }).write();

  enriched.forEach(({ product, item }) => {
    db.get('order_items').push({
      id: nextId('order_items'),
      order_id: orderId,
      product_id: product.id,
      product_name: product.name,
      brand: product.brand,
      quantity: item.quantity,
      size: item.size,
      price: product.price
    }).write();
  });

  // Clear cart
  db.get('cart_items').remove(key).write();

  const order = db.get('orders').find({ id: orderId }).value();
  const items = db.get('order_items').filter({ order_id: orderId }).value();
  res.status(201).json({ ...order, items });
});

// GET /api/orders
router.get('/', requireAuth, (req, res) => {
  const orders = db.get('orders').filter({ user_id: req.user.userId })
    .sortBy('created_at').reverse().value();
  res.json(orders);
});

// GET /api/orders/:id
router.get('/:id', optionalAuth, (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = db.get('orders').find({ id: orderId }).value();
  if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
  const authorized = (req.user && order.user_id === req.user.userId) || order.session_id === req.session.id;
  if (!authorized) return res.status(403).json({ error: 'Acesso negado.' });
  const items = db.get('order_items').filter({ order_id: orderId }).value();
  res.json({ ...order, items });
});

module.exports = router;
