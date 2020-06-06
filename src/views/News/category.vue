<template>
    <div class="category">
        <el-button type="danger">添加一级分类</el-button>
        <hr class="spacing-hr" />
    </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
export default {
   name: '',
   components: {},
   props: {},
   setup(props, { root }){
       // 监听
       //watch(xxx, () => {})
       // 生命周期
    //    onBeforeMount(() => {})
    //    onMounted(() => {})
    //    onBeforeUpdate(() => {})
    //    onUpdated(() => {})
    //    onBeforeUnmount(() => {})
    //    onUnmounted(() => {})
    //    onErrorCaptured(() => {})
    //    onRenderTracked(() => {})
    //    onRenderTriggered(() => {})
       return {}
    }
}
</script>
<style lang="scss" scoped>
.spacing-hr {
    border: none;
    border-top: 1px solid #e9e9e9;
    margin:30px 0;
}
</style>