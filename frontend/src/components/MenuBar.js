import React, {useState} from 'react';
import {Layout, Menu, Input, Button, Avatar, Tooltip} from 'antd';
import {
    MenuOutlined,
    UserOutlined,
    FileOutlined,
    DeleteOutlined,
    NotificationOutlined,
    BulbOutlined,
} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';

const {Header, Content, Sider} = Layout;

const MenuBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick = () => {
        if (collapsed) {
            setCollapsed(false);
        }
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header
                style={{
                    background: '#333232',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        type="text"
                        style={{color: '#fff', marginRight: '16px'}}
                        onClick={toggleSidebar}
                        icon={<MenuOutlined/>}
                    />
                    <h1 style={{color: '#fff', margin: 0}}>TODO-List</h1>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link to="/users/profile">
                        <Tooltip title="Профиль пользователя" placement="bottom">
                            <span style={{
                                marginLeft: '15px',
                                marginRight: '10px',
                                color: '#fff',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}>
                                {user.username}
                            </span>
                            <Avatar icon={<UserOutlined/>}/>
                        </Tooltip>
                    </Link>
                </div>
            </Header>
            <Layout style={{marginTop: '64px'}}>
                <Sider
                    theme="dark"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={toggleSidebar}
                    width={200}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        background: '#333232',
                    }}
                >
                    <Menu
                        style={{background: '#333232'}}
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="/todo/note" icon={<BulbOutlined/>}>
                            <Link to="/todo/note">Заметки</Link>
                        </Menu.Item>
                        <Menu.Item key="/todo/reminder" icon={<NotificationOutlined/>}>
                            <Link to="/todo/reminder">Напоминания</Link>
                        </Menu.Item>
                        <Menu.Item key="/todo/archive" icon={<FileOutlined/>}>
                            <Link to="/todo/archive">Архив</Link>
                        </Menu.Item>
                        <Menu.Item key="/todo/trash" icon={<DeleteOutlined/>}>
                            <Link to="/todo/trash">Корзина</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{
                    marginLeft: collapsed ? 80 : 200,
                    padding: '0 24px 24px'
                }}>
                    <Content style={{
                        margin: '24px 0',
                        padding: 24,
                        height: '100%'
                    }}>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MenuBar;
