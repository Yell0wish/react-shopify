import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/OrderRoughItem.css';

const OrderRoughItem = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/order/${item.order_id}`);
    };

    return (
        <div className="order-card" onClick={handleClick}>
            <div className="order-images-container">
                <div className="order-images">
                    {item.imgs.map((img, index) => (
                        <img key={index} src={img} alt={`product-${index}`} className="order-image" />
                    ))}
                </div>
            </div>
            <div className="order-info">
                <div className="order-status">{item.status}</div>
                <div className="order-total">
                    <span className="order-cost">¥{item.totalCost}</span>
                    <span className="order-quantity">共{item.totalQuantity}件</span>
                </div>
            </div>
        </div>
    );
};

export default OrderRoughItem;
