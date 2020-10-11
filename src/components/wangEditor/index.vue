<template>
  <div ref="editorDom"></div>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
// 富文本编辑器
import Editor from "wangeditor";
export default {
  name: 'wangEditor',
  components: {},
  props: {},
  setup(props, { root, refs, emit }){
		const data = reactive({
			editor: null
		});
		onMounted(() => {
			data.editor = new Editor(refs.editorDom);
			// 监听实时富文本输入内容
			data.editor.customConfig.onchange = html => {
				emit("upload:content", html);
			};
			// 创建富文本实例
			data.editor.create(); 
		});
  }
  
};
</script>
<style lang="scss" scoped>
</style>