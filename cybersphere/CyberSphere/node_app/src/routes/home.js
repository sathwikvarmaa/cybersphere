const repo = require('../db/repositories');

function home(req, res) {
  const featured = repo.featuredPosts(6);
  const trending = repo.trendingPosts(4);
  res.render('index', { featured, trending, pageTitle: 'CyberSphere' });
}

module.exports = { home };

