import React from 'react';
import { Layout, Dropdown, Menu, Space, Button, Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const TopMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const menuItems = [
        {
            label: <Button type="text" onClick={handleLogout}>退出登录</Button>,
            key: 'logout',
        },
    ];

    const userMenu = (
        <Menu items={menuItems} />
    );

    // 面包屑导航映射
    const breadcrumbNameMap = {
        '/dashboard': '首页',
        '/dashboard/products': '商品列表',
        '/dashboard/permissions': '权限',
        '/dashboard/orders': '订单列表',
        '/dashboard/marketing': '营销活动',
        '/dashboard/permissions/user-list': '用户列表',
        '/dashboard/permissions/role-list': '角色列表',
        '/dashboard/permissions/menu-list': '菜单列表',
        '/dashboard/permissions/resource-list': '资源列表',
    };

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
            <Breadcrumb style={{ flex: 1 }}>
                {breadcrumbItems}
            </Breadcrumb>
            <Dropdown overlay={userMenu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {username}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    );
};

export default TopMenu;
