import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, Tag, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch('http://localhost:5000/api/orders')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setOrders(data);
                setFilteredOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        const value = searchValue.toLowerCase();
        const filteredData = orders.filter(order =>
            order.id.toLowerCase().includes(value)
        );
        setFilteredOrders(filteredData);
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleCancelOrder = (id) => {
        fetch(`http://localhost:5000/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: 3 }), // 将订单状态更新为已取消
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    message.success('订单取消成功');
                    fetchOrders(); // 重新获取订单列表
                } else {
                    message.error('取消订单失败');
                }
            })
            .catch(error => {
                console.error('Error cancelling order:', error);
                message.error('取消订单失败');
            });
    };

    const columns = [
        { title: '订单编号', dataIndex: 'id', key: 'id' },
        { title: '用户ID', dataIndex: 'user_id', key: 'user_id' },
        {
            title: '订单状态',
            dataIndex: 'state',
            key: 'state',
            render: (state) => {
                let color = 'geekblue';
                let text = '未支付';
                switch (state) {
                    case 1:
                        color = 'green';
                        text = '已支付';
                        break;
                    case 2:
                        color = 'volcano';
                        text = '已发货';
                        break;
                    case 3:
                        color = 'red';
                        text = '已取消';
                        break;
                    default:
                        break;
                }
                return <Tag color={color}>{text}</Tag>;
            }
        },
        { title: '总价', dataIndex: 'price', key: 'price' },
        { title: '实际支付', dataIndex: 'actual_price', key: 'actual_price' },
        {
            title: '提交时间',
            dataIndex: 'submit_time',
            key: 'submit_time',
            render: (submit_time) => new Date(submit_time).toLocaleString()
        },
        {
            title: '支付方式',
            dataIndex: 'pay_way',
            key: 'pay_way',
            render: (pay_way) => pay_way ? pay_way : '未支付'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link">查看</Button>
                    <Button type="link" danger onClick={() => handleCancelOrder(record.id)}>取消订单</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
            <h2>订单列表</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="输入搜索"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <Button type="primary" onClick={handleSearch}>查询搜索</Button>
                <Button onClick={() => setFilteredOrders(orders)}>重置</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredOrders}
                pagination={pagination}
                onChange={handleTableChange}
            />
            <Modal title="订单详情" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)}>
                <Form form={form} layout="vertical">
                    {/* 订单详情表单 */}
                </Form>
            </Modal>
        </div>
    );
};

export default OrderList;
