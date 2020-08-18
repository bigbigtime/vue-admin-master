import service from "../utils/request";
/**
 * 获取七牛云token
 * 
 * @param {
    *  AK: 七牛云的密钥AK；type: string
    *  SK: 七牛云的密钥AK；type: string
    *  buckety: 七牛云储存空间名称；type: string
    * } params 
    * 
    */
   export function QiniuToKen(data){
       return service.request({
           method: "post",
           url: "/uploadImgToken/",
           data
       })
   }