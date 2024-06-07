import React, {useEffect, useState} from "react";
import {Card, Avatar, Typography, Button, Upload, Input, message} from "antd";
import {UserOutlined, LogoutOutlined, UploadOutlined, BackwardOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {setUser} from "../slices/userSlice";
import {Link} from "react-router-dom";
import UserService from "../services/userService";
import AuthService from "../services/authService";
import MenuBar from "../components/MenuBar";

const {Title, Text} = Typography;

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [avatar, setAvatar] = useState(null);
    const [editingName, setEditingName] = useState(false);
    const [editingGroup, setEditingGroup] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [newGroup, setNewGroup] = useState(user.group);

    useEffect(() => {
        UserService.getUser(userId, dispatch);
        UserService.getProfilePicture(userId)
            .then((response) => {
                const blob = new Blob([response.data], {type: "image/jpeg"});
                const imageUrl = URL.createObjectURL(blob);
                setAvatar(imageUrl);
            })
            .catch((error) => {
                console.error("Не удалось получить аватарку:", error);
            });
    }, [userId, dispatch]);

    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!");
    };

    const handleAvatarUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            UserService.uploadProfilePicture(userId, file)
                .then(() => {
                    setAvatar(e.target.result);
                    dispatch(setUser({...user, avatar: e.target.result}));
                    message.success("Аватарка успешно загружена");
                })
                .catch((error) => {
                    message.error("Не удалось загрузить аватарку");
                });
        };
        reader.readAsDataURL(file);
    };

    const handleNameChange = () => {
        UserService.updateUserName(userId, newName)
            .then(() => {
                dispatch(setUser({...user, name: newName}));
                setEditingName(false);
                message.success("ФИО успешно обновлено");
            })
            .catch((error) => {
                message.error("Не удалось обновить ФИО");
            });
    };

    const handleGroupChange = () => {
        UserService.updateUserGroup(userId, newGroup)
            .then(() => {
                dispatch(setUser({...user, group: newGroup}));
                setEditingGroup(false);
                message.success("Учебная группа успешно обновлена");
            })
            .catch((error) => {
                message.error("Не удалось обновить учебную группу");
            });
    };

    const getRoleName = (roles) => {
        if (roles.includes("ROLE_ADMIN")) {
            return "Администратор";
        } else if (roles.includes("ROLE_PM")) {
            return "Руководитель проекта";
        } else if (roles.includes("ROLE_USER")) {
            return "Пользователь";
        } else {
            return "Неизвестная роль";
        }
    };

    return (
        <div>
            <MenuBar/>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                marginTop: "-100px"
            }}>
                <Card
                    style={{
                        width: 1200,
                        height: 800,
                        backgroundColor: '#333232'
                    }}
                    cover={
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 20
                        }}>
                            <Upload
                                accept=".png,.jpg,.jpeg"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    handleAvatarUpload(file);
                                    return false;
                                }}>
                                <div
                                    style={{
                                        position: "relative",
                                        width: "200px",
                                        height: "200px",
                                        cursor: "pointer",
                                    }}>
                                    <Avatar
                                        size={200}
                                        icon={<UserOutlined/>}
                                        src={avatar}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0
                                        }}/>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                    </div>
                                </div>
                            </Upload>
                        </div>
                    }>
                    <div>
                        <Title level={2}
                               style=
                                   {{
                                       color: '#ffffff',
                                       textAlign: 'center'
                                   }}>
                            Информация о пользователе
                        </Title>
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <Text style={{
                            fontSize: '20px',
                            color: '#ffffff'
                        }}>
                            Логин пользователя: {user.username}
                        </Text>
                    </div>
                    <div style={{margin: '20px 0'}}>
                        {editingName ? (
                            <div>
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    style={{width: '70%', marginRight: '10px'}}
                                />
                                <Button onClick={handleNameChange} type="primary">Сохранить</Button>
                                <Button onClick={() => setEditingName(false)}
                                        style={{marginLeft: '10px'}}>Отмена</Button>
                            </div>
                        ) : (
                            <div>
                                <Text style={{
                                    fontSize: '20px',
                                    color: '#ffffff'
                                }}>
                                    ФИО пользователя: {user.name}
                                </Text>
                                <Button onClick={() => setEditingName(true)}
                                        style={{marginLeft: '10px'}}>Редактировать</Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <Text style={{
                            fontSize: '20px',
                            color: '#ffffff'
                        }}>
                            Email: {user.email}
                        </Text>
                    </div>
                    <div style={{margin: '20px 0'}}>
                        {editingGroup ? (
                            <div>
                                <Input
                                    value={newGroup}
                                    onChange={(e) => setNewGroup(e.target.value)}
                                    style={{width: '70%', marginRight: '10px'}}
                                />
                                <Button onClick={handleGroupChange} type="primary">Сохранить</Button>
                                <Button onClick={() => setEditingGroup(false)}
                                        style={{marginLeft: '10px'}}>Отмена</Button>
                            </div>
                        ) : (
                            <div>
                                <Text style={{
                                    fontSize: '20px',
                                    color: '#ffffff'
                                }}>
                                    Учебная группа: {user.studyGroup}
                                </Text>
                                <Button onClick={() => setEditingGroup(true)}
                                        style={{marginLeft: '10px'}}>Редактировать</Button>
                            </div>
                        )}
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <Text style={{
                            fontSize: '20px',
                            color: '#ffffff'
                        }}>
                            Роль: {getRoleName(user.roles)}
                        </Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '150px'
                    }}>
                        <Link to="/my/projects">
                            <Button icon={<BackwardOutlined/>}
                                    style={{
                                        width: '120px',
                                        marginRight: '10px'
                                    }}>
                                Вернуться
                            </Button>
                        </Link>
                        <Link to="/api/auth/signin">
                            <Button icon={<LogoutOutlined/>}
                                    onClick={handleLogout}
                                    style={{width: '120px'}}>
                                Выход
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserProfilePage;
