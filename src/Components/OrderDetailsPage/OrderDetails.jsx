import React from 'react';
import '../../CSS/OrderDetails.css';

const OrderDetails = ({ order }) => {
    const { id, state, price, actual_price, submit_time, pay_time, address, pay_way } = order;

    const getOrderState = (state) => {
        switch (state) {
            case 0: return '未支付';
            case 1: return '已支付';
            case 2: return '已发货';
            case 3: return '取消';
            default: return '未知状态';
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '未支付';
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const getPaymentMethod = (method) => {
        if (!method) return '未支付';
        switch (method) {
            case 'alipay': return '支付宝';
            case 'wechat': return '微信支付';
            default: return '其他支付方式';
        }
    };

    return (
        <div className="order-details">
            <div className="order-summary">
                <div className="order-price">
                    <span id='minus'>共减 ¥{price - actual_price} </span>
                    <span>合计 ¥{actual_price}</span>
                </div>
            </div>
            <div className="order-info">
                <div className="order-row">
                    <span className="label">订单编号</span>
                    <span>{id}</span>
                </div>
                <div className="order-row">
                    <span className="label">订单状态</span>
                    <span>{getOrderState(state)}</span>
                </div>
                <div className="order-row">
                    <span className="label">支付时间</span>
                    <span>{formatDate(pay_time)}</span>
                </div>
                <div className="order-row">
                    <span className="label">下单时间</span>
                    <span>{formatDate(submit_time)}</span>
                </div>
                <div className="order-row">
                    <span className="label">支付方式</span>
                    <span>{getPaymentMethod(pay_way)}</span>
                </div>
            </div>
            <div className="address-info">
                <div className="order-row">
                    <span className="label">收货信息</span>
                    <span>{address.name} {address.phone}</span>
                </div>
                <div className="order-row">
                    <span className="label">收货地址</span>
                    <span>{address.address}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
