import goodService from '../Services/GoodService';

function getCustomCartDetails(goods_list) {
    const goodList = goodService.getList(); // 获取当前商品列表
    return goods_list.map(cartItem => {
        const goodDetails = goodList.find(good => good.id === cartItem.good_id);
        return {
            good_id: cartItem.good_id,
            name: goodDetails.name,
            goods_price: cartItem.goods_price,
            category: goodDetails.category,
            imgs: goodDetails.imgs,
            count: cartItem.count
        };
    });
}

export {getCustomCartDetails};