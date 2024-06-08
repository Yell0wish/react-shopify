const defaultList = [
    {
        id : '114514',
        user_id : 1,
        state: 2, // 0: unpaid, 1: paid, 2: delivered 3: canceled
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
        submit_time: new Date().getTime(),
        pay_time: null,
        address: {
            name: '张三',
            phone: '12345678901',
            address: '广东省广州市天河区'
        
        }
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

    addOrder(user_id, goods_list, price, actual_price, address) {
        // id 和时间有关 再加上用户id
        let id = new Date().getTime().toString() + user_id;
        this.list.push({
            id: id,
            user_id: user_id,
            state: 0,
            goods_list: [...goods_list],
            price: price,
            actual_price: actual_price,
            submit_time: new Date().getTime(),
            pay_time: null,
            address: address
        });
        this.saveList();
        return id;
    }

    getOrder(id) {
        return this.list.find(order => order.id === id);
    }
}

const orderService = new OrderService();
export default orderService;