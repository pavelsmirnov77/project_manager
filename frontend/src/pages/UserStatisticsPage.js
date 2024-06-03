import React, {useState, useEffect} from "react";
import {Card, Spin, message, Form, Progress, Row, Col} from "antd";
import statisticsService from "../services/statisticService";
import MenuBar from "../components/MenuBar";

const {Meta} = Card;

const UserStatisticsPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const userStatistics = await statisticsService.getStatisticsByUserId(userId);
                setStatistics(userStatistics);
            } catch (error) {
                console.error("Ошибка при получении статистики для пользователя:", error);
                message.error("Не удалось загрузить статистику пользователя.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [userId]);

    if (loading) {
        return <Spin/>;
    }

    if (!statistics) {
        return <div>Статистика для этого пользователя не найдена.</div>;
    }

    const {completedTasks, allTasks, hoursSpent} = statistics;

    const completionPercentage = Math.round((completedTasks / allTasks) * 100);

    return (
        <Form form={form}>
            <div>
                <MenuBar/>
                <div style={{
                    marginTop: "-100px",
                    marginBottom: "50px",
                    marginRight: "100px",
                    marginLeft: "250px",
                    fontSize: "32px",
                    fontWeight: "bold"
                }}>
                    Ваша статистика
                </div>
                <Row gutter={[16, 16]} style={{marginTop: 16}}>
                    <Col span={12}>
                        <Card style={{width: 400, height: 200, marginLeft: 250}}>
                            <p>Количество выполненных задач: {completedTasks}</p>
                            <p>Общее количество задач: {allTasks}</p>
                            <p>Время, затраченное на разработку: {hoursSpent}</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{width: 400, height: 200}}>
                            <Meta title="Круговая диаграмма выполненных задач" style={{marginBottom:20}}/>
                            <Progress type="circle" percent={completionPercentage}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};

export default UserStatisticsPage;
