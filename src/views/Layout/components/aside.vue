<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#344a5f" text-color="#fff" active-text-color="#ffd04b">
  <el-submenu v-for="(item, index) in router" :key="item.id" :index="index + ''">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ item.meta ? item.meta.title : "" }}</span>
    </template>
    <el-menu-item index="1-4-1">选项1</el-menu-item>
  </el-submenu>
  </el-menu>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "LayoutAside",
  components: {},
  props: {},
  setup(props, { root }){
    const router = reactive(root.$router.options.routes);
    console.log(router)
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
    return {
      router
    }
  }
}
</script>
<style lang="scss" scoped>
</style>