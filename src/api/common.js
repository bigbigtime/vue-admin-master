import service from "../utils/request";
/** 获取七牛云 token */
export function GetQiniuToken(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}