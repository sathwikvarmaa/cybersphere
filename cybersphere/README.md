# CyberSphere 🚨
### Intentionally Vulnerable Web Application for VAPT & Web Security Training

CyberSphere is a deliberately vulnerable web application built for practicing **Web Application Penetration Testing (VAPT)**, secure coding analysis, and exploitation techniques in a safe local environment. It simulates real-world insecure coding patterns commonly found in production systems.

Designed for:
- Security researchers
- Cybersecurity students
- Bug bounty beginners
- VAPT learners
- Burp Suite practice labs
- Secure coding demonstrations

---

# ✨ Features

- 🌑 Premium dark GitHub-inspired UI
- ⚡ Spring Boot + Thymeleaf architecture
- 🟢 Node.js + Express demo version included
- 🛢️ MySQL database integration
- 🔓 Multiple intentional vulnerabilities
- 🧪 Burp Suite active scan compatible
- 📚 Educational attack scenarios
- 👨‍💻 Realistic blogging platform simulation

---

# 🧩 Tech Stack

| Technology | Usage |
|---|---|
| Java Spring Boot | Backend Framework |
| Thymeleaf | Server-side Rendering |
| Node.js + Express | Lightweight vulnerable demo |
| MySQL | Database |
| EJS | Templating Engine |
| HTML/CSS/JS | Frontend |

---

# 📁 Project Structure

```bash
CyberSphere/
│
├── node_app/                 # Vulnerable Node.js version
├── src/                      # Spring Boot source
├── database.sql              # Database schema + seed data
├── application.properties    # Database configuration
└── README.md
```

---

# 🚀 Quick Start (Node.js Demo)

The Node.js version is the fastest way to start testing vulnerabilities locally.

## 1️⃣ Navigate to the project

```bash
cd node_app
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Run the application

```bash
node server.js
```

## 4️⃣ Open in browser

```text
http://localhost:3000
```

---

# ☕ Spring Boot Setup

## 1️⃣ Install MySQL

Download and install MySQL Server.

## 2️⃣ Create Database

```sql
CREATE DATABASE cybersphere;
```

## 3️⃣ Import Database

```bash
mysql -u root -p cybersphere < database.sql
```

## 4️⃣ Configure Database

Edit:

```properties
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cybersphere
spring.datasource.username=root
spring.datasource.password=yourpassword
```

## 5️⃣ Run Spring Boot

```bash
mvn spring-boot:run
```

---

# 🔥 Intentional Vulnerabilities Included

CyberSphere intentionally contains multiple real-world vulnerabilities for educational purposes.

| Vulnerability | Status |
|---|---|
| SQL Injection (SQLi) | ✅ |
| Stored XSS | ✅ |
| Reflected XSS | ✅ |
| IDOR | ✅ |
| CSRF | ✅ |
| Session Fixation | ✅ |
| Weak Session Management | ✅ |
| Missing Secure Cookie Flags | ✅ |
| Broken Authentication | ✅ |
| Plain-text Password Storage | ✅ |
| Information Disclosure | ✅ |
| Weak Access Control | ✅ |

---

# 🧪 Vulnerability Areas

## SQL Injection
- Login authentication
- Search functionality
- Post lookup
- Profile updates
- Comment system

## Cross-Site Scripting (XSS)
- Stored XSS in posts/comments
- Reflected XSS in search

## Authentication Weaknesses
- Hardcoded session secrets
- Weak cookies
- Session fixation
- No rate limiting

## Access Control Issues
- IDOR vulnerabilities
- Weak admin protection
- Sequential ID enumeration

## CSRF
- Login requests
- Profile modification
- Comment posting
- Like/bookmark actions

---

# 🎯 Training Scenarios

Practice with:
- Burp Suite Active Scanning
- Manual SQL Injection
- XSS Payload Testing
- Session Hijacking
- Cookie Analysis
- CSRF Exploitation
- IDOR Enumeration
- Authentication Bypass
- Privilege Escalation
- Exploit Chaining

---

# 🔑 Demo Credentials

```text
Admin Account
Username: admin
Password: Admin@123

User Accounts
Username: alice     Password: Alice@123
Username: bob       Password: Bob@123
Username: charlie   Password: Charlie@123
```

---

# 🛡️ Educational Purpose

This project exists to help learners:
- Understand insecure coding patterns
- Practice penetration testing legally
- Learn mitigation strategies
- Improve secure development skills
- Simulate real-world VAPT engagements

---

# ⚠️ IMPORTANT DISCLAIMER

> DO NOT expose CyberSphere to the public internet.

This application is intentionally insecure and must only be used:
- Locally
- In isolated labs
- In virtual machines
- In private testing environments

Never deploy this project to production without fully removing all vulnerabilities.

---

# 📚 Recommended Tools

- Burp Suite
- OWASP ZAP
- Nmap
- SQLMap
- Nikto
- Kali Linux

---

# 🤝 Contribution

Contributions are welcome for:
- New vulnerable modules
- UI improvements
- Secure coding comparisons
- Additional training scenarios

---

# ⭐ Support

If you found this project useful:
- Star the repository
- Share with cybersecurity learners
- Contribute new ideas

---

# 📌 Author

Developed for cybersecurity education, VAPT practice, and secure coding awareness.
