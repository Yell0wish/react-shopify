import React from 'react';

const CheckoutBar = ({ totalPrice }) => {
    return (
        <div style={{ 
            position: 'fixed',
            bottom: '50px', // 设置为与 BottomNavBar 高度一致的值
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
                <span style={{ fontSize: '18px', color: '#333' }}>总计: </span>
                <span style={{ fontSize: '20px', color: '#FF4747', fontWeight: 'bold', marginLeft: '5px' }}>
                    ¥{totalPrice.toFixed(2)}
                </span>
            </div>
            <button style={{ 
                padding: '10px 20px', 
                backgroundColor: '#FF4747', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px' 
            }}>
                结算
            </button>
        </div>
    );
};

export default CheckoutBar;
