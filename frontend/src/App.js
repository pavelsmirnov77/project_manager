import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StartPage from './pages/StartPage';
import AuthOrRegisterPage from "./pages/AuthOrRegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import {TodoListsPage} from "./pages/TodoListsPage";
import {ArchivePage} from "./pages/ArchivePage";
import ReminderPage from "./pages/ReminderPage";
import TrashPage from "./pages/TrashPage";
import authService from "./services/authService";
import UserPage from "./pages/UserPage";

const App = () => {

    const handleSignUp = (userData) => {
        authService.register(userData);
    };

    return (
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/api/auth" element={<AuthOrRegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/api/auth/signup" element={<RegisterPage handleSignUp={handleSignUp}/>}/>
            <Route path="/api/auth/signin" element={<AuthPage/>}/>
            <Route path="/todo/note" element={<TodoListsPage/>}/>
            <Route path="/todo/archive" element={<ArchivePage/>}/>
            <Route path="/todo/reminder" element={<ReminderPage/>}/>
            <Route path="/todo/trash" element={<TrashPage/>}/>
            <Route path="/users/profile" element={<UserPage/>}/>
        </Routes>
    );
};

export default App;
