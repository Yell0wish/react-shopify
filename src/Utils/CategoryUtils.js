import categoryService from "../Services/CategoryService";
import goodService from "../Services/GoodService";
export function getCategoryList() {
    const categoryList = categoryService.getList()
    return categoryList
}

export function getCurrentSubcategoryName() {
    const currentSubcategoryId = categoryService.getCurrentSubcategoryId();
    const categoryList = categoryService.getList();

    for (let category of categoryList) {
        for (let subcategory of category.subcategories) {
            if (subcategory.subcategory_id === currentSubcategoryId) {
                return subcategory.name;
            }
        }
    }

    return null; 
}

export function getGoodsListbySubcategoryId(subcategory_id) {
    const goodsList = goodService.getList()
    const ret = goodsList.filter(good => good.subcategory_id == subcategory_id)
    // console.log(ret)
    return ret
}

