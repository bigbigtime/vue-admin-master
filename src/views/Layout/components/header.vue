<template>
<div></div>
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
<style lang="scss" scoped></style>