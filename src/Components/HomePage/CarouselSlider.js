import React, { useEffect, useState } from 'react';
import { Swiper } from 'antd-mobile';
import carouselService from '../../Services/CarouselService';
import {useNavigate} from "react-router-dom";

const CarouselSlider = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setItems(carouselService.getList());
    }, []);

    const handleItemClick = (id) => {
        navigate(`/good/${id}`);
    };

    return (
        <Swiper autoplay loop>
            {items.map(item => (
                <Swiper.Item key={item.id} onClick={() => handleItemClick(item.id)}>
                    <img src={item.img} alt={`Slide ${item.id}`} style={{ width: '100%', height: 'auto' }} />
                </Swiper.Item>
            ))}
        </Swiper>
    );
};


export default CarouselSlider;
