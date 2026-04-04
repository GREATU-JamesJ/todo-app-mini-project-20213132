# 🎯 Todo List - Full Stack App

A simple yet complete full-stack Todo application built with React + Vite (frontend) and Express + MongoDB (backend). Successfully deployed on Vercel.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Axios
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Features
- Add new Todo items
- View Todo list
- Mark Todo as completed (checkbox)
- Delete Todo
- Data is **persistently stored** in MongoDB (survives page refresh)

## Live Demo
- **Deployed URL**: [https://todo-app-mini-project-20213132.vercel.app](https://todo-app-mini-project-20213132.vercel.app)

## Local Development
```bash
# Clone the repository
git clone https://github.com/GREATU-JamesJ/todo-app-mini-project-20213132.git
cd todo-app

# Backend
cd backend
npm install
# Create .env file with MONGODB_URI
npm run dev

# Frontend (in a new terminal)
cd ../frontend
npm install
npm run dev
