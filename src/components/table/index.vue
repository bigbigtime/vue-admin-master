<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
    name: "BasisTable",
    props: {},
    setup(props, context){
        const data = reactive({
            tableData: [
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }
            ]
        })
        return { data };
    }
}
</script>