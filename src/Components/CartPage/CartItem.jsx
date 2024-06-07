import React, { useState } from 'react';
import { Card, Button, Image, List, Space } from 'antd-mobile';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子
import cartService from '../../Services/CartService';
import '../../CSS/CartItem.css';

const CartItem = ({ good, onRemove, onUpdateCount }) => {
    const [count, setCount] = useState(good.count);
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        cartService.updateCount(good.user_id, good.good_id, newCount);
        onUpdateCount(good.good_id, good.user_id, newCount);
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            cartService.updateCount(good.user_id, good.good_id, newCount);
            onUpdateCount(good.good_id, good.user_id, newCount);
        }
    };

    const removeItem = () => {
        onRemove(good.good_id, good.user_id);
    };

    const handleImageClick = () => {
        navigate(`/good/${good.good_id}`); // 导航到商品详情页面
    };

    return (
        <Card className="cart-item-card">
            <List.Item
                prefix={
                    <Image 
                        src={good.imgs[0]} 
                        style={{ width: '120px', height: 'auto', cursor: 'pointer' }} 
                        fit="cover" 
                        onClick={handleImageClick} // 添加点击事件
                    />
                }
                description={
                    <div className="item-description">
                        <div className="item-info">
                            <div className="item-name">{good.name}</div>
                            <div className="item-price">¥{good.goods_price}</div>
                        </div>
                        <Space align="center" className="quantity-control">
                            <Button size="small" onClick={decrement} disabled={count <= 1}>-</Button>
                            <span className="count">{count}</span>
                            <Button size="small" onClick={increment}>+</Button>
                            <Button size="small" color="danger" onClick={removeItem}>删除</Button>
                        </Space>
                    </div>
                }
            >
            </List.Item>
        </Card>
    );
};

export default CartItem;
