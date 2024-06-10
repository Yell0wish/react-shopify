import React, { useState } from 'react';
import {Button, SearchBar} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import searchService from '../../Services/SearchService';

const SearchBarComponent = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const results = searchService.searchProducts(query);
        navigate('/search-results', { state: { searchResults: results } });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
            <SearchBar
                placeholder="请输入商品"
                value={query}
                onChange={setQuery}
                style={{ flexGrow: 1 }}
            />
            <Button onClick={handleSearch} style={{ marginLeft: '8px' }}>
                搜索
            </Button>
        </div>
    );
};

export default SearchBarComponent;
