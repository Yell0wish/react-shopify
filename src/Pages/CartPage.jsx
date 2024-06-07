import React, { useEffect, useState } from "react";
import BottomNavBar from "../Components/BottomNavBar";
import CartItem from "../Components/CartPage/CartItem";
import { getFullCartDetails } from "../Utils/CartUtils";
import cartService from "../Services/CartService";
import CheckoutBar from "../Components/CartPage/CheckoutBar";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]); // 状态用于存储购物车商品列表
    const [totalPrice, setTotalPrice] = useState(0); // 状态用于存储总价

    useEffect(() => {
        // 在组件挂载时获取购物车详情并更新状态
        const items = getFullCartDetails();
        setCartItems(items);
        updateTotalPrice(items);
    }, []); // 空依赖数组表示仅在组件挂载时执行

    const handleRemoveItem = (goodId, userId) => {
        cartService.removeGood(userId, goodId);
        const updatedItems = cartItems.filter(item => item.good_id !== goodId || item.user_id !== userId);
        setCartItems(updatedItems);
        updateTotalPrice(updatedItems);
    };

    const handleUpdateCount = (goodId, userId, count) => {
        const updatedItems = cartItems.map(item => {
            if (item.good_id === goodId && item.user_id === userId) {
                return { ...item, count: count };
            }
            return item;
        });
        setCartItems(updatedItems);
        updateTotalPrice(updatedItems);
    };

    const updateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.goods_price * item.count, 0);
        setTotalPrice(total);
    };

    return (
        <div className="content-container" style={{paddingBottom: 110}}>
            <h1>购物车</h1>
            {cartItems.map((good, index) => (
                <CartItem key={index} good={good} onRemove={handleRemoveItem} onUpdateCount={handleUpdateCount}/>
            ))}
            <CheckoutBar totalPrice={totalPrice} />
            <BottomNavBar/>
        </div>
    );
}
