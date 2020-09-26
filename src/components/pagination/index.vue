<template>
    <el-pagination 
        sizs="small" 
        background 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="layout"
        :total="total">
    </el-pagination>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
export default {
    name: '',
    components: {},
    props: {
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50, 100]
        },
        pageSize: {
            type: Number,
            default: 10
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        total: {
            type: Number,
            default: 0
        }
    },
    setup(props, { root, emit }){
        // 当前页面
        const currentPage = ref(1);
        // 页码下拉选项
        const handleSizeChange = (val) => {
            currentPage.value = 1;
            emit("callbackComponent", {
                pageSize: val,
                pageNumber: 1
            })
        }
        // 点击页码
        const handleCurrentChange = (val) => {
            console.log(val)
            emit("callbackComponent", {
                pageNumber: val
            })
        }
        return {
            props,
            currentPage,
            handleSizeChange,
            handleCurrentChange
        }
    }
}
</script>