import React from 'react';
import {Button} from 'antd';
import {CheckOutlined, UserOutlined} from '@ant-design/icons';
import '../css/authOrRegisterPageStyles.css';
import {Link} from "react-router-dom";

const AuthOrRegisterPage = () => {
    return (
        <div className="start-page">
            <div className="header">
                <div className="background-image"/>
                <div className="header-content">
                    <div className="header-text">
                        <h1 className="app-title">
                            <UserOutlined className="icon"/>
                            STUDENT PROJECT MANAGER
                        </h1>
                    </div>
                </div>
            </div>
            <div className="auth-title">
                <div className="content">
                    <div className="text-content">
                        <p>Пожалуйста, выберите действие:</p>
                        <div className="auth-buttons">
                            <Link to="/api/auth/signin">
                                <Button type="primary" size="large" className="auth-button"
                                        style={{backgroundColor: '#333232'}}>
                                    Вход
                                </Button>
                            </Link>
                            <Link to="/api/auth/signup">
                                <Button type="default" size="large" className="auth-button">
                                    Регистрация
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthOrRegisterPage;
