import React from 'react';
import {Layout, Button, Menu, Dropdown} from 'antd';
import Sidebar from "../../components/Sidebar";
import TopMenu from "../../components/TopMenu";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'User';
    const roles = JSON.parse(localStorage.getItem('userRoles')) || [];

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const menu = (
        <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Sidebar roles={roles} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <TopMenu />
                <Content style={{ overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ textAlign: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
