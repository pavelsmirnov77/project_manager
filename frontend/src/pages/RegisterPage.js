import {Button, Card, Form, Input, message} from "antd";
import React from "react";
import {LockOutlined, MailOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log("Регистрация прошла успешно");
        message.success("Вы успешно зарегистрировались");
        navigate("/api/auth");
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <Card title="Регистрация" style={{width: 400}}>
                <Form form={form} layout="vertical" name="registration" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{
                            required: true,
                            message: 'Введите имя'
                        }]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Имя"/>
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
                        <Button type="primary" icon={<UserAddOutlined/>} htmlType="submit" block>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegistrationPage;