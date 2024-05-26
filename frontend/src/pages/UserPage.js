import React, {useEffect, useState} from "react";
import {Card, Avatar, Typography, Button, Upload, message} from "antd";
import {UserOutlined, LogoutOutlined, UploadOutlined, BackwardOutlined} from "@ant-design/icons";
import {useSelector, useDispatch} from "react-redux";
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
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!")
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
                            Имя пользователя: {user.username}
                        </Text>
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
                        <Text style={{
                            fontSize: '20px',
                            color: '#ffffff'
                        }}>
                            Учебная группа: {user.group}
                        </Text>
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <Text style={{
                            fontSize: '20px',
                            color: '#ffffff'
                        }}>
                            Роль: {user.roles}
                        </Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '200px'
                    }}>
                        <Link to="/todo/note">
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
