require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("sslmode=require") ? { rejectUnauthorized: false } : false
});

const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title TEXT NOT NULL, done BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT NOW())`);
  console.log("Database ready");
};

app.get("/", (req, res) => res.json({ status: "ok" }));

app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *", [title]);
  res.status(201).json(result.rows[0]);
});

app.put("/tasks/:id", async (req, res) => {
  const { title, done } = req.body;
  const result = await pool.query("UPDATE tasks SET title = COALESCE($1, title), done = COALESCE($2, done) WHERE id = $3 RETURNING *", [title, done, req.params.id]);
  res.json(result.rows[0]);
});

app.delete("/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
initDB().then(() => app.listen(PORT, () => console.log(`Running on port ${PORT}`)));
