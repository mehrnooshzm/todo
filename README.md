# Todo App Server 🔧

A robust Express.js backend for the Todo application, featuring SQLite database integration, RESTful API endpoints, and production-ready deployment. Handles CRUD operations for todo items with automatic database initialization.

---

## Live Deployment

**Backend API**: [https://todo-1-rfku.onrender.com/](https://todo-1-rfku.onrender.com/)

Hosted on **Render** with persistent SQLite database storage.

### API Base URL (Production)

```
https://todo-1-rfku.onrender.com/api
```

### API Base URL (Development)

```
http://localhost:5000/api
```

---

## Features

- **RESTful API**: Complete CRUD operations for todo items
- **SQLite Database**: Lightweight, file-based database with automatic schema initialization
- **Automatic Table Setup**: Database and `todos` table created automatically on first run
- **CORS Support**: Configured to work with frontend deployments
- **Production Ready**: Serves static frontend builds and handles API requests
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Environment Configuration**: Flexible setup via `.env` file

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) v5
- **Database**: [SQLite](https://www.sqlite.org/) (`sqlite3` npm package)
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)
- **Dev Tools**: [nodemon](https://nodemon.io/) (auto-reload during development)

---

## Project Structure

```text
server/
├── controllers/
│   └── toDoController.js    # Route handlers for CRUD operations
├── routes/
│   └── toDoRoute.js         # API route definitions
├── middleware/
│   └── validateToDo.js      # Input validation middleware
├── app.js                   # Express server setup & configuration
├── db.js                    # SQLite connection & initialization
├── .env                     # Environment variables (DB path, port)
├── .env.example             # Example environment configuration
├── package.json             # Dependencies & scripts
└── README.md
```

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api`:

| Method     | Endpoint      | Description                       | Request Body                                           |
| ---------- | ------------- | --------------------------------- | ------------------------------------------------------ |
| **GET**    | `/todos`      | Fetch all todo items              | N/A                                                    |
| **POST**   | `/todos`      | Create a new todo                 | `{ "title": "Task name", "dueDate": "2026-01-15" }`    |
| **PUT**    | `/todos/:id`  | Update todo (title/date/status)   | `{ "title": "Updated", "dueDate": "2026-01-20" }`      |
| **PUT**    | `/todos/:id`  | Toggle completion status          | `{ "completed": true }`                                |
| **PUT**    | `/todos/sort` | Reorder todos after drag-and-drop | `{ "todos": [{ "id": 1 }, { "id": 3 }, { "id": 2 }] }` |
| **DELETE** | `/todos/:id`  | Delete a todo item                | N/A                                                    |

### Due Date Support

- **Mandatory Field**: Every todo **must** have a `dueDate` in `YYYY-MM-DD` format
- **Accepted Formats**: Dates are stored and returned as ISO 8601 date strings (e.g., `"2026-01-15"`)
- **Usage**: Include `dueDate` when creating or updating todos

### Sort/Reorder API

**Endpoint**: `PUT /api/todos/sort`

Persists the new order of todos after drag-and-drop operations. The `order` field in the database tracks the visual position.

**Request**:

```json
{
  "todos": [{ "id": 3 }, { "id": 1 }, { "id": 2 }]
}
```

**Response**: Returns all todos ordered by their new positions:

```json
[
  {
    "id": 3,
    "title": "Third task",
    "dueDate": "2026-01-20",
    "completed": false,
    "order": 0
  },
  {
    "id": 1,
    "title": "First task",
    "dueDate": "2026-01-15",
    "completed": true,
    "order": 1
  },
  {
    "id": 2,
    "title": "Second task",
    "dueDate": "2026-01-18",
    "completed": false,
    "order": 2
  }
]
```

### Response Format

**Success Response (200)**:

```json
{
  "id": 1,
  "title": "Buy groceries",
  "dueDate": "2026-01-15",
  "completed": false,
  "order": 0
}
```

**Error Response (4xx/5xx)**:

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database path (optional, defaults to ./todo_db.sqlite)
DB_PATH=./todo_db.sqlite

# Server port (optional, defaults to 5000)
PORT=5000

# Node environment
NODE_ENV=development
```

---

## Getting Started

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment (Optional)

Create a `.env` file with your preferred settings:

```bash
cp .env.example .env
```

### 3. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` with **nodemon** for auto-reloading.

### 4. Run Production Server

```bash
npm start
```

The server will start on the port specified in `.env` (default: 5000).

---

## Database

### Automatic Initialization

On server startup, the following occurs automatically:

1. **Database File Creation**: If `todo_db.sqlite` doesn't exist, it's created
2. **Table Creation**: The `todos` table is created with the schema:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  dueDate TEXT DEFAULT NULL,
  `order` INTEGER DEFAULT 0
)
```

> **Note**: The `order` column tracks each task's visual position and is what the `PUT /todos/sort` endpoint updates after drag-and-drop. For databases created before this column existed, `db.js` runs an `ALTER TABLE` migration on startup to add it automatically. There is no `createdAt` column — timestamps are not currently tracked.

### Database Location

By default, the SQLite database file is stored at:

```
server/todo_db.sqlite
```

You can customize this by setting `DB_PATH` in `.env`.

---

## Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload (nodemon)
npm run dev
```

---

## Error Handling

The server handles common errors gracefully:

| Status Code | Description                |
| ----------- | -------------------------- |
| **200**     | Success                    |
| **201**     | Resource created           |
| **400**     | Bad request (invalid data) |
| **404**     | Todo not found             |
| **500**     | Internal server error      |

---

## 🌍 Deployment

### Deploying to Render

1. **Create a Render Account**: Visit [render.com](https://render.com)
2. **Connect Repository**: Link your GitHub repository
3. **Configure Build & Start Commands**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Set Environment Variables**: Add `DB_PATH` and `PORT` in Render dashboard
5. **Deploy**: Render will automatically deploy on each push to main branch

### Deploying to Other Platforms

- **Heroku**: Use Procfile with `web: npm start`
- **Railway**: Auto-detects Node.js and runs start script
- **Vercel**: Can host Node.js backend (serverless functions)
- **AWS/DigitalOcean**: Standard Node.js deployment process

---

## Related Projects

- **Frontend Repository**: [todo-app-client](https://github.com/yourusername/todo-app-client)
  - Deployed at: [https://todo-app-wit.vercel.app/](https://todo-app-wit.vercel.app/)
- **Full Stack Repository**: [reactExpress](https://github.com/yourusername/reactExpress)

---

## 📝 Notes

- The SQLite database is file-based and persisted on the server
- CORS is configured to accept requests from the frontend deployment
- All API responses follow REST conventions
- Timestamps are stored in ISO 8601 format

---

## Troubleshooting

**Port 5000 already in use?**

```bash
# Change PORT in .env to a different port
PORT=3001
```

**Database file not found?**

- The database is automatically created on first run
- Check `DB_PATH` environment variable

**CORS errors from frontend?**

- Ensure backend is running and accessible from frontend domain
- Check CORS configuration in `app.js`

---

## 📄 License

ISC
