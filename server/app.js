/**
 * Express Application Entry Point
 * Configures global middleware, API routes, static asset serving for React SPA, and starts the server.
 */

const express = require("express");
const toDoRouter = require("./routes/toDoRoute");
const path = require("path");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware Configuration ----------

// Enable Cross-Origin Resource Sharing (CORS) for client-server communication
app.use(cors());

// Middleware for parsing JSON-encoded request bodies
app.use(express.json());

// ---------- API Routes ----------

// Main API router scoped under `/api` path
const apiRouter = express.Router();

// Mount Todo resource routes under `/api/todos`
apiRouter.use("/todos", toDoRouter);

// Register base API router
app.use("/api", apiRouter);

// ---------- Serve React Frontend (Production) ----------

// Path to compiled React build assets in sibling `client/dist` directory
const clientBuildPath = path.join(__dirname, "..", "client", "dist");

// Serve static compiled assets (JS, CSS, images)
app.use(express.static(clientBuildPath));

// Catch-all handler: route non-API HTTP requests to React's index.html for client-side routing
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ---------- Server Initialization ----------

// Start Express server listening on configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
