<template>
    <div class="news-detailed">
        <el-form label-width="100px">
            <el-form-item label="信息类别：">
                <el-select v-model="data.category">
                    <el-option v-for="item in data.category_opacity" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
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
                <div ref="editorElem"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="danger">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
// 富文本编辑器
import E from "wangeditor";
export default {
    name: "NewsDetail",
    components: {},
    props: {},
    setup(props, { root, refs }){
        const editorElem = ref(null);
        const data = reactive({
            imageUrl: "",
            category: "",
            title: "",
            date: "",
            category_opacity: [
                { label: "人工智能", value: 0 },
                { label: "技术", value: 1 }
            ],
            editor: null,
            editorContent: '',
        })
        onMounted(() => {
            data.editor = new E(refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            data.editor.customConfig.onchange = html => {
                data.editorContent = html;
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