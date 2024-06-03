import React, {useEffect, useState} from "react";
import {
    Card,
    Button,
    Tooltip,
    Dropdown,
    Menu,
    message,
} from "antd";
import {
    DeleteOutlined,
    ExclamationOutlined,
} from "@ant-design/icons";
import {useSelector} from "react-redux";
import taskService from "../services/taskService";
import {Link} from "react-router-dom";

const TaskCard = ({task, handleArchiveTask, selectedTask, dispatch}) => {
    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState("LOW");
    const statuses = useSelector((state) => state.tasks.statuses);
    const priorities = useSelector((state) => state.tasks.priorities);
    const [selectedStatus, setSelectedStatus] = useState(task.status);
    const assignee = task.assignee ? task.assignee.name : "Не назначен";

    useEffect(() => {
        taskService.getStatuses(dispatch);
        taskService.getPriorities(dispatch);
    }, [selectedTask]);

    useEffect(() => {
        taskService.getAllTasks(dispatch);
    }, []);

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        taskService
            .updateTaskStatus(task.id, status.id, dispatch)
            .then(() => {
                message.success("Статус задачи обновлен!");
                taskService.getAllTasks(dispatch);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить статус задачи.");
            });
    };

    const handleDeleteTask = (taskId) => {
        const project_id = task.project_id;
        taskService
            .deleteTask(taskId, project_id, dispatch)
            .then(() => {
                message.success("Задача успешно удалена!");
                taskService.getAllTasks(dispatch);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось удалить задачу.");
            });
    };

    const handleDeleteClick = () => {
        handleDeleteTask(task.id);
        taskService.getAllTasks(dispatch);
    };

    const handleNotificationClick = () => {
        setShowNotificationForm(!showNotificationForm);
    };

    const handlePriorityClick = () => {
        setShowPriorityMenu(!showPriorityMenu);
    };

    const handlePrioritySelect = (e) => {
        setSelectedPriority(e.item.props.children);
    };

    const getPriorityLabel = (priority) => {
        const priorityLabels = {
            LOW: 'Низкий',
            MEDIUM: 'Средний',
            HIGH: 'Высокий',
        };
        return priorityLabels[priority] || 'Неизвестный приоритет';
    };

    const getStatusLabel = (status) => {
        const statusLabels = {
            ANALYSIS: 'Анализ',
            REQUIREMENTS: 'В требованиях',
            DEVELOPMENT: 'Разработка',
            TESTING: 'Тестирование',
            INSTALLATION: 'Установлено'
        };
        return statusLabels[status] || 'Неизвестный статус';
    };

    const menuPriority = (
        <Menu onClick={handlePrioritySelect}>
            {priorities.map((priority) => (
                <Menu.Item key={priority.id}>
                    {getPriorityLabel(priority.name)}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Card
            key={task.id}
            title={
                <div>
                    <Link to={`/tasks/${task.id}`}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <span>
                                {task.title}
                            </span>
                        </div>
                    </Link>
                </div>
            }
            style={{
                width: "250px",
                marginBottom: "16px",
                backgroundColor: "#f5f5f5",
            }}
            hoverable
        >
            <div>
                <div>
                    <div>
                        <span style={{fontWeight: "bold"}}>Исполнитель:</span>{" "}
                        {assignee}
                    </div>
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>Приоритет:</span>{" "}
                    {getPriorityLabel(task.priority.name)}
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>Статус:</span>{" "}
                    <Dropdown
                        overlay={(
                            <Menu>
                                {statuses.map((status) => (
                                    <Menu.Item key={status.id}
                                               onClick={() => handleStatusChange(status)}>
                                        {getStatusLabel(status.name)}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )}
                        placement="bottomRight"
                    >
                        <Button type="text">
                            {getStatusLabel(task.status.name)}
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: "8px"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Dropdown
                        overlay={menuPriority}
                        visible={showPriorityMenu}
                        onVisibleChange={handlePriorityClick}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            icon={<ExclamationOutlined/>}
                        />
                    </Dropdown>
                </div>
                <div style={{display: "flex"}}>
                    <Tooltip title="Удалить" placement="bottom">
                        <Button
                            type="text"
                            icon={<DeleteOutlined/>}
                            onClick={handleDeleteClick}
                        />
                    </Tooltip>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;
