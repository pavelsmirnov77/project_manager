import {Button, Card, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Авторизация прошла успешно!");
        message.success("Вы успешно вошли");
        navigate("/todo/note")
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <Card title="Авторизация" style={{width: 500}}>
                <Form name="normal_email" form={form} layout="vertical" onFinish={onFinish}>
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
                        <Input prefix={<UserOutlined/>} placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{required: true, message: 'Введите пароль'}]}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<LoginOutlined/>} htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AuthPage;