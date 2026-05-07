# CyberSphere Build Plan

## Information Gathered
- Repo/workspace is empty; no existing project files to modify.

## Plan
1. Create Spring Boot project structure under `CyberSphere/`.
2. Implement MySQL schema + seed data (`database.sql`).
3. Implement backend layers (controllers/services/repositories) using Thymeleaf views.
4. Implement session-based auth (intentionally flawed per spec) + admin dashboard.
5. Implement blog features: posts, featured posts, categories/subcategories, search, trending/related, likes/bookmarks, comments with nested replies, notifications.
6. Implement image upload and profile pages (intentionally vulnerable IDOR patterns).
7. Implement frontend premium dark UI (GitHub-inspired) + JS for likes/bookmarks/replies/trending/search.
8. Add vulnerable endpoints across the required categories (XSS, SQLi, IDOR, Auth/session flaws, CSRF) while keeping UI realistic and non-hacky.
9. Write detailed `README.md` including setup, test accounts, vulnerable endpoints, Burp testing guide, and remediation suggestions.
10. Run local verification: import DB, start Spring Boot, sanity-check primary flows.

## Dependent Files to be Edited
- New: `pom.xml`, `application.properties`, Thymeleaf templates, static assets, Java source.
- New: `database.sql`, `README.md`.

## Followup Steps
- After scaffolding, run: create DB, import `database.sql`, start app, and load homepage.

<ask_followup_question>
Confirm I should proceed with generating the full `CyberSphere/` project.
</ask_followup_question>

