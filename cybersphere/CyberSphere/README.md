# CyberSphere

## Status
Initial scaffolding and implementation plan created.

## What will be included
- Spring Boot + Thymeleaf
- MySQL schema and seed data
- Premium dark UI (GitHub-inspired)
- Vulnerable blog platform with XSS, SQL Injection, IDOR, Auth/Session issues, and CSRF (educational/local use)

## Setup (to be completed)
1. Install MySQL
2. Create database
3. Import `database.sql`
4. Configure `application.properties`
5. Run Spring Boot

## Notes
This app is for local cybersecurity training only.

## Node.js demo
A trimmed Node/Express/EJS port is included under `node_app` for quick local testing. It intentionally preserves vulnerabilities for VAPT training exercises (do NOT expose this to the public internet).

Run locally:

```bash
cd node_app
npm install
node server.js
# then open http://localhost:3000
```

## Intentional Security Vulnerabilities (VAPT Training)

This application is deliberately vulnerable for local cybersecurity training and penetration testing exercises. The following intentional flaws are present:

### 1. SQL Injection in Login
**Location:** `node_app/src/db/repositories.js`

**Vulnerable Function:**
- `findUserIdByUsernamePassword()`

**Example Vulnerability:**
```javascript
const sql = `SELECT id FROM users WHERE username='${username}' AND password='${password}' LIMIT 1`;
```

**Attack Example:** Username payloads like `admin' --` can bypass authentication.

**Mitigation:** Use parameterized queries.

---

### 2. SQL Injection in Search
**Location:** `node_app/src/db/repositories.js`

**Vulnerable Function:**
- `searchPosts()`

**Example Vulnerability:**
```javascript
const sql = `... WHERE p.title LIKE '%${q}%' OR p.content LIKE '%${q}%' ...`;
```

**Attack Example:** Crafted search terms can alter the query and return unintended rows.

**Mitigation:** Bind the search term as a query parameter.

---

### 3. SQL Injection in Category and Post Lookup
**Location:** `node_app/src/db/repositories.js`

**Vulnerable Functions:**
- `postById()`
- `postsByCategory()`

**Example Vulnerability:**
```javascript
const sql = `SELECT ... WHERE p.id=${postId}`;
```

**Attack Example:** Numeric IDs can be manipulated to probe or alter lookups.

**Mitigation:** Validate numeric input and use placeholders.

---

### 4. SQL Injection in Comments and Profile Updates
**Location:** `node_app/src/db/repositories.js`

**Vulnerable Functions:**
- `createUser()`
- `updateBio()`
- `addComment()`
- `likePost()`
- `addBookmark()`

**Example Vulnerability:**
```javascript
db.exec(`UPDATE users SET bio='${bio}' WHERE id=${userId}`);
```

**Attack Example:** Malicious profile or comment content can break SQL syntax or inject statements.

**Mitigation:** Parameterize every user-controlled field.

---

### 5. Stored XSS
**Location:** `node_app/views/*.ejs`

**Vulnerable Areas:**
- Post content rendering
- Comment body rendering
- User bio rendering

**Attack Example:** A post or comment containing HTML/JS can execute in the browser.

**Mitigation:** Escape output or sanitize HTML before rendering.

---

### 6. Reflected XSS
**Location:** `node_app/views/search.ejs` and related search routes

**Vulnerable Area:**
- Search query echoed in the page

**Attack Example:** A crafted search string can execute script when the results page displays it.

**Mitigation:** Escape reflected input before output.

---

### 7. Weak Session Secret
**Location:** `node_app/server.js`

**Vulnerabilities:**
- Hardcoded secret: `cybersphere_train_secret`
- Secret is not randomly generated per environment

**Mitigation:** Use a long random secret from environment variables.

---

### 8. Session Fixation
**Location:** `node_app/src/routes/auth.js`

**Vulnerabilities:**
- Session is not regenerated after login
- Existing session can remain active across privilege changes

**Mitigation:** Regenerate the session after authentication.

---

### 9. Missing Secure Cookie Flags
**Location:** `node_app/server.js`

**Vulnerabilities:**
- Missing `secure`
- Missing `sameSite`
- No explicit expiry policy

**Mitigation:** Set secure cookie flags and expiration.

---

### 10. IDOR on Posts
**Location:** `node_app/src/routes/blog.js`

**Vulnerable Endpoint:**
- `GET /post/:id`

**Attack Example:** Sequential IDs allow enumeration of posts.

**Mitigation:** Enforce authorization checks before returning records.

---

### 11. IDOR on Comments, Reactions, and Bookmarks
**Location:** `node_app/src/routes/blog.js`

**Vulnerable Endpoints:**
- `POST /post/comments`
- `POST /reaction/like`
- `POST /bookmark/add`

**Mitigation:** Verify ownership and access rights for every object-level action.

---

### 12. CSRF on Authentication and Profile Actions
**Location:** `node_app/src/routes/auth.js`

**Vulnerable Endpoints:**
- `POST /login`
- `POST /register`
- `POST /profile/update`

**Mitigation:** Add anti-CSRF tokens to every state-changing request.

---

### 13. CSRF on Content Interactions
**Location:** `node_app/src/routes/blog.js`

**Vulnerable Endpoints:**
- `POST /post/comments`
- `POST /reaction/like`
- `POST /bookmark/add`

**Mitigation:** Require CSRF protection for all write actions.

---

### 14. Weak Authentication Storage and Login Protection
**Location:** `node_app/src/db/repositories.js`, `node_app/src/routes/auth.js`

**Issues:**
- Plain-text password storage
- No rate limiting on login attempts
- No account lockout mechanism
- Predictable test credentials

**Mitigation:** Hash passwords and add throttling/lockouts.

---

### 15. Missing Access Control and Information Disclosure
**Location:** `node_app/src/routes/admin.js`

**Issues:**
- Admin role enforcement is not uniformly applied
- Detailed error messages can reveal structure
- Analytics are exposed without rate limiting
- Sequential IDs aid enumeration

**Mitigation:** Enforce access control consistently and reduce error detail.

---

## Training Scenarios

Use CyberSphere to practice:
1. SQLi detection in login and profile fields
2. SQLi detection in search and post lookups
3. Stored XSS in posts and comments
4. Reflected XSS in search results
5. Session hijacking and fixation testing
6. Cookie flag and session hardening review
7. IDOR enumeration on post IDs
8. IDOR abuse on comments, likes, and bookmarks
9. CSRF attacks on login and profile update
10. CSRF attacks on comments and reactions
11. Broken authentication and password guessing
12. Plain-text password storage review
13. Admin access control testing
14. Information disclosure checks
15. Combined exploit chaining exercises
```
Username: admin    Password: Admin@123   (Admin account)
Username: alice    Password: Alice@123   (Regular user)
Username: bob      Password: Bob@123     (Regular user)
Username: charlie  Password: Charlie@123 (Regular user)
```

## ⚠️ Disclaimer

**DO NOT expose this application to the public internet.** It is intentionally vulnerable and designed for educational purposes in isolated environments only. Never deploy this to production without removing all vulnerabilities listed above.

Remove or harden these before any real deployment.

