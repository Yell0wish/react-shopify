const defaultList = [
    {
        id: 1,
        name: 'Apple',
        price: 99,
        category: 'fruit',
        imgs: [
            'https://img11.360buyimg.com/n1/jfs/t1/240487/24/6878/188440/660bd903F7f2a7e2d/95ac00f4fa4bcae5.jpg.avif',
            'https://img12.360buyimg.com/n1/jfs/t1/249525/17/6721/206703/660a4a66F395a0ede/271dfaa2e67f804e.jpg.avif',
        ]
    }
];


class GoodService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('goodList');
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
        localStorage.setItem('goodList', JSON.stringify(this.list));
    }
}

const goodService = new GoodService();
export default goodService;