<template>
    <div class="category">
        <el-button type="danger" @click="category('category_first_add')">添加一级分类</el-button>
        <hr class="spacing-hr" />
        <el-row :gutter="40">
        <el-col :span="7">
            <div class="category-list" v-for="item in data.category" :key="item.id">
                <h4 class="first">
                    <svg-icon icon="categoryReduce" className="categoryReduce"></svg-icon>
                    <strong>{{ item.category_name }}</strong>
                    <div class="pull-right">
                        <el-button type="danger" size="mini" round>编辑</el-button>
                        <el-button type="success" size="mini" round @click="category('category_sub_add')">添加子类</el-button>
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
					<el-button type="danger" @click="submit" :loading="data.loading">确定</el-button>
				</el-form-item>
			</el-form>
        </el-col>
        </el-row>
        </div>
</template>

<script>
import { reactive, ref, onBeforeMount, watch } from "@vue/composition-api";
//API
import { FirstCategoryAdd, GetCategory } from "@/api/news";
export default {
  name: "Category",
  components: {},
  props: {},
  setup(props, { root }) {
    const form = reactive({
      first_category: "",
      sub_category: ""
    });
    const data = reactive({
        // loading
        loading: false,
        // 分类
        category: []
    })
    const config = reactive({
        type: "default",
        default: {
            title: "添加分类",
            first_disabled: true,
            sub_disabled: true,
            sub_hidden: false
        },
        // 添加一级分类交互配置
        category_first_add: {
            title: "添加一级分类",
            first_disabled: false,
            sub_disabled: true,
            sub_hidden: true
        },
        // 添加子级分类交互配置
        category_sub_add: {
            title: "添加子级分类",
            first_disabled: false,
            sub_disabled: false,
            sub_hidden: false
        },
    });
    /** 交互 */
    const category = type => {
	  if(config[type]) { config.type = type; }
    };
    /** 表单提交 */
    const submit = () => {
      if (config.type === "category_first_add") {
        firstCategoryAdd();
      }
    };
    /** 添加一级分类 */
    const firstCategoryAdd = () => {
      if (!form.first_category) {
        root.$message({
          message: "一级分类不能为空！！",
          type: "error"
        });
        return false;
      }
      // 加载状态，防止多次点击
      data.loading = true;
      FirstCategoryAdd({ categoryName: form.first_category }).then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          // 清除加载状态
          data.loading = false;
          // 清空值
          form.first_category = "";
        })
        .catch(error => {
          // 清除加载状态
          data.loading = false;
        });
    };
    /** 获取分类 */
    const getCategory = () => {
        GetCategory().then(response => {
            if(response.data) {
                data.category = response.data
            }
        })
    }
    onBeforeMount(() => {
        getCategory();
    })
    return {
        data,
        config,
        form,
        category,
        submit
    };
  }
};
</script>
<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 30px 0;
}
.category-list {
  &:last-child {
    ul li:last-child::after {
      display: none;
    }
  }
  strong {
    margin-left: 10px;
    font-size: 15px;
  }
  h4,
  li {
    position: relative;
    height: 44px;
    padding: 0 10px;
    line-height: 44px;
    border-radius: 6px;
    @include webkit(transition, all 0.3s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .group-button {
        display: block;
      }
    }
  }
  ul {
    padding-left: 45px;
    li:last-child::after {
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