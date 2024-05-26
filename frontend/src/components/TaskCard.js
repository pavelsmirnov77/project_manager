import React, {useEffect, useState} from "react";
import {
    Card,
    Button,
    Input,
    Checkbox,
    Tooltip,
    Dropdown,
    Menu,
    DatePicker,
    TimePicker,
    message,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    InboxOutlined,
    BellOutlined,
    CalendarOutlined,
    ExclamationOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import {Link} from "react-router-dom";

const {RangePicker} = TimePicker;

const TaskCard = ({task, handleArchiveTask, selectedTask, dispatch}) => {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [notificationDate, setNotificationDate] = useState(null);
    const [notificationTime, setNotificationTime] = useState(null);
    const [selectedReminder] = useState("не выставлено");
    const [selectedPriority, setSelectedPriority] = useState("LOW");
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const statuses = useSelector((state) => state.tasks.statuses);
    const priorities = useSelector((state) => state.tasks.priorities);
    const [selectedStatus, setSelectedStatus] = useState(task.status);

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

    const handleTaskTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleDescriptionEdit = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleDescriptionSave = () => {
        setIsDescriptionEditing(false);
        updateTaskDescription(task.id, editedDescription);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleSave = () => {
        if (editedTitle.trim() !== "") {
            setIsEditing(false);
            updateTaskTitle(task.id, editedTitle);
        }
    };

    const handleTitleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.title);
    };

    const handleArchiveClick = () => {
        handleArchiveTask(task.id);
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

    const handleCheckboxChange = (e) => {
        setIsCompleted(e.target.checked);
        if (e.target.checked) {
            message.success("Задача выполнена");
        }
    };

    const handleNotificationClick = () => {
        setShowNotificationForm(!showNotificationForm);
    };

    const handlePriorityClick = () => {
        setShowPriorityMenu(!showPriorityMenu);
    };

    const handleNotificationDateChange = (date, dateString) => {
        setNotificationDate(dateString);
    };

    const handleNotificationTimeChange = (time, timeString) => {
        setNotificationTime(timeString);
    };

    const handleNotificationSave = () => {
        saveTaskNotification(task.id, notificationDate, notificationTime);
    };

    const handleNotificationCancel = () => {
        setNotificationDate(null);
        setNotificationTime(null);
        setShowNotificationForm(false);
    };

    const handlePrioritySelect = (e) => {
        setSelectedPriority(e.item.props.children);
    };

    const updateTaskTitle = (taskId, editedTitle) => {
        const updatedTask = {...task, title: editedTitle};
        taskService
            .updateTask(task.project_id, updatedTask, dispatch)
            .then(() => {
                message.success("Заголовок задачи обновлен!");
                taskService.getAllTasks(dispatch);
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить заголовок задачи.");
            });
    };

    const updateTaskDescription = (taskId, editedDescription) => {
        const updatedTask = {...task, description: editedDescription};
        taskService
            .updateTask(task.project_id, updatedTask, dispatch)
            .then(() => {
                message.success("Описание задачи обновлено!");
                taskService.getAllTasks(dispatch);
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить описание задачи.");
            });
    };

    const saveTaskNotification = (taskId, date, time) => {
        const notificationDateTime = date && time ? `${date} ${time}` : null;
        const updatedTask = {...task, notification: notificationDateTime};
        taskService
            .updateTask(task.project_id, updatedTask, dispatch)
            .then(() => {
                message.success("Уведомление задачи сохранено!");
                taskService.getAllTasks(dispatch);
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось сохранить уведомление задачи.");
            });
    };

    const menuPriority = (
        <Menu onClick={handlePrioritySelect}>
            {priorities.map((priority) => (
                <Menu.Item key={priority.id} disabled={task.archived}>
                    {priority.name}
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                checked={task.completed}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: "8px" }}
                                disabled={task.archived}
                            />
                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </span>
                            <Tooltip title="Редактировать" placement="bottom">
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={handleEditClick}
                                    disabled={task.archived}
                                />
                            </Tooltip>
                        </div>
                    </Link>
                </div>
            }
            style={{
                width: "250px",
                marginBottom: "16px",
                backgroundColor: isCompleted ? "#C6F6D5" : "#f5f5f5",
                color: task.archived ? "#bbb" : "inherit",
            }}
            hoverable
        >
            {isDescriptionEditing ? (
                <Input.TextArea
                    value={editedDescription}
                    onChange={handleDescriptionEdit}
                    onPressEnter={handleDescriptionSave}
                    onBlur={handleDescriptionSave}
                    autoFocus
                    rows={4}
                />
            ) : (
                <div style={{marginTop: "8px"}}>
                    <span style={{fontWeight: "bold"}}>Описание:</span>{" "}
                    {task.description ? (
                        <>
                            {task.description}{" "}
                            <Tooltip title="Редактировать описание" placement="top">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<EditOutlined/>}
                                    onClick={() => setIsDescriptionEditing(true)}
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Добавить описание" placement="top">
                            <Button
                                type="text"
                                size="small"
                                icon={<EditOutlined/>}
                                onClick={() => setIsDescriptionEditing(true)}
                            />
                        </Tooltip>
                    )}
                </div>
            )}
            <div>
                <div>
                    <span style={{fontWeight: "bold"}}>Исполнитель:</span>{" "}
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>Приоритет:</span>{" "}
                    {selectedPriority}
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>Статус:</span>{" "}
                    {/* Используем Dropdown для отображения выпадающего меню со списком статусов */}
                    <Dropdown
                        overlay={(
                            <Menu>
                                {statuses.map((status) => (
                                    <Menu.Item key={status.id} disabled={task.archived}
                                               onClick={() => handleStatusChange(status)}>
                                        {status.name}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )}
                        placement="bottomRight"
                    >
                        <Button type="text" disabled={task.archived}>
                            {selectedStatus.name} {/* Отображаем текущий выбранный статус */}
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
                            disabled={task.archived}
                        />
                    </Dropdown>
                    <Dropdown
                        overlay={
                            <div style={{padding: "8px"}}>
                                <DatePicker locale="ru" onChange={handleNotificationDateChange}/>
                                <TimePicker locale="ru" format="HH:mm" onChange={handleNotificationTimeChange}/>
                                <Button
                                    type="primary"
                                    onClick={handleNotificationSave}
                                    style={{marginLeft: "4px", backgroundColor: "#544e4e"}}
                                >
                                    Сохранить
                                </Button>
                                <Button onClick={handleNotificationCancel} style={{marginLeft: "4px"}}>
                                    Отмена
                                </Button>
                            </div>
                        }
                        visible={showNotificationForm}
                        onVisibleChange={handleNotificationClick}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Tooltip title="Оповещение" placement="bottom">
                            <Button
                                type="text"
                                icon={<BellOutlined/>}
                                disabled={task.archived}
                            />
                        </Tooltip>
                    </Dropdown>
                </div>
                <div style={{display: "flex"}}>
                    <Tooltip title="Удалить" placement="bottom">
                        <Button
                            type="text"
                            icon={<DeleteOutlined/>}
                            onClick={handleDeleteClick}
                            disabled={task.archived}
                        />
                    </Tooltip>
                </div>
            </div>
        </Card>
    )
        ;
};

export default TaskCard;
