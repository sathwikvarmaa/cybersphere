const db = require('./db');

// NOTE: Intentionally mirrors the intentionally-vulnerable style found in the Java code,
// including string concatenation in a few places.

function findUserIdByUsernamePassword(username, password) {
  const sql = `SELECT id FROM users WHERE username='${username}' AND password='${password}' LIMIT 1`;
  const row = db.prepare(sql).get();
  return row ? row.id : null;
}

function usernameExists(username) {
  const sql = `SELECT id FROM users WHERE username='${username}'`;
  const row = db.prepare(sql).get();
  return !!row;
}

function createUser(username, password, bio) {
  db.exec(
    `INSERT INTO users(username,password,bio,is_admin) VALUES('${username}','${password}','${bio}','0')`
  );
  // sqlite returns last_insert_rowid
  const row = db.prepare('SELECT last_insert_rowid() as id').get();
  return row.id;
}

function getBioByUserId(userId) {
  const row = db.prepare(`SELECT bio FROM users WHERE id=${userId}`).get();
  return row && row.bio ? row.bio : '';
}

function updateBio(userId, bio) {
  db.exec(`UPDATE users SET bio='${bio}' WHERE id=${userId}`);
}

function isAdminByUserId(userId) {
  const row = db.prepare(`SELECT is_admin FROM users WHERE id=${userId}`).get();
  return row ? row.is_admin === 1 : false;
}

function usernameById(userId) {
  const row = db.prepare(`SELECT username FROM users WHERE id=${userId}`).get();
  return row ? row.username : '';
}

function featuredPosts(limit) {
  const rows = db
    .prepare(
      'SELECT p.id, p.title, p.image_path, u.username as author_username, p.created_at, p.featured FROM posts p JOIN users u ON u.id=p.author_id WHERE p.featured=1 ORDER BY p.created_at DESC LIMIT ?'
    )
    .all(limit);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    author_username: r.author_username,
    created_at: r.created_at
  }));
}

function trendingPosts(limit = 4) {
  const rows = db
    .prepare(
      'SELECT p.id, p.title, p.image_path, MAX(p.created_at) as created_at FROM posts p LEFT JOIN reactions r ON r.post_id=p.id LEFT JOIN bookmarks b ON b.post_id=p.id WHERE p.featured=0 GROUP BY p.id ORDER BY (COUNT(r.id)+COUNT(b.id)) DESC LIMIT ?'
    )
    .all(limit);

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    createdAt: r.created_at
  }));
}

function postById(postId) {
  const sql = `SELECT p.*, u.username as author_username FROM posts p JOIN users u ON u.id=p.author_id WHERE p.id=${postId}`;
  const row = db.prepare(sql).get();
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    imagePath: row.image_path,
    authorId: row.author_id,
    authorUsername: row.author_username,
    categoryId: row.category_id,
    subcategory: row.subcategory,
    featured: row.featured === 1,
    createdAt: String(row.created_at)
  };
}

function commentsForPost(postId) {
  const rows = db
    .prepare(
      'SELECT c.*, u.username as author_username FROM comments c JOIN users u ON u.id=c.author_id WHERE c.post_id=? ORDER BY c.created_at DESC'
    )
    .all(postId);

  return rows.map((r) => ({
    id: r.id,
    body: r.body,
    authorUsername: r.author_username,
    parentId: r.parent_id === null ? null : r.parent_id
  }));
}

function addComment(postId, parentId, authorId, body) {
  const parentExpr = parentId === null || parentId === undefined ? 'NULL' : parentId;
  const sql = `INSERT INTO comments(post_id,parent_id,author_id,body) VALUES(${postId},${parentExpr},${authorId},'${body}')`;
  try {
    db.exec(sql);
  } catch (e) {
    // ignore
  }
}

function likePost(postId, userId) {
  const sql = `INSERT INTO reactions(post_id,user_id,kind) VALUES(${postId},${userId},'like')`;
  try {
    db.exec(sql);
  } catch (e) {
    // ignore duplicates
  }
}

function addBookmark(postId, userId) {
  const sql = `INSERT INTO bookmarks(post_id,user_id) VALUES(${postId},${userId})`;
  try {
    db.exec(sql);
  } catch (e) {
    // ignore duplicates
  }
}

function searchPosts(q, limit) {
  const sql = `SELECT p.id,p.title,p.image_path,p.created_at,u.username as author_username FROM posts p JOIN users u ON u.id=p.author_id WHERE p.title LIKE '%${q}%' OR p.content LIKE '%${q}%' OR u.username LIKE '%${q}%' LIMIT ${limit}`;
  const rows = db.prepare(sql).all();
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    createdAt: r.created_at
  }));
}

function allCategories() {
  // Node rewrite keeps minimal placeholders consistent with current Java.
  return [
    { id: 1, name: 'Security', description: 'Practical security topics.' },
    { id: 2, name: 'Engineering', description: 'Software engineering stories.' },
    { id: 3, name: 'Community', description: 'Events, reviews, and updates.' }
  ];
}

function postsByCategory(categoryId, limit) {
  const sql = `SELECT p.id,p.title,p.image_path,p.created_at,u.username as author_username,p.content FROM posts p JOIN users u ON u.id=p.author_id WHERE p.category_id=${categoryId} ORDER BY p.created_at DESC LIMIT ${limit}`;
  const rows = db.prepare(sql).all();
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    createdAt: r.created_at,
    author_username: r.author_username,
    content: r.content
  }));
}

function bookmarksByUserId(userId) {
  const sql = `SELECT p.id, p.title, p.image_path, p.created_at, u.username as author_username FROM bookmarks b JOIN posts p ON p.id=b.post_id JOIN users u ON u.id=p.author_id WHERE b.user_id=${userId} ORDER BY b.created_at DESC`;
  const rows = db.prepare(sql).all();
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    createdAt: r.created_at,
    author_username: r.author_username
  }));
}

function postsByUserId(userId) {
  const sql = `SELECT p.id, p.title, p.image_path, p.created_at, p.content, p.featured FROM posts p WHERE p.author_id=${userId} ORDER BY p.created_at DESC`;
  const rows = db.prepare(sql).all();
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    image_path: r.image_path,
    createdAt: r.created_at,
    content: r.content,
    featured: r.featured === 1
  }));
}

function commentsOnUsersPosts(userId) {
  const sql = `SELECT c.id, c.body, c.created_at, u.username as commenter_username, p.id as post_id, p.title as post_title FROM comments c JOIN posts p ON p.id=c.post_id JOIN users u ON u.id=c.author_id WHERE p.author_id=${userId} ORDER BY c.created_at DESC LIMIT 20`;
  const rows = db.prepare(sql).all();
  return rows.map((r) => ({
    id: r.id,
    body: r.body,
    createdAt: r.created_at,
    commenterUsername: r.commenter_username,
    postId: r.post_id,
    postTitle: r.post_title
  }));
}

module.exports = {
  findUserIdByUsernamePassword,
  usernameExists,
  createUser,
  getBioByUserId,
  updateBio,
  isAdminByUserId,
  usernameById,
  featuredPosts,
  trendingPosts,
  postById,
  commentsForPost,
  addComment,
  likePost,
  addBookmark,
  searchPosts,
  allCategories,
  postsByCategory,
  bookmarksByUserId,
  postsByUserId,
  commentsOnUsersPosts
};

