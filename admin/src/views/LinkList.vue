<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友链管理</el-breadcrumb-item>
      <el-breadcrumb-item>友链列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input
            maxlength="8"
            placeholder="请输入名称"
            v-model="queryInfo.keyword"
            clearable
            @clear="getLinkList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getLinkList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加友链</el-button>
        </el-col>
      </el-row>

      <el-table :data="linkList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 名称 -->
        <el-table-column prop="name" label="名称"></el-table-column>
        <!-- 图标 -->
        <el-table-column label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width:45px;height:45px;" />
          </template>
        </el-table-column>
        <!-- 地址 -->
        <el-table-column prop="site" label="地址"></el-table-column>
        <!-- 描述 -->
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
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

    <!-- 新增编辑对话框 -->
    <el-dialog
      :title="this.formData._id ? '编辑友链' : '添加友链'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="dialogClose"
    >
      <el-form label-width="70px">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formData.site"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(formData, 'icon', res.url)"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Link',
  data() {
    return {
      linkList: [],
      formData: {},
      dialogVisible: false,
      queryInfo: {
        keyword: '',
        pageNum: 1,
        pageSize: 8
      },
      total: 0
    }
  },
  created() {
    this.getLinkList()
  },
  methods: {
    //获取友链列表
    async getLinkList() {
      const res = await this.axios.get('rest/links', { params: this.queryInfo })
      this.linkList = res.data.data
      this.total = res.data.total
    },
    showAddDialog() {
      this.dialogVisible = true
    },
    async showEditDialog(row) {
      const res = await this.axios.get(`rest/links/${row._id}`)
      this.formData = res.data
      this.dialogVisible = true
    },
    dialogClose() {
      this.formData = {}
    },
    // 保存
    async save() {
      if (this.formData._id) {
        const res = await this.axios.put(`rest/links/${this.formData._id}`, this.formData)
      } else {
        await this.axios.post('rest/links', this.formData)
      }
      this.$message.success('保存成功!')
      this.getLinkList()
      this.dialogVisible = false
    },
    // 删除
    remove(row) {
      this.$confirm(`是否确定要删除 '${row.name}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/links/${row._id}`)
          this.$message.success('删除成功!')
          this.getLinkList()
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
