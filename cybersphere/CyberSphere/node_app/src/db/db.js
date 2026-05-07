const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'data', 'cybersphere.sqlite');

// Ensure folder exists
require('fs').mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

module.exports = db;

