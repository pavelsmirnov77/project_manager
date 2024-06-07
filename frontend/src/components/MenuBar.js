import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Tooltip } from 'antd';
import {
    MenuOutlined,
    UserOutlined,
    BulbOutlined,
    MailOutlined,
    ProjectOutlined,
    StockOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

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

    const hasRole = (role) => {
        return user?.roles?.includes(role);
    };

    return (
        <Layout>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="text"
                        style={{ color: '#fff', marginRight: '16px' }}
                        onClick={toggleSidebar}
                        icon={<MenuOutlined />}
                    />
                    <h1 style={{ color: '#fff', margin: 0 }}>PROJECT MANAGER</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/users">
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
                            <Avatar icon={<UserOutlined />} />
                        </Tooltip>
                    </Link>
                </div>
            </Header>
            <Layout style={{ marginTop: '64px' }}>
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
                        zIndex: 2000,
                    }}
                >
                    <Menu
                        style={{ background: '#333232', zIndex: 1 }}
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="/my/projects" icon={<BulbOutlined />}>
                            <Link to="/my/projects">Задачи</Link>
                        </Menu.Item>
                        <Menu.Item key="/all/projects" icon={<ProjectOutlined />}>
                            <Link to="/all/projects">Список проектов</Link>
                        </Menu.Item>
                        <Menu.Item key="/chats" icon={<MailOutlined />}>
                            <Link to="/chats">Чат</Link>
                        </Menu.Item>
                        <Menu.Item key="/statistics" icon={<StockOutlined />}>
                            <Link to="/statistics">Статистика</Link>
                        </Menu.Item>
                        {(hasRole('ROLE_PM') || hasRole('ROLE_ADMIN')) && (
                            <Menu.Item key="/all-statistics" icon={<LineChartOutlined />}>
                                <Link to="/all-statistics">Статистика всех пользователей</Link>
                            </Menu.Item>
                        )}
                        {hasRole('ROLE_ADMIN') && (
                            <Menu.Item key="/admin/users" icon={<UserOutlined />}>
                                <Link to="/admin/users">Список пользователей</Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </Sider>
                <Layout style={{
                    marginLeft: collapsed ? 80 : 200,
                    padding: '0 24px 24px',
                    background: '#ffffff'
                }}>
                    <Content style={{
                        zIndex: 4,
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
