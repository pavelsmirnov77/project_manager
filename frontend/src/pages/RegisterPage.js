import {Button, Card, Form, Input, message} from "antd";
import React from "react";
import {LockOutlined, MailOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import authService from "../services/authService";

const RegistrationPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        authService.register(values)
            .then(() => {
                message.success('Вы успешно зарегистрированы');
                navigate('/api/auth/signin');
            })
            .catch((error) => {
                message.error('Ошибка при регистрации');
                console.error(error);
            });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
            <Card title="Регистрация" style={{width: 400}}>
                <Form
                    form={form}
                    layout="vertical"
                    name="register"
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="Логин"
                        rules={[{
                            required: true,
                            message: 'Введите логин'
                        }]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Логин"/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="ФИО"
                        rules={[{
                            required: true,
                            message: 'Введите ФИО'
                        }]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="ФИО"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{
                            required: true,
                            message: 'Введите email'
                        },
                            {
                                type: 'email',
                                message: 'Некорректный email'
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{
                            required: true,
                            message: 'Введите пароль'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{backgroundColor: '#333232'}} type="primary" icon={<UserAddOutlined/>}
                                htmlType="submit" block>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <span>Уже зарегистрированы?</span>{" "}
                    <Link to="/api/auth/signin">Войдите в аккаунт</Link>
                </div>
            </Card>
        </div>
    );
};

export default RegistrationPage;