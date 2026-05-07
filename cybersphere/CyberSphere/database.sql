-- CyberSphere MySQL schema + seed data (educational/local use)
-- Create database first, then import this file.
-- Example: CREATE DATABASE cybersphere; USE cybersphere;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS reactions;
DROP TABLE IF EXISTS bookmarks;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  reset_token VARCHAR(64),
  reset_token_created_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE posts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content MEDIUMTEXT NOT NULL,
  image_path VARCHAR(255),
  author_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  subcategory VARCHAR(100) DEFAULT '',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users(id),
  CONSTRAINT fk_posts_category FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  parent_id BIGINT DEFAULT NULL,
  author_id BIGINT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT fk_comments_author FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE reactions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  kind VARCHAR(16) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_reaction (post_id, user_id, kind),
  CONSTRAINT fk_reactions_post FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT fk_reactions_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bookmarks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_bookmark (post_id, user_id),
  CONSTRAINT fk_bookmarks_post FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT fk_bookmarks_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE notifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  type VARCHAR(32) NOT NULL,
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  unread TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed users
INSERT INTO users (id, username, password, bio, is_admin, reset_token, reset_token_created_at) VALUES
  (1, 'admin', 'Admin@123', 'Root admin bio: welcome to CyberSphere.', 1, 'adminreset', NOW()),
  (2, 'alice', 'Alice@123', 'Writes about web craft & community.', 0, NULL, NULL),
  (3, 'bob', 'Bob@123', 'Loves clean layouts and thoughtful discussion.', 0, NULL, NULL),
  (4, 'charlie', 'Charlie@123', 'Member since always. Enjoys comments.', 0, NULL, NULL);

-- Seed categories
INSERT INTO categories (id, name, description) VALUES
  (1, 'Security', 'Practical security topics.'),
  (2, 'Engineering', 'Software engineering stories.'),
  (3, 'Community', 'Events, reviews, and updates.');

-- Seed posts
INSERT INTO posts (id, title, content, image_path, author_id, category_id, subcategory, featured, created_at) VALUES
  (1, 'Designing calm UIs for fast workflows', 'A long-form post about writing interfaces people trust. Includes real-world examples.', 'static/images/banner-1.jpg', 2, 2, 'UX', 1, NOW()),
  (2, 'Comment threads that feel alive', 'Thoughtful discussion patterns: replies, reactions, and moderation in context.', 'static/images/banner-2.jpg', 3, 3, 'Culture', 1, NOW()),
  (3, 'Searching content without friction', 'How search experiences shape discovery. Great posts are easy to find.', 'static/images/banner-3.jpg', 2, 1, 'Web', 0, NOW()),
  (4, 'Trending reads: what communities share', 'A look at what makes content travel. Featured authors and categories.', 'static/images/banner-4.jpg', 4, 3, 'Trends', 0, NOW());

-- Seed comments (incl. bodies with characters to allow XSS practice)
INSERT INTO comments (id, post_id, parent_id, author_id, body, created_at) VALUES
  (1, 1, NULL, 3, 'Loved the structure—especially the sections layout.', NOW()),
  (2, 1, 1, 2, 'Thanks! What part stood out most for you? ', NOW()),
  (3, 2, NULL, 4, 'The tone feels premium. Good vibes.', NOW()),
  (4, 3, NULL, 3, 'Search UX matters. Keep it simple.', NOW());

-- Seed reactions
INSERT INTO reactions (id, post_id, user_id, kind, created_at) VALUES
  (1, 1, 3, 'like', NOW()),
  (2, 1, 4, 'like', NOW()),
  (3, 2, 2, 'like', NOW()),
  (4, 3, 3, 'like', NOW());

-- Seed bookmarks
INSERT INTO bookmarks (id, post_id, user_id, created_at) VALUES
  (1, 1, 2, NOW()),
  (2, 2, 3, NOW()),
  (3, 3, 4, NOW());

-- Seed notifications
INSERT INTO notifications (id, user_id, type, message, created_at, unread) VALUES
  (1, 2, 'reaction', 'Bob liked your post', NOW(), 1),
  (2, 3, 'bookmark', 'Alice saved your post', NOW(), 1);

