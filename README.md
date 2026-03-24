# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (signup/login with JWT)
- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Search tasks by title
- Sort tasks by due date or priority
- Pagination support
- Task analytics/statistics
- Dark mode toggle
- Responsive design

## Tech Stack

**Frontend:**

- React 18
- Redux Toolkit + React Redux
- React Router v6
- CSS (no external UI libraries)

**Backend:**

- Node.js (ES Modules)
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
TaskManagement/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Analytics.jsx
    │   │   ├── Filters.jsx
    │   │   ├── Header.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── store/
    │   │   ├── index.js
    │   │   └── slices/
    │   │       ├── authSlice.js
    │   │       └── taskSlice.js
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── Login.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_secret_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open at http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks (all protected)

- `POST /api/tasks` - Create a task
- `GET /api/tasks` - Get all tasks (with filters, search, pagination)
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update task status
- `GET /api/tasks/stats` - Get task statistics

### Query Parameters for GET /api/tasks

- `status` - Filter by status (Todo, In Progress, Done)
- `priority` - Filter by priority (Low, Medium, High)
- `search` - Search by title (case-insensitive)
- `sortBy` - Sort field (dueDate, priority)
- `order` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Usage

1. Create an account or login
2. Create tasks with title, description, status, priority, and due date
3. Use filters to find specific tasks
4. Update task status from the task card
5. Click "Show Stats" to view analytics
6. Toggle dark mode using the moon/sun icon
