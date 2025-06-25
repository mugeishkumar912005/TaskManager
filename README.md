# 📋 Personal Task Manager

This is a **full-stack Task Manager App** that I built using **React, Node.js, Express, and MongoDB**. The app allows users to manage their daily tasks with ease, featuring user authentication, full CRUD functionality, filtering options, and a custom-built **user analytics dashboard** to visualize task completion status.

---

## 🚀 Features Implemented

### ✅ 1. Authentication
- Fully working **email/password login and signup** using JWT
- Protected routes — only logged-in users can access the task dashboard

### 📝 2. Task Management (Full CRUD)
- Users can **create** tasks with:
  - **Title** (required)
  - **Description** (optional)
  - **Due Date**
  - **Priority** (High / Medium / Low)
- Tasks can be **viewed**, **edited**, **marked as completed**, or **deleted**
- Implemented **real-time task updates** on the frontend

### 🔍 3. Task Filters & Views
- Tasks can be filtered by:
  - **Completion Status**: All / Completed / Pending
  - **Priority**
  - **Due Date**
- Clean, responsive list view to organize and manage tasks efficiently

### 📊 4. User Analytics (Extra Feature)
- Built a dedicated **analytics dashboard** for each user
- Shows:
  - Total number of tasks
  - Number of completed tasks
  - Number of pending tasks
- Provides insights to help users understand and improve their productivity

---

## 🛠️ Tech Stack Used

### Frontend
- **React.js**
- **TailwindCSS** for modern, responsive UI
- **Axios** for API communication

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **CORS & dotenv** for configuration and cross-origin setup

---

## 📁 Project Structure

personal-task-manager/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Auth pages, Dashboard, Analytics
│ │ ├── services/ # Axios API utilities
│ │ └── App.jsx
│ └── tailwind.config.js
│
├── server/ # Node.js backend
│ ├── controllers/ # Auth, Task, Analytics logic
│ ├── models/ # Mongoose schemas (User, Task)
│ ├── routes/ # API routing
│ ├── middleware/ # JWT Auth middleware
│ └── server.js
│
└── README.md

---

## 📦 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-task-manager.git
cd personal-task-manager
```
### 2. Setup Backend
```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=<your-mongo-db-uri>
# JWT_SECRET=<your-jwt-secret>
npm run dev
```
### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```
Visit http://localhost:5173 to use the app.

The app lets users add these tasks, track progress, and view completion analytics — all in one place.

## Features

✅ Login / Signup Page

📋 Task Dashboard with filters

🧠 User Analytics view

---

🔗 Live Demo: https://your-deployment-link.vercel.app

✅ Project Highlights

 - Clean and responsive UI using TailwindCSS      
  - Functional authentication + protected routes
  - Full CRUD task logic with filters      
  - User analytics implemented for performance tracking      
  - Clear code structure and modular components

🙌 Credits
Built entirely by **Mugeish Kumar S** as a hands-on full-stack project for **ThisUI** Drive to demonstrate real-world app development skills.
