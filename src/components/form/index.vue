<template>
    <el-form>
        <template v-for="item in formItem">
            <!-- select -->
            <el-form-item v-if="item.type === 'categoryInfo'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- input -->
            <el-form-item v-if="item.type === 'input'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- upload -->
            <el-form-item v-if="item.type === 'upload'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- date -->
            <el-form-item v-if="item.type === 'date'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- date -->
            <el-form-item v-if="item.type === 'radio'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
            <!-- date -->
            <el-form-item v-if="item.type === 'wangeditor'" :key="item.prop" :label="item.label" :prop="item.prop">
                
            </el-form-item>
        </template>
        
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