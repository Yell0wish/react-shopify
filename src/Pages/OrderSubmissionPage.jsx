import React, { useEffect, useState } from 'react';
import AddressSelector from '../Components/OrderSubmissionPage/AddressSelector';
import userService from '../Services/UserSerive';
import { getFullCartDetails } from '../Utils/CartUtils';
import OrderItem from '../Components/OrderPageGeneral/OrderItem';
import SummaryComponent from '../Components/OrderSubmissionPage/SummaryComponent';
import { Card } from 'antd-mobile';
import SubmitBar from '../Components/OrderSubmissionPage/SubmitBar';

const OrderSubmissionPage = () => {
    const [cartItems, setCartItems] = useState([]); // 状态用于存储购物车商品列表
    const [totalPrice, setTotalPrice] = useState(0); // 状态用于存储总价
    const [selectedAddress, setSelectedAddress] = useState(null); // 状态用于存储所选地址

    const shippingFee = 0.00;
    const discount = 50.00;
    const [coupons] = useState([11, 12]); 
    const [selectedCoupon, setSelectedCoupon] = useState(coupons.length > 0 ? Math.max(...coupons) : 0);
    const [finalAmount, setFinalAmount] = useState(0);

    useEffect(() => {
        // 在组件挂载时获取购物车详情并更新状态
        const items = getFullCartDetails();
        setCartItems(items);
        updateTotalPrice(items);

        // 获取默认地址
        const addresses = userService.getAddresses();
        if (addresses.length > 0) {
            setSelectedAddress(addresses[0]);
        }
    }, []); // 空依赖数组表示仅在组件挂载时执行

    useEffect(() => {
        // 更新合计金额
        setFinalAmount(Math.max((totalPrice - discount - selectedCoupon + shippingFee), 0));
    }, [totalPrice, discount, selectedCoupon, shippingFee]);

    const updateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.goods_price * item.count, 0);
        setTotalPrice(total);
    };

    const handleCouponSelect = (coupon) => {
        setSelectedCoupon(coupon);
    };

    return (
        <div style={{ paddingBottom: '60px', overflowY: 'auto' }}>
            <h1 style={{ margin: 5 }}>订单</h1>
            <AddressSelector addresses={userService.getAddresses()} onSelectAddress={setSelectedAddress} />
            <Card style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', paddingTop: 8, paddingBottom: 10 }}>
                {cartItems.map((good, index) => (
                    <OrderItem key={index} good={good} />
                ))}
            </Card>
            <SummaryComponent
                totalAmount={totalPrice}
                shippingFee={shippingFee}
                discount={discount}
                coupons={coupons}
                finalAmount={finalAmount}
                onCouponSelect={handleCouponSelect} // 传递选择优惠券的处理函数
            />
            <SubmitBar acutalPrice={finalAmount} totalPrice={totalPrice} selectedAddress={selectedAddress} />
        </div>
    );
};

export default OrderSubmissionPage;
