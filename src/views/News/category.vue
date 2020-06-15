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
              <el-button round type="danger" class="category-button-mini" @click="category({type: 'first_category_edit', first_category: item})">编辑</el-button>
              <el-button round type="success" class="category-button-mini" @click="category({type: 'sub_category_add', first_category: item})">添加子级</el-button>
              <el-button round class="category-button-mini" @click="categoryDelConfirm(item.id)">删除</el-button>
            </span>
          </h4>
          <ul v-if="item.children && item.children.length > 0">
            <li v-for="child in item.children" :key="child.id">
              <span>{{ child.category_name }}</span>
              <span class="group-button">
                <el-button round type="danger" class="category-button-mini" @click="category(
                  { type: 'sub_category_edit', first_category: item, sub_category: child}
                )">编辑</el-button>
                <el-button round class="category-button-mini" @click="categoryDelConfirm(child.id)">删除</el-button>
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
import { reactive, ref, isRef, onMounted, watch, onBeforeMount } from "@vue/composition-api";
//API
import { FirstCategoryAdd, GetCategory, ChildCategoryAdd, CategoryEdit, CategoryDel } from "@/api/news";
export default {
	name: "Category",
	components: {},
	props: {},
	setup(props, { root }) {
    // 分类ID
    let category_id = ref("");
		const form = reactive({
			first_category: "",
			sub_category: ""
    });
		const data = reactive({
      // 存储分类数据对象
      currentData: {},
      sub_category_data: {},
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
        sub_hidden: false,
        show_value: ["first_category"]
      },
      // 添加子级
      sub_category_add: {
        title: "添加子级",
        first_disabled: true,
        sub_hidden: true,
        show_value: ["first_category"]
      },
			// 编辑子级
			sub_category_edit: {
				title: "编辑子级",
				first_disabled: true,
        sub_hidden: true,
        show_value: ["first_category", "sub_category"]
			},
			// loading
			loading: false
		});
    /** 交互 */
    const category = (params) => {
      data.type = params.type;
      // 存储分类数据
      data.currentData = params.first_category;
      data.sub_category_data = params.sub_category;
      // 判断是否显示 value
      let showKey = data[params.type].show_value;
      if(showKey) {
        showKey.forEach(item => {
          if(params[item]) {
            form[item] = params[item].category_name
          }
        });
      }
    };
    /** 表单提交 */
    const submit = () => {
      if (data.type === "first_category_add") {
        firstCategoryAdd();
      }
      if(data.type === "sub_category_add") {
        childCategoryAdd();
      }
      if(data.type === "first_category_edit" || data.type === "sub_category_edit") {
        categoryEdit();
      }
    };
    /** 删除分类 */
    const categoryDelConfirm = (id) => {
      root.$confirm('此操作将永久删除此分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        category_id.value = id;
        categoryDelete();
      }).catch(() => {});
    }
    const categoryDelete = () => {
      // 判断是 ref 对象，并且是数字
      console.log(Number(category_id.value))
      // if(!isRef(form) && Number(category_id.value))
      // console.log(isRef(form))
    }
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
        message({
          message: response.message,
          key: "first_category"
        })
			}).catch(error => {
				// 清除加载状态
				data.loading = false;
			});
    };
    /** 分类编辑 */
		const categoryEdit = () => {
      let filed = data.type === "first_category_edit" ? "first_category" : "sub_category"
      let level = data.type === "first_category_edit" ? "一级" : "子级";
			if (!form[filed]) {
				root.$message({
					message: `${level}分类不能为空！！`,
					type: "error"
				});
				return false;
			}
			// 加载状态，防止多次点击
      data.loading = true;
      // 参数
      const requeyst = {
        id: data.type === "first_category_edit" ? data.currentData.id : data.sub_category_data.id,
        categoryName: data.type === "first_category_edit" ? form.first_category : form.sub_category
      }
			CategoryEdit(requeyst).then(response => {
        message({
          message: response.message,
          key: data.type === "first_category_edit" ? "first_category" : "sub_category"
        })
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
        message({
          message: response.message,
          key: "sub_category"
        })
      }).catch(error => {
        // 清空值
				form.sub_category = "";
      })
    }
    /** message 消息提示 */
    const message = (params) => {
      root.$message({
        message: params.message,
        type: "success"
      });
      // 清除加载状态
      data.loading = false;
      // 清空值
      form[params.key] = "";
    }
		/** 生命周期 渲染之前 */
		onBeforeMount(() => {
			getCategory();
		})
		return {
			data,
			form,
      category,
      categoryDelConfirm,
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