const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// In-memory storage (ileride MongoDB vs. geçebilirsin)
let todos = [
    {
        id: 1,
        task: "Learn React",
        isChecked: false
    }
];

// ====================== ROUTES ======================

// Test route
app.get("/", (req, res) => {
    res.send("Todo API is running 🚀");
});

// GET all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// CREATE todo
app.post("/todos", (req, res) => {
    const { task } = req.body;

    if (!task || typeof task !== "string" || task.trim() === "") {
        return res.status(400).json({ message: "Task field is required" });
    }

    const newTodo = {
        id: Date.now(),           // basit id (ileride UUID kullanabilirsin)
        task: task.trim(),
        isChecked: false
    };

    todos.unshift(newTodo);       // yeni todo en üste gelsin (frontend ile aynı his)

    res.status(201).json(newTodo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", id });
});

// TOGGLE (isChecked) - En sık kullanılan güncelleme
app.patch("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    // Frontend'den "toggle" geldiğinde tersine çevir
    if (req.body.isChecked === "toggle") {
        todo.isChecked = !todo.isChecked;
    }
    // Direkt isChecked değeri geldiyse (alternatif)
    else if (typeof req.body.isChecked === "boolean") {
        todo.isChecked = req.body.isChecked;
    }

    // Task metni güncellenmek istenirse
    if (req.body.task && typeof req.body.task === "string") {
        todo.task = req.body.task.trim();
    }

    res.json(todo);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});