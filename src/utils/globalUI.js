import { Message, MessageBox } from 'element-ui';
export default {
    install (Vue, options) {
        // message
        Vue.prototype.gMessage = (options = {}) => {
            Message({
                message: options.msg,
                type: options.type || "success"
            })
        }
        // confirm
        Vue.prototype.gComfirm = (options = {}) => {
            MessageBox.confirm(options.msg || "确定执行此操作，删除后将无法恢复。", options.tip || "消息", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: options.type || 'warning'
            }).then(() => {
                if(options.thenFun && typeof options.thenFun === "function") {
                    options.thenFun()
                }
            }).catch(() => {
                if(options.catchFun && typeof options.catchFun === "function") {
                    options.catchFun();
                }   
            });
        }
    }
}