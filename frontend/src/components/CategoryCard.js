import React, { useEffect, useState } from "react";
import { Card, Button, Input, Popconfirm, Space, Row, Col, message, Dropdown, Menu } from "antd";
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    SortAscendingOutlined,
    BgColorsOutlined
} from "@ant-design/icons";
import TaskCard from "./TaskCard";
import CategoryService from "../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService";

const colorOptions = [
    "#333232",
    "#FF4D4F",
    "#1890FF",
    "#52C41A",
    "#FAAD14",
    "#722ED1",
];

export const CategoryCard = ({ category }) => {
    const [editedTitle, setEditedTitle] = useState(category.name);
    const [isEditing, setIsEditing] = useState(false);
    const [cardColor, setCardColor] = useState("#333232");
    const [sortTasksAlphabetically, setSortTasksAlphabetically] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [searchValue, setSearchValue] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);

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
        taskService.getAllTasks(dispatch);
    }, []);

    const handleCategoryTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = () => {
        setIsEditing(false);
        const updatedCategory = { ...category, name: editedTitle };
        CategoryService.updateCategory(category.id, updatedCategory, dispatch)
            .then(() => {
                message.success("Имя категории изменено!");
                CategoryService.getCategories(dispatch);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleTitleCancel = () => {
        setIsEditing(false);
        setEditedTitle(category.name);
    };

    const handleColorChange = (color) => {
        setCardColor(color);
    };

    const handleColorMenuClick = ({ key }) => {
        setCardColor(key);
    };

    const handleAddTask = (categoryId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newTask = {
                title: "Новая задача",
                completed: false,
                category_id: categoryId,
            };

            taskService
                .createTask(categoryId, newTask, dispatch)
                .then(() => {
                    message.success("Задача успешно добавлена!");
                    taskService.getAllTasks(dispatch);
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Не удалось добавить задачу.");
                });
        }
    };

    const handleDeleteCategory = (categoryId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            CategoryService.deleteCategory(category.id, dispatch)
                .then(() => {
                    message.success(`Категория "${category.name}" успешно удалена!`);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleDeleteTask = (taskId, categoryId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            taskService
                .deleteTask(taskId, categoryId, dispatch)
                .then(() => {
                    message.success("Задача успешно удалена!");
                    taskService.getAllTasks(dispatch);
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
                    <div style={{ width: "16px", height: "16px", backgroundColor: color }} />
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Card
            key={category.id}
            title={
                <div style={{ display: "flex", alignItems: "center", color: "white" }}>
                    <EditOutlined style={{ marginRight: "8px" }} onClick={handleEditClick} />
                    Категория:{" "}
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={handleCategoryTitleEdit}
                            onPressEnter={handleTitleChange}
                            onBlur={handleTitleCancel}
                            autoFocus
                        />
                    ) : (
                        category.name
                    )}
                </div>
            }
            style={{ width: "850px", marginBottom: "16px", backgroundColor: cardColor }}
            hoverable
        >
            <Space style={{ marginBottom: "16px" }}>
                <Button
                    style={{ backgroundColor: "white", color: "#333232" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddTask(category.id)}
                >
                    Добавить задачу
                </Button>
                <Dropdown overlay={colorMenu} trigger={["click"]}>
                    <Button style={{ backgroundColor: "white", color: "#333232" }} type="primary">
                        {<BgColorsOutlined/>}
                    </Button>
                </Dropdown>
                <Popconfirm
                    title="Вы уверены, что хотите удалить эту категорию?"
                    okText="Да"
                    cancelText="Отмена"
                    onConfirm={() => handleDeleteCategory(category.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
                <Button
                    type="primary"
                    icon={<SortAscendingOutlined />}
                    onClick={handleSortTasksAlphabetically}
                >
                    Сортировать
                </Button>
                <Input
                    style={{ marginLeft: "24px", width: "370px" }}
                    placeholder="Поиск задач..."
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Space>
            <div style={{ marginTop: "16px" }}>
                <Row gutter={[30, 16]}>
                    {filteredTasks.map((task) => (
                        <Col key={task.id} span={8}>
                            <TaskCard task={task} onDelete={() => handleDeleteTask(task.id, category.id)} />
                        </Col>
                    ))}
                </Row>
            </div>
        </Card>
    );
};

export default CategoryCard;
