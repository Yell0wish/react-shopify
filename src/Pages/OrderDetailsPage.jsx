import React, { useEffect, useState } from "react";
import OrderItemOfDetail from "../Components/OrderDetailsPage/OrderItemOfDetail";
import { useParams } from "react-router";
import orderService from "../Services/OrderService";
import { getCustomCartDetails } from "../Utils/OrderUtils";
import { Card, NavBar } from "antd-mobile";
import OrderDetails from "../Components/OrderDetailsPage/OrderDetails";
import OrderDetailsBar from "../Components/OrderDetailsPage/OrderDetailsBar";


export default function OrderDetailsPage() {
    // 获取订单id path: "order/:order_id"
    const { order_id } = useParams();
    const order = orderService.getOrder(order_id);
    const [orderItems, setorderItems] = useState([]); // 状态用于存储购物车商品列表
    useEffect(() => {
        // 在组件挂载时获取购物车详情并更新状态
        const items = getCustomCartDetails(order.goods_list);
        setorderItems(items);
    }, [order.goods_list]); // 空依赖数组表示仅在组件挂载时执行

    return (
        <div style={{paddingBottom: 80}}> 
        <NavBar back={null}>订单详情</NavBar>
        <Card style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', paddingTop: 8, paddingBottom: 10 }}>
            {orderItems.map((good, index) => (
                <OrderItemOfDetail key={index} good={good} />
            ))}
            <OrderDetails order={order} />
        </Card>
        <OrderDetailsBar orderId={order.id} state={order.state} price={order.actual_price}/>
        </div>
    );
}