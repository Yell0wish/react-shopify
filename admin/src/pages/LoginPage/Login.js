import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                message.success('登录成功！');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', values.username);
                localStorage.setItem('userRoles', JSON.stringify(data.roles)); // 存储用户角色
                console.log(JSON.stringify(data.roles));
                navigate('/dashboard');
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error('登录失败，请稍后再试。');
        }
    };

    const onRegisterFinish = async (values) => {
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
                message.success('注册成功！');
                setIsModalVisible(false);
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error('注册失败，请稍后再试。');
        }
    };

    const validatePassword = (_, value) => {
        if (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('密码必须包含大小字母及数字，长度为8-16位');
    };

    const showRegisterModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <img src={logo} alt="logo" className="login-logo" />
                    <h2>Zoransy的小卖部</h2>
                </div>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className="login-form"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={showRegisterModal} className="form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                title="注册"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="register"
                    onFinish={onRegisterFinish}
                    className="register-form"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱！' },
                            { type: 'email', message: '邮箱格式不正确！' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="邮箱" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码！' },
                            { validator: validatePassword },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;
