import React, { useState } from 'react';
import { Button, Radio, Space, Toast } from 'antd-mobile';
import '../../CSS/PaymentComponent.css'; // 确保你有相应的CSS文件来匹配样式
import orderService from '../../Services/OrderService';
import { useNavigate } from 'react-router';

const PaymentComponent = ({ orderId, amount, state }) => {
    const [paymentMethod, setPaymentMethod] = useState('alipay');
    const navigate = useNavigate();

    const handlePayment = () => {
        if (state === 1 || state === 2) {
            Toast.show({
                icon: 'fail',
                content: '订单已经支付过了',
            });
            navigate('/order/' + orderId);
            return;
        }
        if (state === 3) {
            Toast.show({
                icon: 'fail',
                content: '订单已经取消，无法支付',
            });
            navigate('/order/' + orderId);
            return;
        }

        Toast.show({
            icon: 'loading',
            content: '支付处理中...',
        });

        // 模拟支付过程
        setTimeout(() => {
            Toast.clear();
            Toast.show({
                icon: 'success',
                content: '支付成功',
            });
            // 支付成功后的逻辑
            console.log('订单号:', orderId, '支付金额:', amount, '支付方式:', paymentMethod);
            orderService.updateOrderState(orderId, 1, paymentMethod, new Date().getTime());
            navigate('/order/' + orderId);
        }, 2000);
    };

    return (
        <div className="payment-component">
            <h3>支付金额</h3>
            <div className="amount">¥ {amount}</div>
            <Space direction="vertical" className="payment-methods">
                <Radio.Group value={paymentMethod} onChange={val => setPaymentMethod(val)}>
                    <Space direction="vertical">
                        <Radio value="alipay">支付宝支付</Radio>
                        <Radio value="wechat">微信支付</Radio>
                    </Space>
                </Radio.Group>
            </Space>
            <Button color="primary" block className="confirm-button" onClick={handlePayment}>
                确认支付
            </Button>
        </div>
    );
};

export default PaymentComponent;
