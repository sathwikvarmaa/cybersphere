# CyberSphere — Vulnerable Web Application for VAPT Practice

## Overview

CyberSphere is an intentionally vulnerable full-stack web application designed for:

* VAPT practice
* Burp Suite Professional active scanning
* Web security testing
* OWASP Top 10 learning
* Secure coding demonstrations
* Penetration testing labs

The project simulates a real-world blogging and social platform with intentionally insecure implementations for educational and authorized security training purposes.

---

# Features

## Authentication System

* User login
* Registration
* Session handling
* Profile management
* Admin dashboard

## Blog Platform

* View posts
* Categories
* Search functionality
* Comments system
* Reactions and bookmarks

## Security Training Focus

The application contains intentionally vulnerable patterns suitable for:

* XSS testing
* SQL injection testing
* Session testing
* Authentication testing
* Authorization testing
* IDOR testing
* CSRF testing
* Input validation testing

---

# Tech Stack

| Technology     | Purpose           |
| -------------- | ----------------- |
| Node.js        | Backend runtime   |
| Express.js     | Web framework     |
| SQLite         | Database          |
| EJS            | Templating engine |
| CSS/JavaScript | Frontend          |
| Render         | Deployment        |
| GitHub         | Source control    |

---

# Project Structure

```txt
CyberSphere/
│
├── node_app/
│   ├── server.js
│   ├── package.json
│   ├── data/
│   ├── public/
│   ├── src/
│   └── views/
│
├── database.sql
├── README.md
└── application.properties
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sathwikvarmaa/cybersphere.git
```

## Navigate to Node App

```bash
cd cybersphere/CyberSphere/node_app
```

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
node server.js
```

---

# Local Access

```txt
http://localhost:3000
```

---

# Default Test Accounts

| Role  | Username | Password    |
| ----- | -------- | ----------- |
| Admin | admin    | Admin@123   |
| User  | alice    | Alice@123   |
| User  | bob      | Bob@123     |
| User  | charlie  | Charlie@123 |

---

# Available Routes

| Page       | URL         |
| ---------- | ----------- |
| Homepage   | /           |
| Login      | /login      |
| Register   | /register   |
| Search     | /search     |
| Categories | /categories |
| Profile    | /profile    |
| Admin      | /admin      |
| Post View  | /post/1     |

---

# Deployment

## Deploy on Render

### Root Directory

```txt
cybersphere/CyberSphere/node_app
```

### Build Command

```txt
npm install
```

### Start Command

```txt
node server.js
```

---

# Burp Suite Professional Testing

The application is designed for security testing using:

* Burp Suite Professional
* OWASP ZAP
* Browser DevTools
* Manual VAPT workflows

## Burp Proxy Configuration

```txt
127.0.0.1:8080
```

---

# Educational Purpose

This project is intended strictly for:

* Cybersecurity education
* Ethical hacking practice
* Authorized penetration testing
* Web application security learning
* OWASP training

Do not use this project for unauthorized attacks.

---

# Author

Sathwik Varma

* Cybersecurity Enthusiast
* VAPT Learner
* Network Security Student
* GATE Aspirant

---

# License

This project is for educational and research purposes only.
