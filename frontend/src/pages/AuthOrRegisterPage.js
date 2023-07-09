import React from 'react';
import {Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import '../css/AuthOrRegisterPageStyles.css';
import {Link} from "react-router-dom";

const AuthOrRegisterPage = () => {
    return (
        <div className="auth-page">
            <h1 className="auth-title">
                <UserOutlined className="auth-icon"/>
                Добро пожаловать!
            </h1>
            <p>Пожалуйста, выберите действие:</p>
            <div className="auth-buttons">
                <Link to="/api/auth">
                    <Button type="primary" size="large" className="auth-button">
                        Вход
                    </Button>
                </Link>
                <Link to="/api/register">
                    <Button type="default" size="large" className="auth-button">
                        Регистрация
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default AuthOrRegisterPage;
