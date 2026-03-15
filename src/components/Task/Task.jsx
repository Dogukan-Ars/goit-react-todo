import { useDispatch } from "react-redux"
import { deleteTask, toggleCompleted } from "../../redux/tasksSlice";
import css from "./Task.module.css"
import { MdClose } from "react-icons/md";
import { Button } from "../Button/Button";

const Task = ({ task }) => {
    // 1. Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    const handleDelete = () => {
        // 2. Dispatch the deleteTask action with the task's id
        dispatch(deleteTask(task.id));
    };

    const handleToggle = () => {
        // 3. Dispatch the toggleCompleted action with the task's id
        dispatch(toggleCompleted(task.id));
    };

    return (
        <div className={css.wrapper}>
            <input
                className={css.checkbox}
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
            />
            <p className={css.text}>{task.text}</p>
            <Button type="button" onClick={handleDelete}>
                <MdClose size={18} />
            </Button>
        </div>
    )
}

export default Task