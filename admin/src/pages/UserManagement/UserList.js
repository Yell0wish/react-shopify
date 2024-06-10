import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, Input, Space, Modal, Form, Select, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const roles = ['商品管理员', '订单管理员', '超级管理员', '普通用户'];

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [roleForm] = Form.useForm();
    const [selectedUser, setSelectedUser] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleToggleEnable = (key) => {
        const updatedUsers = users.map(user =>
            user.key === key ? { ...user, isEnabled: !user.isEnabled } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);

        fetch(`http://localhost:5000/api/users/${key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUsers.find(user => user.key === key)),
        }).then(response => response.json());
    };

    const handleDelete = (key) => {
        setUsers(users.filter(user => user.key !== key));
        setFilteredUsers(filteredUsers.filter(user => user.key !== key));

        fetch(`http://localhost:5000/api/users/${key}`, {
            method: 'DELETE',
        }).then(response => response.json());
    };

    const handleAddUser = () => {
        form.validateFields().then(values => {
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const newUser = { ...values, createdAt: new Date().toISOString(), lastLogin: 'N/A', isEnabled: true, roles: ['普通用户'] };
                        const updatedUsers = [...users, { ...newUser, key: users.length ? users[users.length - 1].key + 1 : 1 }];
                        setUsers(updatedUsers);
                        setFilteredUsers(updatedUsers);
                        form.resetFields();
                        setIsModalVisible(false);
                        message.success('用户添加成功');
                    } else {
                        message.error(data.message);
                    }
                });
        });
    };

    const handleEditUser = () => {
        editForm.validateFields().then(values => {
            const { password, ...updatedValues } = values; // 去掉 password 字段
            const updatedUsers = users.map(user =>
                user.key === selectedUser.key ? { ...user, ...updatedValues } : user
            );
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);

            fetch(`http://localhost:5000/api/users/${selectedUser.key}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedValues),
            }).then(response => response.json());

            editForm.resetFields();
            setIsEditModalVisible(false);
            message.success('用户信息更新成功');
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        const value = searchValue.toLowerCase();
        const filteredData = users.filter(user =>
            (user.username && user.username.toLowerCase().includes(value)) ||
            (user.name && user.name.toLowerCase().includes(value))
        );
        setFilteredUsers(filteredData);
    };

    const handleRoleAssign = (user) => {
        setSelectedUser(user);
        setIsRoleModalVisible(true);
        roleForm.setFieldsValue({ role: user.roles });
    };

    const handleRoleSubmit = () => {
        roleForm.validateFields().then(values => {
            const updatedUsers = users.map(user =>
                user.key === selectedUser.key ? { ...user, roles: values.role } : user
            );
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);

            fetch(`http://localhost:5000/api/users/${selectedUser.key}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roles: values.role }),
            }).then(response => response.json());

            setIsRoleModalVisible(false);
        });
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalVisible(true);
        editForm.setFieldsValue(user);
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const validatePassword = (_, value) => {
        if (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('密码必须包含大小字母及数字，长度为8-16位');
    };

    const columns = [
        { title: '编号', dataIndex: 'key', key: 'key' },
        { title: '账号', dataIndex: 'username', key: 'username' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '角色', dataIndex: 'roles', key: 'roles', render: roles => roles.join(', ') },
        { title: '添加时间', dataIndex: 'createdAt', key: 'createdAt' },
        { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
        {
            title: '是否启用',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            render: (text, record) => (
                <Switch checked={record.isEnabled} onChange={() => handleToggleEnable(record.key)} />
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleRoleAssign(record)}>分配角色</Button>
                    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
            <h2>用户列表</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="输入搜索"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <Button type="primary" onClick={handleSearch}>查询搜索</Button>
                <Button onClick={() => setFilteredUsers(users)}>重置</Button>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>添加用户</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredUsers}
                pagination={pagination}
                onChange={handleTableChange}
            />

            <Modal title="添加用户" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleAddUser}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="账号"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="姓名"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '邮箱格式不正确' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { validator: validatePassword },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="编辑用户" visible={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} onOk={handleEditUser}>
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        name="username"
                        label="账号"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="姓名"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '邮箱格式不正确' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="分配角色" visible={isRoleModalVisible} onCancel={() => setIsRoleModalVisible(false)} onOk={handleRoleSubmit}>
                <Form form={roleForm} layout="vertical">
                    <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
                        <Select mode="multiple">
                            {roles.map(role => (
                                <Option key={role} value={role}>{role}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserList;
