-- Seed users
INSERT INTO users (id, username, password, bio, is_admin, reset_token, reset_token_created_at) VALUES
  (1, 'admin', 'Admin@123', 'Root admin bio: welcome to CyberSphere.', 1, 'adminreset', datetime('now')),
  (2, 'alice', 'Alice@123', 'Writes about web craft & community.', 0, NULL, NULL),
  (3, 'bob', 'Bob@123', 'Loves clean layouts and thoughtful discussion.', 0, NULL, NULL),
  (4, 'charlie', 'Charlie@123', 'Member since always. Enjoys comments.', 0, NULL, NULL);

INSERT INTO categories (id, name, description) VALUES
  (1, 'Security', 'Practical security topics.'),
  (2, 'Engineering', 'Software engineering stories.'),
  (3, 'Community', 'Events, reviews, and updates.');

-- Seed posts
INSERT INTO posts (id, title, content, image_path, author_id, category_id, subcategory, featured, created_at) VALUES
  (1, 'Designing calm UIs for fast workflows', 'User interfaces are the bridge between human intention and system capability. When designed thoughtfully, they reduce cognitive load and create a sense of control. This post explores principles of interface design that make users feel confident, including whitespace, hierarchy, and consistent interactions. We look at real-world examples from modern applications and discuss how simplicity often requires more thoughtful design than complexity. Discover how to eliminate decision fatigue and create experiences that users enjoy returning to.', 'static/images/cyber-crime-cover.jpg', 2, 2, 'UX', 1, datetime('now')),
  (2, 'Comment threads that feel alive', 'Communities thrive on thoughtful conversation. Comment threads are the pulse of engagement when done right, they create meaningful discussion. This post examines conversation patterns: how to encourage replies without overwhelming readers, how reactions add texture to discussion, and how moderation maintains civility. We explore nested comments, threading strategies, and community norms that allow disagreement without toxicity. Learn from successful communities and understand the psychology of online discussion.', 'static/images/cyber-crime-cover.jpg', 3, 3, 'Culture', 0, datetime('now')),
  (3, 'Searching content without friction', 'Great content gets lost if no one can find it. Search experience directly impacts discovery and engagement. This post covers search UI patterns, understanding user intent, filtering options, and relevance ranking. We discuss how search algorithms work, common pitfalls like overly strict matching and poor result ordering, and strategies for making search feel natural rather than technical. Includes case studies of search implementations in popular platforms and how they balance simplicity with power.', 'static/images/cyber-crime-cover.jpg', 2, 1, 'Web', 0, datetime('now')),
  (4, 'Trending reads: what communities share', 'Why do certain posts go viral while others linger? This post analyzes content velocity, engagement patterns, and sharing mechanisms. We explore trending algorithms, the role of featured content, and how categories influence visibility. Discover what makes a post shareable, not just quality, but timing, format, and emotional resonance. Learn how featured badges, category selection, and author reputation compound to create visibility. Includes data from our platform tracking trending patterns over the past quarter.', 'static/images/cyber-crime-cover.jpg', 4, 3, 'Trends', 0, datetime('now')),
  (5, 'Understanding SQL Injection: Examples and Mitigations', 'SQL Injection remains one of the most dangerous and common web vulnerabilities. This comprehensive guide walks through how SQL injection attacks work, real-world examples, and proven mitigation strategies. We examine vulnerable code patterns: unvalidated user input, string concatenation in SQL queries, and unsafe parameter handling. Learn how parameterized queries and prepared statements prevent injection, explore ORM benefits and limitations, and understand SQL-specific escaping. Includes OWASP recommendations and industry best practices for secure database interactions across languages and frameworks.', 'static/images/cyber-crime-cover.jpg', 1, 1, 'Security', 0, datetime('now')),
  (6, 'Secure Coding Practices for Node.js', 'Node.js powers millions of applications, but security requires constant vigilance. This post provides a practical security checklist for Node.js developers: validating all input, encoding output appropriately, managing dependencies securely, and configuring environments properly. We cover common Node vulnerabilities such as prototype pollution, path traversal, and insecure deserialization, with code examples and fixes. Learn how to audit your dependencies, use security headers, implement logging without exposing sensitive data, and keep your runtime updated. Includes tools and automation strategies to bake security into your development process.', 'static/images/cyber-crime-cover.jpg', 1, 2, 'Backend', 1, datetime('now')),
  (7, 'Community CTF Recap: Highlights and Learning', 'Our recent Capture The Flag competition brought together security enthusiasts from around the world. This post recaps the event with insights on what worked, challenging problems, and what participants learned. We examine the top scoring challenges, strategies that successful teams employed, and common mistakes. Discuss lessons for defenders and lessons for attackers, from enumeration through exploitation chains. Includes results, participant testimonials, and planning for our next CTF. Special recognition goes to teams who broke multiple flags and contributed creative solutions to the community.', 'static/images/cyber-crime-cover.jpg', 4, 3, 'Events', 0, datetime('now')),
  (8, 'XSS Vulnerabilities: From Stored to Reflected', 'Cross-Site Scripting attacks exploit the trust users place in web applications. This detailed guide distinguishes between Reflected XSS, which requires an immediate user action, and Stored XSS, which persists and affects every viewer. We trace attack chains: how malicious input becomes executable code in browsers, how session cookies can be exposed, and how trust boundaries get violated. Learn defense strategies including output encoding for HTML, JavaScript, and URL contexts, Content Security Policy headers, and input validation. Includes vulnerable code samples, exploitation demonstrations, and secure alternatives. Understand why context matters in security and how the same encoding is not safe everywhere.', 'static/images/cyber-crime-cover.jpg', 3, 1, 'Security', 0, datetime('now'));

-- Seed comments
INSERT INTO comments (id, post_id, parent_id, author_id, body, created_at) VALUES
  (1, 1, NULL, 3, 'Loved the structure—especially the sections layout.', datetime('now')),
  (2, 1, 1, 2, 'Thanks! What part stood out most for you? ', datetime('now')),
  (3, 2, NULL, 4, 'The tone feels premium. Good vibes.', datetime('now')),
  (4, 3, NULL, 3, 'Search UX matters. Keep it simple.', datetime('now'));

INSERT INTO reactions (id, post_id, user_id, kind, created_at) VALUES
  (1, 1, 3, 'like', datetime('now')),
  (2, 1, 4, 'like', datetime('now')),
  (3, 2, 2, 'like', datetime('now')),
  (4, 3, 3, 'like', datetime('now'));

INSERT INTO bookmarks (id, post_id, user_id, created_at) VALUES
  (1, 1, 2, datetime('now')),
  (2, 2, 3, datetime('now')),
  (3, 3, 4, datetime('now'));

INSERT INTO notifications (id, user_id, type, message, created_at, unread) VALUES
  (1, 2, 'reaction', 'Bob liked your post', datetime('now'), 1),
  (2, 3, 'bookmark', 'Alice saved your post', datetime('now'), 1);

