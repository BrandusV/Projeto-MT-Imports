const express = require('express');
const router = express.Router();
const { db, nextId } = require('../db/setup');
const { optionalAuth } = require('../middleware/auth');

function getCartKey(req) {
  return req.user ? { user_id: req.user.userId } : { session_id: req.session.id };
}

function getCartItems(req) {
  const key = getCartKey(req);
  const items = db.get('cart_items').filter(key).value();
  return items.map(item => {
    const product = db.get('products').find({ id: item.product_id }).value();
    if (!product) return null;
    return { ...item, name: product.name, brand: product.brand, price: product.price, image_url: product.image_url, original_price: product.original_price };
  }).filter(Boolean);
}

// GET /api/cart
router.get('/', optionalAuth, (req, res) => {
  res.json(getCartItems(req));
});

// POST /api/cart/add
router.post('/add', optionalAuth, (req, res) => {
  const { product_id, size, quantity = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'product_id obrigatório.' });

  const product = db.get('products').find({ id: parseInt(product_id) }).value();
  if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

  const key = getCartKey(req);
  const existing = db.get('cart_items').find({ ...key, product_id: parseInt(product_id), size: size || null }).value();

  if (existing) {
    db.get('cart_items').find({ id: existing.id }).assign({ quantity: existing.quantity + parseInt(quantity) }).write();
  } else {
    db.get('cart_items').push({
      id: nextId('cart_items'),
      ...key,
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
      size: size || null,
      created_at: new Date().toISOString()
    }).write();
  }

  res.json({ success: true, cart: getCartItems(req) });
});

// PUT /api/cart/:id
router.put('/:id', optionalAuth, (req, res) => {
  const { quantity } = req.body;
  const item = db.get('cart_items').find({ id: parseInt(req.params.id) }).value();
  if (!item) return res.status(404).json({ error: 'Item não encontrado.' });
  db.get('cart_items').find({ id: item.id }).assign({ quantity: parseInt(quantity) }).write();
  res.json({ success: true });
});

// DELETE /api/cart/:id  — must come before DELETE /
router.delete('/:id', optionalAuth, (req, res) => {
  db.get('cart_items').remove({ id: parseInt(req.params.id) }).write();
  res.json({ success: true });
});

// DELETE /api/cart (clear all)
router.delete('/', optionalAuth, (req, res) => {
  db.get('cart_items').remove(getCartKey(req)).write();
  res.json({ success: true });
});

module.exports = router;
