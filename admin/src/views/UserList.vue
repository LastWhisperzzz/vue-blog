<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input
            maxlength="8"
            placeholder="请输入昵称"
            v-model="queryInfo.keyword"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="sendEmail">推送邮件</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe @selection-change="handleSelectionChange">
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarImg" style="width:45px;height:45px;" />
          </template>
        </el-table-column>
        <!-- 昵称 -->
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <!-- 邮箱 -->
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!-- 网址 -->
        <el-table-column prop="url" label="主页"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
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

    <!-- 邮件推送弹出框 -->
    <el-dialog title="发送邮件" :visible.sync="dialogVisible" width="320px" center>
      <el-form :model="formData" :rules="formRules" ref="form">
        <el-form-item props="sendContent" label="发送内容">
          <el-input type="textarea" :rows="3" v-model="formData.sendContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendhandle">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      userList: [],
      queryInfo: {
        keyword: '',
        pageNum: 1,
        pageSize: 8
      },
      total: 0,
      dialogVisible: false,
      multipleSelection: [],
      formData: {
        sendContent: ''
      },
      formRules: {}
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await this.axios.get('/rest/users')
      this.userList = res.data.data
      this.total = res.data.total
    },
    // 删除
    remove(row) {
      this.$confirm(`是否确定要删除用户 '${row.nickName}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/users/${row._id}`)
          this.$message.success('删除成功!')
          this.getUserList()
        })
        .catch(() => {
          this.$message.info('删除失败!')
        })
    },
    // 选择表格
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val.map(v => {
        return { email: v.email, subject: v.nickName }
      })
      console.log(this.multipleSelection)
    },
    // 推送邮件
    async sendEmail() {
      if (this.multipleSelection.length == 0) {
        return this.$message.warning('请先选择用户')
      }
      this.dialogVisible = true
    },
    sendhandle() {
      let promiseArr = []
      this.multipleSelection.forEach(e => {
        let replyObj = {
          recipient: e.email,
          subject: e.subject,
          html: this.formData.sendContent
        }
        promiseArr.push(this.axios.post('/email', replyObj))
      })
      Promise.all(promiseArr)
        .then(res => {
          console.log(res)
          this.$message.success('发送成功!')
          this.dialogVisible = false
        })
        .catch(err => {
          this.$message.warning('发送失败!')
          this.dialogVisible = false
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
