<template>
	<div class="news-detailed">
		<el-form label-width="100px">
			<el-form-item label="信息类别：">
				<el-cascader 
					v-model="data.category" 
					:options="data.category_option" 
					:props="data.cascaderProps">
				</el-cascader>
			</el-form-item>
			<el-form-item label="信息标题：">
				<el-input v-model="data.title"></el-input>
			</el-form-item>
			<el-form-item label="缩略图：">
				<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false">
					<img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="发布日期：">
				<el-date-picker v-model="data.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
import { reactive, ref, onMounted, watch, onBeforeMount } from '@vue/composition-api';
//API
import { GetCategory } from "@/api/news";
import Editor from "wangeditor";
export default {
	name: "NewsDetail",
	components: {},
	props: {},
	setup(props, { root, refs }){
		const data = reactive({
			imageUrl: "",
			category: "",
			title: "",
			date: "",
			category_option: [
				{ label: "人工智能", value: 0 },
				{ label: "技术", value: 1 }
			],
			cascaderProps: {
				expandTrigger: 'hover'
			},
			editor: null,
			editorContent: ''
		})

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
					date.editorContent = html;
			};
			data.editor.create(); // 创建富文本实例
		})
		return {
			data
		}
	}
}
</script>
<style lang='scss' scoped>

</style>