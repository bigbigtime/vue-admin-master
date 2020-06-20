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

/** 添加子级分类 */
export function ChildCategoryAdd(data = {}){
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}

/** 分类编辑 */
export function CategoryEdit(data = {}){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}

/** 分类删除 */
export function CategoryDel(data = {}){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}

/** 新增信息 */
export function AddInfo(data = {}){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}