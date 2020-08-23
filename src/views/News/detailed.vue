<template>
	<div class="news-detailed">
		<el-form ref="form" label-width="100px" :model="form" :rules="form_rules">
			<el-form-item label="信息类别：" prop="categoryId">
				<el-cascader v-model="form.categoryId" :options="data.category_option" :props="data.cascader_props"></el-cascader>
			</el-form-item>
			<el-form-item label="信息标题：" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="缩略图：" prop="imgUrl">
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
			<el-form-item label="发布日期：" prop="createDate">
				<el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
			</el-form-item>
			<el-form-item label="是否发布：">
			<el-radio-group v-model="form.status">
				<el-radio :label="'2'">是</el-radio>
				<el-radio :label="'1'">否</el-radio>
			</el-radio-group>
			</el-form-item>
			<el-form-item label="内容：" prop="content">
				<div ref="editorDom" style="text-align:left;"></div>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" @click="submitForm('form')">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeMount, watch } from "@vue/composition-api";
// API
import { GetCategory, Add } from "@/api/news";
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
			editorContent: "",
			status: "1"
		});
		// 检验规则
		const form_rules = reactive({
			categoryId: [ { required: true, message: "分类不能为空", trigger: 'change' }],
			title: [ { required: true, message: "标题不能为空", trigger: 'change' } ],
			imgUrl: [ { required: true, message: "缩略图不能为空", trigger: 'change' } ],
			createDate: [ { required: true, message: "请选择发布日期", trigger: 'change' } ],
			status: [ { required: true, message: "请选择发布状态", trigger: 'change' } ],
			content: [ { required: true, message: "内容不能为空", trigger: 'change' } ]
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
		const handlerOnSuccess = (res, file) => {
			let image = `http://qf7nt7g8b.hn-bkt.clouddn.com/${res.key}`;
            form.imgUrl = image;
		}
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
				ak: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
				sk: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
				buckety: "bigbigtime"
			}
			GetQiniuToken(requestData).then(response => {
				const responseData = response.data;
				if(responseData) {
					data.uploadData.token = responseData.token
				}
			})
		}
		const submitForm = (formName) => {
			refs[formName].validate((valid) => {
				// 表单验证通过
				if (valid) {
					// 深度拷贝
					const requestData = JSON.parse(JSON.stringify(form));
					// categoryId 重新赋值
					requestData.categoryId = requestData.categoryId[requestData.categoryId.length - 1];
					// 接口请求
					Add(requestData).then(response => {
						root.gMessage({
							msg: response.message
						})
						// 重置表单
						refs.form.resetFields();
						// 清除内容
						data.editor.txt.html("");
					})
				} else {
					alert(222)
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
				form.content = html;
			};
			data.editor.create(); // 创建富文本实例
		});

		return {
			data,
			form,
			submitForm,
			form_rules,
			handlerOnSuccess, handlerOnError, handlerBeforeOnUpload
		};
	}
};
</script>
<style lang='scss' scoped>
</style>