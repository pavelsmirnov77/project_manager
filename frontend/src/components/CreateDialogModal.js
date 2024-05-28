import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, List, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userService from '../services/userService';
import dialogService from '../services/dialogService'; // Импортируем dialogService

const CreateDialogModal = ({ isVisible, selectedUser, setSelectedUser, onCancel }) => {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await userService.getAllUsers();
                setUsers(allUsers);
            } catch (error) {
                console.error("Ошибка при получении списка пользователей:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleCreateDialog = async () => {
        try {
            await dialogService.createDialog(user.id, selectedUser.id);
            if (onCancel) onCancel();
        } catch (error) {
            console.error("Ошибка при создании диалога:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Modal
            title="Создать диалог"
            visible={isVisible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отмена
                </Button>,
                selectedUser && (
                    <Button key="create" type="primary" onClick={handleCreateDialog}>
                        Создать диалог с {selectedUser.username}
                    </Button>
                )
            ]}
        >
            <Input
                placeholder="Введите имя пользователя"
                value={searchValue}
                onChange={handleSearchChange}
            />
            {loading ? (
                <Empty
                    image={<UserOutlined style={{ fontSize: '48px', color: '#ccc' }} />}
                    description="Загрузка пользователей..."
                />
            ) : filteredUsers.length > 0 ? (
                <List
                    dataSource={filteredUsers}
                    renderItem={user => (
                        <List.Item onClick={() => handleUserSelect(user)}>
                            {user.username}
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    image={<UserOutlined style={{ fontSize: '48px', color: '#ccc' }} />}
                    description="Пользователей нет"
                />
            )}
        </Modal>
    );
};

export default CreateDialogModal;
