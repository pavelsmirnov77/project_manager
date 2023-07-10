import React, {useState} from "react";
import {Card, Button, Input, Checkbox, Tooltip} from "antd";
import {EditOutlined, DeleteOutlined, InboxOutlined} from "@ant-design/icons";

const TaskCard = ({task, handleEditTask, handleDeleteTask, handleArchiveTask}) => {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleTaskTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleSave = () => {
        if (editedTitle.trim() !== "") {
            handleEditTask(task.id, editedTitle);
            setIsEditing(false);
        }
    };

    const handleTitleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.title);
    };

    const handleArchiveClick = () => {
        handleArchiveTask(task.id);
    };

    const handleDeleteClick = () => {
        handleDeleteTask(task.id);
    };

    const handleCheckboxChange = (e) => {
        handleEditTask(task.id, editedTitle, e.target.checked);
    };

    return (
        <Card
            key={task.id}
            title={
                <div style={{display: "flex", alignItems: "center"}}>
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={handleTaskTitleEdit}
                            onPressEnter={handleTitleSave}
                            onBlur={handleTitleCancel}
                            autoFocus
                        />
                    ) : (
                        task.title
                    )}
                </div>
            }
            style={{
                width: "200px",
                marginBottom: "16px",
                backgroundColor: "#f5f5f5",
                color: task.archived ? "#bbb" : "inherit",
            }}
            hoverable
        >
            <Checkbox
                checked={task.completed}
                disabled={task.archived}
                onChange={handleCheckboxChange}
                style={{marginBottom: "8px"}}
            >
                {task.completed ? <del>{task.title}</del> : task.title}
            </Checkbox>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Tooltip title="Редактировать" placement="bottom">
                    <Button
                        type="text"
                        icon={<EditOutlined/>}
                        onClick={handleEditClick}
                        disabled={task.archived}
                    />
                </Tooltip>
                <Tooltip title={task.archived ? "Вернуть из архива" : "Архивировать"} placement="bottom">
                    <Button
                        type="text"
                        icon={<InboxOutlined/>}
                        onClick={handleArchiveClick}
                        disabled={task.archived}
                    />
                </Tooltip>
                <Tooltip title="Удалить" placement="bottom">
                    <Button
                        type="text"
                        icon={<DeleteOutlined/>}
                        onClick={handleDeleteClick}
                        disabled={task.archived}
                    />
                </Tooltip>
            </div>
        </Card>
    );
};

export default TaskCard;
