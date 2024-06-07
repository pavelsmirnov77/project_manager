import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";
import dialogReducer from "./slices/dialogSlice"
import commentReducer from "./slices/commentSlice"
import statisticReducer from "./slices/statisticSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
        projects: projectReducer,
        auth: authReducer,
        dialog: dialogReducer,
        comment: commentReducer,
        statistic: statisticReducer
    },
})