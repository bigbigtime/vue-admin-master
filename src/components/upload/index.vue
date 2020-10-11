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
import { reactive, ref, onMounted, onBeforeMount, getCurrentInstance } from '@vue/composition-api';
// API
import { GetQiniuToken } from "@/api/common";
export default {
   name: '',
   components: {},
   props: {
       requestData: {
           type: Object,
           defaulte: () => ({})
       }
   },
   setup(props, { root }){
        const { $store } = getCurrentInstance();
        const data = reactive({
			uploadData: {
				token: ""
            },
            imgUrl: ""
		});
        const handlerOnSuccess = (res, file) => {
			let image = `http://qf7nt7g8b.hn-bkt.clouddn.com/${res.key}`;
            data.imgUrl = image;
		}
		const handlerOnError = (res, file) => {}
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
		const getQiniuToken = () => {
            GetQiniuToken(props.requestData).then(response => {
				const responseData = response.data;
				if(responseData) {
					data.uploadData.token = responseData.token
				}
			})
        }
        onBeforeMount(() => {
			getQiniuToken();
		});
       return { data, handlerOnSuccess, handlerOnError, handlerBeforeOnUpload }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover { border-color: #409EFF; }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>