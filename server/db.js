/**
 * Database Connection & Initialization Module
 * Manages SQLite connection via `sqlite3` and ensures database/tables are automatically setup on start.
 */

require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create SQLite Database connection
const dbPath = process.env.DB_PATH || path.join(__dirname, "todo_db.sqlite");
const sqlite = new sqlite3.Database(dbPath);

// Enable foreign keys
sqlite.run("PRAGMA foreign_keys = ON");

// Wrapper class to provide async/promise interface for sqlite3
class DatabaseWrapper {
  constructor(db) {
    this.db = db;
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      // Determine if this is a SELECT query
      const isSelect = sql.trim().toUpperCase().startsWith("SELECT");

      if (isSelect) {
        this.db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve([rows || []]);
        });
      } else {
        this.db.run(sql, params, function (err) {
          if (err) reject(err);
          else
            resolve([
              { insertId: this.lastID, affectedRows: this.changes },
              { lastID: this.lastID, changes: this.changes },
            ]);
        });
      }
    });
  }
}

const pool = new DatabaseWrapper(sqlite);

/**
 * Initializes the database if it doesn't exist and creates the `todos` table schema.
 */
async function initDb() {
  try {
    // Ensure `todos` table schema exists with dueDate field and order column for drag-and-drop functionality
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        dueDate TEXT DEFAULT NULL,
        \`order\` INTEGER DEFAULT 0
      )
    `);

    // Add `order` column to existing tables that don't have it (migration for existing databases)
    try {
      await pool.query(
        `ALTER TABLE todos ADD COLUMN \`order\` INTEGER DEFAULT 0`,
      );
    } catch (err) {
      // Column already exists, ignore the error
      if (!err.message.includes("duplicate column")) {
        throw err;
      }
    }

    console.log(
      "SQLite database and table 'todos' ready with dueDate and order support.",
    );
  } catch (err) {
    console.error("SQLite Database initialization error:", err.message);
  }
}

// Auto-run DB initialization on module load
initDb();

module.exports = pool;
