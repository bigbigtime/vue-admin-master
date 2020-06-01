<template>
  <div id="main-content">
    <router-view />
  </div>
</template>
<script>
export default {
   name: "LayoutMain",
}
</script>
<style lang="scss" scoped>
#main-content {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  @include webkit(box-sizing, border-box);
}
</style>