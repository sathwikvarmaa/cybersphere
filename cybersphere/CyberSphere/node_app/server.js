const path = require('path');
const express = require('express');
const session = require('express-session');
const fs = require('fs');

const { ensureDb, seedIfEmpty, normalizeSeededImagePaths, ensureSamplePosts } = require('./src/db/boot');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

// Ensure `pageClass` is always defined for templates to avoid ReferenceError
app.use((req, res, next) => {
  res.locals.pageClass = '';
  next();
});

app.use(
  session({
    // Intentionally weak defaults to match training environment behavior.
    secret: 'cybersphere_train_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Leave secure=false to match typical local training.
      httpOnly: true
    }
  })
);

const PUBLIC_ROOT = path.join(__dirname, 'public');
app.use('/static', express.static(path.join(PUBLIC_ROOT, 'static')));
app.use('/uploads', express.static(path.join(PUBLIC_ROOT, 'uploads')));

// Routes
const homeRoutes = require('./src/routes/home');
const blogRoutes = require('./src/routes/blog');
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');

app.get('/', homeRoutes.home);
app.get('/search', blogRoutes.search);
app.get('/categories', blogRoutes.categories);
app.get('/category/:id', blogRoutes.category);
app.get('/post/:id', blogRoutes.post);

app.post('/post/comments', blogRoutes.addComment);
app.post('/reaction/like', blogRoutes.like);
app.post('/bookmark/add', blogRoutes.bookmark);

app.get('/login', authRoutes.login);
app.post('/login', authRoutes.doLogin);
app.get('/logout', authRoutes.logout);

app.get('/register', authRoutes.register);
app.post('/register', authRoutes.doRegister);

app.get('/profile', authRoutes.profile);
app.post('/profile/update', authRoutes.updateProfile);

app.get('/bookmarks', authRoutes.bookmarks);
app.get('/notifications', authRoutes.notifications);
app.get('/my/posts', authRoutes.myPosts);

app.get('/admin', adminRoutes.admin);

app.get('/reset', (req, res) => res.redirect('/login'));

// Boot DB and start
const port = process.env.PORT || 3000;
ensureDb();
seedIfEmpty().then(() => {
  normalizeSeededImagePaths();
  // ensure at least a few sample posts exist for UI/demo
  if (typeof ensureSamplePosts === 'function') {
    try {
      ensureSamplePosts(6);
    } catch (e) {
      // ignore
    }
  }
  app.listen(port, () => {
    console.log(`CyberSphere Node running on http://localhost:${port}`);
  });
});

