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
import '../css/StartPageStyles.css';
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
                            TODO-List
                        </h1>
                        <p>Добро пожаловать</p>
                        <Link to="/api">
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
                        Добро пожаловать в наше приложение для заметок
                    </h1>
                    <p className="start-p">
                        <ProfileOutlined className="icon"/>
                        Создавайте новые задачи с легкостью! Вы можете задавать им название и описание, а также
                        указывать сроки выполнения задачи.
                    </p>
                    <p className="start-p">
                        <CheckOutlined className="icon"/>
                        Просматривайте и редактируйте свой список задач в удобном интерфейсе. Вы можете фильтровать
                        задачи по статусу, отмечать их как выполненные или изменять их статус в соответствии с вашим
                        прогрессом.
                    </p>
                    <p className="start-p">
                        <BellOutlined className="icon"/>
                        Не пропускайте важные моменты! Наше приложение предоставляет уведомления о приближающихся сроках
                        выполнения задач. Вы можете получать уведомления через систему внутренних уведомлений
                        веб-приложения, чтобы быть вовремя и не пропустить ни одной задачи.
                    </p>
                    <p className="start-p">
                        <SearchOutlined className="icon"/>
                        Создавайте и организовывайте задачи по своим потребностям. Используйте функцию поиска, чтобы
                        быстро находить задачи по ключевым словам или срокам выполнения.
                    </p>
                    <p className="start-p">
                        <StarOutlined className="icon"/>
                        Для более удобного планирования, вы можете указать приоритет каждой задачи. Отобразите задачи в
                        порядке их важности, используя метки или цифровые значения. Категоризируйте задачи, чтобы легко
                        классифицировать и организовывать их, обеспечивая более эффективную работу.
                    </p>
                </div>
                <Link to="/api">
                    <Button className="footer-button" type="primary">
                        <CheckOutlined className="icon"/>
                        Попробовать
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default StartPage;
