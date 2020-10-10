<template>
    <el-form>
        <template v-for="item in formItem">
            <!-- cascader -->
            <el-form-item v-if="item.type === 'cascader'" :key="item.prop" :label="item.label" :prop="item.prop">
                <CascaderVue :url="item.url" />
            </el-form-item>
            <!-- input -->
            <el-form-item v-if="item.type === 'input'" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-input />
            </el-form-item>
            <!-- upload -->
            <el-form-item v-if="item.type === 'upload'" :key="item.prop" :label="item.label" :prop="item.prop">
                <UploadVue :requestData="item.requestData" :url="item.url" />
            </el-form-item>
            <!-- date -->
            <el-form-item v-if="item.type === 'date'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- radio -->
            <el-form-item v-if="item.type === 'radio'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- wangeditor -->
            <el-form-item v-if="item.type === 'wangeditor'" :key="item.prop" :label="item.label" :prop="item.prop">
                <WangEditor />
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
// components
import CascaderVue from "@c/cascader";
import UploadVue from "@c/upload";
import WangEditor from "@c/wangEditor";
import { ref } from "@vue/composition-api";
export default {
    name: 'BasisForm',
    components: { CascaderVue, UploadVue, WangEditor },
    props: {
        formItem: {
            type: Array,
            default: () => ([])
        }
    },
    setup(props){

        const bookTitle = ref("");

        const get = () => {
            console.log(bookTitle.value)
        }

        return { get, bookTitle }
    }
}
</script>
<style lang="scss" scoped>
</style>