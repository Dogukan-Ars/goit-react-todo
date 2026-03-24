import { useDispatch } from "react-redux";
import css from "./Task.module.css";
import { MdClose, MdEdit } from "react-icons/md";
import { Button } from "../Button/Button";

import { deleteTask, toggleTask, editTask } from "../../redux/tasksSlice";

const Task = ({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleToggle = () => {
        dispatch(toggleTask(task.id));
    };

    const handleEdit = () => {
        const newTask = prompt("Yeni görev adını girin:", task.task);

        if (newTask && newTask.trim() !== "" && newTask.trim() !== task.task) {
            dispatch(editTask({
                id: task.id,
                newTask: newTask.trim()
            }));
        }
    };

    return (
        <div className={css.wrapper}>
            <input
                className={css.checkbox}
                type="checkbox"
                checked={task.isChecked}
                onChange={handleToggle}
            />

            <p
                className={`${css.text} ${task.isChecked ? css.completed : ""}`}
            >
                {task.task}
            </p>

            <div className={css.actions}>
                <Button type="button" onClick={handleEdit}>
                    <MdEdit size={18} className={css.edit_icon}/>
                </Button>
                <Button type="button" onClick={handleDelete}>
                    <MdClose size={18} className={css.delete_icon}/>
                </Button>
            </div>
        </div>
    );
};

export default Task;