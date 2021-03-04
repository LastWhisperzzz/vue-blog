<template>
  <!-- 主页 -->
  <el-container class="layout-container">
    <!-- 侧边栏菜单 -->
    <el-aside :width="isCollapse ? '' : ''">
      <el-menu
        router
        :default-active="$route.path"
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        class="el-menu-vertical"
      >
        <el-menu-item index="/">
          <i class="el-icon-odometer"></i>
          <template slot="title">首页</template>
        </el-menu-item>
        <!-- 分类管理 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 文章管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 留言管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-comment"></i>
            <span slot="title">留言管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">留言</template>
            <el-menu-item index="/comments/list">文章评论</el-menu-item>
            <el-menu-item index="/messages/list">留言列表</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 友链管理 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-paperclip"></i>
            <span slot="title">友链管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">友链</template>
            <el-menu-item index="/links/list">友链列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 系统设置 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </template>
          <el-menu-item-group>
            <span slot="title">管理员</span>
            <el-menu-item index="/admin_users">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <!-- 折叠展开按钮 -->
        <div>
          <i
            v-show="!isCollapse"
            class="el-icon-s-unfold"
            @click="isCollapse = true"
            style="font-size:18px"
          ></i>
          <i
            v-show="isCollapse"
            class="el-icon-s-fold"
            @click="isCollapse = false"
            style="font-size:18px"
          ></i>
        </div>

        <!-- 右侧菜单 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <a href="javascript:;">
              <el-dropdown-item>前台页面</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/LastWhisperzzz">
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <!-- 内容主体 -->
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    logout() {
      this.$confirm('是否退出当前账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        sessionStorage.clear()
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">
.layout-container {
  height: 100vh;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 16px;
        }
      }
    }
  }
  .el-aside {
    background-color: #304156;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
