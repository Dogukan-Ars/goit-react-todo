import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";

// ====================== THUNKS ======================

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async () => {
        const res = await fetch(`${BASE_URL}/todos`);   // backend endpoint'iniz todos ise olduğu gibi bırak
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskText) => {
        const res = await fetch(`${BASE_URL}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: taskText,        // backend'in beklediği alan
                isChecked: false
            }),
        });

        if (!res.ok) throw new Error("Failed to add task");
        return res.json();
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id) => {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete task");
        return id;   // sadece id dönüyoruz
    }
);

export const toggleTask = createAsyncThunk(
    "tasks/toggleTask",
    async (id) => {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isChecked: "toggle" }),   // backend toggle mantığını destekliyorsa
        });

        if (!res.ok) throw new Error("Failed to toggle task");
        return res.json();
    }
);

export const editTask = createAsyncThunk(
    "tasks/editTask",
    async ({ id, newTask }) => {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: newTask }),
        });

        if (!res.ok) throw new Error("Failed to edit task");
        return res.json();
    }
);

// ====================== SLICE ======================

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        // İleride local-only işlemler eklersen buraya koyabilirsin
    },
    extraReducers: (builder) => {
        builder
            // FETCH TASKS
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })

            // ADD TASK
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);   // yeni eklenen en üste gelsin (eski kod gibi)
            })

            // DELETE TASK
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((task) => task.id !== action.payload);
            })

            // TOGGLE (isChecked)
            .addCase(toggleTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            // EDIT TASK
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default tasksSlice.reducer;