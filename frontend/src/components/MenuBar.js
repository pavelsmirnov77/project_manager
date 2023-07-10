import React, {useState} from 'react';
import {Layout, Menu, Input, Button, Avatar} from 'antd';
import {
    MenuOutlined,
    SearchOutlined,
    UserOutlined,
    FileOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

const {Header, Content, Sider} = Layout;

const MenuBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [collapsed, setCollapsed] = useState(true);

    const handleSearch = (value) => {
        setSearchValue(value);
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
                        onClick={() => setCollapsed(!collapsed)}
                        icon={<MenuOutlined/>}
                    />
                    <h1 style={{color: '#fff', margin: 0}}>TODO-List</h1>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input
                        style={{width: '500px', marginRight: '16px'}}
                        placeholder="Поиск задач..."
                        prefix={<SearchOutlined/>}
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Avatar icon={<UserOutlined/>}/>
                </div>
            </Header>
            <Layout style={{marginTop: '64px'}}>
                <Sider
                    theme="dark"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                    width={200}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        background: '#333232',
                    }}
                >
                    <Menu style={{background: '#333232',}} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<FileOutlined/>}>
                            Архив
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DeleteOutlined/>}>
                            Корзина
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: collapsed ? 80 : 200, padding: '0 24px 24px'}}>
                    <Content style={{margin: '24px 0', padding: 24, height: '100%'}}>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MenuBar;
