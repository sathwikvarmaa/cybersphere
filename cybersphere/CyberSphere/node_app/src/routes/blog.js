const repo = require('../db/repositories');
const { getUserId } = require('../auth/sessionAuth');

function search(req, res) {
  const q = req.query.q;
  if (!q) return res.render('search', { q: null, posts: [] });
  const posts = repo.searchPosts(q, 12);
  return res.render('search', { q, posts });
}

function categories(req, res) {
  const categories = repo.allCategories();
  return res.render('categories', { categories });
}

function category(req, res) {
  const id = Number(req.params.id);
  const categories = repo.allCategories();
  const category = categories.find(c => c.id === id) || { id, name: 'Category', description: '' };
  const posts = repo.postsByCategory(id, 20);
  return res.render('category', { category, posts });
}

function post(req, res) {
  const id = Number(req.params.id);
  const post = repo.postById(id);
  if (!post) return res.redirect('/');
  const comments = repo.commentsForPost(id);
  return res.render('post', { post, comments });
}

function addComment(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const postId = Number(req.body.postId);
  const body = req.body.body;
  const parentIdRaw = req.body.parentId;
  const parentId = parentIdRaw === undefined || parentIdRaw === '' ? null : Number(parentIdRaw);

  repo.addComment(postId, parentId, userId, body);
  return res.redirect(`/post/${postId}`);
}

function like(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const postId = Number(req.body.postId);
  repo.likePost(postId, userId);
  return res.redirect(`/post/${postId}`);
}

function bookmark(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const postId = Number(req.body.postId);
  repo.addBookmark(postId, userId);
  return res.redirect(`/post/${postId}`);
}

module.exports = { search, categories, category, post, addComment, like, bookmark };

