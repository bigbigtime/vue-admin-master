<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#344a5f" text-color="#fff" active-text-color="#ffd04b" router>
    <template v-for="(item, index) in router">
      <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
        <template slot="title">
          <i :class="item.meta.icon || ''"></i>
          <svg-icon icon="console" className="aaa"></svg-icon>
          <span>{{ item.meta ? item.meta.title : "" }}</span>
        </template>
        <template v-if="item.children && item.children.length > 0">
          <el-menu-item v-for="sub in item.children" :key="sub.id" :index="sub.path">
            {{ sub.meta ? sub.meta.title : ""}}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
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