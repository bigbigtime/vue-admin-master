import service from "../utils/request";
/** 添加一级分类 */
export function FirstCategoryAdd(data){
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

/** 获取分类 */
export function GetCategory(data = {}){
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    })
}