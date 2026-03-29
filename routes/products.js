const express = require('express');
const router = express.Router();
const { db } = require('../db/setup');

// GET /api/products/featured  — must be before /:id
router.get('/featured', (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const products = db.get('products').filter({ is_featured: 1 }).take(limit).value();
  res.json(products);
});

// GET /api/products
router.get('/', (req, res) => {
  const { category, subcategory, brand, min_price, max_price, sort, search, page = 1, limit = 12 } = req.query;
  let products = db.get('products').value();

  if (category) products = products.filter(p => p.category === category);
  if (subcategory) products = products.filter(p => p.subcategory === subcategory);
  if (brand) products = products.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  if (min_price) products = products.filter(p => p.price >= parseFloat(min_price));
  if (max_price) products = products.filter(p => p.price <= parseFloat(max_price));
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  switch (sort) {
    case 'price_asc':  products.sort((a, b) => a.price - b.price); break;
    case 'price_desc': products.sort((a, b) => b.price - a.price); break;
    case 'newest':     products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
    default:           products.sort((a, b) => (b.is_featured - a.is_featured) || b.id - a.id);
  }

  const total = products.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const paged = products.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({ products: paged, total, page: pageNum, totalPages, limit: limitNum });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = db.get('products').find({ id: parseInt(req.params.id) }).value();
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
});

module.exports = router;
