import React, { useState, useEffect } from "react";
import { Card, Spin, message, Row, Col, Progress, Input } from "antd";
import statisticsService from "../services/statisticService";
import userService from "../services/userService";
import MenuBar from "../components/MenuBar";

const { Meta } = Card;
const { Search } = Input;

const AllUsersStatisticsPage = () => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const users = await userService.getAllUsers();

                const allStatistics = await Promise.all(users.map(async user => {
                    const userStatistics = await statisticsService.getStatisticsByUserId(user.id);
                    return {
                        ...user,
                        ...userStatistics
                    };
                }));

                setStatistics(allStatistics);
            } catch (error) {
                console.error("Ошибка при получении статистики всех пользователей:", error);
                message.error("Не удалось загрузить статистику всех пользователей.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredStatistics = statistics.filter(stat =>
        stat.username.toLowerCase().includes(searchTerm)
    );

    if (loading) {
        return <Spin />;
    }

    return (
        <div>
            <MenuBar />
            <div style={{
                marginTop: "-100px",
                marginBottom: "50px",
                marginRight: "100px",
                marginLeft: "250px",
                fontSize: "32px",
                fontWeight: "bold"
            }}>
                Статистика всех пользователей
            </div>
            <Search
                placeholder="Поиск по имени пользователя"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 20, marginLeft: 250, width: '50%' }}
            />
            <Row gutter={[16, 16]}>
                {filteredStatistics.map(stat => {
                    const { user, username, completedTasks, allTasks, hoursSpent } = stat;
                    const completionPercentage = Math.round((completedTasks / allTasks) * 100);

                    return (
                        <Col span={24} key={user.id}>
                            <Card style={{ width: '80%', marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                                <Meta
                                    title={`Статистика пользователя: ${username}`}
                                    description={`ID пользователя: ${user.id}`}
                                />
                                <p>Количество выполненных задач: {completedTasks}</p>
                                <p>Общее количество задач: {allTasks}</p>
                                <p>Время, затраченное на разработку: {hoursSpent}</p>
                                <p style={{fontWeight: "bold"}}>Диаграмма выполненных задач:</p>
                                <Progress type="circle" percent={completionPercentage} />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default AllUsersStatisticsPage;
