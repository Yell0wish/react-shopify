class GoodService {
    list = [];

    constructor() {
        this.loadList();
    }

    async loadList() {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            console.log(data)
            this.list = data;
            this.saveList();
        } catch (error) {
            console.error('Error fetching products from backend:', error);
        }
    }

    getList() {
        return this.list;
    }

    saveList() {
        localStorage.setItem('goodList', JSON.stringify(this.list));
    }
}

const goodService = new GoodService();
export default goodService;
