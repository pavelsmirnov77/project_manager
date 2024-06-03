import React, {useEffect, useState} from "react";
import {Button, message, Modal, Table, Spin} from "antd";
import adminService from "../services/adminService";
import userService from "../services/userService";
import MenuBar from "../components/MenuBar";

const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                message.error("Не удалось загрузить список пользователей.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDeleteUser = (userId) => {
        Modal.confirm({
            title: "Вы уверены, что хотите удалить этого пользователя?",
            onOk: () => {
                adminService.deleteUser(userId)
                    .then(() => {
                        setUsers(users.filter(user => user.id !== userId));
                        message.success("Пользователь успешно удален.");
                    })
                    .catch((error) => {
                        message.error("Не удалось удалить пользователя.");
                    });
            }
        });
    };

    const handleBlockUser = (userId) => {
        adminService.blockUser(userId)
            .then(() => {
                setUsers(users.map(user => user.id === userId ? {...user, isBlocked: true} : user));
                message.success("Пользователь успешно заблокирован.");
            })
            .catch((error) => {
                message.error("Не удалось заблокировать пользователя.");
            });
    };

    const handleUnblockUser = (userId) => {
        adminService.unblockUser(userId)
            .then(() => {
                setUsers(users.map(user => user.id === userId ? {...user, isBlocked: false} : user));
                message.success("Пользователь успешно разблокирован.");
            })
            .catch((error) => {
                message.error("Не удалось разблокировать пользователя.");
            });
    };

    const columns = [
        {
            title: "Имя пользователя",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Статус",
            dataIndex: "isBlocked",
            key: "isBlocked",
            render: (isBlocked) => (isBlocked ? "Заблокирован" : "Активен"),
        },
        {
            title: "Действия",
            key: "actions",
            render: (text, record) => (
                <div>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteUser(record.id)}
                        style={{marginRight: 8}}
                    >
                        Удалить
                    </Button>
                    <Button
                        type="default"
                        onClick={() => record.isBlocked ? handleUnblockUser(record.id) : handleBlockUser(record.id)}
                    >
                        {record.isBlocked ? "Разблокировать" : "Заблокировать"}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <MenuBar/>
            <div style={{marginTop: -100, marginLeft: 250}}>
                <h1>Управление пользователями</h1>
                {loading ? <Spin/> : <Table dataSource={users} columns={columns} rowKey="id"/>}
            </div>
        </div>
    );
};

export default AdminUserManagementPage;
