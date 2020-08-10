<template>
    <div class="category">
        <el-button type="danger" @click="category({type: 'category_first_add'})">添加一级分类</el-button>
        <hr class="spacing-hr" />
        <el-row :gutter="40">
          <el-col :span="7">
            <div v-loading="data.loading_data" element-loading-text="加载中">
              <div v-if="data.category.length > 0">
                <div class="category-list" v-for="item in data.category" :key="item.id">
                    <h4 class="first">
                        <svg-icon icon="categoryReduce" className="categoryReduce"></svg-icon>
                        <strong>{{ item.category_name }}</strong>
                        <div class="pull-right">
                            <el-button type="danger" size="mini" round @click="category({type: 'category_first_edit', first_category: item, current: item })">编辑</el-button>
                            <el-button type="success" size="mini" round @click="category({type: 'category_sub_add', first_category: item, current: item })">添加子类</el-button>
                            <el-button size="mini" round @click="deleteConfirm({current: item})">删除</el-button>
                        </div>
                    </h4>
                    <ul v-if="item.children && item.children.length > 0">
                      <li v-for="child in item.children" :key="child.id">
                        <span>{{ child.category_name }}</span>
                        <span class="pull-right">
                          <el-button round type="danger" @click="category({type: 'category_sub_edit', first_category: item, sub_category: child, current: child })">编辑</el-button>
                          <el-button round @click="deleteConfirm({current: child})">删除</el-button>
                        </span>
                      </li>
                    </ul>
                </div>
              </div>
              <div v-else>没有分类</div>
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
import { FirstCategoryAdd, GetCategory, ChildCategoryAdd, CategoryEdit, CategoryDel } from "@/api/news";
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
        // 类别加载状态
        loading_data: false,
        // 分类
        category: [],
        // 当前的分类对象
        current_category_data: null
    })
    const config = reactive({
        type: "default",
        default: {
            title: "添加分类",
            first_disabled: true,
            sub_disabled: true,
            sub_hidden: false,
            clear_value: ["first_category", "sub_category"]
        },
        // 添加一级分类交互配置
        category_first_add: {
            title: "添加一级分类",
            first_disabled: false,
            sub_disabled: true,
            sub_hidden: true,
            clear_value: ["first_category"]
        },
        // 添加子级分类交互配置
        category_sub_add: {
            title: "添加子级分类",
            first_disabled: true,
            sub_disabled: false,
            sub_hidden: false,
            create_value: ["first_category"],
            clear_value: ["sub_category"]
        },
        category_first_edit: {
            title: "编辑一级分类",
            first_disabled: false,
            sub_disabled: true,
            sub_hidden: true,
            create_value: ["first_category"],
            clear_value: ["sub_category"]
        },
        category_sub_edit: {
            title: "编辑子级分类",
            first_disabled: true,
            sub_disabled: false,
            sub_hidden: false,
            create_value: ["first_category", "sub_category"]
        }
    });
    /** 交互 */
    const category = params => {
        // 不存在 key 阻止
        if(!config[params.type]) { return false; }
        // 更新值
        config.type = params.type;
        // 存储当前分类对象
        data.current_category_data = params.current;
        // 获取显示文本对象
        const createValue = config[params.type].create_value;
        // 获取清除文本对象
        const clearValue = config[params.type].clear_value;
        // 判断存在执行文本显示
        if(createValue) {
            createValue.forEach(item => {
                form[item] = params[item].category_name
            })
        }
        // 判断存在执行文本清除
        if(clearValue) {
            clearValue.forEach(item => {
                form[item] = ""
            })
        }
    };
    /** 表单提交 */
    const submit = () => {
      if (config.type === "category_first_add") { firstCategoryAdd(); }
      if (config.type === "category_sub_add") { childCategoryAdd(); }
      if (config.type === "category_first_edit" || config.type === "category_sub_edit") { 
        let key = config.type === "category_first_edit" ? "first_category" : "sub_category";
        categoryEdit(key);
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
        parentId: data.current_category_data.id
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
    /** 编辑分类 */
    const categoryEdit = (key) => {
      if (!form[key]) {
        root.$message({
          message: `${key==='first_category' ? '一级' : '子级'}分类不能为空！！`,
          type: "error"
        });
        return false;
      }
      // 加载状态，防止多次点击
      data.loading = true;
      // 参数
      const requeyst = {
        id: data.current_category_data.id,
        categoryName: form[key]
      }
      CategoryEdit(requeyst).then(response => {
        root.$message({
          message: response.message,
          type: "success"
        });
        // 清除加载状态
        data.loading = false;
        // 清空值
        form[key] = "";
      }).catch(error => {
        // 清除加载状态
        data.loading = false;
      });
    };
    /** 获取分类 */
    const getCategory = () => {
      data.loading_data = true;
      GetCategory().then(response => {
        if(response.data) {
          data.category = response.data;
          data.loading_data = false;
        }
      }).catch(error => {
        data.loading_data = false;
      })
    }
    /** 弹窗确认 */
    const deleteConfirm = (params) => {
      root.$confirm('此操作将此分类删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 存储分类数据
        data.current_category_data = params.current;
        categoryDelete();
      })
    }
    /** 删除分类 */
    const categoryDelete = () => {
      CategoryDel({categoryId: data.current_category_data.id}).then(response => {
        root.$message({
          message: response.message,
          type: "success"
        });
        category({type: "default", current: ""});
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
        submit,
        deleteConfirm
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