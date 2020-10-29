<template>
    <el-upload
        class="avatar-uploader"
        action="http://up-z2.qiniup.com"
        :data="data.uploadData"
        :on-success="handlerOnSuccess"
        :before-upload="handlerBeforeOnUpload"
        :on-error="handlerOnError"
        :show-file-list="false"
    >
    <img v-if="data.imgUrl" :src="data.imgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import { ref, reactive, onBeforeMount } from "@vue/composition-api";
// API
import { GetQiniuToken } from "@/api/common";
export default {
	name: 'Upload',
	components: {},
	props: {
		requestData: {
			type: Object,
			default: () => ({})
		},
		url: {
			type: String,
			default: "http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/"
		}
	},
	setup(props, { root }){
		const data = reactive({
				imgUrl: "",
				uploadData: {}
		})
		// 上传成功
		const handlerOnSuccess = (res, file) => {
			let image = `${props.url}${res.key}`;
			data.imgUrl = image;
		}
		// 上传失败
		const handlerOnError = (res, file) => {}
		// 上传之前
		const handlerBeforeOnUpload = (file) => {
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
		// 获取 token
		const getQiniuToken = () => {
			GetQiniuToken(props.requestData).then(response => {
				const responseData = response.data;
				if(responseData) {
					data.uploadData.token = responseData.token
				}
			})
		}
		// 挂载之前
		onBeforeMount(() => {
			getQiniuToken();
		});
		return  {
			data,
			handlerOnSuccess, 
			handlerOnError, 
			handlerBeforeOnUpload
		}
	}
};
</script>
<style lang="scss" scoped>
</style>