// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple token-based auth: token == user id (for demo only)
const PORT = process.env.PORT || 4000;

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing' });
  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  try {
    const stmt = db.prepare('INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)');
    stmt.run(id, username, hash);
    return res.json({ id, username, token: id });
  } catch (e) {
    return res.status(400).json({ error: 'User exists' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!row) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  return res.json({ id: row.id, username: row.username, token: row.id });
});

// Post feedback (authenticated)
app.post('/api/feedback', (req, res) => {
  const token = req.header('x-auth-token');
  const { message } = req.body;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });
  const id = uuidv4();
  const created_at = Date.now();
  db.prepare('INSERT INTO feedback (id, user_id, username, message, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(id, user.id, user.username, message, created_at);
  return res.json({ id, username: user.username, message, created_at });
});

// List feedback
app.get('/api/feedback', (req, res) => {
  const rows = db.prepare('SELECT id, username, message, created_at FROM feedback ORDER BY created_at DESC LIMIT 100').all();
  return res.json(rows);
});

// simple health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Feedback API listening on ${PORT}`);
});
