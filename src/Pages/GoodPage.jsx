import React, { useEffect, useState, useRef  } from "react";
import { NavBar, Button, Swiper, SpinLoading, List } from 'antd-mobile';
import { useParams, useNavigate } from 'react-router-dom';
import { getGoodById } from "../Utils/GoodUtils";
import { TruckOutline, HeartOutline, FileOutline } from 'antd-mobile-icons'
import GoodBottomBar from "../Components/GoodPage/GoodBottomBar"
// import {GoodBottomNavBar} from 
export default function GoodPage() {
    // 获取商品id path: "good/:id"
    const { id } = useParams();
    const [good, setGood] = useState({});
    const [swipperItems, setSwipperItems] = useState(
        <Swiper.Item key={0}>
            <SpinLoading color='primary' style={{marginLeft:"calc(50% - 16px)", marginTop:"90px"}} ></SpinLoading>
        </Swiper.Item>
    );
    const navigate = useNavigate();
    
    useEffect(() => {
        const good_id = parseInt(id);
        const fetchedGood = getGoodById(good_id);
        setGood(fetchedGood);
    }, [id]);

    useEffect(() => {
        if (!good.imgs) return;
        const ret = good.imgs.map((url, index) => (
            <Swiper.Item key={index}>
                <img
                    src={url}
                    alt={good.name}
                    style={{ width: "100%", height: "auto" }}
                />
            </Swiper.Item>
        ));
        setSwipperItems(ret);
    }, [good]);

    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <NavBar
                back="返回"
                onBack={() => navigate(-1)}
                style={{position:"fixed", background:"pink", width:"100%", height:"50px", fontWeight:"bold",zIndex:"100000", boxShadow: '0 3px 10px rgba(0,0,0,0.1)',}}
            />
            <div style={{ height: "50px" }}></div>
            <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Swiper
                        style={{ '--height': '300px' }}
                        defaultIndex={3}
                    >
                        {swipperItems}
                    </Swiper>
                    <div style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0" }}>{good.name}</div>
                    <div style={{ fontSize: "20px", color: "red", marginBottom: "8px", display:"flex", flexDirection:"row" }}>
                        <div style={{ fontSize: "20px", color: "red"}}>¥</div> 
                        <div style={{fontSize:"30px"}}>{good.price}</div>
                    </div>
                </div>
            </div>
            <List mode='card' style={{textAlign: "left", width:"100%", "--padding-left" : "0px", margin: "0", height:"10px"}}>
                <List.Item onClick={()=>{}} style={{height:"65px"}} >
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <TruckOutline style={{marginLeft:"3px"}} />
                        <div style={{paddingLeft:"5px"}}>
                            <div style={{color:"green"}}>
                                48小时内发货
                            </div>
                            <div style={{fontSize:"15px", color:"gray"}}>快递: 免运费</div>
                        </div>
                    </div>
                </List.Item>
                <List.Item onClick={()=>{}} >
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <HeartOutline style={{marginLeft:"3px"}} />
                        <div style={{fontSize:"15px", color:"gray", paddingLeft:"5px"}}>7天无理由退货</div>
                    </div>
                </List.Item>
                <List.Item onClick={()=>{}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <FileOutline style={{marginLeft:"3px"}} />
                        <div style={{fontSize:"15px", color:"gray", paddingLeft:"5px"}}>品牌信息</div>
                    </div>
                </List.Item>
            </List>
            <GoodBottomBar good={good}/>
        </div>
    );
}
