<template>
<div id="login">
<div class="form-wrap">
<ul class="menu-tab">
  <li class="current">登录</li>
  <li>注册</li>
</ul>
<el-form ref="form" :model="form">
  <el-form-item>
    <label class="form-label">用户名</label>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">立即创建</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "Login",
setup(props, { root }){
  const form = reactive({
    name: ""
  });
  return {
    form
  }
}
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.form-wrap {
  width: 300px;
  padding-top: 100px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    &.current { background-color: rgba(0, 0, 0, .1);}
  }
}
.form-label {
  display: block;
  color: #fff;
}
</style>