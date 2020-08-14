import { Message } from 'element-ui';
export default {
    install (Vue, options) {
        Vue.prototype.gMessage = (options) => {
            Message({
                message: options.msg,
                type: options.type || "success"
            })
        }
    }
}