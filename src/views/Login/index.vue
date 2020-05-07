<template>
<div id="login">
<div class="form-wrap">
  <ul class="menu-tab">
    <li class="current">登录</li>
    <li>注册</li>
  </ul>
</div>
</div>
</template>

<script>
export default {
  name: 'Login',
  super(props, { root }){
      console.log(root)
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
</style>