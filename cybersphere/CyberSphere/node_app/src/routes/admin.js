const { isAdmin } = require('../auth/sessionAuth');
const db = require('../db/db');

function admin(req, res) {
  const adminFlag = isAdmin(req);
  let analytics = { posts: 0, users: 0, comments: 0, likes: 0 };
  let topPosts = [];
  
  try {
    // gather simple analytics counts for UI
    const postsRow = db.prepare('SELECT COUNT(*) as cnt FROM posts').get();
    const usersRow = db.prepare('SELECT COUNT(*) as cnt FROM users').get();
    const commentsRow = db.prepare('SELECT COUNT(*) as cnt FROM comments').get();
    const likesRow = db.prepare("SELECT COUNT(*) as cnt FROM reactions WHERE kind='like'").get();

    analytics = {
      posts: postsRow ? postsRow.cnt : 0,
      users: usersRow ? usersRow.cnt : 0,
      comments: commentsRow ? commentsRow.cnt : 0,
      likes: likesRow ? likesRow.cnt : 0
    };

    // small reports: top 5 posts by reactions
    topPosts = db
      .prepare('SELECT p.id,p.title,COUNT(r.id) as reactions FROM posts p LEFT JOIN reactions r ON r.post_id=p.id GROUP BY p.id ORDER BY reactions DESC LIMIT 5')
      .all() || [];
  } catch (e) {
    // silently fail and use defaults
    console.error('Analytics error:', e.message);
  }

  return res.render('admin', { isAdmin: adminFlag, analytics, topPosts });
}

module.exports = { admin };

