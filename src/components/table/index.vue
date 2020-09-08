<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <el-table-column v-for="item in config.thead" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { onMounted, onBeforeMount, reactive } from "@vue/composition-api";
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
            checkbox: false,  // 列表复选框
            thead: [],        // 表头
            pagination: false // 页码
        })
        const data = reactive({
            tableData: [
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', age: 18, gender: "男" }
            ]
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
        onBeforeMount(() => {
            initConfig()
        })
        return { data, config }
    }
}
</script>