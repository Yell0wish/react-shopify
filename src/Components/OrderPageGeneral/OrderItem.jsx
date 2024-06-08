import React from 'react';
import { Card, Image, List, Space } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import '../../CSS/CartItem.css';

const OrderItem = ({ good }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/good/${good.good_id}`);
    };

    return (
        <Card className="cart-item-card">
            <List.Item
                prefix={
                    <Image 
                        src={good.imgs[0]} 
                        style={{ width: '120px', height: 'auto', cursor: 'pointer' }} 
                        fit="cover" 
                        onClick={handleImageClick}
                    />
                }
                description={
                    <div className="item-description">
                        <div className="item-info">
                            <div className="item-name">{good.name}</div>
                            <div className="item-price">¥{good.goods_price}</div>
                        </div>
                        <Space align="center" className="quantity-display">
                            <span className="count">数量: {good.count}</span>
                        </Space>
                    </div>
                }
            >
            </List.Item>
        </Card>
    );
};

export default OrderItem;
