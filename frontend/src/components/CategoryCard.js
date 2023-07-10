import React, {useState} from "react";
import {Card, Button, Input, Popconfirm, Space, ColorPicker} from "antd";
import {EditOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import TaskCard from "./TaskCard";

export const CategoryCard = ({category, handleEditCategory, handleDeleteCategory}) => {
    const [editedTitle, setEditedTitle] = useState(category.title);
    const [isEditing, setIsEditing] = useState(false);
    const [cardColor, setCardColor] = useState("#333232");
    const [tasks, setTasks] = useState([]); // Список задач

    const handleCategoryTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleSave = () => {
        if (editedTitle.trim() !== "") {
            handleEditCategory(category.id, editedTitle);
            setIsEditing(false);
        }
    };

    const handleTitleCancel = () => {
        setIsEditing(false);
        setEditedTitle(category.title);
    };

    const handleColorChange = (color) => {
        setCardColor(color.rgb);
    };

    const handleAddTask = (categoryId) => {
        const newTask = {
            id: tasks.length + 1,
            title: "Новая задача",
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <Card
            key={category.id}
            title={
                <div style={{display: "flex", alignItems: "center", color: "white"}}>
                    <EditOutlined style={{marginRight: "8px"}} onClick={handleEditClick}/>
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={handleCategoryTitleEdit}
                            onPressEnter={handleTitleSave}
                            onBlur={handleTitleCancel}
                            autoFocus
                        />
                    ) : (
                        category.title
                    )}
                </div>
            }
            style={{width: "600px", marginBottom: "16px", backgroundColor: cardColor}}
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
                <ColorPicker defaultValue={cardColor} onChange={handleColorChange}/>
                <Popconfirm
                    title="Вы уверены, что хотите удалить эту категорию?"
                    okText="Да"
                    cancelText="Отмена"
                    onConfirm={() => handleDeleteCategory(category.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </Space>
            <div style={{marginTop: "16px"}}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task}/>
                ))}
            </div>
        </Card>
    );
};

export default CategoryCard;
