<template>
	<div class="news-detailed">
		<el-form label-width="100px">
			<el-form-item label="信息类别：">
				<el-cascader :options="data.category_option" :props="data.cascader_props"></el-cascader>
			</el-form-item>
			<el-form-item label="信息标题：">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="缩略图：">
				<el-upload
					class="avatar-uploader"
					action="http://up-z2.qiniup.com"
					:data="data.uploadData"
					:on-success="handlerOnSuccess"
					:before-upload="handlerBeforeOnUpload"
					:on-error="handlerOnError"
					:show-file-list="false"
				>
				<img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="发布日期：">
				<el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
			</el-form-item>
			<el-form-item label="是否发布：">
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
import { GetQiniuToken } from "@/api/common";
// common
import { getDateTime } from "@/utils/common"
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
			createDate: getDateTime(),
			editorContent: ""
		});
		const data = reactive({
			category_option: [],
			cascader_props: {
				label: "category_name",
				value: "id"
			},
			editor: null,
			uploadData: {
				token: ""
			}
		});
		/** 获取分类 */
		const getCategory = () => {
			root.$store.dispatch("news/categoryAction").then(response => {
				data.category_option = response;
			});
		};
		const handlerOnSuccess = (res, file) => {}
		const handlerOnError = (res, file) => {}
        const handlerBeforeOnUpload = (file) => {
			console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                root.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                root.$message.error('上传头像图片大小不能超过 2MB!');
            }
            // 文件名转码
            let suffix = file.name;
            let key = encodeURI(`${suffix}`);
            data.uploadData.key = key;
            return isJPG && isLt2M;
        }
		const getQiniuToken = () => {
			const requestData = {
				accessKey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
				secretKey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
				buckety: "bigbigtime"
			}
			GetQiniuToken(requestData).then(response => {
				const responseData = response.data;
				if(responseData) {
					data.uploadData.token = responseData.token
				}
			})
		}
		onBeforeMount(() => {
			getCategory()
			getQiniuToken();
		});
		onMounted(() => {
			data.editor = new Editor(refs.editorDom);
			data.editor.customConfig.onchange = html => {
				form.editorContent = html;
			};
			data.editor.create(); // 创建富文本实例
		});
		return {
			data,
			form,
			handlerOnSuccess, handlerOnError, handlerBeforeOnUpload
		};
	}
};
</script>
<style lang='scss' scoped>
</style>