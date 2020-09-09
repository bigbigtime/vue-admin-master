import service from "../utils/request";
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
        url: params.url,
        data: params.data
    })
}