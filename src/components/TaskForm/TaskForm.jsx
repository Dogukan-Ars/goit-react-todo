import { useDispatch } from "react-redux"
import { addTask } from "../../redux/actions";
import css from "./TaskForm.module.css"
import { Button } from "../Button/Button";

export const TaskForm = () => {
    // 1. Use the useDispatch hook to get the dispatch function
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        // 2. Call the dispatch function with an action object and any necessary payload
        // 5. For example, if you have an action creator called addTask, you can dispatch it like this:
        dispatch(
            addTask({
                id: crypto.randomUUID(),
                text: form.elements.text.value,
                completed: false
            }))
        form.reset();
    }

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <input
                className={css.field}
                type="text"
                name="text"
                placeholder="Enter task..."
            />
            <Button type="submit">Add Task</Button>
        </form>
    )
}