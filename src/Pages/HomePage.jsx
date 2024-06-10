import React from 'react';
import { SafeArea } from 'antd-mobile';
import SearchBar from "../Components/HomePage/SearchBar";
import CarouselSlider from "../Components/HomePage/CarouselSlider";
import HotProducts from "../Components/HomePage/HotProducts";
import BottomNavBar from '../Components/BottomNavBar';

export default function HomePage() {
    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <SafeArea position='top' />
            <SearchBar />
            <CarouselSlider />
            <h2 style={{ paddingLeft: '16px' }}>热门商品</h2>
            <HotProducts />
            <SafeArea position='bottom' />
            <BottomNavBar />
        </div>
    );
}
