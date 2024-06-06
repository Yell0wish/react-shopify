import React, { useState, useEffect } from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, ShopbagOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

const tabItems = [
    {
        key: 'home',
        title: '首页',
        icon: <AppOutline />,
        path: '/home'
    },
    {
        key: 'category',
        title: '分类',
        icon: <UnorderedListOutline />,
        path: '/category'
    },
    {
        key: 'cart',
        title: '购物车',
        icon: <ShopbagOutline />,
        path: '/cart'
    },
    {
        key: 'my',
        title: '我的',
        icon: <UserOutline />,
        path: '/my'
    }
];

function BottomNavBar() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [selectedTab, setSelectedTab] = useState('home');

    useEffect(() => {
        const currentTab = tabItems.find(item => item.path === location.pathname)?.key;
        if (currentTab) {
            setSelectedTab(currentTab);
        }
    }, [location.pathname]); 

    return (
        <TabBar
            activeKey={selectedTab}
            onChange={(key) => {
                const item = tabItems.find(item => item.key === key);
                setSelectedTab(key);
                navigate(item.path);
            }}
            style={{ position: 'fixed', width: '100%', bottom: 0, backgroundColor: '#FFFFFF' }}>
            {tabItems.map(item => (
                <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                />
            ))}
        </TabBar>
    );
}

export default BottomNavBar;
