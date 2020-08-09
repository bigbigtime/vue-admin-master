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
        <el-col :span="17">
            <h4 class="column">{{ config[config.type].title }}</h4>
			<el-form label-width="140px">
				<el-form-item label="一级分类名称：">
					<el-input v-model="form.first_category" style="width: 200px;" :disabled="config[config.type].first_disabled"></el-input>
				</el-form-item>
				<el-form-item label="子级分类名称：" v-show="!config[config.type].sub_hidden">
					<el-input v-model="form.sub_category" style="width: 200px;" :disabled="config[config.type].sub_disabled"></el-input>
				</el-form-item>
				<el-form-item label>
					<el-button type="danger">确定</el-button>
				</el-form-item>
			</el-form>
        </el-col>
        </el-row>
        </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
	name: "Category",
	components: {},
	props: {},
    setup(props, { root }) {
        const form = reactive({
            first_category: "",
            sub_category: ""
        })
        const config = reactive({
            type: "default",
            default: {
                title: "添加分类",
                first_disabled: true,
                sub_disabled: true,
                sub_hidden: false
            }
        });
        return {
            config, form
        };
    }
};
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
.column {
    height: 44px;
    padding: 0 20px;
    margin-bottom: 30px;
    line-height: 44px;
    border-radius: 6px;
    background-color: #f3f3f3;
}
</style>