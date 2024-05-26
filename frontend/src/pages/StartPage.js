import React from 'react';
import {Button} from 'antd';
import {
    UserOutlined,
    ProfileOutlined,
    CheckOutlined,
    BellOutlined,
    SearchOutlined,
    StarOutlined
} from '@ant-design/icons';
import '../css/startPageStyles.css';
import {Link} from "react-router-dom";

const StartPage = () => {
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
                        <p>Добро пожаловать</p>
                        <Link to="/api/auth">
                            <Button className="header-button" type="primary">
                                <CheckOutlined className="icon"/>
                                Попробовать
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="text-content">
                    <h1 className="start-h1">
                        Добро пожаловать в наше приложение по управления студенческими проектами
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
