# 🎬 Movie Fun Facts

An AI-powered exploration platform for cinema enthusiasts. Discover unique, behind-the-scenes movie trivia generated in real-time using OpenAI.

---

## 🌟 Project Showcase (Demo)

### **1. Secure Authentication**
<p align="center">
  <img src="./public/login_movie_fun_facts.gif" width="800" alt="Sign In Demo">

  <img width="800" height="741" alt="Screenshot 2026-04-05 at 11 46 45 PM" src="https://github.com/user-attachments/assets/131ae0c3-cd99-4cc3-9568-6442724ed06b" />

  <br>
  <em>Integrated with Google OAuth for a seamless and secure login experience.</em>
</p>

### **2. Dynamic Dashboard & AI Generation**
<p align="center">
  <img src="./public/dashboard_movie_fun_facts.gif" width="800" alt="Dashboard Demo 1">
  <br>
  <em>The dashboard features a scrolling poster wall and dynamic AI trivia that refreshes on every visit.</em>
</p>

---

## 🚀 Key Features

* **AI-Driven Content**: Leverages the **OpenAI API** to generate fascinating movie facts on the fly.
* **NextAuth.js Integration**: Secure Google OAuth 2.0 flow for user authentication.
* **Full-Stack Architecture**: Built with **Next.js (App Router)**, powered by **Prisma ORM** and **PostgreSQL**.
* **Middleware Protection**: Robust route guards protecting `/dashboard` and `/onboarding` from unauthorized users.
* **Modern Glassmorphism UI**: A sleek, responsive interface with animated background elements.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/)
- **Database**: PostgreSQL (via Prisma ORM)
- **AI Engine**: OpenAI (GPT-4/3.5)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS & Framer Motion

---

## 📦 Getting Started

### 1. Installation & Environment
```bash```
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env


### 2. Database Synchronization (Prisma)
```bash```
# Push schema and run migrations
npx prisma migrate dev -n init

# Optional: Launch Prisma Studio to manage data
npm run prisma:studio

### 3. Run the Application
npm run dev
