const defaultList = [
    {
        id : 114514,
        user_id : 1,
        state: 0, // 0: unpaid, 1: paid, 2: delivered
        goods_list : [
            {
                good_id : 1,
                good_price : 99,
                count : 1
            }
        ],
        // 原价和实际价格
        price : 99,
        actual_price: 90,
    }
]

class OrderService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('orderList');
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
        localStorage.setItem('orderList', JSON.stringify(this.list));
    }
}

const orderService = new OrderService();
export default orderService;