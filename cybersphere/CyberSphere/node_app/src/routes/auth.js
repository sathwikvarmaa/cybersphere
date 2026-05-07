const repo = require('../db/repositories');
const { getUserId } = require('../auth/sessionAuth');

function login(req, res) {
  return res.render('login');
}

function doLogin(req, res) {
  const { username, password } = req.body;
  const userId = repo.findUserIdByUsernamePassword(username, password);

  if (userId) {
    req.session.userId = userId;
    req.session.isAdmin = repo.isAdminByUserId(userId);
    return res.redirect('/');
  }
  return res.redirect('/login');
}

function logout(req, res) {
  if (req.session) req.session.destroy(() => {});
  return res.redirect('/');
}

function register(req, res) {
  return res.render('register');
}

function doRegister(req, res) {
  const { username, password, bio } = req.body;
  const safeBio = bio == null ? '' : bio;
  if (repo.usernameExists(username)) return res.redirect('/register');
  repo.createUser(username, password, safeBio);
  return res.redirect('/login');
}

function profile(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const username = repo.usernameById(userId);
  const bio = repo.getBioByUserId(userId);
  const isAdmin = repo.isAdminByUserId(userId);

  return res.render('profile', { username, bio, isAdmin });
}

function updateProfile(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const { bio } = req.body;
  repo.updateBio(userId, bio);
  return res.redirect('/profile');
}

function bookmarks(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const username = repo.usernameById(userId);
  const isAdmin = repo.isAdminByUserId(userId);
  const bookmarks = repo.bookmarksByUserId(userId);

  return res.render('bookmarks', { username, isAdmin, bookmarks });
}

function notifications(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const username = repo.usernameById(userId);
  const isAdmin = repo.isAdminByUserId(userId);
  const notifications = repo.commentsOnUsersPosts(userId);

  return res.render('notifications', { username, isAdmin, notifications });
}

function myPosts(req, res) {
  const userId = getUserId(req);
  if (!userId) return res.redirect('/login');

  const username = repo.usernameById(userId);
  const isAdmin = repo.isAdminByUserId(userId);
  const posts = repo.postsByUserId(userId);

  return res.render('my-posts', { username, isAdmin, posts });
}

module.exports = { login, doLogin, logout, register, doRegister, profile, updateProfile, bookmarks, notifications, myPosts };

