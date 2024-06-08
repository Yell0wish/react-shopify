import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AddressSelector from '../Components/OrderSubmissionPage/AddressSelector';
import userService from '../Services/UserSerive';
import { getFullCartDetails } from '../Utils/CartUtils';
import OrderItem from '../Components/OrderPageGeneral/OrderItem';



const OrderSubmissionPage = () => {
    const [cartItems, setCartItems] = useState([]); // 状态用于存储购物车商品列表
    const [totalPrice, setTotalPrice] = useState(0); // 状态用于存储总价

    useEffect(() => {
        // 在组件挂载时获取购物车详情并更新状态
        const items = getFullCartDetails();
        setCartItems(items);
        updateTotalPrice(items);
    }, []); // 空依赖数组表示仅在组件挂载时执行

    const updateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.goods_price * item.count, 0);
        setTotalPrice(total);
    };

    return (
        <div>
            <h1>填写订单</h1>
            <AddressSelector addresses={userService.getAddresses()} />
            {cartItems.map((good, index) => (
                <OrderItem key={index} good={good}/>
            ))}
        </div>
    );
};

export default OrderSubmissionPage;
