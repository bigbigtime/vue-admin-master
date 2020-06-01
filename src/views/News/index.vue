<template>
  <div class="news-list">
    <el-row>
      <el-col :span="18">筛选区</el-col>
      <el-col :span="6">
        <div class="text-right"><el-button type="danger">新增</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "NewsIndex",
  components: {},
  props: {},
  setup(props, { root }){
    // 监听
    // watch(xxx, () => {})
    // 生命周期
    // onBeforeMount(() => {})
    // onMounted(() => {})
    // onBeforeUpdate(() => {})
    // onUpdated(() => {})
    // onBeforeUnmount(() => {})
    // onUnmounted(() => {})
    // onErrorCaptured(() => {})
    // onRenderTracked(() => {})
    // onRenderTriggered(() => {})
    return {}
  }
}
</script>
<style lang="scss" scoped>
</style>