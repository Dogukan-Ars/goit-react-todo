import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'filters',
    initialState: {
        status: 'all',
    },
    reducers: {
        setStatusFilter(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setStatusFilter } = slice.actions;

export default slice.reducer;