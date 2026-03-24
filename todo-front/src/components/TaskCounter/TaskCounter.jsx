import { useSelector } from "react-redux";
import css from "./TaskCounter.module.css";

export const TaskCounter = () => {
    // Redux'tan görevleri al (state.tasks.items)
    const tasks = useSelector((state) => state.tasks.items);

    // Aktif ve tamamlanmış görev sayısını hesapla
    const count = tasks.reduce(
        (acc, task) => {
            if (task.isChecked) {
                acc.completed += 1;
            } else {
                acc.active += 1;
            }
            return acc;
        },
        { active: 0, completed: 0 }
    );

    return (
        <div className={css.counter}>
            <p className={css.text}>
                Active Tasks: <strong>{count.active}</strong>
            </p>
            <p className={css.text}>
                Completed Tasks: <strong>{count.completed}</strong>
            </p>
        </div>
    );
};