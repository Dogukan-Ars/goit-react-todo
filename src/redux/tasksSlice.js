import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "tasks",
    initialState: {
        items: [
            { id: 0, text: 'Learn HTML and CSS', completed: true },
            { id: 1, text: 'Get good at JavaScript', completed: true },
            { id: 2, text: 'Master React', completed: false },
            { id: 3, text: 'Discover Redux', completed: false },
            { id: 4, text: 'Build a Amazing Apps', completed: false },
        ]
    },
    reducers: {
        addTask: (state, action) => {
            state.items.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        toggleCompleted: (state, action) => {
            for (const task of state.items) {
                if (task.id === action.payload) {
                    task.completed = !task.completed;
                    break;
                }
            }
        }
    }
})

export const { addTask, deleteTask, toggleCompleted } = slice.actions;
export default slice.reducer;