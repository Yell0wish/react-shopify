const defaultCarouselItems = [
    { id: 7, img: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100004364581/FocusFullshop/CkRqZnMvdDEvMTc4NTI0LzE1LzEzMjYxLzUwNDY2My82MGU2YTE2Y0U2NzQ3MGNkNi8zY2NkMzRlMGNlZGNkMTg5LnBuZxIJMi10eV8wXzUzMAI47ot6QhAKDOS4reiMtuaZrua0sRABQhAKDOemj-WIqeeLguS6qxACQhAKDOeri-WNs-aKoui0rRAGQgoKBuWKm-iNkBAHWKWC5sX0Ag/cr/s/q.jpg' },
    { id: 6, img: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000322/10084008970976/FocusFullshop/CkNqZnMvdDEvMjA4Nzc4LzM2LzQwNzYwLzI5NDQ1LzY2NDVjNDgzRmFiMDM4NWU1LzBkMjNhMTJmZWRjN2Y2NGQuanBnEgkyLXR5XzBfNTMwATjCi3pCHAoYQXBwbGXok53niZkv5peg57q_6ICz5py6EAFCEQoN5ruhMTU5OeWHjzUzMRACQhAKDOeri-WNs-aKoui0rRAGQgoKBueyvumAiRAHWOCVl-69pQI/cr/s/q.jpg' },
    { id: 9, img: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000367/10038577514656/FocusFullshop/CkJqZnMvdDEvMTgxNzY4LzMvNDYwMTYvNjcyOTQvNjY1NGRkN2JGNjQ4MjQ5NWQvNzU0MTI1YmQ0YjBiNGJkZS5wbmcSCTUtdHlfMF81NjACOO-LekIZChXopb_pl6jlrZDlvIDlhbPmj5LluqcQAUINCgnotK3ov4fnmL4QAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjotKgQB1igkePOlKQC/cr/s/q.jpg' },
    { id: 10, img: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/10058218327233/FocusFullshop/CkNqZnMvdDEvMjI2MTk2LzEzLzE4MDI2LzcxNTY3LzY2NTIzYzAzRjk4Mjc4NDlhLzlmZjZiYTBlOTFiMmI0ZjUucG5nEgkzLXR5XzBfNTQwAjjui3pCFgoS5Y2h6LSd5Y6o5Y2r5oyC5Lu2EAFCEAoM55WF5Lqr5LyY5ZOBEAJCEAoM56uL5Y2z5oqi6LStEAZCCgoG56eN6I2JEAdYwZmf5N2kAg/cr/s/q.jpg'},
    { id: 8, img: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000368/100065261296/FocusFullshop/CkNqZnMvdDEvMjM0OTQ0LzE2LzE5NDAxLzc4NjU5LzY2NWI3NTZlRjE2YTFkNTVmL2Q5NjU2MzYyZDFhMjBhODQucG5nEgk0LXR5XzBfNTUwAjjwi3pCEwoP5Y-j5a2Q56qW55m96YWSEAFCEwoP5LyY5oOg5Lqr5LiN5YGcEAJCEAoM56uL5Y2z5oqi6LStEAZCBwoD5oqiEAdY8O3q4vQC/cr/s/q.jpg'}
];

class CarouselService {
    list = [];

    constructor() {
        this.loadList();
    }

    loadList() {
        const list = localStorage.getItem('carouselList');
        if (list) {
            this.list = JSON.parse(list);
        } else {
            this.list = defaultCarouselItems;
            this.saveList();
        }
    }

    getList() {
        return this.list;
    }

    saveList() {
        localStorage.setItem('carouselList', JSON.stringify(this.list));
    }

    addItem(item) {
        this.list.push(item);
        this.saveList();
    }
}

const carouselService = new CarouselService();
export default carouselService;
