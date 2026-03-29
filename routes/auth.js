const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, nextId } = require('../db/setup');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    if (password.length < 8) return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres.' });

    const existing = db.get('users').find(u => u.email.toLowerCase() === email.toLowerCase()).value();
    if (existing) return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = { id: nextId('users'), name, email: email.toLowerCase(), password_hash, created_at: new Date().toISOString() };
    db.get('users').push(user).write();

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    req.session.token = token;
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao criar conta. Tente novamente.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Informe e-mail e senha.' });

    const user = db.get('users').find(u => u.email.toLowerCase() === email.toLowerCase()).value();
    if (!user) return res.status(401).json({ error: 'E-mail ou senha inválidos.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'E-mail ou senha inválidos.' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    req.session.token = token;
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao fazer login. Tente novamente.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = db.get('users').find({ id: req.user.userId }).value();
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {});
  res.json({ success: true });
});

module.exports = router;
