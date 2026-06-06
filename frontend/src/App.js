import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    });
    const task = await res.json();
    setTasks([task, ...tasks]);
    setNewTitle("");
  };

  const toggleDone = async (task) => {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done })
    });
    const updated = await res.json();
    setTasks(tasks.map(t => t.id === task.id ? updated : t));
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle })
    });
    const updated = await res.json();
    setTasks(tasks.map(t => t.id === id ? updated : t));
    setEditingId(null);
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif", padding: 20 }}>
      <h1>Todo List</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: "8px 12px", fontSize: 15, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button onClick={addTask} style={{ padding: "8px 16px", background: "#534AB7", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          Add
        </button>
      </div>
      {tasks.map(task => (
        <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
          <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
          {editingId === task.id ? (
            <>
              <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ flex: 1, padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }} />
              <button onClick={() => saveEdit(task.id)} style={{ padding: "5px 12px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Save</button>
              <button onClick={() => setEditingId(null)} style={{ padding: "5px 12px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ flex: 1, textDecoration: task.done ? "line-through" : "none", color: task.done ? "#aaa" : "#222" }}>{task.title}</span>
              <button onClick={() => { setEditingId(task.id); setEditTitle(task.title); }} style={{ padding: "5px 12px", background: "#e8f4fd", color: "#185FA5", border: "none", borderRadius: 6, cursor: "pointer" }}>Edit</button>
              <button onClick={() => deleteTask(task.id)} style={{ padding: "5px 12px", background: "#fff0f0", color: "#e53e3e", border: "none", borderRadius: 6, cursor: "pointer" }}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
