import React from "react";
import { useParams } from "react-router";
import OrderRoughItem from "../Components/OrderPage/OrderRoughItem";
import orderService from "../Services/OrderService";
import { getCustomCartDetails } from "../Utils/OrderUtils";

export default function OrdersPage() {
    const { state } = useParams();
    console.log(state);

    let order = orderService.getList();

    // pending-payment pending-receipt
    if (state === "pending-payment") {
        // 只留下待付款订单
        order = order.filter(item => item.state === 0);
    } else if (state === "pending-receipt") {
        // 过滤出待收货订单
        order = order.filter(item => item.state === 1);
    }
    console.log(order);
    let roughItems = [];

    for (let i = 0; i < order.length; i++) {
        // 加和每个元素的count getCustomCartDetails(order[i].goods_list)
        const items = getCustomCartDetails(order[i].goods_list);
        let count = 0;
        let imgs = []
        for (let j = 0; j < items.length; j++) {
            count += items[j].count;
            imgs.push(items[j].imgs[0]);
            imgs.push("https://img11.360buyimg.com/n1/jfs/t1/240487/24/6878/188440/660bd903F7f2a7e2d/95ac00f4fa4bcae5.jpg.avif");
        }
        // order_id, imgs, status, totalQuantity, totalCost
        const roughItem = {
            order_id: order[i].id,
            imgs: imgs,
            // status: order[i].state, // 需要转换 0 -> 待付款 1 -> 待收货 2 -> 已发货 3 -> 已取消
            // 数字转换为文字
            status: order[i].state === 0 ? "待付款" : order[i].state === 1 ? "待收货" : order[i].state === 2 ? "已发货" : "已取消",
            totalQuantity: count,
            totalCost: Math.max(order[i].actual_price, 0)
        };
        roughItems.push(roughItem);
    }


    return (
        <div>
            <h1>{state === "pending-payment" ? "待付款" : state === "pending-receipt" ? "待收货" : "全部订单"}</h1>
            {
                roughItems.map((item, index) => (
                    <OrderRoughItem key={index} item={item} />
                ))
            }
            
        </div>
    );
}