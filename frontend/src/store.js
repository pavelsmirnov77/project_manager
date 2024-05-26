import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
        projects: projectReducer,
        auth: authReducer,
    },
})