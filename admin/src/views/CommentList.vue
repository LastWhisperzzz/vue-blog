<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章评论</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input maxlength="8" clearable placeholder="请输入昵称" v-model="query">
            <el-button slot="append" icon="el-icon-search" @clicl="search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="commentList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:45px;height:45px;" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      commentList: [],
      query: ''
    }
  },
  created() {},
  methods: {}
}
</script>
