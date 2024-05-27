import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Card, Typography, Spin, message, Input, Button, Select, Upload} from "antd";
import {EditOutlined, LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import taskService from "../services/taskService";
import MenuBar from "../components/MenuBar";
import {useDispatch} from "react-redux";
import userService from "../services/userService";

const {Title, Paragraph} = Typography;
const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const TaskDetails = () => {
    const dispatch = useDispatch();
    const {taskId} = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescription, setEditedDescription] = useState("");
    const [isEditingComplexity, setIsEditingComplexity] = useState(false);
    const [editedComplexity, setEditedComplexity] = useState("");
    const [isEditingCurrentComplexity, setIsEditingCurrentComplexity] = useState(false);
    const [editedCurrentComplexity, setEditedCurrentComplexity] = useState("");
    const [comment, setComment] = useState("");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const fetchedTask = await taskService.getTaskById(taskId);
                setTask(fetchedTask);
                setEditedTitle(fetchedTask.title);
                setEditedDescription(fetchedTask.description);
                setEditedComplexity(fetchedTask.complexity);
                setEditedCurrentComplexity(fetchedTask.currentComplexity);
                setSelectedUser(fetchedTask.assignee);
            } catch (error) {
                console.error("Ошибка при получении задачи:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getAllUsers();
                setUsers(users);
            } catch (error) {
                console.error("Ошибка при получении списка пользователей:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleTitleEdit = () => {
        setIsEditingTitle(true);
    };

    const handleTitleSave = () => {
        setIsEditingTitle(false);
        if (editedTitle.trim() !== task.title) {
            updateTaskTitle(taskId, editedTitle);
        }
    };

    const handleDescriptionEdit = () => {
        setIsEditingDescription(true);
    };

    const handleDescriptionSave = () => {
        setIsEditingDescription(false);
        if (editedDescription.trim() !== task.description) {
            updateTaskDescription(taskId, editedDescription);
        }
    };

    const handleComplexityEdit = () => {
        setIsEditingComplexity(true);
    };

    const handleComplexitySave = () => {
        setIsEditingComplexity(false);
        if (editedComplexity !== task.complexity) {
            updateTaskComplexity(taskId, editedComplexity);
        }
    };

    const handleCurrentComplexityEdit = () => {
        setIsEditingCurrentComplexity(true);
    };

    const handleCurrentComplexitySave = () => {
        setIsEditingCurrentComplexity(false);
        if (editedCurrentComplexity !== task.currentComplexity) {
            updateCurrentComplexity(taskId, editedCurrentComplexity);
        }
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            message.success("Комментарий добавлен!");
            setComment("");
        } else {
            message.error("Комментарий не может быть пустым.");
        }
    };

    const handleFileChange = ({fileList}) => setFileList(fileList);

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
            DEVELOPMENT: 'В разработке',
            TESTING: 'На тестировании',
            INSTALLATION: 'Установлено'
        };
        return statusLabels[status] || 'Неизвестный статус';
    };

    const updateTaskTitle = (taskId, editedTitle) => {
        const updatedTask = {...task, title: editedTitle};
        taskService
            .updateTask(task.project_id, updatedTask, dispatch)
            .then(() => {
                message.success("Заголовок задачи обновлен!");
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
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить описание задачи.");
            });
    };

    const assignTaskToUser = (taskId, userId) => {
        taskService
            .assignUserToTask(taskId, userId)
            .then(() => {
                message.success("Задача успешно закреплена за пользователем!");
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось закрепить задачу за пользователем.");
            });
    };

    const handleUserChange = (value) => {
        setSelectedUser(value);
        assignTaskToUser(taskId, value);
    };

    const updateTaskComplexity = (taskId, complexity) => {
        taskService
            .updateTaskComplexity(taskId, complexity)
            .then(() => {
                message.success("Трудозатраты задачи обновлены!");
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить трудозатраты задачи.");
            });
    };

    const updateCurrentComplexity = (taskId, currentComplexity) => {
        taskService
            .updateCurrentComplexity(taskId, currentComplexity)
            .then(() => {
                message.success("Текущие трудозатраты задачи обновлены!");
            })
            .catch((error) => {
                console.error(error);
                message.error("Не удалось обновить текущие трудозатраты задачи.");
            });
    };

    if (loading) {
        return (
            <div style={{textAlign: "center", marginTop: "100px"}}>
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
                <Card style={{
                    width: "1500px",
                    backgroundColor: "#333232",
                    color: "white",
                    borderRadius: "10px",
                    marginTop: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}>
                    <div>
                        <Title level={2} style={{color: "white"}}>
                            {isEditingTitle ? (
                                <Input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    onPressEnter={handleTitleSave}
                                    onBlur={handleTitleSave}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    {task.title}
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        onClick={handleTitleEdit}
                                        style={{marginLeft: "8px", color: "white"}}
                                    />
                                </>
                            )}
                        </Title>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Описание:</strong>
                            {isEditingDescription ? (
                                <Input.TextArea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    onPressEnter={handleDescriptionSave}
                                    onBlur={handleDescriptionSave}
                                    rows={4}
                                    style={{marginTop: 8, marginLeft: 10}}
                                />
                            ) : (
                                <>
                                    {task.description}

                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        onClick={handleDescriptionEdit}
                                        style={{marginTop: 8, color: "white"}}
                                    />
                                </>
                            )}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Исполнитель:</strong>
                            <Select
                                showSearch
                                value={selectedUser ? selectedUser.id : undefined}
                                style={{width: 200, marginLeft: 10}}
                                onChange={handleUserChange}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {users.map(user => (
                                    <Option key={user.id} value={user.id}>{user.username}</Option>
                                ))}
                            </Select>
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Приоритет:</strong> {getPriorityLabel(task.priority.name)}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Статус:</strong> {getStatusLabel(task.status.name)}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Трудозатраты:</strong>
                            {isEditingComplexity ? (
                                <Input
                                    value={editedComplexity}
                                    onChange={(e) => setEditedComplexity(e.target.value)}
                                    onPressEnter={handleComplexitySave}
                                    onBlur={handleComplexitySave}
                                    style={{marginLeft: 5}}
                                    type="number"
                                />
                            ) : (
                                <>
                                    {task.complexity} ч.
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        onClick={handleComplexityEdit}
                                        style={{marginLeft: 5, color: "white"}}
                                    />
                                </>
                            )}
                        </Paragraph>
                        <Paragraph style={{fontSize: "18px", color: "white"}}>
                            <strong>Текущие трудозатраты:</strong>
                            {isEditingCurrentComplexity ? (
                                <Input
                                    value={editedCurrentComplexity}
                                    onChange={(e) => setEditedCurrentComplexity(e.target.value)}
                                    onPressEnter={handleCurrentComplexitySave}
                                    onBlur={handleCurrentComplexitySave}
                                    style={{marginLeft: 5}}
                                    type="number"
                                />
                            ) : (
                                <>
                                    {task.currentComplexity} ч.
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        onClick={handleCurrentComplexityEdit}
                                        style={{marginLeft: 5, color: "white"}}
                                    />
                                </>
                            )}
                        </Paragraph>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <Title level={4} style={{color: "white"}}>Комментарии:</Title>
                        <Input.TextArea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            placeholder="Добавьте комментарий..."
                            style={{marginBottom: "10px"}}
                        />
                        <Upload
                            fileList={fileList}
                            onChange={handleFileChange}
                            beforeUpload={() => false}
                            multiple
                        >
                            <Button icon={<UploadOutlined/>} style={{marginBottom: "10px"}}>Прикрепить файлы</Button>
                        </Upload>
                        <Button type="primary" onClick={handleCommentSubmit}>Отправить</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TaskDetails;
