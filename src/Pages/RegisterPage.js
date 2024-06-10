import React from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { UserOutline, LockOutline, MailOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import logo from '../logo.svg';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.success) {
                Toast.show({
                    content: '注册成功！',
                    duration: 2000,
                });
                navigate('/');
            } else {
                Toast.show({
                    content: data.message,
                    duration: 2000,
                });
            }
        } catch (error) {
            Toast.show({
                content: '注册失败，请稍后再试。',
                duration: 2000,
            });
        }
    };

    const validatePassword = (_, value) => {
        if (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('密码必须包含大小字母及数字，长度为8-16位');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <img src={logo} alt="logo" className="login-logo" />
                    <h2>注册</h2>
                </div>
                <Form
                    layout="horizontal"
                    onFinish={onFinish}
                    footer={
                        <>
                            <Button block type="submit" color="primary" size="large">
                                注册
                            </Button>
                            <Button block size="large" onClick={() => navigate('/')}>
                                登录
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
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱！' },
                            { type: 'email', message: '邮箱格式不正确！' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutline />}
                            placeholder="邮箱"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码！' },
                            { validator: validatePassword },
                        ]}
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

export default RegisterPage;
