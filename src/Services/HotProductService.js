const defaultHotProducts = [
    {
        id: 1,
        name: '烟台苹果',
        price: 99,
        subcategory_id: 1,
        imgs: [
            'https://img11.360buyimg.com/n1/jfs/t1/240487/24/6878/188440/660bd903F7f2a7e2d/95ac00f4fa4bcae5.jpg.avif',
            'https://img12.360buyimg.com/n1/jfs/t1/249525/17/6721/206703/660a4a66F395a0ede/271dfaa2e67f804e.jpg.avif',
        ]
    },
    {
        id: 2,
        name: '高山甜香蕉',
        price: 49,
        subcategory_id: 1,
        imgs: [
            'https://img11.360buyimg.com/n1/jfs/t1/166538/18/46554/98015/6662ef64F22d25b19/8a7c04ab9f1d9900.jpg.avif',
        ]
    },
    {
        id: 3,
        name: '沃柑',
        price: 69,
        subcategory_id: 1,
        imgs: [
            'https://img13.360buyimg.com/n1/jfs/t1/157943/13/20173/132877/607ea657Ee44e5d47/f54d45b0a42a8235.jpg.avif',
        ]
    },
    {
        id: 4,
        name: '中山神湾小菠萝',
        price: 89,
        subcategory_id: 1,
        imgs: [
            'https://img10.360buyimg.com/n1/jfs/t1/164315/14/43317/164150/66559fb8Fcb337af3/bf5a8ff75bfe7a2d.jpg.avif',
        ]
    },
];

class HotProductService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('hotProductList');
        if (list) {
            this.list = JSON.parse(list);
        } else {
            this.list = defaultHotProducts;
            this.saveList();
        }
    }

    getList() {
        return this.list;
    }

    saveList() {
        localStorage.setItem('hotProductList', JSON.stringify(this.list));
    }
}

const hotProductService = new HotProductService();
export default hotProductService;
