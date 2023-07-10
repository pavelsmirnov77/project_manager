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

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/api/auth" element={<AuthOrRegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/api/auth/signup" element={<RegisterPage/>}/>
            <Route path="/api/auth/signin" element={<AuthPage/>}/>
            <Route path="/todo/note" element={<TodoListsPage/>}/>
            <Route path="/todo/archive" element={<ArchivePage/>}/>
            <Route path="/todo/reminder" element={<ReminderPage/>}/>
            <Route path="/todo/trash" element={<TrashPage/>}/>
        </Routes>
    );
};

export default App;
