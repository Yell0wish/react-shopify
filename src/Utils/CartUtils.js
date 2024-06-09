import cartService from "../Services/CartService";
import goodService from "../Services/GoodService";

function getFullCartDetails() {
    const cartList = cartService.getList(); // 获取当前购物车列表
    const goodList = goodService.getList(); // 获取当前商品列表
    console.log(cartList)
    console.log(goodList)
    // 使用 map 和 find 来构建新的数组
    return cartList.flatMap(cart => 
        cart.goods_list.map(cartItem => {
            const goodDetails = goodList.find(good => good.id === cartItem.good_id);
            return {
                good_id: cartItem.good_id,
                name: goodDetails.name,
                goods_price: cartItem.goods_price,
                category: goodDetails.category,
                imgs: goodDetails.imgs,
                count: cartItem.count,
                user_id: cart.user_id
            };
        })
    );
}

export {getFullCartDetails};