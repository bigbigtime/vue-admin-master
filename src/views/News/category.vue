<template>
    <div class="category">
        <el-button type="danger">添加一级分类</el-button>
        <hr class="spacing-hr" />
        <el-row :gutter="40">
            <el-col :span="7">
            <div class="category-list">
                <h4 class="first">
                    <svg-icon icon="categoryReduce" className="categoryReduce"></svg-icon>
                    <strong>人工智能</strong>
                    <div class="pull-right">
                        <el-button type="danger" size="mini" round>编辑</el-button>
                        <el-button type="success" size="mini" round>添加子类</el-button>
                        <el-button size="mini" round>删除</el-button>
                    </div>
                </h4>
                <ul>
                    <li>
                        无人机
                        <div class="pull-right">
                            <el-button type="danger" size="mini" round>编辑</el-button>
                            <el-button size="mini" round>删除</el-button>
                        </div>
                    </li>
                    <li>智能家具</li>
                </ul>
            </div>
            </el-col>
            <el-col :span="17">输入框</el-col>
        </el-row>
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
.category-list {
    h4, li {
        position: relative;
        height: 44px;
        padding: 0 10px;
        line-height: 44px;
        border-radius: 6px;
        @include webkit(transition, all .3s ease 0s);
        &:hover {
            background-color: #f3f3f3;
        }
    }
    li:before {
        content: "";
        display: block;
        position: absolute;
        left: -28px;
        top: -20px;
        width: 32px;
        height: 42px;
        border-left: 1px dotted #000;
        border-bottom: 1px dotted #000;
    }
    ul {
        padding-left: 45px;
    }
}

</style>