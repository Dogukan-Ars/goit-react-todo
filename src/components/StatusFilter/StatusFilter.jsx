import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter } from '../../redux/filterSlice';
import { Button } from '../Button/Button';
import css from "./StatusFilter.module.css"

export const StatusFilter = () => {
    // 1. Get the dispatch function from the Redux store
    const dispatch = useDispatch();
    // 2. Get the current status filter from the Redux store
    const filter = useSelector((state) => state.filters.status);

    const handleFilterChange = (filter) =>
        // 3. Dispatch an action to update the status filter in the Redux store
        dispatch(setStatusFilter(filter));


    return (
        <div className={css.wrapper}>
            <Button selected={filter === 'all'} onClick={() => handleFilterChange('all')}>All</Button>
            <Button selected={filter === 'active'} onClick={() => handleFilterChange('active')}>Active</Button>
            <Button selected={filter === 'completed'} onClick={() => handleFilterChange('completed')}>Completed</Button>
        </div>
    )
}