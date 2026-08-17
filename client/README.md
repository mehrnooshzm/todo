# Todo App Client 📝

A modern, responsive Todo List application built with **React 19**, **Vite**, and **Styled Components**. It features a clean, minimalist UI with drag-and-drop task reordering, modal-based task creation, inline title editing, and optimistic UI updates connected to an Express REST API backend.

---

## 🌐 Live Deployment

**Frontend**: [https://todo-app-wit.vercel.app/](https://todo-app-wit.vercel.app/)

Hosted on **Vercel** for optimal performance and automatic deployments from Git.

---

## ✨ Features

- **Task Management**: Create, edit, toggle completion status, and delete tasks.
- **Drag & Drop Reordering**: Reorder tasks seamlessly using `@hello-pangea/dnd`.
- **Dynamic Header & Counters**: Tracks active and completed task counts dynamically with visual status indicators.
- **Optimistic UI Updates**: Instant interface feedback with automatic rollback on network/server errors.
- **Modal Dialog**: Sleek pop-up modal interface for adding new tasks.
- **Modern Styling**: Custom-designed UI components using `styled-components` and `lucide-react` icons.
- **Due Date Support**: Every task must include a `dueDate` (YYYY‑MM‑DD). UI shows due date with color‑coded status icons and places it in a dedicated row at the bottom of each card.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Styled Components](https://styled-components.com/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── api/          # Axios instance & base configuration
│   ├── components/   # UI & Todo list components (Modal, List, Items)
│   ├── services/     # API service layer (getTodos, createTodo, etc.)
│   ├── App.jsx       # Main application layout and state management
│   └── main.jsx      # Application entry point
├── public/           # Static public assets
├── index.html        # HTML template
├── vite.config.js    # Vite configuration & path aliases (@)
└── package.json      # Project dependencies and scripts
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `client` directory to configure the backend API endpoint:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

### 5. Linting

```bash
npm run lint
```
