import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";
import categoryReducer from "./slices/categorySlice";
import authReducer from "./slices/authSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
        categories: categoryReducer,
        auth: authReducer,
    },
})