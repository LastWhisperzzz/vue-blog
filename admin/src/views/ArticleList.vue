<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input maxlength="8" clearable placeholder="请输入标题" v-model="query">
            <el-button slot="append" icon="el-icon-search" @clicl="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" @click="add">写博客</el-button>
        </el-col>
      </el-row>

      <el-table :data="articleList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 分类 -->
        <el-table-column label="所属分类" border stripe>
          <template slot-scope="scope">
            <span>{{ scope.row.categories.map(item => item.name).join('/') }}</span>
          </template>
        </el-table-column>
        <!-- 标题 -->
        <el-table-column label="标题" prop="title"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="createdAt" label="创建时间">
          <template scope="scope">
            {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <!-- 更新时间 -->
        <el-table-column prop="updatedAt" label="最后更新时间">
          <template scope="scope">
            {{ scope.row.updatedAt | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
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

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pagenum"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="pageParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data() {
    return {
      articleList: [],
      //查询参数
      query: '',
      //分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    //获取文章列表
    async getArticleList() {},

    add() {
      this.$router.push('/articles/create')
    },
    edit(row) {
      this.$router.push(`/articles/edit/${row._id}`)
    },
    remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`rest/articles/${row._id}`)
          this.$message.success('删除成功!')
          this.getArticleList()
        })
        .catch(() => {
          this.$message.info('删除失败!')
        })
    },
    search() {},
    //监听分页
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getArticleList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getArticleList()
    }
  }
}
</script>
