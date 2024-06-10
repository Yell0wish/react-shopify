import React, { useState, useEffect } from 'react';
import { TabBar,Button } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, ShopbagOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import { Modal } from 'antd-mobile';
import cartService from '../../Services/CartService';
import userService from '../../Services/UserSerive';
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

function GoodBottomBar({good}) {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [selectedTab, setSelectedTab] = useState('home');
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const currentTab = tabItems.find(item => item.path === location.pathname)?.key;
        if (currentTab) {
            setSelectedTab(currentTab);
        }
    }, [location.pathname]); 

    const addGood = () => {
        const user_id = userService.getUser().id
        cartService.addGood(user_id, good.id, good.price)
        setVisible(true)
    }

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
            <Button color='primary' style={{backgroundColor:"pink", border:"none"}} onClick={() => addGood()}>加入购物车</Button>
            <Modal 
                content={<div>
                    <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        已添加物品至购物车
                        <Button color='primary' style={{backgroundColor:"pink", border:"none", marginTop:"10px",width:"100%"}} onClick={() => {
                                navigate("/cart");
                                setVisible(false)
                            }
                        }>
                                前往购物车查看</Button>
                        <Button style={{color:"pink", border:"none", marginTop:"10px",width:"100%"}} 
                            onClick={() => {
                                setVisible(false)
                            }}
                        >关闭</Button>
                    </div>
                    
                </div>}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                  }}
            
            />
        </div>
    );
}

export default GoodBottomBar;
