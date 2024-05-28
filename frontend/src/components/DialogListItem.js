import React from 'react';
import {List, Avatar, Card} from 'antd';
import {Link} from 'react-router-dom';
import '../css/dialogListStyle.css';

const DialogListItem = ({dialog}) => {
    if (!dialog) {
        return null;
    }

    const {lastMessage, timestamp} = dialog;
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="dialog-card-container">
            <Link to={`/chat/${user && user.id}`}>
                <Card className="dialog-card">
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{user && user.username[0]}</Avatar>}
                            title={<span>{user && user.username}</span>}
                            description={
                                <>
                                    <p className="message-text">{lastMessage && lastMessage.text}</p>
                                    <p className="timestamp">{timestamp ? timestamp.toLocaleString() : ''}</p>
                                </>
                            }
                        />
                    </List.Item>
                </Card>
            </Link>
        </div>
    );
};


export default DialogListItem;