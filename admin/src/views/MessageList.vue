<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input maxlength="8" clearable placeholder="请输入昵称" v-model="query">
            <el-button slot="append" icon="el-icon-search" @clicl="search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="messageList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:45px;height:45px;" />
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="byAiteName" label="艾特谁"></el-table-column>
        <el-table-column prop="content" label="留言"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
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
  name: 'Message',
  data() {
    return {
      messageList: [],
      query: ''
    }
  },
  created() {},
  methods: {
    //获取留言列表
    getMessageList() {},
    // 删除
    remove(row) {
      this.$confirm(`是否确定要删除留言 '${row.content}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/links/${row._id}`)
          this.$message.success('删除成功!')
          this.getMessageList()
        })
        .catch(() => {
          this.$message.info('删除失败!')
        })
    },
    search() {}
  }
}
</script>
