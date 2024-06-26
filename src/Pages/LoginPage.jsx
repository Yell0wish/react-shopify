import React from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { UserOutline, LockOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import logo from '../logo.svg';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.success) {
                Toast.show({
                    content: '登录成功！',
                    duration: 2000,
                });
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', values.username);
                navigate('/home');
            } else {
                Toast.show({
                    content: data.message,
                    duration: 2000,
                });
            }
        } catch (error) {
            Toast.show({
                content: '登录失败，请稍后再试。',
                duration: 2000,
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <img src={logo} alt="logo" className="login-logo" />
                    <h2>登录</h2>
                </div>
                <Form
                    layout="horizontal"
                    onFinish={onFinish}
                    footer={
                        <>
                            <Button block type="submit" color="primary" size="large">
                                登录
                            </Button>
                            <Button block size="large" onClick={() => navigate('/register')}>
                                注册
                            </Button>
                        </>
                    }
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input
                            prefix={<UserOutline />}
                            placeholder="用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input
                            prefix={<LockOutline />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
