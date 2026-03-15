// 1. Hook içe aktarıyoruz
import { useSelector } from "react-redux";
import css from "./TaskCounter.module.css"


export const TaskCounter = () => {
    // 2. Redux durumundan görevler dizisini alıyoruz
    const tasks = useSelector((state) => state.tasks.items);

    // 3. Redux durumundan türetilmiş verileri alıyoruz
    const count = tasks.reduce(
        (acc, task) => {
            if (task.completed) {
                acc.completed += 1;
            } else {
                acc.active += 1;
            }
            return acc;
        },
        { active: 0, completed: 0 }
    );

    return (
        <div>
            <p className={css.text}>Active Tasks: {count.active}</p>
            <p className={css.text}>Completed Tasks: {count.completed}</p>
        </div>
    )
}