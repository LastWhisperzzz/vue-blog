<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input maxlength="8" clearable placeholder="请输入标题" v-model="query">
            <el-button slot="append" icon="el-icon-search" @clicl="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="sendEmail">推送邮件</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:45px;height:45px;" />
          </template>
        </el-table-column>
        <!-- 昵称 -->
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <!-- 邮箱 -->
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!-- 网址 -->
        <el-table-column prop="url" label="博客/github网址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      userList: []
    }
  },
  created() {},
  methods: {}
}
</script>
