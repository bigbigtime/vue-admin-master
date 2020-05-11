<template>
<div id="login">
<div class="form-wrap">
<ul class="menu-tab">
<li @click="toggleHigh(item.type)" :class="{'current': current_menu === item.type}" v-for="item in menu_switch_item" :key="item.type">{{ item.label }}</li>
</ul>
<el-form ref="form" :model="form" :rules="form_rules">
  <el-form-item prop="name">
    <label class="form-label">用户名</label>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <label class="form-label">密码</label>
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item v-show="current_menu === 'register'">
    <label class="form-label">确认密码</label>
    <el-input v-model="form.passwords"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <label class="form-label">验证码</label>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-input v-model="form.code"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="success" class="el-button-block">获取验证码</el-button>
      </el-col>
    </el-row>
  </el-form-item>
  <el-form-item>
    <el-button type="danger" class="el-button-block" disabled>登录</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "Login",
  setup(props, { root, refs }){
    const menu_switch_item = reactive([
      { type: "login", label: "登录" },
      { type: "register", label: "注册" }
    ])
    let current_menu = ref(menu_switch_item[0].type);
    const form = reactive({
      name: "",
      password: "",
      passwords: "",
      code: ""
    })
    /**
     * 自定义检验规则
     */
    // 检验邮箱
    const validate_name_rules = (rule, value, callback) => {
      let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error("请输入邮箱"));
      } else if(!regEmail.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 检验密码
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if(!regPassword.test(value)) {
        callback(new Error("请输入 >=6 并且 <=20 位的密码，包含数字、字母"));
      } else {
        callback();
      }
    };
    // 检验验证码
    const validate_code_rules = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入验证码"));
      } else if(value.length !== 6) {
        callback(new Error("请输入长度为6位数的验证码"));
      } else {
        callback();
      }
    };
    // 检验规则
    const form_rules = reactive({
      name: [ 
        { validator: validate_name_rules, trigger: 'blur' }
      ],
      password: [
        { validator: validate_password_rules, trigger: 'blur' }
      ],
      code: [
        { validator: validate_code_rules, trigger: 'blur' }
      ]
    });
    // 切换样式方法
    const toggleHigh = ((type) => {
      current_menu.value = type;
    })
    return {
      form, menu_switch_item, current_menu, form_rules,
      toggleHigh
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
  font-size: 14px;
}
</style>