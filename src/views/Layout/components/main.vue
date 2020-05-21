<template>
  <div class="">数据内容</div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
   name: "LayoutAsice",
   components: {},
   props: {},
   setup(props, { root }){
       // 监听
       watch(xxx, () => {})
       // 生命周期
       onBeforeMount(() => {})
       onMounted(() => {})
       onBeforeUpdate(() => {})
       onUpdated(() => {})
       onBeforeUnmount(() => {})
       onUnmounted(() => {})
       onErrorCaptured(() => {})
       onRenderTracked(() => {})
       onRenderTriggered(() => {})
       return {}
  }
}
</script>
<style lang="scss" scoped>
</style>