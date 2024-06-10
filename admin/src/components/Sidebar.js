import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    UserOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    ShopOutlined,
    TeamOutlined,
    SettingOutlined,
    SafetyOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const getMenuItems = (roles) => {
    const items = [
        {
            key: '1',
            icon: <AppstoreOutlined />,
            label: <Link to="/">首页</Link>,
        },
    ];

    if (roles.includes('商品管理员') || roles.includes('超级管理员')) {
        items.push({
            key: '2',
            icon: <ShopOutlined />,
            label: '商品',
            children: [
                { key: '2-1', label: <Link to="/dashboard/products">商品列表</Link> },
            ],
        });
    }

    if (roles.includes('订单管理员') || roles.includes('超级管理员')) {
        items.push({
            key: '3',
            icon: <FileTextOutlined />,
            label: '订单',
            children: [
                { key: '3-1', label: <Link to="/dashboard/orders">订单列表</Link> },
            ],
        });
    }

    if (roles.includes('超级管理员')) {
        items.push(
            {
                key: '4',
                icon: <SafetyOutlined />,
                label: '营销',
                children: [
                    { key: '4-1', label: <Link to="/dashboard/marketing">营销活动</Link> },
                ],
            },
            {
                key: '5',
                icon: <SettingOutlined />,
                label: '权限',
                children: [
                    { key: '5-1', label: <Link to="/dashboard/permissions/user-list">用户列表</Link> },
                    { key: '5-2', label: <Link to="/dashboard/permissions/role-list">角色列表</Link> },
                    { key: '5-3', label: <Link to="/dashboard/permissions/menu-list">菜单列表</Link> },
                    { key: '5-4', label: <Link to="/dashboard/permissions/resource-list">资源列表</Link> },
                ],
            }
        );
    }

    return items;
};

const Sidebar = ({ roles }) => {
    const items = getMenuItems(roles);

    return (
        <Sider style={{ height: '100vh', position: 'fixed', left: 0 }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    );
};

export default Sidebar;
