<template>
  <el-row>
    <el-col :span="12">
      <div class="menu-btn">
        <span @click="switchAside">
          <svg-icon icon="menuBtn" className="icon-menu-btn"></svg-icon>
        </span>
      </div>
    </el-col>
    <el-col :span="12">asdf</el-col>
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
  padding-top: 24px;
  cursor: pointer;
}
</style>