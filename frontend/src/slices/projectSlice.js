import {createSlice} from "@reduxjs/toolkit";

const selectedProject = JSON.parse(localStorage.getItem("selected_category"));

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        tasks: [],
        selectedProject: selectedProject
    },
    reducers: {
        setAllProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        }
    },
})

export const {setSelectedProject, setAllProjects} = projectSlice.actions;

export default projectSlice.reducer;