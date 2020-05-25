<template>
<el-row>
  <el-col :span="12">
    <span class="menu-btn">
      <svg-icon icon="menuBtn" className="icon-menu-btn"></svg-icon>
    </span>
  </el-col>
  <el-col :span="12">
    <span class="logout">
      <svg-icon icon="logout" className="icon-logout"></svg-icon>
    </span>
    <div class="face-info">
      <img src="../../../assets/face.png" alt="410293095@qq.com">
      <span class="name">410293095@qq.com</span>
    </div>
  </el-col>
</el-row>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "LayoutAsice",
  components: {},
  props: {},
  setup(props, { root }){
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
      return {}
  }
}
</script>
<style lang="scss" scoped>
.menu-btn { 
  display: inline-block;
  padding-top: 24px;
  cursor: pointer;
}
.logout {
  float: right;
  border-left: 1px solid #ededed;
  width: 75px;
  text-align: center;
  line-height: 75px;
  font-size: 25px;
  margin-right: -20px;
  cursor: pointer;
}
.face-info {
  float: right;
  padding: 18px 30px 0 0;
  img {
    display: inline-block;
    vertical-align: middle;
    border-radius: 100px;
    margin-right: 18px;
  }
}
</style>