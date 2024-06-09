import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { getCurrentSubcategoryName, getGoodsListbySubcategoryId } from "../Utils/CategoryUtils";
import categoryService from '../Services/CategoryService';

export default function SubcategoryPage() {
    const { subcategory_id } = useParams();
    const navigate = useNavigate();
    const [goodsList, setGoodsList] = useState([]);

    useEffect(() => {
        const currentSubcategoryId = parseInt(subcategory_id);
        setGoodsList(getGoodsListbySubcategoryId(currentSubcategoryId));
    }, [subcategory_id]);

    const handleItemClick = (good) => {
        navigate(`/good/${good.id}`);
    };

    return (
        <div style={{ height: "100vh" }}>
            <NavBar
                back="返回"
                onBack={() => navigate(-1)}
                style={{position:"fixed", background:"rgb(255, 200, 207)", width:"100%", height:"50px", fontWeight:"bold"}}
            >
                {getCurrentSubcategoryName()}
            </NavBar>
            <div style={{height:"50px"}}></div>
            <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                    {goodsList.map(good => (
                        <div
                            key={good.id}
                            style={{ width: "calc(50% - 16px)", boxSizing: "border-box", cursor: "pointer" }}
                            onClick={() => handleItemClick(good)}
                        >
                            <div style={{ border: "2px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                                <img
                                    src={good.imgs[0]}
                                    alt={good.name}
                                    style={{ width: "100%", height: "auto" }}
                                />
                                <div style={{ padding: "8px" }}>
                                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>{good.name}</div>
                                    <div style={{ color: "red" }}>¥{good.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
