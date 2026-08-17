# Todo App Server 🔧

A robust Express.js backend for the Todo application, featuring SQLite database integration, RESTful API endpoints, and production-ready deployment. Handles CRUD operations for todo items with automatic database initialization.

---

## 🌐 Live Deployment

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

## ✨ Features

- **RESTful API**: Complete CRUD operations for todo items
- **SQLite Database**: Lightweight, file-based database with automatic schema initialization
- **Automatic Table Setup**: Database and `todos` table created automatically on first run
- **CORS Support**: Configured to work with frontend deployments
- **Production Ready**: Serves static frontend builds and handles API requests
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Environment Configuration**: Flexible setup via `.env` file

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) v5
- **Database**: [SQLite](https://www.sqlite.org/) (`sqlite3` npm package)
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)
- **Dev Tools**: [nodemon](https://nodemon.io/) (auto-reload during development)

---

## 📁 Project Structure

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

| Method     | Endpoint     | Description              | Request Body                                        |
| ---------- | ------------ | ------------------------ | --------------------------------------------------- |
| **GET**    | `/todos`     | Fetch all todo items     | N/A                                                 |
| **POST**   | `/todos`     | Create a new todo        | `{ "title": "Task name", "dueDate": "2026-01-15" }` |
| **PUT**    | `/todos/:id` | Update todo (title/date) | `{ "title": "Updated", "dueDate": "2026-01-20" }`   |
| **PATCH**  | `/todos/:id` | Toggle completion status | `{ "completed": true }`                             |
| **DELETE** | `/todos/:id` | Delete a todo item       | N/A                                                 |

### Response Format

**Success Response (200)**:

```json
{
  "id": 1,
  "title": "Buy groceries",
  "dueDate": "2026-01-15",
  "completed": false,
  "createdAt": "2026-01-01T10:00:00Z"
}
```

**Error Response (4xx/5xx)**:

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## ⚙️ Environment Configuration

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

## 🚀 Getting Started

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

## 🗄️ Database

### Automatic Initialization

On server startup, the following occurs automatically:

1. **Database File Creation**: If `todo_db.sqlite` doesn't exist, it's created
2. **Table Creation**: The `todos` table is created with the schema:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  dueDate TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Database Location

By default, the SQLite database file is stored at:

```
server/todo_db.sqlite
```

You can customize this by setting `DB_PATH` in `.env`.

---

## 📦 Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload (nodemon)
npm run dev
```

---

## 🔐 Error Handling

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

## 🤝 Related Projects

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

## 🐛 Troubleshooting

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
