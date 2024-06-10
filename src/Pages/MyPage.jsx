import React from "react";
import {Button, Card, Grid, Image, NavBar, Toast} from "antd-mobile";
import { useNavigate } from "react-router";
import "../CSS/MyPage.css";
import BottomNavBar from "../Components/BottomNavBar";

const icons = {
    address: '📍',
    allOrders: '📦',
    pendingPayment: '💳',
    pendingReceipt: '📬'
};

const MyPage = () => {
    const navigate = useNavigate();

    const handleClick = (type) => {
        // console.log(type);
        // 根据类型跳转到相应的页面
        navigate(`/${type}`);
    };

    const handleLogout = () => {
        localStorage.clear();
        Toast.show({
            content: '已退出登录',
            duration: 2000,
        });
        navigate('/');
    };

    return (
        <div className="profile-page">
            <NavBar back={null}>个人主页</NavBar>
            <div className="profile-header">
                <Image
                    src="https://img10.360buyimg.com/img/jfs/t1/217337/13/41302/12933/6658993dF6b3349e7/19a1dab36f5e5bc9.jpg"
                    width={50}
                    height={50}
                    fit="cover"
                    style={{ borderRadius: 25, marginRight: 16 }}
                />
                <div className="profile-info">
                    <h3>jd_402k3m9v7t0i...</h3>
                </div>
            </div>
            <Card className="profile-card">
                <Grid columns={2} gap={8}>
                    <Grid.Item>
                        <div className="profile-item" onClick={() => handleClick('address-management')}>
                            {icons.address}
                            <span>地址管理</span>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="profile-item" onClick={() => handleClick('orders/all')}>
                            {icons.allOrders}
                            <span>全部订单</span>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="profile-item" onClick={() => handleClick('orders/pending-payment')}>
                            {icons.pendingPayment}
                            <span>待付款</span>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="profile-item" onClick={() => handleClick('orders/pending-receipt')}>
                            {icons.pendingReceipt}
                            <span>待收货</span>
                        </div>
                    </Grid.Item>
                </Grid>
            </Card>
            <div className="logout-button-container">
                <Button block color="danger" onClick={handleLogout}>
                    退出登录
                </Button>
            </div>
            <BottomNavBar />
        </div>
    );
};

export default MyPage;
