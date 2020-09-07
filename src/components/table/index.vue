<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <el-table-column v-for="item in config.thead" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
    name: "BasisTable",
    props: {},
    setup(props, context){
        const config = reactive({
            thead: [
                { label: "日期", prop: "date" },
                { label: "姓名", prop: "name" },
                { label: "地址", prop: "address" },
                { label: "年龄", prop: "age" },
                { label: "性别", prop: "gender" },
            ]
        })
        const data = reactive({
            tableData: [
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', age: 18, gender: "男" }
            ]
        })
        return { data, config }
    }
}
</script>