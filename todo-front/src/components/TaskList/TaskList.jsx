import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import style from './TaskList.module.css';
import Task from "../Task/Task";

import { fetchTasks } from "../../redux/tasksSlice";   // ← Yeni thunk

// Filtreleme fonksiyonu (eski mantığa sadık, sadece isimler güncellendi)
const getVisibleTasks = (tasks, statusFilter) => {
    switch (statusFilter) {
        case 'active':
            return tasks.filter((task) => !task.isChecked);     // isChecked kullanıyoruz
        case 'completed':
            return tasks.filter((task) => task.isChecked);
        default:
            return tasks;
    }
};

export const TaskList = () => {
    const dispatch = useDispatch();

    // Redux'tan verileri al
    const tasks = useSelector((state) => state.tasks.items);        // ← tasks oldu
    const statusFilter = useSelector((state) => state.filters.status);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);

    // Component mount olduğunda backend'den verileri çek
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Filtreye göre görünür görevleri hesapla
    const visibleTasks = getVisibleTasks(tasks, statusFilter);

    if (loading) {
        return <div className={style.loading}>Yükleniyor...</div>;
    }

    if (error) {
        return <div className={style.error}>Hata: {error}</div>;
    }

    return (
        <ul className={style.list}>
            {visibleTasks.length > 0 ? (
                visibleTasks.map((task) => (
                    <li className={style.listItem} key={task.id}>
                        <Task task={task} />
                    </li>
                ))
            ) : (
                <li className={style.empty}>Henüz görev eklenmedi.</li>
            )}
        </ul>
    );
};