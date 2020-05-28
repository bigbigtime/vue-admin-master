import router from "./index";
// cookie
import { getToken } from "@/utils/cookies";
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取 token 是否存在
    if(getToken()){
        next();
    }
})
// 全局后置守卫
router.afterEach((to, from) => {
})