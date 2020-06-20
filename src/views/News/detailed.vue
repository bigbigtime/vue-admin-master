<template>
  <div class="news-detailed">
    <el-form label-width="100px">
      <el-form-item label="信息类别：">
        <el-cascader 
					v-model="form.categoryId"
					:options="data.category_option"
					:props="data.cascader_props"
				>
				</el-cascader>
      </el-form-item>
      <el-form-item label="信息标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布日期：">
        <el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="内容：">
        <div ref="editorDom" style="text-align:left;"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeMount, watch } from "@vue/composition-api";
// API
import { GetCategory } from "@/api/news";
// 富文本编辑器
import Editor from "wangeditor";
export default {
  name: "NewsDetail",
  components: {},
  props: {},
  setup(props, { root, refs }) {
		// form 表单
		const form = reactive({
			categoryId: "",
			title: "",
			imgUrl: "",
			content: "",
			createDate: "",
			editorContent: ""
		})
		const data = reactive({
			cascader_props: {
				expandTrigger: 'hover',
				label: "category_name",
				value: "id"
			},
			category_option: [
				{ label: "人工智能", value: 0 },
				{ label: "技术", value: 1 }
			],
			editor: null
		});
		/** 获取分类 */
		const getCategory = () => {
			GetCategory().then(response => {
				data.category_option = response.data
			})
		}
		onBeforeMount(() => {
			getCategory();
		})
		onMounted(() => {
			data.editor = new Editor(refs.editorDom);
			data.editor.customConfig.onchange = html => {
				form.editorContent = html;
			};
			data.editor.create(); // 创建富文本实例
		});
    return {
      data, form
    };
  }
};
</script>
<style lang='scss' scoped>
</style>