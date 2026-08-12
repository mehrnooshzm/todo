/**
 * Database Connection & Initialization Module
 * Manages MySQL connection pool via `mysql2/promise` and ensures database/tables are automatically setup on start.
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

// Create MySQL Connection Pool for efficient query execution and connection reuse
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "todo_db",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});


/**
 * Initializes the database if it doesn't exist and creates the `todos` table schema.
 */
async function initDb() {
  try {
    // Create initial connection without specifying database name to perform CREATE DATABASE check
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    });

    const dbName = process.env.DB_NAME || "todo_db";
    // Ensure database exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();

    // Ensure `todos` table schema exists in the specified database with dueDate field
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed TINYINT(1) NOT NULL DEFAULT 0,
        dueDate DATE DEFAULT NULL
      )
    `);

    // Safely add or rename column to `dueDate` if database table existed previously
    try {
      await pool.query("ALTER TABLE todos ADD COLUMN dueDate DATE DEFAULT NULL;");
    } catch (err) {
      // Column already exists, ignore
    }

    try {
      await pool.query("ALTER TABLE todos CHANGE COLUMN due_date dueDate DATE DEFAULT NULL;");
    } catch (err) {
      // Column already renamed or didn't exist, ignore
    }

    console.log("MySQL database and table 'todos' ready with dueDate support.");
  } catch (err) {
    console.error("MySQL Database initialization error:", err.message);
  }
}


// Auto-run DB initialization on module load
initDb();

module.exports = pool;
