<template>
  <div class="news-list">
    <el-row>
      <el-col :span="18">
        <div class="filter-wrap">
          <div class="inline">
            <div class="filter-item mr-26">
              <label>类型：</label>
              <el-select style="width: 160px;"></el-select>
            </div>
          </div>
          <div class="inline">
            <div class="filter-item">
              <label>关键字：</label>
              <el-select style="width: 100px;" class="mr-15"></el-select>
              <el-input placeholder="输入关键字按钮enter搜索" style="width: 220px;" class="mr-15"></el-input>
              <el-button type="danger">搜索</el-button>
            </div>
          </div>
        </div>
      </el-col>
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
.filter-wrap {
  .inline { display: inline-block; }
}
.filter-item {
  height: 40px;
  label {
    float: left;
    padding-right: 10px;
    line-height: 40px;
    font-size: 14px;
  }
}
</style>