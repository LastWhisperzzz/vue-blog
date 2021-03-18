<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类标签</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
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
            @clear="getCateList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getCateList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加标签</el-button>
        </el-col>
      </el-row>
      <el-table :data="cateList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column label="名称" prop="name" width="200"></el-table-column>
        <!-- 描述 -->
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="操作" width="200">
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
      :title="this.formData._id ? '编辑分类' : '添加分类'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="dialogClose"
    >
      <el-form label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="formData.desc"></el-input>
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
  name: 'CategoryList',
  data() {
    return {
      cateList: [],
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
    this.getCateList()
  },
  methods: {
    // 获取分类列表
    async getCateList() {
      const res = await this.axios.get('rest/categories', { params: this.queryInfo })
      this.cateList = res.data.data
      this.total = res.data.total
    },
    showAddDialog() {
      this.dialogVisible = true
    },
    async showEditDialog(row) {
      const res = await this.axios.get(`rest/categories/${row._id}`)
      this.formData = res.data
      this.dialogVisible = true
    },
    dialogClose() {
      this.formData = {}
    },
    // 新增、编辑保存
    async save() {
      if (this.formData._id) {
        const res = await this.axios.put(`rest/categories/${this.formData._id}`, this.formData)
      } else {
        await this.axios.post('rest/categories', this.formData)
      }
      this.$message.success('保存成功!')
      this.getCateList()
      this.dialogVisible = false
    },
    // 删除
    remove(row) {
      this.$confirm(`是否确定要删除分类 '${row.name}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/categories/${row._id}`)
          this.$message.success('删除成功!')
          this.getCateList()
        })
        .catch(() => {
          this.$message.info('删除失败!')
        })
    },
    // 监听分页
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCateList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getCateList()
    }
  }
}
</script>
