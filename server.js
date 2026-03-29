const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const { initializeDB } = require('./db/setup');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database on startup
initializeDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware (memory store for simplicity)
app.use(session({
  secret: process.env.SESSION_SECRET || 'mpimports-session-secret-2024',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Serve static files from public/ directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MP IMPORTS API running', timestamp: new Date().toISOString() });
});

// Catch-all route: serve index.html for non-API routes (SPA support)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Rota não encontrada' });
  }
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('Página não encontrada');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido na requisição' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 MP IMPORTS Server running on port ${PORT}`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   API:   http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
