import { useSelector } from "react-redux";
import style from './TaskList.module.css';
import Task from "../Task/Task";

const getVisibleTasks = (tasks, statusFilter) => {
    switch (statusFilter) {
        case 'active':
            return tasks.filter((task) => !task.completed);
        case 'completed':
            return tasks.filter((task) => task.completed);
        default:
            return tasks;
    }
}

export const TaskList = () => {
    // redux state'inden görevleri al
    const tasks = useSelector((state) => state.tasks.items);

    // redux state'inden filtre durumunu al
    const statusFilter = useSelector((state) => state.filters.status);

    // Arayüzde görünecek görevlerin dizinini hesapla
    const visibleTasks = getVisibleTasks(tasks, statusFilter);

    return (
        <ul className={style.list}>
            {visibleTasks.map((task) => (
                <li className={style.listItem} key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    )
}