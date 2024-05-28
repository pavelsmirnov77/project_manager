import React, { useState, useEffect } from 'react';
import { Input, Button, List, Empty } from 'antd';
import MenuBar from '../components/MenuBar';
import DialogListItem from '../components/DialogListItem';
import CreateDialogModal from "../components/CreateDialogModal";
import { WechatOutlined } from "@ant-design/icons";
import dialogService from '../services/dialogService'; // Импорт сервиса для работы с диалогами

export const ChatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogs, setDialogs] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDialogs = async () => {
            try {
                const userId = user ? user.id : null;
                const fetchedDialogs = await dialogService.getAllDialogsByUserId(userId);
                setDialogs(fetchedDialogs);
            } catch (error) {
                console.error("Ошибка при получении списка диалогов:", error);
            }
        };

        fetchDialogs();
    }, [selectedUser]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <MenuBar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    marginTop: '-90px'
                }}
            >
                <div
                    style={{
                        width: '1150px',
                        marginLeft: '90px'
                    }}
                >
                    <Input
                        style={{ marginLeft: "100px" }}
                        placeholder="Поиск диалогов по имени"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <Button style={{ marginLeft: "10px" }} type="primary" onClick={showModal}>
                    Создать чат
                </Button>
            </div>
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginLeft: "100px"
                }}
            >
                {dialogs && dialogs.length > 0 ? (
                    <List
                        dataSource={dialogs}
                        renderItem={dialog => (
                            dialog ? <DialogListItem dialog={dialog} /> : null
                        )}
                    />
                ) : (
                    <Empty style={{ marginTop: "150px" }}
                           image={<WechatOutlined style={{
                               fontSize: 64,
                               color: "rgba(0, 0, 0, 0.5)"
                           }}
                           />}
                           description={<span
                               style={{
                                   color: "rgba(0, 0, 0, 0.5)",
                                   fontSize: 20
                               }}>
                            Нет диалогов
                        </span>}
                    />
                )}
            </div>
            <CreateDialogModal
                isVisible={isModalVisible}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                onCreateDialog={handleModalOk}
                onCancel={handleModalCancel}
            />
        </div>
    );
}

export default ChatsPage;
