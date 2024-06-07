import React from 'react';
import { List, Avatar, Card, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import dialogService from '../services/dialogService';
import '../css/dialogListStyle.css';

const DialogListItem = () => {
    const dialog = {
        id: 1,
        lastMessage: {
            text: "Привет! Как дела?",
            time: "02.06.2024, 04:27:03"
        },
        companion: {
            id: 2,
            username: "Admin"
        }
    };

    const { lastMessage, timestamp, companion } = dialog;

    const handleDelete = async () => {
        try {
            await dialogService.deleteDialogById(dialog.id);
            message.success('Диалог успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении диалога:', error);
            message.error('Не удалось удалить диалог');
        }
    };

    return (
        <div className="dialog-card-container">
            <Card className="dialog-card" actions={[<Button danger onClick={handleDelete}>Удалить</Button>]}>
                <Link to={`/chat/${dialog.id}`}>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{companion.username[0]}</Avatar>}
                            title={<span>{companion.username}</span>}
                            description={
                                <>
                                    <p className="message-text">{lastMessage.text}</p>
                                    <p className="timestamp">{lastMessage.time}</p>
                                </>
                            }
                        />
                    </List.Item>
                </Link>
            </Card>
        </div>
    );
};

export default DialogListItem;
