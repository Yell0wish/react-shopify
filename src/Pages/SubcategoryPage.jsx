import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

export default function SubcategoryPage() {
    const { name } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <NavBar
                back="返回"
                onBack={() => navigate(-1)}
            >
                Subcategory
            </NavBar>
            <h1>{name}</h1>
        </div>
    );
}
