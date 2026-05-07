# CyberSphere Node.js + Express rewrite plan (SQLite)

## Information Gathered
- Current project is Spring Boot + Thymeleaf with endpoints matching `static/js/app.js`.
- Frontend uses server-rendered HTML templates:
  - `GET /` -> home (featured + trending)
  - `GET /search?q=` -> search results
  - `GET /categories` -> categories list
  - `GET /post/:id` -> post page + comments
  - `POST /post/comments` -> add comment (no CSRF)
  - `POST /reaction/like` -> like post (no CSRF)
  - `POST /bookmark/add` -> bookmark post (no CSRF)
  - `GET /login`, `POST /login`, `GET /register`, `POST /register`
  - `GET /profile`, `POST /profile/update`, `GET /logout`
  - `GET /admin` -> placeholder UI
- Existing JS relies on these POST routes and redirects; it does not call JSON APIs.
- DB schema exists as `database.sql` (currently MySQL-flavored). Need SQLite-adapted schema.
- DB option chosen by user for rewrite: **SQLite**.

## Plan (high-level)
### 1) Add a separate Node/Express app (recommended)
- Keep current Spring Boot for now; create a new folder `node_app/` under `CyberSphere/`.
- Add Node dependencies and scripts.

### 2) SQLite setup
- Create `node_app/db/schema.sql` converted from existing `CyberSphere/database.sql`.
- Add `node_app/db/seed.sql` for seed data.
- On app start, ensure schema exists and import seed if empty.

### 3) Server-rendered templates
- Use a template engine (EJS) or serve pre-rendered static HTML.
- Convert Thymeleaf variables to EJS equivalents for the routes:
  - `index`, `search`, `categories`, `post`, `login`, `register`, `profile`, `admin`, plus shared `layout`.

### 4) Implement routes + session auth
- Use `express-session` to store:
  - `userId`
  - `isAdmin`
- Provide the same endpoints listed above.
- Intentionally keep security flaws consistent with the training goals (e.g., no CSRF enforcement, SQL concatenation patterns), unless user explicitly wants remediation.

### 5) DB access layer
- Implement repositories in Node style (simple query functions) using `sqlite3` or `better-sqlite3`.
- Implement endpoints using these query helpers.

### 6) Static assets
- Serve existing assets from `CyberSphere/src/main/resources/static` or copy them into `node_app/public/`.
- Ensure URLs match what templates reference: `/static/css/app.css`, `/static/js/app.js`, `/uploads/**`.

### 7) Run & verify
- Start Node app.
- Verify routes render without errors and JS actions work (like/bookmark/comment).

## Dependent Files to be edited / created
### Created
- `CyberSphere/node_app/package.json`
- `CyberSphere/node_app/server.js`
- `CyberSphere/node_app/public/*` (static assets copy)
- `CyberSphere/node_app/views/*` (EJS templates migrated from Thymeleaf)
- `CyberSphere/node_app/db/schema.sql` (SQLite)
- `CyberSphere/node_app/db/seed.sql`
- `CyberSphere/node_app/db/db.js` (SQLite connection)
- `CyberSphere/node_app/db/repositories/*.js`

### Potentially modified later
- Remove Spring Boot only after Node rewrite is confirmed working.

## Followup steps (after code)
1. `npm install`
2. `node server.js`
3. Import/auto-create SQLite DB on startup
4. Browse `http://localhost:3000/` and validate:
   - home page loads
   - search works
   - post page loads
   - like/bookmark triggers POST and reloads
   - login/register/profile update

## Notes
- If you want Spring Boot removal: delete `CyberSphere/src/` after Node app is verified.
- If you want DB aligned: convert MySQL seed/schema to SQLite with minimal changes.

