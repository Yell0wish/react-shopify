import React from 'react';
import { Card, Image, List, Space } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import '../../CSS/OrderItemOfDetail.css'; // 引入新的CSS文件

const OrderItemOfDetail = ({ good }) => {
    const navigate = useNavigate();
    console.log("price", good)
    const handleImageClick = () => {
        navigate(`/good/${good.good_id}`);
    };

    return (
        <Card className="order-item-card">
            <List.Item
                prefix={
                    <Image 
                        src={good.imgs[0]} 
                        style={{ width: '80px', height: 'auto', cursor: 'pointer' }} 
                        fit="cover" 
                        onClick={handleImageClick}
                    />
                }
                description={
                    <div className="item-description">
                        <div className="item-info">
                            <div className="item-details">
                                <div className="item-name">{good.name}</div>
                                <Space align="center" className="quantity-display">
                                    <span className="count">数量: {good.count}</span>
                                </Space>
                            </div>
                            <div className="item-price">¥{parseFloat(good.goods_price) * parseFloat(good.count)}</div>
                        </div>
                    </div>
                }
            >
            </List.Item>
        </Card>
    );
};

export default OrderItemOfDetail;
