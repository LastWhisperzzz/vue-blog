<template>
  <div class="login-container">
    <!-- 登录表单区域 -->
    <el-form
      ref="loginForm"
      :rules="loginRules"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <!-- 用户名 -->
        <el-input type="text" placeholder="用户名" v-model="loginForm.username" autocomplete="on">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item class="password" prop="password">
        <!-- 密码 -->
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
          tabindex="2"
          autocomplete="on"
          @keyup.native.enter="login"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
        <!-- <el-button type="danger" @click="register">注册</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    // 背景粒子特效
    // require('particles.js')
    // eslint-disable-next-line no-undef
    // particlesJS('particles-js', particlesConfig)
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        const res = await this.axios.post('login', this.loginForm)
        this.$message.success('登录成功')
        // 保存token
        sessionStorage.setItem('token', res.data.token)
        // 跳转到主页面
        this.$router.push('/')
      })
    }
    // async register() {
    //   const res = await this.$http.post("/register", this.model);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("username", res.data.username);
    //   this.$message.success('注册成功')
    //   this.$router.push("/login");
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .background-canvas {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .el-input {
    display: inline-block;
    height: 48px;
    width: 85%;
    .el-input__prefix {
      padding-left: 10px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 45px;
      color: $light_gray;
      height: 48px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('https://oss.lastwhisper.net/wallhaven.jpg');
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
