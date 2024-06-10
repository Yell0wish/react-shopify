import goodService from './GoodService';

class SearchService {
    searchProducts(query) {
        const products = goodService.getList();
        return products.filter(product => product.name.includes(query));
    }
}

const searchService = new SearchService();
export default searchService;
