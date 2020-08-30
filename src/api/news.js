import service from "../utils/request";
/** 添加信息 */
export function Add(data){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}


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

/** 信息列表 */
export function GetList(data = {}){
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

/** 发布状态 */
export function Status(data = {}){
    return service.request({
        method: "post",
        url: "/news/status/",
        data
    })
}

/** 删除 */
export function Delete(data = {}){
    return service.request({
        method: "post",
        url: "/news/delete/",
        data
    })
}

/** 获取详情 */
export function GetDetailed(data = {}){
    return service.request({
        method: "post",
        url: "/news/detailed/",
        data
    })
}