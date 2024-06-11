class OrderService {
    list = [];

    constructor() {
        this.loadList();
    }

    async loadList() {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            this.list = data;
            this.saveList(); // 将数据保存到 localStorage 以备后用
        } catch (error) {
            console.error('Error fetching orders from backend:', error);
            this.list = []; // 如果请求失败，初始化为空数组
        }
    }

    getList() {
        return this.list;
    }

    saveList() {
        localStorage.setItem('orderList', JSON.stringify(this.list));
    }

    async addOrder(user_id, goods_list, price, actual_price, address) {
        const newOrder = {
            user_id: user_id,
            state: 0,
            goods_list: [...goods_list],
            price: price,
            actual_price: actual_price,
            submit_time: new Date().getTime(),
            pay_time: null,
            address: address,
            pay_way: null
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            const data = await response.json();
            if (data.success) {
                // 将订单 ID 返回给调用者
                newOrder.id = data.id;
                this.list.push(newOrder);
                this.saveList(); // 将订单列表保存到 localStorage
                return data.id;
            } else {
                throw new Error('Failed to add order');
            }
        } catch (error) {
            console.error('Error adding order:', error);
            return null;
        }
    }

    async getOrder(id) {
        const order = this.list.find(order => order.id === id);
        if (order) {
            return order;
        } else {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching order:', error);
                return null;
            }
        }
    }

    async updateOrderState(orderId, state, pay_way, pay_time) {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state, pay_way, pay_time }),
            });

            const data = await response.json();
            if (data.success) {
                let order = this.list.find(order => order.id === orderId);
                if (order) {
                    order.state = state;
                    if (pay_way) {
                        order.pay_way = pay_way;
                    }
                    if (pay_time) {
                        order.pay_time = pay_time;
                    }
                    this.saveList(); // 将订单列表保存到 localStorage
                }
                return Promise.resolve();
            } else {
                throw new Error('Failed to update order state');
            }
        } catch (error) {
            console.error('Error updating order state:', error);
            return Promise.reject('订单不存在');
        }
    }
}

const orderService = new OrderService();
export default orderService;
