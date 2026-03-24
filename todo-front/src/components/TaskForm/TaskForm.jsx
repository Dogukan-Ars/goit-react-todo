import { useDispatch } from "react-redux";
import { useState } from "react";
import css from "./TaskForm.module.css";

import { Button } from "../Button/Button";
import { addTask } from "../../redux/tasksSlice";   // ← BURAYI DEĞİŞTİRDİK

export const TaskForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!text.trim()) return;

        // Yeni slice'a göre addTask thunk'ını çağırıyoruz
        dispatch(addTask(text.trim()));

        setText(""); // input'u temizle
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <input
                className={css.field}
                type="text"
                placeholder="Enter task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Add Task</Button>
        </form>
    );
};