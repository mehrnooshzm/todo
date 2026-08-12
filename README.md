# React + Express + MySQL Todo Application

A modern, full-stack Todo application built with **React**, **Express.js**, and **MySQL**. Featuring an Apple-style user interface with drag-and-drop reordering, dynamic status icons, inline task editing, and automatic database setup.

---

## 🚀 Features

- **CRUD Operations**: Add, view, edit (double-click or edit button), toggle completion, and delete tasks.
- **Dynamic Task Icons**: Displays a `<Clock>` icon for pending/in-progress tasks and a `<Check>` icon for completed tasks.
- **Due Date Support**: Every task must include a `dueDate` (YYYY‑MM‑DD). UI shows due date with color‑coded status icons and places it in a dedicated row at the bottom of each card.
- **Drag-and-Drop Reordering**: Smooth task reordering using `@hello-pangea/dnd`.
- **MySQL Integration**: MySQL database connection pool using `mysql2` with automatic database and table creation on backend startup.
- **Responsive UI**: Clean, modern card interface built with `styled-components` and `lucide-react` icons.
- **Production Serving**: Express backend configured to serve Vite's static build output in production.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite
- **Styling**: `styled-components`
- **Icons**: `lucide-react`
- **Drag & Drop**: `@hello-pangea/dnd`
- **HTTP Client**: Axios

### Backend (`/server`)
- **Runtime**: Node.js + Express.js
- **Database**: MySQL (`mysql2` connection pool)
- **Environment Management**: `dotenv`
- **Dev Tools**: `nodemon`

---

## 📋 Prerequisites

Before running the project, make sure you have:
1. **Node.js** (v18 or higher)
2. **npm** (comes with Node.js)
3. **MySQL Server** installed and running on your system (e.g. MySQL Community Server, XAMPP, or Docker)

---

## 📁 Project Structure

```text
reactExpress/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios instance configuration
│   │   ├── components/     # UI & Todo components (item, list, modal, etc.)
│   │   ├── services/       # API call handlers (getTodos, createTodo, etc.)
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Client environment variables (VITE_API_URL)
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/        # Route controllers (toDoController.js)
│   ├── routes/             # API routes (toDoRoute.js)
│   ├── app.js              # Express app setup & server entry point
│   ├── db.js               # MySQL connection pool & auto-table initialization
│   ├── .env                # Database & server environment variables
│   ├── .env.example        # Example environment configuration
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
Create or edit `server/.env` with your MySQL database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_db
DB_PORT=3306
PORT=5000
```

> **Note**: On server startup, MySQL automatically creates the database specified in `DB_NAME` (`todo_db`) and the `todos` table if they do not already exist.

### Frontend (`client/.env`)
Create or edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🏁 How to Run

### Step 1: Install Dependencies

Open a terminal in the project root directory and run:

**Backend Dependencies:**
```bash
cd server
npm install
```

**Frontend Dependencies:**
```bash
cd ../client
npm install
```

---

### Step 2: Ensure MySQL is Running

Make sure your local or remote MySQL service is running and credentials match `server/.env`.

---

### Step 3: Start Development Mode

Run the backend and frontend in separate terminal windows:

#### Terminal 1 (Backend):
```bash
cd server
npm run dev
# Or run with nodemon:
npx nodemon app.js
```
*Server will start on `http://localhost:5000`.*

#### Terminal 2 (Frontend):
```bash
cd client
npm run dev
```
*Vite dev server will start (typically on `http://localhost:5173`). Open this URL in your browser.*

---

### Step 4: Run in Production Mode

To build the React frontend and serve it directly through the Express backend:

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the Express server:**
   ```bash
   cd ../server
   node app.js
   ```

3. **Access the application:**
   Open `http://localhost:5000` in your web browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/todos` | Fetch all todo items | N/A |
| **POST** | `/api/todos` | Create a new todo item | `{ "title": "Buy groceries" }` |
| **PUT** | `/api/todos/:id` | Update title or completion | `{ "completed": true }` or `{ "title": "Updated" }` |
| **DELETE**| `/api/todos/:id` | Delete a todo item | N/A |
