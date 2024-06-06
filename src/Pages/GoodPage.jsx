import React from "react";
import { useParams } from "react-router";

export default function GoodPage() {
    // 获取商品id path: "good/:id"
    const { id } = useParams();
    console.log(id);
    
    return (
        <div>
        <h1>Good</h1>
        </div>
    );
}
