import React, {useState} from "react";
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
    message
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    InboxOutlined,
    BellOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

const {RangePicker} = TimePicker;

const TaskCard = ({task, handleDeleteTask, handleArchiveTask}) => {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);
    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [showRegularityMenu, setShowRegularityMenu] = useState(false);
    const [notificationDate, setNotificationDate] = useState(null);
    const [notificationTime, setNotificationTime] = useState(null);
    const [selectedRegularity, setSelectedRegularity] = useState("не регулярно");
    const [selectedReminder] = useState("не напоминать");
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleTaskTitleEdit = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleSave = () => {
        if (editedTitle.trim() !== "") {
            setIsEditing(false);
            handleEditTask(task.id, editedTitle);
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
        setIsCompleted(e.target.checked);
        if (e.target.checked) {
            message.success("Задача выполнена");
        }
    };

    const handleNotificationClick = () => {
        setShowNotificationForm(!showNotificationForm);
    };

    const handleRegularityClick = () => {
        setShowRegularityMenu(!showRegularityMenu);
    };

    const handleNotificationDateChange = (date, dateString) => {
        setNotificationDate(dateString);
    };

    const handleNotificationTimeChange = (time, timeString) => {
        setNotificationTime(timeString);
    };

    const handleNotificationSave = () => {
        console.log("Notification Date:", notificationDate);
        console.log("Notification Time:", notificationTime);
    };

    const handleNotificationCancel = () => {
        setNotificationDate(null);
        setNotificationTime(null);
        setShowNotificationForm(false);
    };

    const handleRegularitySelect = (e) => {
        setSelectedRegularity(e.key);
    };

    const handleEditTask = (taskId, editedTitle) => {
        console.log("handleEditTask:", taskId, editedTitle);
    };

    const menu = (
        <Menu onClick={handleRegularitySelect}>
            <Menu.Item key="daily" disabled={task.archived}>
                Ежедневно
            </Menu.Item>
            <Menu.Item key="weekly" disabled={task.archived}>
                Еженедельно
            </Menu.Item>
            <Menu.Item key="monthly" disabled={task.archived}>
                Ежемесячно
            </Menu.Item>
        </Menu>
    );

    return (
        <Card
            key={task.id}
            title={
                <div style={{display: "flex", alignItems: "center"}}>
                    <Checkbox
                        checked={isCompleted}
                        disabled={task.archived}
                        onChange={handleCheckboxChange}
                        style={{marginRight: "8px"}}
                    />
                    <span style={{textDecoration: isCompleted ? "line-through" : "none"}}>
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
                    </span>
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
            <div>
                <div>
                    <span style={{fontWeight: "bold"}}>Регулярность:</span>{" "}
                    {selectedRegularity}
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>Напомнить:</span>{" "}
                    {selectedReminder}
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: "8px"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Tooltip title="Редактировать" placement="bottom">
                        <Button
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={handleEditClick}
                            disabled={task.archived}
                        />
                    </Tooltip>
                    <Dropdown
                        overlay={menu}
                        visible={showRegularityMenu}
                        onVisibleChange={handleRegularityClick}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            icon={<CalendarOutlined/>}
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
                    <Tooltip title="Архивировать" placement="bottom">
                        <Button
                            type="text"
                            icon={<InboxOutlined/>}
                            onClick={handleArchiveClick}
                            disabled={task.archived}
                        />
                    </Tooltip>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;
