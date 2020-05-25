<template>
<el-row>
  <el-col :span="12">
    <span class="menu-btn">
      <svg-icon icon="menuBtn" className="icon-menu-btn"></svg-icon>
    </span>
  </el-col>
  <el-col :span="12">用户头像</el-col>
</el-row>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "LayoutAsice",
  components: {},
  props: {},
  setup(props, { root }){
    const switchAside = (() => {
      alert(11);
    })
      // 监听
      //watch(xxx, () => {})
      // 生命周期
    //  onBeforeMount(() => {})
    //  onMounted(() => {})
    //  onBeforeUpdate(() => {})
    //  onUpdated(() => {})
    //  onBeforeUnmount(() => {})
    //  onUnmounted(() => {})
    //  onErrorCaptured(() => {})
    //  onRenderTracked(() => {})
    //  onRenderTriggered(() => {})
      return {
        switchAside
      }
  }
}
</script>
<style lang="scss" scoped>
.menu-btn { 
  display: inline-block;
  padding-top: 24px;
  cursor: pointer;
}
</style>