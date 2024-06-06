const defaultList = [
    {
        id : 1,
        user_id : 1,
        goods_list : [
            {
                good_id : 1,
                goods_price : 99,
                count : 1
            }
        ],
    }
]

class CartService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('cartList');
        if (list) {
            this.list = JSON.parse(list);
        } else {
            this.list = defaultList;
            this.saveList(defaultList);
        }
    }

    getList() {
        return this.list;
    }

    saveList() {
        localStorage.setItem('cartList', JSON.stringify(this.list));
    }

    // 把商品加入购物车
    addGood(user_id, good_id, good_price) {
        // 查找对应用户的购物车
        let userCart = this.list.find(cart => cart.user_id === user_id);
        
        if (userCart) {
            // 查找购物车中是否已有该商品
            let existingGood = userCart.goods_list.find(item => item.good_id === good_id);
            
            if (existingGood) {
                // 商品已存在，不进行添加
                return false;
            } else {
                // 商品不存在，添加新商品
                userCart.goods_list.push({
                    good_id: good_id,
                    goods_price: good_price,
                    count: 1
                });
            }
        } else {
            // 该用户还没有购物车，创建一个新的购物车
            userCart = {
                user_id: user_id,
                goods_list: [{
                    good_id: good_id,
                    goods_price: good_price,
                    count: 1
                }]
            };
            this.list.push(userCart);
        }

        // 保存更新后的购物车列表
        this.saveList();
        return true; // 表示成功添加商品
    }
}

const cartService = new CartService();
export default cartService;