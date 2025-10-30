// db.js - simple sqlite wrapper
const Database = require('better-sqlite3');
const db = new Database('feedback.db');

// initialize tables if not exists
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  password_hash TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  username TEXT,
  message TEXT,
  created_at INTEGER
)`).run();

module.exports = db;
