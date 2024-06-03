import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StartPage from './pages/StartPage';
import AuthOrRegisterPage from "./pages/AuthOrRegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import {TodoListsPage} from "./pages/TodoListsPage";
import {ChatsPage} from "./pages/ChatsPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import TrashPage from "./pages/TrashPage";
import UserPage from "./pages/UserPage";
import TaskDetails from "./pages/TaskDetailsPage";
import ChatPage from "./pages/ChatPage";
import UserStatisticsPage from "./pages/UserStatisticsPage";
import AllUsersStatisticsPage from "./pages/AllUsersStatisticsPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/api/auth" element={<AuthOrRegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/api/auth/signup" element={<RegisterPage/>}/>
            <Route path="/api/auth/signin" element={<AuthPage/>}/>
            <Route path="/my/projects" element={<TodoListsPage/>}/>
            <Route path="/chats" element={<ChatsPage/>}/>
            <Route path="/all/projects" element={<ProjectsListPage/>}/>
            <Route path="/users" element={<UserPage/>}/>
            <Route path="/tasks/:taskId" element={<TaskDetails/>}/>
            <Route path="/statistics" element={<UserStatisticsPage/>}/>
            <Route path="/all-statistics" element={<AllUsersStatisticsPage/>}/>
            <Route path="/admin/users" element={<AdminUserManagementPage/>}/>
            <Route path="/chat/*" element={<ChatPage/>}/>
        </Routes>
    );
};

export default App;
