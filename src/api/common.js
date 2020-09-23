import service from "../utils/request";
// api
import api_url from "./apiUrl";
/** 获取七牛云 token */
export function GetQiniuToken(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}

/** 列表数据 */
export function GetListData(params = {}){
    return service.request({
        method: params.method || "post",
        url: api_url[params.url],
        data: params.data
    })
}

/** 删除列表数据 */
export function DeleteData(params = {}){
    return service.request({
        method: params.method || "post",
        url: api_url[`${params.url}Delete`],
        data: params.data
    })
}