import React from 'react';
import '../../CSS/OrderDetailsBar.css';
import { useNavigate } from 'react-router';
import { Button, Modal, Toast } from 'antd-mobile';
import orderService from '../../Services/OrderService';

const OrderDetailsBar = ({ orderId, state, price }) => {
    const navigate = useNavigate();

    const handleCancelOrder = () => {
        Modal.confirm({
            title: '确认取消订单',
            content: '确认要取消订单吗？',
            onConfirm: async () => {
                try {
                    console.log('取消订单:', orderId);
                    await orderService.updateOrderState(orderId, 3);
                    Toast.show({
                        icon: 'success',
                        content: '订单已取消',
                    });
                    navigate('/order/' + orderId);
                } catch (error) {
                    Toast.show({
                        icon: 'fail',
                        content: '取消订单失败',
                    });
                    console.error('取消订单失败:', error);
                }
            },
        });
    };

    const handlePayOrder = () => {
        // 支付订单的逻辑
        navigate(`/pay/${orderId}`);
    };

    const handleReturn = () => {
        navigate('/my');
    };

    return (
        <div className="order-details-bar">
            {state === 0 && (
                <>
                    <Button className="small-button" onClick={handleCancelOrder}>取消订单</Button>
                    <Button className="large-button" onClick={handlePayOrder}>立即支付 ¥{price}</Button>
                </>
            )}
            {state === 1 && (
                <>
                    <span className="status-text paid-status">已付款</span>
                    <Button className="large-button red-button right-button" onClick={handleReturn}>返回</Button>
                </>
            )}
            {state === 2 && (
                <>
                    <span className="status-text shipped-status">已发货</span>
                    <Button className="large-button red-button right-button" onClick={handleReturn}>返回</Button>
                </>
            )}
            {state === 3 && (
                <>
                    <span className="cancelled-text">已取消</span>
                    <Button className="small-button red-button" onClick={handleReturn}>返回</Button>
                </>
            )}
        </div>
    );
};

export default OrderDetailsBar;
