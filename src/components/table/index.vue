<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <el-table-column v-for="item in config.thead" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { onMounted, onBeforeMount, reactive } from "@vue/composition-api";
// API
import { GetListData } from "@/api/common";
export default {
    name: "BasisTable",
    props: {
        configTable: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, context){
        const config = reactive({
            onload: false,      // 加载完成回调
            isRequest: true,    // 接口请求关开
            url: "",            // 请求地址
            data: {},           // 请求参数
            checkbox: false,  // 列表复选框
            thead: [],        // 表头
            pagination: false // 页码
        })
        const data = reactive({
            tableData: []
        })
        const initConfig = () => {
            // 获取 config 对象的所有 key（键名）
            const keys = Object.keys(config); 
            // 获取传入的配置数据
            for(let key in props.configTable) {
                // 非实例属性，则跳过此次循环
                if(!props.configTable.hasOwnProperty(key)) { continue; }
                // 匹配 key，存在则替换
                if(keys.includes(key)) {
                    config[key] = props.configTable[key]
                }
            }
        }
        // 接口请求
        const loadData = () => {
            // 判断是否存在 url
            if(!config.url) { return false; }
            const requestData = {
                url: config.url,
                data: config.data
            }
            GetListData(requestData).then(response => {
                const responseData = response.data;
                if(responseData.data) { 
                    data.tableData = responseData.data;
                }
                // 判断是否回调
                config.onload && context.emit("onload", data.tableData);
            })
        }
        onBeforeMount(() => {
            // 初始化配置
            initConfig()
            // 是否请求接口
            config.isRequest && loadData();
        })
        return { data, config }
    }
}
</script>