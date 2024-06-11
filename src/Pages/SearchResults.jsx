import React from 'react';
import { Grid, Card, Image } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import SearchBar from "../Components/HomePage/SearchBar";
import BottomNavBar from "../Components/BottomNavBar";
import {useNavigate} from "react-router-dom";

const SearchResultsPage = () => {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };
    const navigate = useNavigate();


    const handleProductClick = (id) => {
        navigate(`/good/${id}`);
    };

    return (
        <div style={{height: '100vh'}}>
            <SearchBar />
            {searchResults.length > 0 ? (
                <Grid columns={2} gap={8}>
                    {searchResults.map((product, index) => (
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
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>无结果</h2>
                </div>
            )}
            <BottomNavBar />
        </div>
    );
};

export default SearchResultsPage;
