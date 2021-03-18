<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章评论</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input
            maxlength="8"
            placeholder="请输入名称"
            v-model="queryInfo.keyword"
            clearable
            @clear="getCommentList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getCommentList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="commentList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 头像 -->
        <!-- <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:45px;height:45px;" />
          </template>
        </el-table-column> -->
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <span>{{ scope.row.relateBlogId.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="content" label="评论"></el-table-column>
        <el-table-column prop="createdAt" label="日期" width="200">
          <template scope="scope">
            {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
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
  name: 'Comment',
  data() {
    return {
      commentList: [],
      queryInfo: {
        keyword: '',
        pageNum: 1,
        pageSize: 8
      },
      total: 0
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      const res = await this.axios.get('rest/comments', { params: this.queryInfo })
      this.commentList = res.data.data
      this.total = res.data.total
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
