const fs = require('fs');
const path = require('path');
const db = require('./db');

const schemaFile = path.join(__dirname, 'schema.sql');
const seedFile = path.join(__dirname, 'seed.sql');

function ensureDb() {
  if (!fs.existsSync(schemaFile)) {
    throw new Error(`Missing schema file: ${schemaFile}`);
  }

  // Apply schema unconditionally (educational local training).
  // better-sqlite3 can't run multiple statements with db.exec;
  const schemaSql = fs.readFileSync(schemaFile, 'utf-8');
  db.exec(schemaSql);
}

function seedIfEmpty() {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM users').get();
  if (row && row.cnt > 0) return Promise.resolve();
  const seedSql = fs.readFileSync(seedFile, 'utf-8');
  db.exec(seedSql);
  return Promise.resolve();
}

function normalizeSeededImagePaths() {
  db.exec(`
    UPDATE posts SET image_path='static/images/cyber-crime-cover.jpg'
    WHERE image_path IN (
      'static/images/banner-1.jpg',
      'static/images/banner-2.jpg',
      'static/images/banner-3.jpg',
      'static/images/banner-4.jpg',
      'static/images/banner-1.svg',
      'static/images/banner-2.svg',
      'static/images/banner-3.svg',
      'static/images/banner-4.svg'
    );
  `);
}

function ensureSamplePosts(minCount) {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM posts').get();
  const cnt = row ? row.cnt : 0;
  if (cnt >= minCount) return;
  const samples = [
    {
      title: 'Understanding SQL Injection: Examples and Mitigations',
      content: 'This post covers practical SQL injection patterns, examples, and how to mitigate them in real applications. It walks through parameterized queries, prepared statements, and safe database APIs.',
      image: 'static/images/cyber-crime-cover.jpg',
      category: 1
    },
    {
      title: 'Secure Coding Practices for Node.js',
      content: 'A practical guide to secure coding in Node.js projects: input validation, output encoding, secure dependencies, and configuration management.',
      image: 'static/images/cyber-crime-cover.jpg',
      category: 2
    },
    {
      title: 'Community CTF Recap: Highlights and Learning',
      content: 'A summary of the recent community CTF, notable challenges, and lessons learned for defenders and attackers.',
      image: 'static/images/cyber-crime-cover.jpg',
      category: 3
    }
  ];

  const insert = db.prepare("INSERT INTO posts(title,content,image_path,author_id,category_id,created_at) VALUES(?,?,?,?,?,datetime('now'))");
  for (let i = 0; i < samples.length; i++) {
    try {
      insert.run(samples[i].title, samples[i].content, samples[i].image, 1, samples[i].category);
    } catch (e) {
      // ignore
    }
  }
}

module.exports = { ensureDb, seedIfEmpty, normalizeSeededImagePaths, ensureSamplePosts };

