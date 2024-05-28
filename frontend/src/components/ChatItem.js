import React, { useState, useEffect } from 'react';
import { Input, Button, List, Avatar, Empty, Dropdown, Menu, Modal } from 'antd';
import { SendOutlined, EllipsisOutlined } from '@ant-design/icons';
import MessageService from '../services/messageService';
import '../css/chatStyle.css';

const ChatItem = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const dialogId = 1;

    useEffect(() => {
        MessageService.getMessagesByDialogId(dialogId).then(data => {
            setMessages(data);
        }).catch(error => {
            console.error("Error fetching messages:", error);
        });
    }, [dialogId]);

    const handleMessageSubmit = () => {
        if (messageInput.trim() === '') {
            return;
        }

        if (editingIndex !== null) {
            const message = messages[editingIndex];
            MessageService.editMessage(message.id, messageInput).then(updatedMessage => {
                const updatedMessages = [...messages];
                updatedMessages[editingIndex] = updatedMessage;
                setMessages(updatedMessages);
                setEditingIndex(null);
                setEditModalVisible(false);
            }).catch(error => {
                console.error("Error editing message:", error);
            });
        } else {
            const recipientId = 2;
            MessageService.sendMessage(dialogId, user.id, recipientId, messageInput).then(newMessage => {
                setMessages([...messages, newMessage]);
                setMessageInput('');
            }).catch(error => {
                console.error("Error sending message:", error);
            });
        }
    };

    const handleDeleteMessage = (index) => {
        const message = messages[index];
        MessageService.deleteMessage(message.id).then(() => {
            const updatedMessages = [...messages];
            updatedMessages.splice(index, 1);
            setMessages(updatedMessages);
        }).catch(error => {
            console.error("Error deleting message:", error);
        });
    };

    const handleEditMessage = (index) => {
        setEditingIndex(index);
        setMessageInput(messages[index].text);
        setEditModalVisible(true);
    };

    const handleEditModalOk = () => {
        handleMessageSubmit();
    };

    const handleEditModalCancel = () => {
        setEditingIndex(null);
        setMessageInput('');
        setEditModalVisible(false);
    };

    const menu = (index) => (
        <Menu>
            <Menu.Item key="delete" onClick={() => handleDeleteMessage(index)}>
                Удалить
            </Menu.Item>
            <Menu.Item key="edit" onClick={() => handleEditMessage(index)}>
                Редактировать
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="user-chat">
            <div className="chat-header">Чат</div>
            <div className="chat-messages">
                {messages.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className="message-card">
                                    <List.Item.Meta
                                        avatar={<Avatar>{item.sender.username[0]}</Avatar>}
                                        title={
                                            <div className="message-header">
                                                <span className="sender-name" style={{ marginRight: '360px' }}>{item.sender.username}</span>
                                                <Dropdown overlay={menu(index)} trigger={['hover']}>
                                                    <Button
                                                        type="text"
                                                        icon={<EllipsisOutlined />}
                                                        className="more-options-button"
                                                    />
                                                </Dropdown>
                                            </div>
                                        }
                                        description={
                                            <>
                                                <p className="message-text">{item.text}</p>
                                                <p className="timestamp">{new Date(item.sentAt).toLocaleString()}</p>
                                            </>
                                        }
                                    />
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty description="Нет сообщений" />
                )}
            </div>
            <div className="input-area">
                <Input
                    placeholder="Введите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onPressEnter={handleMessageSubmit}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleMessageSubmit}
                >
                    Отправить
                </Button>
            </div>
            <Modal
                title="Редактирование сообщения"
                visible={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default ChatItem;
