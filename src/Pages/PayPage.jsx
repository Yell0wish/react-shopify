import React from "react";
import { useParams } from "react-router";
import orderService from "../Services/OrderService";
import PaymentComponent from "../Components/PayPage/PaymentComponent";

export default function PayPage() {
    const { order_id } = useParams();
    console.log(order_id);
    const order = orderService.getOrder(order_id);

    return (
        <div>
        <h1>支付</h1>
        <PaymentComponent orderId={order.id} amount={order.actual_price} state={order.state}/>
        </div>
    );
}