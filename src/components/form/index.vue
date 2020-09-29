<template>
    <el-form>
        <el-form-item v-for="item in formItem" :key="item.prop" :label="item.label" :prop="item.prop">
            表单元素类型
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: 'BasisForm',
    components: {},
    props: {
        formItem: {
            type: Array,
            default: () => ([])
        }
    }
}
</script>
<style lang="scss" scoped>
</style>