<template>
    <div class="category">
        <el-button type="danger">添加一级分类</el-button>
        <hr class="spacing-hr" />
        <el-row :gutter="40">
        <el-col :span="7">
            <div class="category-list">
                <h4 class="first">
                    <i class="el-icon-circle-plus-outline"></i>
                    <strong>人工智能</strong>
                    <span class="group-button">
                        <el-button round type="danger" class="category-button-mini">编辑</el-button>
                        <el-button round type="success" class="category-button-mini">添加子级</el-button>
                        <el-button round class="category-button-mini">删除</el-button>
                    </span>
                </h4>
                <ul>
                    <li>
                        <span>无人机</span>
                        <span class="group-button">
                            <el-button round type="danger" class="category-button-mini">编辑</el-button>
                            <el-button round class="category-button-mini">删除</el-button>
                        </span>
                    </li>
                    <li>
                        <span>智能家具</span>
                        <span class="group-button">
                            <el-button round type="danger" class="category-button-mini">编辑</el-button>
                            <el-button round class="category-button-mini">删除</el-button>
                        </span>
                    </li>
                </ul>
            </div>
        </el-col>
        <el-col :span="17">
            <h4 class="column">一级分类编辑</h4>
            <el-form label-width="140px">
                <el-form-item label="一级分类名称：">
                    <el-input style="width: 20%;"></el-input>
                </el-form-item>
                <el-form-item label="子级分类名称：">
                    <el-input style="width: 20%;"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="danger">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
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
    &:last-child {
        ul li:last-child::after { display: none; }
    }
    strong { 
        margin-left: 10px;
        font-size: 15px;
    }
    h4, li {
        position: relative;
        height: 44px;
        padding: 0 10px;
        line-height: 44px;
        border-radius: 6px;
        @include webkit(transition, all .3s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .group-button { display: block; }
        }
    }
    ul {
        padding-left: 45px;
        li:last-child::after{
            content: "";
            position: absolute;
            bottom: -15px;
            left: -28px;
            border-left: 1px dotted #000;
            height: 35px;
        }
    }
    li::before {
        content: "";
        position: absolute;
        top: -20px;
        left: -28px;
        border-left: 1px dotted #000;
        border-bottom: 1px dotted #000;
        width: 30px;
        height: 42px;
    }
    .group-button { 
        display: none;
        float: right;
    }
}
.column {
    height: 44px;
    padding: 0 20px;
    margin-bottom: 30px;
    line-height: 44px;
    border-radius: 6px;
    background-color: #f3f3f3;
}
</style>