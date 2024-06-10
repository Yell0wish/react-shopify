import React, { useEffect, useState } from 'react';
import { Grid, Card, Image } from 'antd-mobile';
import hotProductService from '../../Services/HotProductService';
import {useNavigate} from "react-router-dom";

const HotProducts = ({ products: initialProducts }) => {
    const [products, setProducts] = useState(initialProducts || []);
    const navigate = useNavigate();

    useEffect(() => {
        if (!initialProducts) {
            setProducts(hotProductService.getList());
        }
    }, [initialProducts]);

    const handleProductClick = (id) => {
        navigate(`/good/${id}`);
    };

    return (
        <div style={{ marginTop: '16px', height: '320px', overflowY: 'auto' }}>
            <Grid columns={2} gap={8}>
                {products.map((product, index) => (
                    <Grid.Item key={index} onClick={() => handleProductClick(product.id)}>
                        <Card>
                            <Image
                                src={product.imgs[0]}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto' }}
                                fit="cover"
                            />
                            <div style={{ padding: '0 16px' }}>
                                <h3>{product.name}</h3>
                                <p>价格: ¥{product.price}</p>
                            </div>
                        </Card>
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    );
};


export default HotProducts;
