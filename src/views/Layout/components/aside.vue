<template>
  <div>
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu :default-active="defalutActive" class="el-menu-vertical-demo" background-color="#344a5f" text-color="#fff" active-text-color="#fff" router unique-opened>
      <template v-for="(item, index) in router">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon :icon="item.meta.icon" :className="item.meta && item.meta.iconClass"></svg-icon>
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
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  name: "LayoutAside",
  components: {},
  props: {},
  setup(props, { root }){
const router = reactive(root.$router.options.routes);
/**
 * 监听路由变化
 */
const defalutActive = computed(() => {
  const route = root.$route;
  return route.path;
})
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
      router,
      defalutActive
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  img { margin: auto; }
}
</style>