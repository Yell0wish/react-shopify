
import goodService from "../Services/GoodService";

export function getGoodById(id) {
    const goodList = goodService.getList()
    const ret = goodList.find(good => id === good.id)
    return ret
}