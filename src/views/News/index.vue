<template>
  <div>信息管理</div>
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
    return {
      router
    }
  }
}
</script>
<style lang="scss" scoped>
</style>