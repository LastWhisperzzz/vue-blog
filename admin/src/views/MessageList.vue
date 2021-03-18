<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input
            maxlength="8"
            placeholder="请输入昵称"
            v-model="queryInfo.keyword"
            clearable
            @clear="getMessageList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getMessageList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="messageList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <!-- <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarImg" style="width:45px;height:45px;" />
          </template>
        </el-table-column> -->
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="byAiteName" label="艾特谁"></el-table-column>
        <el-table-column prop="content" label="留言"></el-table-column>
        <el-table-column prop="createdAt" label="日期">
          <template scope="scope">
            {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-s-comment"></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      messageList: [],
      queryInfo: {
        keyword: '',
        pageNum: 1,
        pageSize: 8
      },
      total: 0
    }
  },
  created() {
    this.getMessageList()
  },
  methods: {
    //获取留言列表
    async getMessageList() {
      const res = await this.axios.get('rest/messages', { params: this.queryInfo })
      this.messageList = res.data.data
      this.total = res.data.total
    },
    // 删除
    remove(row) {
      this.$confirm(`是否确定要删除留言 '${row.content}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/messages/${row._id}`)
          this.$message.success('删除成功!')
          this.getMessageList()
        })
        .catch(() => {
          this.$message.info('删除失败!')
        })
    },
    // 监听分页
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getLinkList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getLinkList()
    }
  }
}
</script>
