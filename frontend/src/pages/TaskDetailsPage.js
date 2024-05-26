import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Card, Typography, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import taskService from "../services/taskService";
import MenuBar from "../components/MenuBar";

const {Title, Paragraph} = Typography;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const TaskDetails = () => {
    const {taskId} = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const fetchedTask = await taskService.getTaskById(taskId);
                setTask(fetchedTask);
            } catch (error) {
                console.error("Ошибка при получении задачи:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    if (loading) {
        return (
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <Spin indicator={antIcon}/>
            </div>
        );
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <MenuBar/>
            <div style={{marginLeft: "250px", marginTop: "-120px"}}>
                <Card style={{width: "800px"}}>
                    <div>
                        <Title level={2}>{task.title}</Title>
                        <Paragraph style={{fontSize: "18px"}}>
                            <strong>Описание:</strong> {task.description}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px"}}>
                            <strong>Исполнитель:</strong> {task.assignee}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px"}}>
                            <strong>Приоритет:</strong> {task.priority.name}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px"}}>
                            <strong>Статус:</strong> {task.status.name}
                        </Paragraph>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TaskDetails;
