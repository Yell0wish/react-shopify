import React from 'react';
import '../../CSS/OrderDetailsBar.css';

const OrderDetailsBar = ({ orderId, state, price }) => {
    const handleCancelOrder = () => {
        console.log('取消订单:', orderId);
        // 取消订单的逻辑
    };

    const handlePayOrder = () => {
        console.log('立即支付:', orderId);
        // 支付订单的逻辑
    };

    const handleReturn = () => {
        console.log('返回:', orderId);
        // 返回的逻辑
    };

    return (
        <div className="order-details-bar">
            {state === 0 && (
                <>
                    <button className="small-button" onClick={handleCancelOrder}>取消订单</button>
                    <button className="large-button" onClick={handlePayOrder}>立即支付 ¥{price}</button>
                </>
            )}
            {state === 1 && (
                <>
                    <span className="status-text paid-status">已付款</span>
                    <button className="large-button red-button right-button" onClick={handleReturn}>返回</button>
                </>
            )}
            {state === 2 && (
                <>
                    <span className="status-text shipped-status">已发货</span>
                    <button className="large-button red-button right-button" onClick={handleReturn}>返回</button>
                </>
            )}
            {state === 3 && (
                <>
                    <span className="cancelled-text">已取消</span>
                    <button className="small-button red-button" onClick={handleReturn}>返回</button>
                </>
            )}
        </div>
    );
};

export default OrderDetailsBar;
