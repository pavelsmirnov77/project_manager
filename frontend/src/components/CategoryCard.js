import React, {useEffect, useState} from "react";
import {Card, Button, Input, Popconfirm, Space, ColorPicker, Row, Col, message} from "antd";
import {EditOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import TaskCard from "./TaskCard";
import CategoryService from "../services/categoryService";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";

export const CategoryCard = ({category}) => {
    const [editedTitle, setEditedTitle] = useState(category.name);
    const [isEditing, setIsEditing] = useState(false);
    const [cardColor, setCardColor] = useState("#333232");
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const tasks = useSelector((state) => state.tasks.tasks);

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
        const updatedCategory = {...category, name: editedTitle};
        CategoryService.updateCategory(category.id, updatedCategory, dispatch)
            .then(() => {
                message.success("Имя категории изменено!")
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
        setCardColor(color.rgb);
    };

    const handleAddTask = (categoryId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newTask = {
                title: 'Новая задача',
                completed: false,
                category_id: categoryId,
            };

            taskService
                .createTask(categoryId, newTask, dispatch)
                .then(() => {
                    message.success("Задача успешно добавлена!");
                    taskService.getAllTasks(dispatch)
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Не удалось добавить задачу.");
                });
        }
    };


    const handleDeleteCategory = (categoryId) => {
        CategoryService.deleteCategory(category.id, dispatch)
            .then(() => {
                message.success(`Категория "${category.name}" успешно удалена!`)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Card
            key={category.id}
            title={
                <div style={{display: "flex", alignItems: "center", color: "white"}}>
                    <EditOutlined style={{marginRight: "8px"}} onClick={handleEditClick}/>
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
            style={{width: "850px", marginBottom: "16px", backgroundColor: cardColor}}
            hoverable
        >
            <Space>
                <Button
                    style={{backgroundColor: "white", color: "#333232"}}
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => handleAddTask(category.id)}
                >
                    Добавить задачу
                </Button>
                <ColorPicker color={cardColor} onChange={handleColorChange}/>
                <Popconfirm
                    title="Вы уверены, что хотите удалить эту категорию?"
                    okText="Да"
                    cancelText="Отмена"
                    onConfirm={() => handleDeleteCategory(category.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </Space>
            <div style={{ marginTop: "16px" }}>
                <Row gutter={[30, 16]}>
                    {tasks &&
                        tasks.map((task) => (
                            <Col key={task.id} span={8}>
                                <TaskCard task={task} />
                            </Col>
                        ))}
                </Row>
            </div>
        </Card>
    );
};

export default CategoryCard;
