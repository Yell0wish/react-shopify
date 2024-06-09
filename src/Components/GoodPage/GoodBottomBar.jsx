import React, { useState, useEffect } from 'react';
import { TabBar,Button } from 'antd-mobile';
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

function GoodBottomBar() {
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
        <div style={{ 
            position: 'fixed',
            bottom: '0px',
            left: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px 20px', 
            background: 'white', 
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000, 
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#FF4747', fontWeight: 'bold', marginLeft: '5px' }}>
                    
                </span>
            </div>
            <Button color='primary' style={{backgroundColor:"pink", border:"none"}}>加入购物车</Button>
        </div>
    );
}

export default GoodBottomBar;
