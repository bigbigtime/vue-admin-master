<template>
    <el-cascader v-model="value" :options="data.category_option" :props="cascaderProps" @change="change"></el-cascader>
</template>

<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
export default {
    name: '',
    components: {},
    props: {
        cascaderProps: {
            type: Object,
            default: () => ({
                label: "category_name",
                value: "id"
            })
        },
        value: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: "",
            required: true
        }
    },
    setup(props, { root, emit }){
        const data = reactive({
            value: "",
            category_option: []
        })

        /** 获取分类 */
        const getCategory = () => {
            if(!props.url) { return false; }
            root.$store.dispatch(props.url).then(response => {
                data.category_option = response;
            });
        };
        /** 触发分类 */
        const change = (val) => {
            const lastData = val[val.length - 1];
            emit("update:value", lastData);
        }
        // 生命周期
        onBeforeMount(() => {
            getCategory();
        })
        return { data, change, props }
    }
}
</script>
<style lang='scss' scoped>
</style>