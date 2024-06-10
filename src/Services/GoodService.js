const defaultList = [
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
        subcategory_id:1,
        imgs: [
            'https://img10.360buyimg.com/n1/jfs/t1/164315/14/43317/164150/66559fb8Fcb337af3/bf5a8ff75bfe7a2d.jpg.avif',
        ]
    },
    {
        id: 4,
        name: '中山神湾小菠萝',
        price: 89,
        subcategory_id:2,
        imgs: [
            'https://img10.360buyimg.com/n1/jfs/t1/164315/14/43317/164150/66559fb8Fcb337af3/bf5a8ff75bfe7a2d.jpg.avif',
        ]
    },
    {
        id: 5,
        name: '低海酸香蕉',
        price: 59,
        subcategory_id: 1,
        imgs: [
            'https://img11.360buyimg.com/n1/jfs/t1/166538/18/46554/98015/6662ef64F22d25b19/8a7c04ab9f1d9900.jpg.avif',
        ]
    },
    {
        id: 6,
        name: '菠萝耳机',
        price: 998,
        subcategory_id: 6,
        imgs: [
            'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000322/10084008970976/FocusFullshop/CkNqZnMvdDEvMjA4Nzc4LzM2LzQwNzYwLzI5NDQ1LzY2NDVjNDgzRmFiMDM4NWU1LzBkMjNhMTJmZWRjN2Y2NGQuanBnEgkyLXR5XzBfNTMwATjCi3pCHAoYQXBwbGXok53niZkv5peg57q_6ICz5py6EAFCEQoN5ruhMTU5OeWHjzUzMRACQhAKDOeri-WNs-aKoui0rRAGQgoKBueyvumAiRAHWOCVl-69pQI/cr/s/q.jpg'
        ]
    },
    {
        id: 7,
        name: '茶叶',
        price: 99,
        subcategory_id: 2,
        imgs: [
            'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100004364581/FocusFullshop/CkRqZnMvdDEvMTc4NTI0LzE1LzEzMjYxLzUwNDY2My82MGU2YTE2Y0U2NzQ3MGNkNi8zY2NkMzRlMGNlZGNkMTg5LnBuZxIJMi10eV8wXzUzMAI47ot6QhAKDOS4reiMtuaZrua0sRABQhAKDOemj-WIqeeLguS6qxACQhAKDOeri-WNs-aKoui0rRAGQgoKBuWKm-iNkBAHWKWC5sX0Ag/cr/s/q.jpg'
        ]
    },
    {
        id: 8,
        name: '中国劲酒',
        price: 88,
        subcategory_id: 2,
        imgs: [
            'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000368/100065261296/FocusFullshop/CkNqZnMvdDEvMjM0OTQ0LzE2LzE5NDAxLzc4NjU5LzY2NWI3NTZlRjE2YTFkNTVmL2Q5NjU2MzYyZDFhMjBhODQucG5nEgk0LXR5XzBfNTUwAjjwi3pCEwoP5Y-j5a2Q56qW55m96YWSEAFCEwoP5LyY5oOg5Lqr5LiN5YGcEAJCEAoM56uL5Y2z5oqi6LStEAZCBwoD5oqiEAdY8O3q4vQC/cr/s/q.jpg',
        ]
    },
    {
        id: 9,
        name: '东窗父插座',
        price: 48,
        subcategory_id: 9,
        imgs: [
            'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000367/10038577514656/FocusFullshop/CkJqZnMvdDEvMTgxNzY4LzMvNDYwMTYvNjcyOTQvNjY1NGRkN2JGNjQ4MjQ5NWQvNzU0MTI1YmQ0YjBiNGJkZS5wbmcSCTUtdHlfMF81NjACOO-LekIZChXopb_pl6jlrZDlvIDlhbPmj5LluqcQAUINCgnotK3ov4fnmL4QAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjotKgQB1igkePOlKQC/cr/s/q.jpg',
        ]
    },
    {
        id: 10,
        name: '普通的架子',
        price: 48,
        subcategory_id: 7,
        imgs: [
            'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/10058218327233/FocusFullshop/CkNqZnMvdDEvMjI2MTk2LzEzLzE4MDI2LzcxNTY3LzY2NTIzYzAzRjk4Mjc4NDlhLzlmZjZiYTBlOTFiMmI0ZjUucG5nEgkzLXR5XzBfNTQwAjjui3pCFgoS5Y2h6LSd5Y6o5Y2r5oyC5Lu2EAFCEAoM55WF5Lqr5LyY5ZOBEAJCEAoM56uL5Y2z5oqi6LStEAZCCgoG56eN6I2JEAdYwZmf5N2kAg/cr/s/q.jpg',
        ]
    },
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