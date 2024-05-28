import {Button, Card, Form, Input, message, notification} from 'antd';
import {UserOutlined, LockOutlined, LoginOutlined, ExclamationCircleOutlined, FireOutlined} from '@ant-design/icons';
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import authService from "../services/authService";
import {login} from "../slices/authSlice";
import {useDispatch} from "react-redux";
import taskBack from '../images/fire.gif';

const AuthPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const onFinish = (values) => {
        setLoginAttempts(loginAttempts + 1);
        if (loginAttempts >= 66) {
            document.body.style.backgroundImage = `url(${taskBack})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.height = '100vh';
            notification.open({
                message: "Вы разозлили древнего бога ToDo!!! Вход запрещен!!!",
                duration: null,
                icon: <ExclamationCircleOutlined style={{color: '#ff4d4f'}}/>,
            });
            setIsBlocked(true);
        } else {
            authService.login(values).then((user) => {
                console.log(user)
                dispatch(login(user))
                message.success("Вы успешно вошли в аккунт! Здравствуйте!")
                navigate("/my/projects")
            }, (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.log(_content);
                message.error("Неверно указан логин или пароль!")
            })
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            color: isBlocked ? "white" : ""
        }}>
            <Card title={isBlocked ? "Адоризация" : "Авторизация"}
                  style={{
                      width: 500,
                      background: isBlocked ? "black" : "",
                      color: isBlocked ? "white" : ""
                  }}>
                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                    {isBlocked ? <FireOutlined style={{color: "red", fontSize: '30px'}}/> : null}
                </div>
                <Form name="normal_login" form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="Логин"
                        rules={[{
                            required: true,
                            message: 'Введите логин'
                        }]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Логин" disabled={isBlocked}
                               style={{color: isBlocked ? 'white' : ''}}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{
                            required: true,
                            message: 'Введите пароль'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="Пароль" disabled={isBlocked}
                                        style={{color: isBlocked ? 'white' : ''}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{backgroundColor: '#333232'}} type="primary" icon={<LoginOutlined/>}
                                htmlType="submit" disabled={isBlocked}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign: 'center', marginTop: '20px', color: isBlocked ? 'white' : ''}}>
                    <span>{isBlocked ? "У вас нет аккаунта? Теперь и не будет" : "У вас нет аккаунта?"}</span>{" "}
                    {isBlocked ? null : <Link to="/api/auth/signup">Зарегистрируйтесь</Link>}
                </div>
            </Card>
        </div>
    );
};

export default AuthPage;
