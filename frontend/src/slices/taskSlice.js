import {createSlice} from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        selectedTask: null,
        statuses: [],
        priorities: [],
        regularities: [],
    },
    reducers: {
        set: (state, action) => {
            state.tasks = action.payload;
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        setStatuses: (state, action) => {
            state.statuses = action.payload;
        },
        setPriorities: (state, action) => {
            state.priorities = action.payload;
        },
    },
})

export const {
    set,
    setSelectedTask,
    setStatuses,
    setPriorities
} = taskSlice.actions;

export default taskSlice.reducer;