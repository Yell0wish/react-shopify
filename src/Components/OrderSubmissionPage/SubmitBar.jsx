import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../../Services/CartService';
import orderService from '../../Services/OrderService';

const SubmitBar = ({ totalPrice, acutalPrice }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        // 创建订单
        // addOrder(user_id, goods_list, price, actual_price) {
        const order_id = orderService.addOrder(1, cartService.getList(1), totalPrice, acutalPrice);

        // 清空购物车
        cartService.clearCart(1);
        navigate('/order/' + order_id); // 导航到订单提交页面
    };

    return (
        <div style={{ 
            position: 'fixed',
            bottom: '0px', // 设置为与 BottomNavBar 高度一致的值
            left: 0,
            width: '100%',
            maxWidth: '100%', // 确保宽度不会超过屏幕
            boxSizing: 'border-box', // 包括 padding 在内的宽度计算
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', // 确保所有子元素垂直居中
            padding: '10px 20px', 
            background: 'white', 
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000, // 确保在 BottomNavBar 之上
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', color: '#333' }}></span>
                <span style={{ fontSize: '20px', color: '#FF4747', fontWeight: 'bold', marginLeft: '5px' }}>
                    ¥{acutalPrice.toFixed(2)}
                </span>
            </div>
            <button 
                onClick={handleCheckout}
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#FF4747', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px' 
                }}
            >
                提交订单
            </button>
        </div>
    );
};

export default SubmitBar;
