<template>
  <div class="home">
    <el-button type="primary">主要按钮</el-button>
    <h1>这里是测试文字</h1>
    <ul>
      <li>无序列表LI</li>
      <li>无序列表LI</li>
    </ul>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "Home",
  props: {},
  setup(props, { root }){
    console.log(root)
    return {}
  }
};
</script>
