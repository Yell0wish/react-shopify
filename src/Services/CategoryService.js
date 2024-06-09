const defaultList = [
    { name: "服装", subcategories: [{ name: "衣服", icon: "https://img14.360buyimg.com/n1/s350x467_jfs/t1/107978/16/47605/138681/65d55fd2F1edfe3e6/6f63ec3676b160ee.jpg!cc_350x467.avif", subcategory_id: 1 }, { name: "裤子", icon: "https://img1.baidu.com/it/u=2299726872,451373215&fm=253&fmt=auto&app=120&f=JPEG?w=332&h=332", subcategory_id: 2 }, { name: "其它", icon: "https://img0.baidu.com/it/u=104434700,4195059452&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500", subcategory_id: 3 }] },
    { name: "手机数码", subcategories: [{ name: "电子产品", icon: "https://img2.baidu.com/it/u=4216023735,3415378455&fm=253&fmt=auto&app=120&f=JPEG?w=711&h=400", subcategory_id: 4 }] },
    { name: "家用电器", subcategories: [{ name: "家用电器", icon: "https://img2.baidu.com/it/u=303269828,3123715043&fm=253&fmt=auto&app=138&f=JPEG?w=610&h=500", subcategory_id: 5 }] },
    { name: "家具家装", subcategories: [
        { name: "厨房卫浴", icon: "https://img11.360buyimg.com/n1/jfs/t1/194220/1/34961/91292/64c0c7a2F14bee71d/e6235b11b2d8ba4d.jpg.avif", subcategory_id: 6 },
        { name: "灯饰照明", icon: "https://imgservice.suning.cn/uimg1/b2c/image/9nfhMWrg9HgP8LeKd5KPzQ.jpg_800w_800h_4e", subcategory_id: 7 },
        { name: "五金工具", icon: "https://tgi1.jia.com/120/389/20389460.jpg", subcategory_id: 8 },
        { name: "卧室家具", icon: "https://img0.baidu.com/it/u=4124407789,2714782126&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067", subcategory_id: 9 },
        { name: "客厅家具", icon: "https://img2.baidu.com/it/u=3589641038,3882215712&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1066", subcategory_id: 10 }
    ] },
    { name: "汽车用品", subcategories: [{ name: "汽车用品", icon: "https://img2.baidu.com/it/u=1367108174,2831907733&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749", subcategory_id: 11 }] },
    { name: "电脑办公", subcategories: [{ name: "电脑办公", icon: "https://img1.baidu.com/it/u=611301423,1997745688&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300", subcategory_id: 12 }] },
    { name: "其它", subcategories: [{ name: "其它", icon: "https://img12.360buyimg.com/n7/jfs/t1/199128/20/29240/95213/636e75c8E97ccc2c5/7f693f555295f651.jpg.avif", subcategory_id: 13 }] }
];

class CategoryService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('categoryList');
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

    addCategory(user_id, good_id, good_price) {
        

        this.saveList();
        return true; 
    }

    updateCount(user_id, good_id, count) {
        // 查找对应用户的购物车
        let userCart = this.list.find(cart => cart.user_id === user_id);
        if (userCart) {
            // 查找购物车中是否已有该商品
            let existingGood = userCart.goods_list.find(item => item.good_id === good_id);
            
            if (existingGood) {
                // 更新商品数量
                existingGood.count = count;
                this.saveList();
                return true; // 表示成功更新商品数量
            }
        }
        return false; // 表示更新失败
    }

    removeGood(user_id, good_id) {
        // 查找对应用户的购物车
        let userCart = this.list.find(cart => cart.user_id === user_id);
        if (userCart) {
            // 查找购物车中是否已有该商品
            let existingGoodIndex = userCart.goods_list.findIndex(item => item.good_id === good_id);
            
            if (existingGoodIndex !== -1) {
                // 删除商品
                userCart.goods_list.splice(existingGoodIndex, 1);
                this.saveList();
                return true; // 表示成功删除商品
            }
        }
        return false; // 表示删除失败
    
    }
}

const categoryService = new CategoryService();
export default categoryService;