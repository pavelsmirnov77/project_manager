import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StartPage from './pages/StartPage';
import AuthOrRegisterPage from "./pages/AuthOrRegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/api" element={<AuthOrRegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/api/register" element={<RegisterPage/>}/>
            <Route path="api/auth" element={<AuthPage/>}/>
        </Routes>
    );
};

export default App;
