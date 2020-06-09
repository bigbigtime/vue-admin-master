<template>
  <div class="category">
    <el-button type="danger" @click="category('first_category_add')">添加一级分类</el-button>
    <hr class="spacing-hr" />
    <el-row :gutter="40">
      <el-col :span="7">
        <div class="category-list" v-for="item in data.category" :key="item.id">
          <h4 class="first">
            <i class="el-icon-circle-plus-outline"></i>
            <strong>{{ item.category_name }}</strong>
            <span class="group-button">
              <el-button round type="danger" class="category-button-mini" @click="category('first_category_edit')">编辑</el-button>
              <el-button round type="success" class="category-button-mini" @click="category('sub_category_add', item)">添加子级</el-button>
              <el-button round class="category-button-mini">删除</el-button>
            </span>
          </h4>
          <ul>
            <li>
              <span>无人机</span>
              <span class="group-button">
                <el-button
                  round
                  type="danger"
                  class="category-button-mini"
                  @click="category('sub_category_edit')"
                >编辑</el-button>
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
        <h4 class="column">{{ data[data.type].title }}</h4>
        <el-form label-width="140px">
          <el-form-item label="一级分类名称：">
            <el-input v-model.trim="form.first_category" style="width: 20%;" :disabled="data[data.type].first_disabled"></el-input>
          </el-form-item>
          <el-form-item label="子级分类名称：" v-show="data[data.type].sub_hidden">
            <el-input v-model.trim="form.sub_category" style="width: 20%;"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button type="danger" :loading="data.loading" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, onBeforeMount } from "@vue/composition-api";
//API
import { FirstCategoryAdd, GetCategory, ChildCategoryAdd } from "@/api/news";
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
      // 存储分类数据对象
      currentData: {},
			// 分类
			category: [],
			type: "first_category_add",
			// 一级分类添加
			first_category_add: {
				title: "添加一级分类",
				first_disabled: false,
				sub_hidden: false
			},
			// 一级分类编辑
			first_category_edit: {
				title: "编辑一级分类",
				first_disabled: false,
				sub_hidden: false
			},
			// 添加子级
			sub_category_add: {
				title: "添加子级",
				first_disabled: true,
        sub_hidden: true,
        show_value: "first_category"
			},
			// 编辑子级
			sub_category_edit: {
				title: "编辑子级",
				first_disabled: true,
				sub_hidden: true
			},
			// loading
			loading: false
		});
    /** 交互 */
    const category = (type, categoryData) => {
      data.type = type;
      // 存储分类数据
      data.currentData = categoryData;
      // 判断是否显示 value
      let showKey = data[type].show_value;
      if(showKey) { form[showKey] = categoryData.category_name; }
    };
    /** 表单提交 */
    const submit = () => {
      if (data.type === "first_category_add") {
        firstCategoryAdd();
      }
      if(data.type === "sub_category_add") {
        childCategoryAdd();
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
			}).catch(error => {
				// 清除加载状态
				data.loading = false;
			});
		};
		/** 获取分类 */
		const getCategory = () => {
			GetCategory().then(response => {
				if(response.data && response.data.length > 0) {
					data.category = response.data
				}
			})
    }
    /** 添加子级分类 */
    const childCategoryAdd = () => {
      if (!form.sub_category) {
				root.$message({
					message: "子级分类不能为空！！",
					type: "error"
				});
				return false;
			}
			// 加载状态，防止多次点击
			data.loading = true;
      const requestData = {
        categoryName: form.sub_category,
        parentId: data.currentData.id
      }
      ChildCategoryAdd(requestData).then(response => {
        root.$message({
					message: response.message,
					type: "success"
				});
				// 清除加载状态
				data.loading = false;
				// 清空值
				form.sub_category = "";
      }).catch(error => {
        // 清空值
				form.sub_category = "";
      })
    }
		/** 生命周期 渲染之前 */
		onBeforeMount(() => {
			getCategory();
		})
		return {
			data,
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