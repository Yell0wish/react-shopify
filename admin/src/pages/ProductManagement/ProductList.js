import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, Switch, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const defaultCategories = [
    { name: "食品", subcategories: [{ name: "水果", subcategory_id: 1 }, { name: "其它", subcategory_id: 2 }], id: 1},
    { name: "服装", subcategories: [{ name: "衣服", subcategory_id: 3 }, { name: "裤子", subcategory_id: 4 }, { name: "其它", subcategory_id: 5 }], id: 2},
    { name: "手机数码", subcategories: [{ name: "电子产品", subcategory_id: 6 }], id: 3},
    { name: "家具家装", subcategories: [
            { name: "厨房卫浴", subcategory_id: 7 },
            { name: "灯饰照明", subcategory_id: 8 },
            { name: "五金工具", subcategory_id: 9 },
            { name: "卧室家具", subcategory_id: 10 },
            { name: "客厅家具", subcategory_id: 11 }
        ], id: 4},
    { name: "汽车用品", subcategories: [{ name: "汽车用品", subcategory_id: 12 }],id: 5},
    { name: "其它", subcategories: [{ name: "其它", subcategory_id: 13 }], id: 6 }
];

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        const value = searchValue.toLowerCase();
        const filteredData = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );
        setFilteredProducts(filteredData);
    };

    const handleAddProduct = () => {
        form.validateFields().then(values => {
            fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, imgs: [values.imgs] }), // 确保图片为数组格式
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        form.resetFields();
                        setIsModalVisible(false);
                        fetchProducts(); // 新建商品后重新获取商品列表
                        message.success('商品添加成功');
                    } else {
                        console.error(data.message);
                    }
                });
        });
    };

    const handleToggleList = (id) => {
        const updatedProducts = products.map(product =>
            product.id === id ? { ...product, isListed: !product.isListed } : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);

        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProducts.find(product => product.id === id)),
        }).then(response => response.json());
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchProducts(); // 删除商品后重新获取商品列表
                    message.success('商品删除成功');
                } else {
                    message.error('删除商品失败');
                }
            });
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '商品名称', dataIndex: 'name', key: 'name' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '分类', dataIndex: 'subcategory_id', key: 'subcategory_id' },
        {
            title: '图片',
            dataIndex: 'imgs',
            key: 'imgs',
            render: (imgs) => <img src={imgs[0]} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: '上架',
            dataIndex: 'isListed',
            key: 'isListed',
            render: (text, record) => (
                <Switch checked={record.isListed} onChange={() => handleToggleList(record.id)} />
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link">编辑</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
            <h2>商品列表</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="输入搜索"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <Button type="primary" onClick={handleSearch}>查询搜索</Button>
                <Button onClick={() => setFilteredProducts(products)}>重置</Button>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>添加商品</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredProducts}
                pagination={pagination}
                onChange={handleTableChange}
            />
            <Modal title="添加商品" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleAddProduct}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[{ required: true, message: '请输入商品名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="价格"
                        rules={[{ required: true, message: '请输入价格' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subcategory_id"
                        label="分类"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        <Select>
                            {defaultCategories.map(category => (
                                category.subcategories.map(subcategory => (
                                    <Option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                                        {category.name} - {subcategory.name}
                                    </Option>
                                ))
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="imgs"
                        label="图片"
                        rules={[{ required: true, message: '请输入图片地址' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductList;
