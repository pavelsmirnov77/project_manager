import React, {useEffect, useState} from "react";
import {Card, Button, Input, Popconfirm, Space, Row, Col, message, Dropdown, Menu} from "antd";
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    SortAscendingOutlined,
    BgColorsOutlined
} from "@ant-design/icons";
import TaskCard from "./TaskCard";
import ProjectService from "../services/projectService";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import TaskService from "../services/taskService";

const colorOptions = [
    "#333232",
    "#FF4D4F",
    "#1890FF",
    "#52C41A",
    "#FAAD14",
    "#722ED1",
];

export const ProjectCard = ({project}) => {
    const [editedTitle, setEditedTitle] = useState(project.name);
    const [isEditing, setIsEditing] = useState(false);
    const [cardColor, setCardColor] = useState("#333232");
    const [sortTasksAlphabetically, setSortTasksAlphabetically] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [searchValue, setSearchValue] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [tasksByProject, setTasksByProject] = useState({
        "ANALYSIS": [],
        "REQUIREMENTS": [],
        "DEVELOPMENT": [],
        "TESTING": [],
        "INSTALLATION": []
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const currentUserId = user ? user.id : null;
    const userRoles = user ? user.roles : [];
    const canEditProjectTitle = () => {
        return userRoles.includes("ROLE_PM") && currentUserId === project.userCreator.id;
    };

    useEffect(() => {
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        const sortedTasks = sortTasksAlphabetically
            ? filtered.sort((a, b) => a.title.localeCompare(b.title))
            : filtered;

        setFilteredTasks(sortedTasks);
    }, [tasks, searchValue, sortTasksAlphabetically]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = Object.keys(tasksByProject).map(async (status) => {
                    let statusId = 0;
                    switch (status) {
                        case "ANALYSIS":
                            statusId = 1;
                            break;
                        case "REQUIREMENTS":
                            statusId = 2;
                            break;
                        case "DEVELOPMENT":
                            statusId = 3;
                            break;
                        case "TESTING":
                            statusId = 4;
                            break;
                        case "INSTALLATION":
                            statusId = 5;
                            break;
                        default:
                            break;
                    }
                    return await taskService.getTasksByStatus(statusId, dispatch);
                });
                const results = await Promise.all(promises);
                const updatedTasksByProject = {...tasksByProject};
                results.forEach((tasks, index) => {
                    updatedTasksByProject[Object.keys(tasksByProject)[index]] = tasks;
                });
                setTasksByProject(updatedTasksByProject);
            } catch (error) {
                console.error(error);
                message.error("Не удалось загрузить задачи по статусам.");
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        TaskService.getTasksFromProjects(project.id, dispatch);
    }, [project.id]);

    const handleProjectTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = () => {
        setIsEditing(false);
        const updatedProject = {...project, name: editedTitle};
        ProjectService.updateProject(project.id, updatedProject, dispatch)
            .then(() => {
                message.success("Имя проекта изменено!");
                ProjectService.getProjects(dispatch);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleTitleCancel = () => {
        setIsEditing(false);
        setEditedTitle(project.name);
    };

    const handleColorChange = (color) => {
        setCardColor(color);
    };

    const handleColorMenuClick = ({key}) => {
        setCardColor(key);
    };

    const handleAddTask = (projectId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newTask = {
                title: "Новая задача",
                completed: false,
                project_id: projectId,
            };

            taskService
                .createTask(projectId, newTask, dispatch)
                .then(() => {
                    message.success("Задача успешно добавлена!");
                    TaskService.getTasksFromProjects(projectId, dispatch);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Не удалось добавить задачу.");
                });
        }
    };

    const handleDeleteProject = (projectId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            ProjectService.deleteProject(project.id, dispatch)
                .then(() => {
                    message.success(`Категория "${project.name}" успешно удалена!`);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleDeleteTask = (taskId, projectId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            taskService
                .deleteTask(taskId, projectId, dispatch)
                .then(() => {
                    message.success("Задача успешно удалена!");
                    taskService.getTasksFromProjects(project.id, dispatch())
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Не удалось удалить задачу.");
                });
        }
    };

    const handleSortTasksAlphabetically = () => {
        setSortTasksAlphabetically(!sortTasksAlphabetically);
    };

    const colorMenu = (
        <Menu onClick={handleColorMenuClick}>
            {colorOptions.map((color) => (
                <Menu.Item key={color}>
                    <div style={{width: "16px", height: "16px", backgroundColor: color}}/>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Card
            key={project.id}
            title={
                <div style={{display: "flex", alignItems: "center", color: "white"}}>
                    {canEditProjectTitle() && (
                        <EditOutlined style={{marginRight: "8px"}} onClick={handleEditClick}/>
                    )}
                    Проект:{" "}
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={handleProjectTitleEdit}
                            onPressEnter={handleTitleChange}
                            onBlur={handleTitleCancel}
                            autoFocus
                        />
                    ) : (
                        project.name
                    )}
                </div>
            }
            style={{width: "2500px", marginBottom: "16px", marginLeft: "300px", backgroundColor: cardColor}}

            hoverable
        >
            <Space style={{marginBottom: "16px"}}>
                <Button
                    style={{backgroundColor: "white", color: "#333232"}}
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => handleAddTask(project.id)}
                >
                    Добавить задачу
                </Button>
                <Dropdown overlay={colorMenu} trigger={["click"]}>
                    <Button style={{backgroundColor: "white", color: "#333232"}} type="primary">
                        {<BgColorsOutlined/>}
                    </Button>
                </Dropdown>
                {canEditProjectTitle() && (
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этот проект?"
                        okText="Да"
                        cancelText="Отмена"
                        onConfirm={() => handleDeleteProject(project.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                )}
                <Button
                    type="primary"
                    icon={<SortAscendingOutlined/>}
                    onClick={handleSortTasksAlphabetically}
                >
                    Сортировать
                </Button>
                <Input
                    style={{marginLeft: "24px", width: "370px"}}
                    placeholder="Поиск задач..."
                    prefix={<SearchOutlined/>}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Space>
            <div style={{marginTop: "16px"}}>
                <Row gutter={[30, 16]}>
                    <Col span={5}>
                        <h2 style={{color: "white"}}>Анализ</h2>
                        {tasksByProject["ANALYSIS"].map(task => (
                            <TaskCard key={task.id} task={task}
                                      onDelete={() => handleDeleteTask(task.id, project.id)} dispatch={dispatch}/>
                        ))}
                    </Col>
                    <Col span={5}>
                        <h2 style={{color: "white"}}>Требования</h2>
                        {tasksByProject["REQUIREMENTS"].map(task => (
                            <TaskCard key={task.id} task={task}
                                      onDelete={() => handleDeleteTask(task.id, project.id)} dispatch={dispatch}/>
                        ))}
                    </Col>
                    <Col span={5}>
                        <h2 style={{color: "white"}}>Разработка</h2>
                        {tasksByProject["DEVELOPMENT"].map(task => (
                            <TaskCard key={task.id} task={task}
                                      onDelete={() => handleDeleteTask(task.id, project.id)} dispatch={dispatch}/>
                        ))}
                    </Col>
                    <Col span={5}>
                        <h2 style={{color: "white"}}>Тестирование</h2>
                        {tasksByProject["TESTING"].map(task => (
                            <TaskCard key={task.id} task={task}
                                      onDelete={() => handleDeleteTask(task.id, project.id)} dispatch={dispatch}/>
                        ))}
                    </Col>
                    <Col span={4}>
                        <h2 style={{color: "white"}}>Установка</h2>
                        {tasksByProject["INSTALLATION"].map(task => (
                            <TaskCard key={task.id} task={task}
                                      onDelete={() => handleDeleteTask(task.id, project.id)} dispatch={dispatch}/>
                        ))}
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default ProjectCard;
